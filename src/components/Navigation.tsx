import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Shield, User, Trophy, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navigation() {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = user
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Tools Training', path: '/tools' },
        { name: 'DFIR', path: '/dfir' },
        { name: 'Leaderboard', path: '/leaderboard' },
        { name: 'Profile', path: '/profile' },
      ]
    : []

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-neutral-900 border-b border-neutral-800 shadow-dark-card backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary-500" />
            <span className="text-h3 font-bold text-neutral-100">AwarenessHub</span>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-body transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-primary-500 font-semibold'
                      : 'text-neutral-400 hover:text-primary-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-5 py-3 text-body text-neutral-400 hover:text-error-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          )}

          {!user && (
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="px-5 py-3 text-body text-neutral-400 hover:text-primary-400 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-neutral-100" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-100" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-800">
            {user && (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-body ${
                      isActive(item.path)
                        ? 'text-primary-500 font-semibold bg-primary-900/20'
                        : 'text-neutral-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    signOut()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-3 text-body text-error-500"
                >
                  Sign Out
                </button>
              </>
            )}
            {!user && (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-body text-neutral-400"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-body text-primary-500 font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
