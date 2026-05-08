import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase, isConfigured } from '../lib/supabase';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isConfigured) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(!!session);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#915EFF] border-t-transparent animate-spin" />
    </div>
  );

  if (!authed) return <Navigate to="/admin" replace />;
  return children;
};

export default ProtectedRoute;
