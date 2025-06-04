// src/stores/themeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeState {
  // Current theme mode (what user selected)
  mode: ThemeMode;
  // Resolved theme (actual theme being applied)
  resolvedTheme: ResolvedTheme;
  // System preference
  systemTheme: ResolvedTheme;
  // Actions
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  initializeTheme: () => void;
  updateSystemTheme: (systemTheme: ResolvedTheme) => void;
}

// Helper function to get system theme preference
const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Helper function to resolve theme mode to actual theme
const resolveTheme = (mode: ThemeMode, systemTheme: ResolvedTheme): ResolvedTheme => {
  switch (mode) {
    case 'light':
      return 'light';
    case 'dark':
      return 'dark';
    case 'system':
      return systemTheme;
    default:
      return 'light';
  }
};

// Helper function to apply theme to DOM
const applyTheme = (theme: ResolvedTheme) => {
  if (typeof window === 'undefined') return;
  
  const root = window.document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  // Also update the color-scheme CSS property for better browser integration
  root.style.colorScheme = theme;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      resolvedTheme: 'light',
      systemTheme: 'light',

      setTheme: (mode: ThemeMode) => {
        const { systemTheme } = get();
        const resolvedTheme = resolveTheme(mode, systemTheme);
        
        set({ mode, resolvedTheme });
        applyTheme(resolvedTheme);
      },

      toggleTheme: () => {
        const { mode } = get();
        
        // Toggle between light and dark (skip system for toggle)
        if (mode === 'light' || (mode === 'system' && get().resolvedTheme === 'light')) {
          get().setTheme('dark');
        } else {
          get().setTheme('light');
        }
      },

      initializeTheme: () => {
        const systemTheme = getSystemTheme();
        const { mode } = get();
        const resolvedTheme = resolveTheme(mode, systemTheme);
        
        set({ systemTheme, resolvedTheme });
        applyTheme(resolvedTheme);
        
        // Set up system theme change listener
        if (typeof window !== 'undefined') {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          
          const handleChange = (e: MediaQueryListEvent) => {
            const newSystemTheme = e.matches ? 'dark' : 'light';
            get().updateSystemTheme(newSystemTheme);
          };
          
          // Use the modern addEventListener if available, fallback to addListener
          if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
          } else {
            // Fallback for older browsers
            mediaQuery.addListener(handleChange);
          }
          
          // Return cleanup function
          return () => {
            if (mediaQuery.removeEventListener) {
              mediaQuery.removeEventListener('change', handleChange);
            } else {
              mediaQuery.removeListener(handleChange);
            }
          };
        }
      },

      updateSystemTheme: (systemTheme: ResolvedTheme) => {
        const { mode } = get();
        const resolvedTheme = resolveTheme(mode, systemTheme);
        
        set({ systemTheme, resolvedTheme });
        
        // Only apply if currently using system theme
        if (mode === 'system') {
          applyTheme(resolvedTheme);
        }
      },
    }),
    {
      name: 'theme-storage',
      // Only persist the mode, not the resolved theme or system theme
      partialize: (state) => ({ mode: state.mode }),
      // Rehydrate and initialize after loading from storage
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Initialize theme after rehydration
          setTimeout(() => {
            state.initializeTheme();
          }, 0);
        }
      },
    }
  )
);

// Hook for theme-related utilities
export const useTheme = () => {
  const { mode, resolvedTheme, setTheme, toggleTheme } = useThemeStore();
  
  return {
    theme: resolvedTheme,
    mode,
    setTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    isSystem: mode === 'system',
  };
};

// Initialize theme on app start
export const initializeTheme = () => {
  useThemeStore.getState().initializeTheme();
};