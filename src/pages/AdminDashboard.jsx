import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaSignOutAlt, FaDatabase } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import {
  fetchAllPosts, deletePost, togglePublish,
  fetchAllViewCounts, fetchAllReactionCounts, seedInitialPosts,
} from '../lib/posts';
import { logo } from '../assets';

const REACTION_EMOJI = { fire: '🔥', clap: '👏', insightful: '💡', thinking: '🤔' };

const AdminDashboard = () => {
  const [posts, setPosts]         = useState([]);
  const [views, setViews]         = useState({});
  const [reactions, setReactions] = useState({});
  const [loading, setLoading]     = useState(true);
  const [seeding, setSeeding]     = useState(false);
  const [seedMsg, setSeedMsg]     = useState('');
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    const [postsRes, viewsRes, reactionsRes] = await Promise.all([
      fetchAllPosts(),
      fetchAllViewCounts(),
      fetchAllReactionCounts(),
    ]);
    setPosts(postsRes.data ?? []);
    setViews(viewsRes ?? {});
    setReactions(reactionsRes ?? {});
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await deletePost(id);
    load();
  };

  const handleToggle = async (id, current) => {
    await togglePublish(id, !current);
    load();
  };

  const handleSeed = async () => {
    setSeeding(true);
    const { error } = await seedInitialPosts();
    setSeeding(false);
    setSeedMsg(error ? error.message : 'Posts imported successfully!');
    if (!error) load();
    setTimeout(() => setSeedMsg(''), 4000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin', { replace: true });
  };

  const totalViews = Object.values(views).reduce((a, b) => a + b, 0);
  const totalReactions = Object.values(reactions).reduce(
    (sum, r) => sum + Object.values(r).reduce((a, b) => a + b, 0), 0
  );

  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#050816]/90 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-7 h-7 object-contain" />
          <span className="text-white font-bold text-[15px]">Blog Admin</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/blog" className="text-secondary hover:text-white text-[13px] transition-colors">
            View Blog
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-secondary hover:text-white text-[13px] transition-colors"
          >
            <FaSignOutAlt size={13} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Posts', value: posts.length },
            { label: 'Total Views', value: totalViews },
            { label: 'Total Reactions', value: totalReactions },
          ].map(({ label, value }) => (
            <div key={label} className="bg-[#151030] border border-white/10 rounded-2xl p-5">
              <p className="text-secondary text-[12px] uppercase tracking-wider mb-1">{label}</p>
              <p className="text-white font-black text-[32px]">{value}</p>
            </div>
          ))}
        </div>

        {/* Actions row */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h2 className="text-white font-bold text-[22px]">Posts</h2>
          <div className="flex items-center gap-3">
            {seedMsg && (
              <span className={`text-[13px] ${seedMsg.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                {seedMsg}
              </span>
            )}
            {posts.length === 0 && (
              <button
                onClick={handleSeed}
                disabled={seeding}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1d1836] border border-white/10 text-secondary hover:text-white hover:border-[#915EFF] text-[13px] transition-all disabled:opacity-50"
              >
                <FaDatabase size={12} /> {seeding ? 'Importing…' : 'Import Initial Posts'}
              </button>
            )}
            <Link
              to="/admin/editor"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#915EFF] hover:bg-[#7c4fe0] rounded-lg text-white text-[14px] font-medium transition-colors"
            >
              <FaPlus size={13} /> New Post
            </Link>
          </div>
        </div>

        {/* Posts table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-[#915EFF] border-t-transparent animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-secondary">
            No posts yet. Import the initial posts or create your first one.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {posts.map((post, i) => {
              const postViews = views[post.slug] ?? 0;
              const postReactions = reactions[post.slug] ?? {};
              const totalPostReactions = Object.values(postReactions).reduce((a, b) => a + b, 0);

              return (
                <motion.div
                  key={post.id ?? post.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#151030] border border-white/10 rounded-xl px-5 py-4 flex items-center gap-4 flex-wrap"
                >
                  {/* Status dot */}
                  <div className={`w-2 h-2 rounded-full shrink-0 ${post.is_published ? 'bg-green-400' : 'bg-yellow-400'}`} />

                  {/* Title + meta */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-[15px] truncate">{post.title}</p>
                    <p className="text-secondary text-[12px] mt-0.5">
                      {post.category} &bull; {post.date} &bull;{' '}
                      <span className={post.is_published ? 'text-green-400' : 'text-yellow-400'}>
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </p>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-center gap-5 text-[13px] text-secondary shrink-0">
                    <span title="Views">👁 {postViews}</span>
                    <span title="Reactions" className="flex items-center gap-1">
                      {totalPostReactions === 0 ? '— reactions' : (
                        Object.entries(postReactions).map(([k, v]) => (
                          <span key={k}>{REACTION_EMOJI[k]}{v}</span>
                        ))
                      )}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={`/admin/editor/${post.slug}`}
                      className="p-2 rounded-lg bg-[#1d1836] text-secondary hover:text-white hover:bg-[#915EFF]/20 transition-colors"
                      title="Edit"
                    >
                      <FaEdit size={14} />
                    </Link>
                    <button
                      onClick={() => handleToggle(post.id, post.is_published)}
                      className="p-2 rounded-lg bg-[#1d1836] text-secondary hover:text-white hover:bg-[#915EFF]/20 transition-colors"
                      title={post.is_published ? 'Unpublish' : 'Publish'}
                    >
                      {post.is_published ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </button>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="p-2 rounded-lg bg-[#1d1836] text-secondary hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      title="Delete"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
