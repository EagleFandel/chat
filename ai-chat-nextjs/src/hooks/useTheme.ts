import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light'); // 服务器端默认值
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // 客户端挂载后设置正确的主题
  useEffect(() => {
    setMounted(true);
    
    // 从localStorage获取保存的主题，默认为system
    const savedTheme = localStorage.getItem('theme') as Theme;
    setTheme(savedTheme || 'system');
  }, []);

  useEffect(() => {
    // 检查是否在浏览器环境
    if (typeof window === 'undefined' || !mounted) return;
    
    const root = window.document.documentElement;
    
    // 移除之前的主题类
    root.classList.remove('light', 'dark');
    
    let effectiveTheme: 'light' | 'dark';
    
    if (theme === 'system') {
      // 检测系统主题偏好
      const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      effectiveTheme = systemTheme;
    } else {
      effectiveTheme = theme;
    }
    
    // 应用主题
    root.classList.add(effectiveTheme);
    setResolvedTheme(effectiveTheme);
    
    // 保存到localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // 监听系统主题变化
  useEffect(() => {
    if (typeof window === 'undefined' || theme !== 'system' || !window.matchMedia || !mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      
      const systemTheme = mediaQuery.matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(current => {
      switch (current) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'system';
        case 'system':
          return 'light';
        default:
          return 'light';
      }
    });
  };

  // 在客户端挂载前返回默认值，避免水合错误
  if (!mounted) {
    return {
      theme: 'light' as Theme,
      resolvedTheme: 'light' as 'light' | 'dark',
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
}