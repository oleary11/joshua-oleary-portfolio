import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchReactions, addReaction } from '../../lib/posts';

const REACTIONS = [
  { key: 'fire',      emoji: '🔥', label: 'Fire' },
  { key: 'clap',      emoji: '👏', label: 'Clap' },
  { key: 'insightful',emoji: '💡', label: 'Insightful' },
  { key: 'thinking',  emoji: '🤔', label: 'Thinking' },
];

const ReactionBar = ({ slug }) => {
  const [counts, setCounts]   = useState({});
  const [reacted, setReacted] = useState({});
  const [pop, setPop]         = useState(null);

  useEffect(() => {
    fetchReactions(slug).then(setCounts);
    const state = {};
    REACTIONS.forEach(({ key }) => {
      if (localStorage.getItem(`reacted_${slug}_${key}`)) state[key] = true;
    });
    setReacted(state);
  }, [slug]);

  const handleReact = async (key) => {
    if (reacted[key]) return;
    setCounts((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
    setReacted((prev) => ({ ...prev, [key]: true }));
    setPop(key);
    setTimeout(() => setPop(null), 600);
    await addReaction(slug, key);
  };

  return (
    <div className="mt-14 pt-8 border-t border-white/10">
      <p className="text-secondary text-[13px] uppercase tracking-widest mb-5">React to this post</p>
      <div className="flex flex-wrap gap-3">
        {REACTIONS.map(({ key, emoji, label }) => (
          <motion.button
            key={key}
            onClick={() => handleReact(key)}
            whileTap={reacted[key] ? {} : { scale: 0.9 }}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-200 text-[14px] font-medium select-none
              ${reacted[key]
                ? 'bg-[#915EFF]/20 border-[#915EFF] text-white cursor-default'
                : 'bg-[#1d1836] border-white/10 text-secondary hover:border-[#915EFF] hover:text-white cursor-pointer'
              }`}
          >
            <span className="text-[18px] leading-none">{emoji}</span>
            <span>{label}</span>
            <span className={`ml-1 text-[13px] ${reacted[key] ? 'text-[#c4b5fd]' : 'text-secondary'}`}>
              {counts[key] ?? 0}
            </span>
            <AnimatePresence>
              {pop === key && (
                <motion.span
                  key="pop"
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{ opacity: 0, y: -24, scale: 1.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 text-[20px] pointer-events-none"
                >
                  {emoji}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ReactionBar;
