import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

import Navbar from '../components/Navbar';
import { StarsCanvas } from '../components/canvas';
import { styles } from '../styles';
import { fadeIn, textVariant, staggerContainer } from '../utils/motion';
import { fetchPosts } from '../lib/posts';

const categoryColors = {
  Reconnaissance:      'blue-text-gradient',
  'Social Engineering':'pink-text-gradient',
  'Physical Security': 'green-text-gradient',
};
const categoryBg = {
  Reconnaissance:      'from-[#2f80ed] to-[#56ccf2]',
  'Social Engineering':'from-[#ec008c] to-[#fc6767]',
  'Physical Security': 'from-[#11998e] to-[#38ef7d]',
};

const BlogCard = ({ post, index }) => (
  <motion.div
    variants={fadeIn('up', 'spring', index * 0.15, 0.75)}
    className="bg-[#151030] rounded-2xl p-6 flex flex-col gap-4 hover:shadow-[0px_20px_60px_-10px_#211e35] transition-shadow duration-500 group"
  >
    <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${categoryBg[post.category] ?? 'from-[#915EFF] to-[#6b3fc0]'}`} />

    <div>
      <span className={`text-[12px] font-semibold uppercase tracking-widest ${categoryColors[post.category] ?? 'text-secondary'}`}>
        {post.category}
      </span>
      <h3 className="text-white font-bold text-[22px] mt-1 leading-snug group-hover:text-[#915EFF] transition-colors duration-300">
        {post.title}
      </h3>
      <p className="text-secondary text-[14px] italic mt-0.5">{post.subtitle}</p>
    </div>

    <p className="text-secondary text-[15px] leading-[1.75] flex-1">{post.excerpt}</p>

    <div className="flex flex-wrap gap-2 mt-1">
      {(post.tags ?? []).map((tag) => (
        <span key={tag} className="px-3 py-1 text-[12px] rounded-full bg-[#915EFF]/20 text-[#c4b5fd]">
          #{tag}
        </span>
      ))}
    </div>

    <div className="flex items-center justify-between pt-3 border-t border-white/10">
      <span className="text-[13px] text-secondary">{post.date} &bull; {post.readTime}</span>
      <Link
        to={`/blog/${post.slug}`}
        className="flex items-center gap-2 text-[14px] font-medium text-[#915EFF] hover:text-white transition-colors duration-300"
      >
        Read More <FaArrowRight size={12} />
      </Link>
    </div>
  </motion.div>
);

const Blog = () => {
  const [posts, setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then(({ data }) => {
      setPosts(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <Navbar />

      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        animate="show"
        className={`${styles.padding} max-w-7xl mx-auto pt-28`}
      >
        <Link to="/" className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors duration-300 text-[14px] mb-10">
          <FaArrowLeft size={12} /> Back to Portfolio
        </Link>

        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>thoughts &amp; research</p>
          <h2 className={styles.sectionHeadText}>Blog.</h2>
        </motion.div>

        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          I write about physical social engineering, red team operations, OSINT,
          and the human factors at the intersection of security and behavior.
          All content is for educational and defensive purposes.
        </motion.p>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 rounded-full border-2 border-[#915EFF] border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}
      </motion.div>

      <div className="relative z-0 mt-20">
        <StarsCanvas />
      </div>
    </div>
  );
};

export default Blog;
