import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
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
    variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
    className="bg-tertiary rounded-2xl p-6 sm:w-[360px] w-full flex flex-col gap-4 hover:shadow-[0px_20px_60px_-10px_#211e35] transition-shadow duration-500 group"
  >
    <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${categoryBg[post.category] ?? 'from-[#915EFF] to-[#6b3fc0]'}`} />

    <div>
      <span className={`text-[12px] font-semibold uppercase tracking-widest ${categoryColors[post.category] ?? 'text-secondary'}`}>
        {post.category}
      </span>
      <h3 className="text-white font-bold text-[20px] mt-1 leading-snug group-hover:text-[#915EFF] transition-colors duration-300">
        {post.title}
      </h3>
      <p className="text-secondary text-[13px] italic mt-0.5">{post.subtitle}</p>
    </div>

    <p className="text-secondary text-[14px] leading-[1.7] flex-1">{post.excerpt}</p>

    <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
      <span className="text-[12px] text-secondary">{post.date} &bull; {post.readTime}</span>
      <Link
        to={`/blog/${post.slug}`}
        className="flex items-center gap-1.5 text-[13px] font-medium text-[#915EFF] hover:text-white transition-colors duration-300"
      >
        Read More <FaArrowRight size={11} />
      </Link>
    </div>
  </motion.div>
);

const RecentBlogs = () => {
  const [posts, setPosts]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then(({ data }) => {
      setPosts((data ?? []).slice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>thoughts &amp; research</p>
        <h2 className={styles.sectionHeadText}>Blog.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I write about physical social engineering, red team operations, and the
        human side of cybersecurity. Here are my most recent posts.
      </motion.p>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <div className="w-7 h-7 rounded-full border-2 border-[#915EFF] border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="mt-10 flex flex-wrap gap-7">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      )}

      <motion.div
        variants={fadeIn('up', 'spring', 0.6, 0.75)}
        className="mt-10 flex justify-center"
      >
        <Link
          to="/blog"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1d1836] border border-white/10 text-secondary hover:text-white hover:border-[#915EFF] transition-all duration-300 text-[15px] font-medium"
        >
          View All Posts <FaArrowRight size={13} />
        </Link>
      </motion.div>
    </>
  );
};

export default SectionWrapper(RecentBlogs, 'blog');
