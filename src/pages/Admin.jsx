import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isConfigured } from '../lib/supabase';
import { logo } from '../assets';

const Admin = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConfigured) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin/dashboard', { replace: true });
    });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError('Invalid credentials.');
    } else {
      navigate('/admin/dashboard', { replace: true });
    }
  };

  if (!isConfigured) return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6">
      <div className="bg-[#151030] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center">
        <p className="text-white font-bold text-[20px] mb-3">Supabase Not Configured</p>
        <p className="text-secondary text-[14px] leading-relaxed">
          Copy <code className="text-[#915EFF]">.env.example</code> to{' '}
          <code className="text-[#915EFF]">.env.local</code> and fill in your Supabase URL and anon key.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6">
      <div className="bg-[#151030] border border-white/10 rounded-2xl p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="logo" className="w-8 h-8 object-contain" />
          <div>
            <p className="text-white font-bold text-[16px]">Joshua O'Leary</p>
            <p className="text-secondary text-[12px]">Blog Admin</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-secondary text-[12px] uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="bg-[#1d1836] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-secondary/50 focus:outline-none focus:border-[#915EFF] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-secondary text-[12px] uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="bg-[#1d1836] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-secondary/50 focus:outline-none focus:border-[#915EFF] transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-[13px] bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#915EFF] hover:bg-[#7c4fe0] disabled:opacity-50 text-white font-semibold rounded-lg px-4 py-3 text-[15px] transition-colors duration-200"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
