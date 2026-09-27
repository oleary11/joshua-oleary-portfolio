import { motion, useDragControls } from "framer-motion";

// A draggable glass window. Drag by the title bar; click anywhere to focus.
const Window = ({ app, state, constraintsRef, onFocus, onClose, onMinimize, children }) => {
  const controls = useDragControls();
  const { x, y, w, h } = app.frame;

  return (
    <motion.section
      role="dialog"
      aria-label={app.title}
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={constraintsRef}
      onPointerDown={onFocus}
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: state.min ? 0 : 1, scale: state.min ? 0.85 : 1, y: state.min ? 120 : 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      style={{ left: x, top: y, width: w, height: h, zIndex: state.z, pointerEvents: state.min ? "none" : "auto" }}
      className="os-glass absolute flex flex-col overflow-hidden rounded-2xl"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <header
        onPointerDown={(e) => controls.start(e)}
        className="flex h-11 shrink-0 cursor-grab items-center gap-3 border-b border-[var(--os-line)] px-4 active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Close ${app.title}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onClose}
            className="h-3.5 w-3.5 rounded-full bg-[#ff5f57] ring-1 ring-black/20"
          />
          <button
            type="button"
            aria-label={`Minimize ${app.title}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onMinimize}
            className="h-3.5 w-3.5 rounded-full bg-[#febc2e] ring-1 ring-black/20"
          />
          <span className="h-3.5 w-3.5 rounded-full bg-[#28c840] ring-1 ring-black/20" aria-hidden="true" />
        </div>
        <p className="flex items-center gap-2 text-[14px] font-semibold select-none">{app.title}</p>
      </header>
      <div className="os-scroll min-h-0 flex-1 overflow-y-auto">{children}</div>
    </motion.section>
  );
};

export default Window;
