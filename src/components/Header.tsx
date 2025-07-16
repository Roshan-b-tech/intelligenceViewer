import React, { useState, useRef, useEffect } from 'react';
import { Brain, LogOut, User } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  // Read theme from localStorage or default to 'light'
  const getInitialTheme = () => {
    const stored = localStorage.getItem('perceive-theme');
    return stored === 'dark' || stored === 'custom' ? stored : 'light';
  };
  const [theme, setTheme] = useState<'dark' | 'light' | 'custom'>(getInitialTheme());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // On mount, set the document class to the stored theme (or light)
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light', 'custom');
    document.documentElement.classList.add(theme);
  }, []);

  // When theme changes, update html class and localStorage
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light', 'custom');
    document.documentElement.classList.add(theme);
    localStorage.setItem('perceive-theme', theme);
  }, [theme]);

  const handleThemeChange = () => {
    const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'custom' : 'dark';
    setTheme(nextTheme);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <header className="bg-[var(--color-bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 py-4 sm:py-0 gap-2 sm:gap-0">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/perceive now.png" alt="Perceive Now Logo" className="w-8 h-8 rounded-lg bg-white object-contain" />
            <div>
              <h1 className="text-base sm:text-lg font-bold text-[var(--color-text)]">
                Perceive Now
              </h1>
              <p className="text-xs sm:text-xs text-[var(--color-text-secondary)]">
                Intelligence Viewer
              </p>
            </div>
          </div>
          {/* Theme Toggle Button and Profile Dropdown */}
          <div className="flex items-center space-x-4 relative">
            <button
              onClick={handleThemeChange}
              className="px-3 py-1 text-sm rounded-lg transition-colors bg-perceive-purple text-white hover:bg-perceive-gold"
            >
              {theme === 'dark' && 'Dark'}
              {theme === 'light' && 'Light'}
              {theme === 'custom' && 'Custom'}
            </button>
            {/* Profile Avatar */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((open) => !open)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] hover:bg-perceive-purple/10 transition-colors focus:outline-none"
                aria-label="User menu"
              >
                <User className="w-5 h-5 text-[var(--color-text-secondary)]" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl shadow-2xl z-50 p-5 flex flex-col items-start animate-fade-in">
                  <div className="flex items-center w-full mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-perceive-purple/10 border border-perceive-purple mr-3">
                      <User className="w-7 h-7 text-perceive-purple" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block font-semibold text-[var(--color-text)] text-base truncate max-w-full" title={user.username}>{user.username}</span>
                      <span className="block text-xs font-medium text-perceive-gold mt-0.5 capitalize">{user.role}</span>
                    </div>
                  </div>
                  <div className="w-full border-t border-[var(--color-border)] mb-3"></div>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 px-4 py-2 w-full text-sm text-[var(--color-text)] hover:bg-perceive-purple/10 rounded-lg transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;