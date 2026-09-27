import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';

import { BackToTop, ScrollProgressBar, CustomCursor } from './components';
import GrainOverlay from './components/GrainOverlay';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

import OSHome         from './os/OSHome';
import Blog           from './pages/Blog';
import BlogPost       from './pages/BlogPost';
import Admin          from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditor    from './pages/AdminEditor';

// The old site-wide scroll effects only make sense on the scrolling blog pages,
// not on the desktop-style home page.
function SiteChrome() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;
  return (
    <>
      <ScrollProgressBar />
      <BackToTop />
      <GrainOverlay />
      <CustomCursor />
    </>
  );
}

function App() {
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const routes = (
    <>
      <ScrollToTop />
      <SiteChrome />
      <Routes>
        {/* Public */}
        <Route path="/"            element={<OSHome />} />
        <Route path="/blog"        element={<Blog />} />
        <Route path="/blog/:slug"  element={<BlogPost />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/editor" element={
          <ProtectedRoute><AdminEditor /></ProtectedRoute>
        } />
        <Route path="/admin/editor/:slug" element={
          <ProtectedRoute><AdminEditor /></ProtectedRoute>
        } />
      </Routes>
    </>
  );

  return (
    <BrowserRouter>
      {reduceMotion ? (
        routes
      ) : (
        // Nested as children (not self-closing) so descendants can reach the
        // Lenis instance via useLenis() — e.g. to stop/start scroll on demand.
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, syncTouch: false }}>
          {routes}
        </ReactLenis>
      )}
    </BrowserRouter>
  );
}

export default App;
