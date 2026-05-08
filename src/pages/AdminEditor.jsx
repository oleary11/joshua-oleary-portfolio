import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaEye, FaEdit } from 'react-icons/fa';
import { createPost, updatePost, fetchAllPosts } from '../lib/posts';
import { logo } from '../assets';

const CATEGORIES = ['Social Engineering', 'Physical Security', 'Reconnaissance', 'OSINT', 'Red Team', 'Defense', 'Other'];

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const calcReadTime = (blocks) => {
  const text = blocks.map((b) => b.type === 'ul' ? b.items.join(' ') : (b.text ?? '')).join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

// ── Block renderers ──────────────────────────────────────────

const inputCls = 'w-full bg-[#1d1836] border border-white/10 rounded-lg px-4 py-2.5 text-white text-[14px] placeholder-secondary/40 focus:outline-none focus:border-[#915EFF] transition-colors resize-none';

const BlockEditor = ({ block, index, total, onChange, onDelete, onMove }) => {
  const accentColor = { h2: '#915EFF', p: '#aaa6c3', ul: '#56ccf2' }[block.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="flex gap-3 group"
    >
      {/* Type bar */}
      <div className="flex flex-col items-center gap-1 pt-1 shrink-0 w-12">
        <div className="w-1 flex-1 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.5 }} />
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accentColor }}>
          {block.type}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        {block.type === 'h2' && (
          <input
            value={block.text}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="Section heading…"
            className={inputCls}
          />
        )}
        {block.type === 'p' && (
          <textarea
            value={block.text}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="Write a paragraph…"
            rows={4}
            className={inputCls}
          />
        )}
        {block.type === 'ul' && (
          <div className="flex flex-col gap-2">
            {block.items.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[#56ccf2] text-[16px] shrink-0">•</span>
                <input
                  value={item}
                  onChange={(e) => {
                    const items = [...block.items];
                    items[i] = e.target.value;
                    onChange({ items });
                  }}
                  placeholder={`List item ${i + 1}…`}
                  className={inputCls}
                />
                {block.items.length > 1 && (
                  <button
                    onClick={() => onChange({ items: block.items.filter((_, j) => j !== i) })}
                    className="text-secondary hover:text-red-400 transition-colors shrink-0"
                  >
                    <FaTrash size={12} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => onChange({ items: [...block.items, ''] })}
              className="self-start text-[12px] text-secondary hover:text-[#56ccf2] transition-colors mt-1"
            >
              + Add item
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 pt-1">
        <button onClick={() => onMove('up')} disabled={index === 0} className="p-1.5 rounded text-secondary hover:text-white disabled:opacity-20 transition-colors">
          <FaArrowUp size={11} />
        </button>
        <button onClick={() => onMove('down')} disabled={index === total - 1} className="p-1.5 rounded text-secondary hover:text-white disabled:opacity-20 transition-colors">
          <FaArrowDown size={11} />
        </button>
        <button onClick={onDelete} className="p-1.5 rounded text-secondary hover:text-red-400 transition-colors">
          <FaTrash size={11} />
        </button>
      </div>
    </motion.div>
  );
};

// ── Preview ──────────────────────────────────────────────────

const Preview = ({ meta, blocks }) => (
  <div className="prose max-w-none">
    <p className="text-secondary text-[12px] uppercase tracking-widest mb-2">{meta.category}</p>
    <h1 className="text-white font-black text-[32px] leading-tight mb-1">{meta.title || 'Untitled'}</h1>
    {meta.subtitle && <p className="text-secondary italic text-[16px] mb-4">{meta.subtitle}</p>}
    <div className="h-px bg-white/10 my-6" />
    {blocks.map((block, i) => {
      if (block.type === 'h2') return <h2 key={i} className="text-white font-bold text-[22px] mt-8 mb-3">{block.text}</h2>;
      if (block.type === 'ul') return (
        <ul key={i} className="mt-3 mb-4 flex flex-col gap-2">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-2 text-secondary text-[15px]">
              <span className="text-[#915EFF]">•</span>{item}
            </li>
          ))}
        </ul>
      );
      return <p key={i} className="text-secondary text-[15px] leading-relaxed mt-3">{block.text}</p>;
    })}
  </div>
);

// ── Main editor ──────────────────────────────────────────────

const AdminEditor = () => {
  const { slug: editSlug } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(editSlug);

  const [tab, setTab]         = useState('write'); // 'write' | 'preview'
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');
  const [editId, setEditId]   = useState(null);
  const [slugLocked, setSlugLocked] = useState(isEdit);

  const [meta, setMeta] = useState({
    title: '', subtitle: '', slug: '', excerpt: '',
    category: CATEGORIES[0], tags: '',
  });
  const [blocks, setBlocks] = useState([{ type: 'p', text: '' }]);

  const titleRef = useRef(false);

  // Load existing post for editing
  useEffect(() => {
    if (!isEdit) return;
    fetchAllPosts().then(({ data }) => {
      const post = data?.find((p) => p.slug === editSlug);
      if (!post) return navigate('/admin/dashboard');
      setEditId(post.id);
      setMeta({
        title: post.title,
        subtitle: post.subtitle ?? '',
        slug: post.slug,
        excerpt: post.excerpt ?? '',
        category: post.category ?? CATEGORIES[0],
        tags: (post.tags ?? []).join(', '),
      });
      setBlocks(post.content?.length ? post.content : [{ type: 'p', text: '' }]);
    });
  }, [editSlug, isEdit, navigate]);

  // Auto-generate slug from title (create mode only)
  useEffect(() => {
    if (isEdit || slugLocked || !meta.title) return;
    setMeta((prev) => ({ ...prev, slug: slugify(meta.title) }));
  }, [meta.title, isEdit, slugLocked]);

  const setBlock = (index, updates) =>
    setBlocks((prev) => prev.map((b, i) => (i === index ? { ...b, ...updates } : b)));

  const addBlock = (type) =>
    setBlocks((prev) => [...prev, type === 'ul' ? { type: 'ul', items: [''] } : { type, text: '' }]);

  const removeBlock = (index) =>
    setBlocks((prev) => prev.filter((_, i) => i !== index));

  const moveBlock = (index, dir) => {
    const next = [...blocks];
    const target = dir === 'up' ? index - 1 : index + 1;
    [next[index], next[target]] = [next[target], next[index]];
    setBlocks(next);
  };

  const handleSave = async (publish) => {
    setError('');
    if (!meta.title.trim()) return setError('Title is required.');
    if (!meta.slug.trim()) return setError('Slug is required.');

    setSaving(true);
    const payload = {
      title: meta.title.trim(),
      subtitle: meta.subtitle.trim(),
      slug: meta.slug.trim(),
      excerpt: meta.excerpt.trim(),
      category: meta.category,
      tags: meta.tags.split(',').map((t) => t.trim()).filter(Boolean),
      read_time: calcReadTime(blocks),
      content: blocks.filter((b) => (b.type === 'ul' ? b.items.some((i) => i.trim()) : b.text?.trim())),
      is_published: publish,
      ...(publish && !isEdit ? { published_at: new Date().toISOString() } : {}),
    };

    const { error: saveError } = isEdit
      ? await updatePost(editId, payload)
      : await createPost(payload);

    setSaving(false);
    if (saveError) return setError(saveError.message);
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#050816]/90 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard" className="flex items-center gap-1.5 text-secondary hover:text-white text-[13px] transition-colors">
            <FaArrowLeft size={12} /> Dashboard
          </Link>
          <span className="text-white/20">|</span>
          <img src={logo} alt="logo" className="w-6 h-6 object-contain" />
          <span className="text-secondary text-[14px]">{isEdit ? `Editing: ${meta.title || editSlug}` : 'New Post'}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTab(tab === 'write' ? 'preview' : 'write')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1d1836] border border-white/10 text-secondary hover:text-white text-[13px] transition-colors"
          >
            {tab === 'write' ? <><FaEye size={12} /> Preview</> : <><FaEdit size={12} /> Edit</>}
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-4 py-1.5 rounded-lg bg-[#1d1836] border border-white/10 text-secondary hover:text-white text-[13px] disabled:opacity-50 transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-4 py-1.5 rounded-lg bg-[#915EFF] hover:bg-[#7c4fe0] text-white text-[13px] font-medium disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving…' : 'Publish'}
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {error && (
          <div className="mb-6 text-red-400 text-[13px] bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {tab === 'preview' ? (
          <Preview meta={meta} blocks={blocks} />
        ) : (
          <>
            {/* Metadata */}
            <div className="flex flex-col gap-4 mb-10">
              <input
                value={meta.title}
                onChange={(e) => setMeta((p) => ({ ...p, title: e.target.value }))}
                placeholder="Post title…"
                className="bg-transparent border-b border-white/20 focus:border-[#915EFF] outline-none text-white font-black text-[32px] pb-2 placeholder-white/20 transition-colors"
              />
              <input
                value={meta.subtitle}
                onChange={(e) => setMeta((p) => ({ ...p, subtitle: e.target.value }))}
                placeholder="Subtitle (optional)…"
                className="bg-transparent border-b border-white/10 focus:border-[#915EFF] outline-none text-secondary italic text-[16px] pb-2 placeholder-secondary/30 transition-colors"
              />

              <div className="grid grid-cols-2 gap-4 mt-2">
                {/* Slug */}
                <div className="flex flex-col gap-1">
                  <label className="text-secondary text-[11px] uppercase tracking-wider">Slug</label>
                  <div className="flex gap-2">
                    <input
                      value={meta.slug}
                      onChange={(e) => { setSlugLocked(true); setMeta((p) => ({ ...p, slug: e.target.value })); }}
                      placeholder="post-slug"
                      className="flex-1 bg-[#1d1836] border border-white/10 rounded-lg px-3 py-2 text-white text-[13px] focus:outline-none focus:border-[#915EFF] transition-colors font-mono"
                    />
                    {!isEdit && (
                      <button
                        onClick={() => { setSlugLocked(false); setMeta((p) => ({ ...p, slug: slugify(p.title) })); }}
                        className="px-2 py-1 text-[11px] rounded bg-[#1d1836] border border-white/10 text-secondary hover:text-white transition-colors"
                        title="Re-generate from title"
                      >
                        ↺
                      </button>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1">
                  <label className="text-secondary text-[11px] uppercase tracking-wider">Category</label>
                  <select
                    value={meta.category}
                    onChange={(e) => setMeta((p) => ({ ...p, category: e.target.value }))}
                    className="bg-[#1d1836] border border-white/10 rounded-lg px-3 py-2 text-white text-[13px] focus:outline-none focus:border-[#915EFF] transition-colors"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-secondary text-[11px] uppercase tracking-wider">Tags <span className="normal-case">(comma separated)</span></label>
                  <input
                    value={meta.tags}
                    onChange={(e) => setMeta((p) => ({ ...p, tags: e.target.value }))}
                    placeholder="OSINT, Red Team, Physical Security"
                    className="bg-[#1d1836] border border-white/10 rounded-lg px-3 py-2 text-white text-[13px] focus:outline-none focus:border-[#915EFF] transition-colors"
                  />
                </div>

                {/* Excerpt */}
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-secondary text-[11px] uppercase tracking-wider">Excerpt</label>
                  <textarea
                    value={meta.excerpt}
                    onChange={(e) => setMeta((p) => ({ ...p, excerpt: e.target.value }))}
                    placeholder="Short summary shown on blog cards…"
                    rows={2}
                    className="bg-[#1d1836] border border-white/10 rounded-lg px-3 py-2 text-white text-[13px] focus:outline-none focus:border-[#915EFF] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-8" />

            {/* Content blocks */}
            <div className="flex flex-col gap-4">
              <AnimatePresence mode="popLayout">
                {blocks.map((block, i) => (
                  <BlockEditor
                    key={i}
                    block={block}
                    index={i}
                    total={blocks.length}
                    onChange={(updates) => setBlock(i, updates)}
                    onDelete={() => removeBlock(i)}
                    onMove={(dir) => moveBlock(i, dir)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Add block toolbar */}
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <span className="text-secondary text-[12px] uppercase tracking-wider mr-1">Add block:</span>
              {[
                { type: 'p',  label: '¶ Paragraph' },
                { type: 'h2', label: 'H Heading' },
                { type: 'ul', label: '• List' },
              ].map(({ type, label }) => (
                <button
                  key={type}
                  onClick={() => addBlock(type)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1d1836] border border-white/10 text-secondary hover:text-white hover:border-[#915EFF] text-[13px] transition-all"
                >
                  <FaPlus size={10} /> {label}
                </button>
              ))}
            </div>

            <p className="mt-4 text-secondary/50 text-[12px]">
              Estimated read time: {calcReadTime(blocks)}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminEditor;
