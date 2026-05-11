import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { BackToTop, ScrollProgressBar } from './components';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

import PortfolioHome  from './pages/PortfolioHome';
import Blog           from './pages/Blog';
import BlogPost       from './pages/BlogPost';
import Admin          from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditor    from './pages/AdminEditor';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
<ScrollProgressBar />
      <BackToTop />
      <Routes>
        {/* Public */}
        <Route path="/"            element={<PortfolioHome />} />
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
    </BrowserRouter>
  );
}

export default App;
