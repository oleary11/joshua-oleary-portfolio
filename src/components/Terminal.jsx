import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { runCommand } from "./terminal/commands";
import { downloadResume } from "../utils/downloadResume";
import { celebrate } from "../utils/confetti";
import { easeOut } from "../utils/motion";

const WELCOME = [
  "Welcome. Type 'help' to see available commands.",
];

const Terminal = ({ open, onClose }) => {
  const [history, setHistory] = useState(() => WELCOME.map((text) => ({ type: "output", text })));
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);

  const panelRef = useRef(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [history]);

  const ctx = {
    downloadResume,
    celebrate: () => celebrate(panelRef.current),
    clearHistory: () => setHistory([]),
    close: onClose,
  };

  const handleSubmit = () => {
    const value = input;
    if (!value.trim()) return;

    setHistory((h) => [...h, { type: "input", text: value }]);
    setCommandHistory((h) => [...h, value]);
    setHistoryIndex(null);
    setInput("");

    const output = runCommand(value, ctx);
    if (output) {
      setHistory((h) => [...h, ...output.map((text) => ({ type: "output", text }))]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!commandHistory.length) return;
      const nextIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="terminal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: easeOut }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Terminal"
            className="w-full max-w-2xl h-[70vh] sm:h-[520px] mt-16 sm:mt-0 bg-[#0B0F17]/95 border border-[#5B7A99]/30 rounded-xl shadow-2xl font-mono text-sm flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="ml-3 text-secondary text-xs">visitor@joshua: ~</span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close terminal"
                className="text-secondary hover:text-white transition-colors"
              >
                <IoClose size={18} />
              </button>
            </div>

            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              onClick={() => inputRef.current?.focus()}
              className="flex-1 overflow-y-auto p-4 space-y-1 text-[#dde3ea]"
            >
              {history.map((line, i) =>
                line.type === "input" ? (
                  <div key={i} className="text-white">
                    <span className="text-[#7E93A8]">visitor@joshua:~$</span> {line.text}
                  </div>
                ) : (
                  <div key={i} className="whitespace-pre-wrap text-secondary">
                    {line.text}
                  </div>
                )
              )}
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border-t border-white/10">
              <span className="text-[#7E93A8] shrink-0">visitor@joshua:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
                className="flex-1 bg-transparent outline-none text-white min-w-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
