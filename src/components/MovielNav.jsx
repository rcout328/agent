"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileNav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    {
      title: 'DASHBOARD',
      items: [
        { name: 'Home', icon: '🏠', path: '/' }
      ]
    },
    {
      title: 'MODULES',
      items: [
        { name: 'Market Analysis', icon: '📊', path: '/market-trends' },
        { name: 'Customer Discovery', icon: '👥', path: '/icp-creation' },
        { name: 'SWOT Analysis', icon: '⚖️', path: '/swot-analysis' },
        { name: 'Product Evolution', icon: '⭐', path: '/feature-priority' },
        { name: 'Market Expansion', icon: '📈', path: '/market-assessment' }
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { name: 'Talk to Agents', icon: '💬', path: '/chat' }
      ]
    }
  ];

  if (!isMounted) return null;

  return (
    <div className="block md:hidden">
      {/* Mobile Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#1D1D1F] border-b border-purple-500/10 px-4 py-3 flex items-center justify-between backdrop-blur-sm bg-opacity-80"
        >
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-purple-600 text-white"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white rounded-full transform transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`} />
              <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`} />
              <span className={`w-full h-0.5 bg-white rounded-full transform transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`} />
            </div>
          </button>
          <div className="text-white font-semibold">Market Insight AI</div>
          <div className="w-10"></div>
        </motion.div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu Panel */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: isMobileMenuOpen ? 0 : "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed top-[57px] left-0 right-0 bottom-0 bg-[#1D1D1F]/90 backdrop-blur-lg overflow-auto z-50"
        >
          <div className="p-4 space-y-6">
            {menuItems.map((section, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h2 className="text-xs text-gray-400 font-semibold tracking-wider mb-3 px-2">
                  {section.title}
                </h2>
                <nav className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          pathname === item.path
                            ? 'bg-purple-600/80 backdrop-blur-sm text-white shadow-lg shadow-purple-500/20'
                            : 'text-gray-400 hover:bg-[#2D2D2F]/80 hover:backdrop-blur-sm hover:text-white'
                        }`}
                      >
                        <span className="text-xl w-6 h-6 flex items-center justify-center">
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium">{item.name}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}