import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEye } from 'react-icons/fa';

import Navbar from '../components/Navbar';
import { StarsCanvas } from '../components/canvas';
import ReactionBar from '../components/blog/ReactionBar';
import { styles } from '../styles';
import { fetchPost, fetchPosts, trackView, fetchViewCount } from '../lib/posts';

const categoryBg = {
  Reconnaissance:      'from-[#2f80ed] to-[#56ccf2]',
  'Social Engineering':'from-[#ec008c] to-[#fc6767]',
  'Physical Security': 'from-[#11998e] to-[#38ef7d]',
};
const categoryColors = {
  Reconnaissance:      'blue-text-gradient',
  'Social Engineering':'pink-text-gradient',
  'Physical Security': 'green-text-gradient',
};

const renderBlock = (block, i) => {
  if (block.type === 'h2') return (
    <h2 key={i} className="text-white font-bold text-[24px] mt-10 mb-3">{block.text}</h2>
  );
  if (block.type === 'ul') return (
    <ul key={i} className="list-none mt-4 mb-4 flex flex-col gap-3">
      {block.items.map((item, j) => (
        <li key={j} className="flex gap-3 text-secondary text-[16px] leading-[1.75]">
          <span className="text-[#915EFF] mt-1.5 shrink-0">&#8226;</span>{item}
        </li>
      ))}
    </ul>
  );
  return <p key={i} className="text-secondary text-[16px] leading-[1.85] mt-4">{block.text}</p>;
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost]         = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [views, setViews]       = useState(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    Promise.all([fetchPost(slug), fetchPosts()]).then(([postRes, postsRes]) => {
      if (!postRes.data) { setNotFound(true); setLoading(false); return; }
      setPost(postRes.data);
      setAllPosts(postsRes.data ?? []);
      setLoading(false);
      // Track view and fetch count after render
      trackView(slug);
      fetchViewCount(slug).then(setViews);
    });
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#915EFF] border-t-transparent animate-spin" />
    </div>
  );
  if (notFound) return <Navigate to="/blog" replace />;

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const next = allPosts[currentIndex + 1] ?? null;
  const prev = allPosts[currentIndex - 1] ?? null;

  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${styles.paddingX} max-w-3xl mx-auto pt-28 pb-20`}
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors duration-300 text-[14px] mb-10"
        >
          <FaArrowLeft size={12} /> All Posts
        </Link>

        {/* Header */}
        <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${categoryBg[post.category] ?? 'from-[#915EFF] to-[#6b3fc0]'} mb-5`} />

        <span className={`text-[13px] font-semibold uppercase tracking-widest ${categoryColors[post.category] ?? 'text-secondary'}`}>
          {post.category}
        </span>

        <h1 className="text-white font-black text-[36px] sm:text-[44px] leading-tight mt-2">
          {post.title}
        </h1>
        <p className="text-secondary text-[18px] italic mt-1">{post.subtitle}</p>

        <div className="flex items-center gap-3 mt-4 text-[13px] text-secondary flex-wrap">
          <span>{post.date}</span>
          <span>&bull;</span>
          <span>{post.readTime}</span>
          {views !== null && (
            <>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><FaEye size={11} /> {views} views</span>
            </>
          )}
        </div>

        <div className="mt-8 mb-8 h-px bg-white/10" />

        {/* Content */}
        <article>
          {(post.content ?? []).map((block, i) => renderBlock(block, i))}
        </article>

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2">
          {(post.tags ?? []).map((tag) => (
            <span key={tag} className="px-3 py-1 text-[12px] rounded-full bg-[#915EFF]/20 text-[#c4b5fd]">
              #{tag}
            </span>
          ))}
        </div>

        {/* Reactions */}
        <ReactionBar slug={slug} />

        {/* Prev / Next */}
        <div className="mt-16 h-px bg-white/10" />
        <div className="mt-8 flex justify-between gap-4 flex-wrap">
          {next ? (
            <Link to={`/blog/${next.slug}`} className="flex flex-col gap-1 group max-w-[45%]">
              <span className="text-[12px] text-secondary uppercase tracking-wider">Newer</span>
              <span className="text-white text-[15px] font-medium group-hover:text-[#915EFF] transition-colors duration-300">{next.title}</span>
            </Link>
          ) : <div />}
          {prev ? (
            <Link to={`/blog/${prev.slug}`} className="flex flex-col gap-1 items-end group max-w-[45%] text-right">
              <span className="text-[12px] text-secondary uppercase tracking-wider">Older</span>
              <span className="text-white text-[15px] font-medium group-hover:text-[#915EFF] transition-colors duration-300">{prev.title}</span>
            </Link>
          ) : <div />}
        </div>
      </motion.div>

      <div className="relative z-0">
        <StarsCanvas />
      </div>
    </div>
  );
};

export default BlogPost;
