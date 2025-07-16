import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, LogIn, User } from 'lucide-react';

interface LoginFormProps {
  onLogin: (username: string) => Promise<boolean>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const demoUsers = [
    { username: 'exec@perceive.now', role: 'Executive (Reviewer)' },
    { username: 'analyst@perceive.now', role: 'Analyst (Viewer)' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError('');

    try {
      const success = await onLogin(username);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col md:flex-row items-center justify-center p-4">
      {/* Illustration (desktop: left, mobile: top) */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0 md:mr-12">
        <img src="/undraw_visionary-technology_6ouq.svg" alt="Welcome" className="max-w-[180px] sm:max-w-xs w-full h-auto rounded-2xl shadow-lg" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[var(--color-bg-secondary)] rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col"
      >
        {/* Logo & Title */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-perceive-purple rounded-full mb-4 shadow-md">
            <img src="/perceive now.png" alt="Perceive Now Logo" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text)] mb-2 tracking-tight">
            Intelligence Viewer
          </h1>
          {/* <p className="text-base sm:text-lg text-[var(--color-text-secondary)] font-medium">
            Intelligence Viewer
          </p> */}
        </div>
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="username" className="block text-base font-semibold text-[var(--color-text)] mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full pl-10 pr-3 py-2 sm:py-3 bg-[var(--color-bg-tertiary)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-perceive-purple/50 focus:border-transparent border border-[var(--color-border)] text-base"
                required
              />
            </div>
          </div>
          {error && (
            <div className="p-3 bg-red-500/10 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 sm:py-3 bg-perceive-purple hover:bg-perceive-purple-light disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-base sm:text-lg font-semibold shadow-md"
          >
            <LogIn className="w-5 h-5" />
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
          </button>
        </form>
        {/* Demo Users */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-base font-semibold text-[var(--color-text)] mb-3">
            Demo Accounts
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {demoUsers.map((user) => (
              <button
                key={user.username}
                onClick={() => setUsername(user.username)}
                className="w-full text-left p-2 sm:p-3 bg-[var(--color-bg-tertiary)] hover:bg-perceive-purple/10 rounded-lg transition-colors flex flex-col shadow-sm border border-[var(--color-border)]"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-base text-[var(--color-text)] font-bold">
                    {user.username}
                  </span>
                  <span className="inline-block px-2 py-0.5 text-xs rounded bg-perceive-gold text-white font-semibold ml-2">
                    {user.role.includes('Executive') ? 'Reviewer' : 'Viewer'}
                  </span>
                </div>
                <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                  {user.role}
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;