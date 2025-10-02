import { TabGroupDto } from '@/api/types';

interface ShowcaseTabsProps {
  tabs: TabGroupDto[];
  selectedTab: string | null;
  onTabSelect: (tabName: string) => void;
}

export function ShowcaseTabs({ tabs, selectedTab, onTabSelect }: ShowcaseTabsProps) {
  if (!tabs || tabs.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => {
          const isSelected = selectedTab === tab.tabName;

          return (
            <button
              key={tab.tabName}
              onClick={() => tab.tabName && onTabSelect(tab.tabName)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  isSelected
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }
              `}
              aria-current={isSelected ? 'page' : undefined}
            >
              {tab.tabName}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
