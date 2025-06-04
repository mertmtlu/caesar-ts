// src/components/layout/Sidebar.tsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  FolderIcon, 
  PlayIcon, 
  CogIcon, 
  ShieldCheckIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  adminOnly?: boolean;
}

const navigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Projects',
    href: '/projects',
    icon: FolderIcon,
  },
  {
    name: 'Executions',
    href: '/executions',
    icon: PlayIcon,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: CogIcon,
  },
  {
    name: 'Admin',
    href: '/admin',
    icon: ShieldCheckIcon,
    adminOnly: true,
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const filteredNavigation = navigation.filter(item => 
    !item.adminOnly || (item.adminOnly && isAdmin)
  );

  return (
    <div className="flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Logo/Brand */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <CodeBracketIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Caesar
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {filteredNavigation.map((item) => {
          const isActive = location.pathname === item.href || 
                          (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive: navIsActive }) => {
                const active = isActive || navIsActive;
                return `
                  group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${active 
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }
                `;
              }}
            >
              <item.icon 
                className="mr-3 h-5 w-5 flex-shrink-0" 
                aria-hidden="true" 
              />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer/Version Info */}
      <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Caesar Platform v1.0.0
        </div>
      </div>
    </div>
  );
};

export default Sidebar;