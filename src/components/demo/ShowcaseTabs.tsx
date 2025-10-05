import { TabGroupDto, DemoShowcaseItemDto } from '@/api/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Camera } from 'lucide-react';
import React, { useState, useRef, useLayoutEffect } from 'react';

// Interface for the second-level arrow paths, keyed by the parent tab's name
interface PrimaryArrowPaths {
  [key: string]: string[];
}

interface ShowcaseTabsProps {
  tabs: TabGroupDto[];
  onVideoClick: (videoPath: string, itemName?: string, creatorName?: string) => void;
  onExecuteClick: (appId: string, appType: string, itemName: string) => void;
  itemIcons: Map<string, string>;
}

export function ShowcaseTabs({
  tabs,
  onVideoClick,
  onExecuteClick,
  itemIcons
}: ShowcaseTabsProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
  
  const [topLevelArrowPaths, setTopLevelArrowPaths] = useState<string[]>([]);
  const [primaryArrowPaths, setPrimaryArrowPaths] = useState<PrimaryArrowPaths>({});
  const [secondaryArrowPaths, setSecondaryArrowPaths] = useState<Record<string, string[]>>({});

  const topSvgRef = useRef<SVGSVGElement>(null);
  const titleDividerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  const tabDividerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const primaryGroupRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const primarySvgRefs = useRef<Record<string, SVGSVGElement | null>>({});

  const secondaryDividerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const secondarySvgRefs = useRef<Record<string, SVGSVGElement | null>>({});
  const directItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tertiaryGroupContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useLayoutEffect(() => {
    const calculateTopLevelPaths = () => {
      const svgEl = topSvgRef.current;
      const dividerEl = titleDividerRef.current;
      if (!svgEl || !dividerEl || Object.keys(tabRefs.current).length !== tabs.length) return;

      const svgRect = svgEl.getBoundingClientRect();
      const dividerRect = dividerEl.getBoundingClientRect();
      
      const newPaths = tabs.map((tab, index) => {
        const tabEl = tabRefs.current[tab.tabName!];
        if (!tabEl) return '';

        const tabRect = tabEl.getBoundingClientRect();
        const totalTabs = tabs.length;
        
        const fraction = (index + 1) / (totalTabs + 1);
        const startX = dividerRect.left + fraction * dividerRect.width;
        const relativeStartX = startX - svgRect.left;

        const endX = tabRect.left + tabRect.width / 2;
        const relativeEndX = endX - svgRect.left;
        
        return `M ${relativeStartX} 0 C ${relativeStartX} 45, ${relativeEndX} 45, ${relativeEndX} 85`;
      });
      setTopLevelArrowPaths(newPaths);
    };

    const calculatePrimaryPaths = () => {
        const newPrimaryPaths: PrimaryArrowPaths = {};
        tabs.forEach(tab => {
            if (!tab.primaryGroups || tab.primaryGroups.length === 0) return;

            const tabDividerEl = tabDividerRefs.current[tab.tabName!];
            const primarySvgEl = primarySvgRefs.current[tab.tabName!];
            if (!tabDividerEl || !primarySvgEl) return;

            const dividerRect = tabDividerEl.getBoundingClientRect();
            const svgRect = primarySvgEl.getBoundingClientRect();
            const totalGroups = tab.primaryGroups.length;

            const pathsForThisTab = tab.primaryGroups.map((group, index) => {
                const groupKey = `${tab.tabName!}-${group.primaryGroupName!}`;
                const groupEl = primaryGroupRefs.current[groupKey];
                if (!groupEl) return '';
                const groupRect = groupEl.getBoundingClientRect();
                
                const fraction = (index + 1) / (totalGroups + 1);
                const startX = dividerRect.left + fraction * dividerRect.width;
                const relativeStartX = startX - svgRect.left;
                
                const endX = groupRect.left + groupRect.width / 2;
                const relativeEndX = endX - svgRect.left;
                
                return `M ${relativeStartX} 0 C ${relativeStartX} 35, ${relativeEndX} 35, ${relativeEndX} 55`;
            });
            newPrimaryPaths[tab.tabName!] = pathsForThisTab;
        });
        setPrimaryArrowPaths(newPrimaryPaths);
    };

    const calculateSecondaryPaths = () => {
        const newSecondaryPaths: Record<string, string[]> = {};
        tabs.forEach(tab => {
            (tab.primaryGroups || []).forEach(primaryGroup => {
                (primaryGroup.secondaryGroups || []).forEach(secondaryGroup => {
                    const secondaryKey = `${tab.tabName}-${primaryGroup.primaryGroupName}-${secondaryGroup.secondaryGroupName}`;
                    if (collapsedGroups.has(secondaryKey)) return;

                    const dividerEl = secondaryDividerRefs.current[secondaryKey];
                    const svgEl = secondarySvgRefs.current[secondaryKey];
                    if (!dividerEl || !svgEl) return;

                    const dividerRect = dividerEl.getBoundingClientRect();
                    const svgRect = svgEl.getBoundingClientRect();

                    const children = [
                        ...(secondaryGroup.items || []),
                        ...(secondaryGroup.tertiaryGroups || [])
                    ];
                    const totalChildren = children.length;
                    if (totalChildren === 0) return;

                    const pathsForThisGroup = children.map((child, index) => {
                        let childKey: string;
                        let childEl: HTMLDivElement | null;

                        if ('tertiaryGroupName' in child && child.tertiaryGroupName) {
                            childKey = `${secondaryKey}-${child.tertiaryGroupName}-container`;
                            childEl = tertiaryGroupContainerRefs.current[childKey];
                        } else if ('id' in child) {
                            childKey = `item-${child.id}`;
                            childEl = directItemRefs.current[childKey];
                        } else {
                            return '';
                        }

                        if (!childEl) return '';

                        const childRect = childEl.getBoundingClientRect();
                        const fraction = (index + 1) / (totalChildren + 1);
                        const startX = dividerRect.left + fraction * dividerRect.width;
                        const relativeStartX = startX - svgRect.left;

                        const endX = childRect.left + childRect.width / 2;
                        const relativeEndX = endX - svgRect.left;

                        return `M ${relativeStartX} 0 C ${relativeStartX} 25, ${relativeEndX} 25, ${relativeEndX} 45`;
                    });
                    newSecondaryPaths[secondaryKey] = pathsForThisGroup;
                });
            });
        });
        setSecondaryArrowPaths(newSecondaryPaths);
    };

    const handleResize = () => {
        calculateTopLevelPaths();
        calculatePrimaryPaths();
        calculateSecondaryPaths();
    };
    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tabs, collapsedGroups]);

  const toggleGroup = (groupKey: string) => {
    setCollapsedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupKey)) newSet.delete(groupKey);
      else newSet.add(groupKey);
      return newSet;
    });
  };
  
  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="w-full space-y-8 p-4">
      {/* Page Title */}
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Çoklu Afet Risk Platformu</h1>
        <div
          ref={titleDividerRef}
          className="h-1 rounded-full shadow-lg bg-gray-300 dark:bg-gray-700"
          style={{ width: '100%', maxWidth: '600px' }}
        />
      </div>
        
      {/* Tabs Section */}
      <div className="flex gap-8 justify-evenly items-start relative" style={{ paddingTop: '75px' }}>
        <svg 
          ref={topSvgRef}
          className="absolute left-0 right-0 w-full pointer-events-none" 
          style={{ top: '-27px', height: '100px' }}
        >
          <defs>
            <marker id="arrowhead" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(156, 163, 175, 0.5)" />
            </marker>
          </defs>
          {topLevelArrowPaths.map((pathD, index) => (
            <path key={`top-arrow-${index}`} d={pathD} stroke="rgba(156, 163, 175, 0.5)" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
          ))}
        </svg>

        {tabs.map((tab) => (
          <div 
            ref={(el) => (tabRefs.current[tab.tabName!] = el)} 
            key={tab.tabName} 
            className="flex-1 flex flex-col items-center"
          >
            {/* Tab as Text */}
            <h2 className="text-base font-semibold text-white mb-4 text-center"> {/* CHANGED FONT SIZE */}
              {tab.tabName}
            </h2>
            
            {tab.primaryGroups && tab.primaryGroups.length > 0 && (
                <div className="w-full flex flex-col items-center">
                    <div
                        ref={(el) => (tabDividerRefs.current[tab.tabName!] = el)}
                        className="h-1 rounded-full shadow-lg bg-gray-300 dark:bg-gray-700 mb-8"
                        style={{ width: '100%', maxWidth: '250px' }}
                    />

                    <div className="w-full space-y-8 relative" style={{ paddingTop: '50px' }}>
                        <svg
                            ref={(el) => (primarySvgRefs.current[tab.tabName!] = el)}
                            className="absolute left-0 right-0 w-full pointer-events-none"
                            style={{ top: '-20px', height: '70px' }}
                        >
                            {(primaryArrowPaths[tab.tabName!] || []).map((pathD, index) => (
                                <path key={`primary-arrow-${index}`} d={pathD} stroke="rgba(156, 163, 175, 0.5)" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
                            ))}
                        </svg>

                        <div className="flex flex-wrap gap-8 justify-evenly">
                        {tab.primaryGroups.map((primaryGroup) => (
                            <div
                                key={primaryGroup.primaryGroupName}
                                ref={(el) => (primaryGroupRefs.current[`${tab.tabName!}-${primaryGroup.primaryGroupName!}`] = el)}
                                className="flex-1 flex flex-col items-center min-w-[240px]"
                            >
                                <h3 className="text-sm font-medium text-white text-center"> {/* CHANGED FONT SIZE */}
                                  {primaryGroup.primaryGroupName}
                                </h3>

                                <div className="h-1 w-full max-w-full rounded-full shadow-lg bg-gray-300 dark:bg-gray-700 mt-4 mb-4 relative z-10" />

                                {primaryGroup.secondaryGroups && primaryGroup.secondaryGroups.length > 0 && (
                                    <div className="w-full pl-16 space-y-4 relative" style={{ overflow: 'hidden' }}>
                                    {primaryGroup.secondaryGroups.map((secondaryGroup) => {
                                        const secondaryKey = `${tab.tabName}-${primaryGroup.primaryGroupName}-${secondaryGroup.secondaryGroupName}`;
                                        const isSecondaryOpen = !collapsedGroups.has(secondaryKey);
                                        const directItems = secondaryGroup.items || [];
                                        const tertiaryGroups = secondaryGroup.tertiaryGroups || [];
                                        const totalItems = directItems.length + tertiaryGroups.reduce((sum, tg) => sum + (tg.items?.length || 0), 0);
                                        const allChildren = [...directItems, ...tertiaryGroups];

                                        return (
                                        <div key={secondaryGroup.secondaryGroupName} className="relative mb-4">
                                            <div className="absolute bg-gray-400 dark:bg-gray-600" style={{left: '-64px',width: '2px',top: '-10000px',height: '10012px'}}></div>
                                            <div className="absolute" style={{ left: '-64px', top: '12px' }}>
                                                <svg width="40" height="2" style={{ overflow: 'visible' }}>
                                                    <line x1="0" y1="0" x2="32" y2="0" stroke="currentColor" strokeWidth="2" className="text-gray-400 dark:text-gray-600" />
                                                    <polygon points="40,0 32,-4 32,4" fill="currentColor" className="text-gray-400 dark:text-gray-600" />
                                                </svg>
                                            </div>
                                            <button
                                                onClick={() => toggleGroup(secondaryKey)}
                                                className="hover:opacity-70 transition-opacity"
                                                style={{ marginLeft: '-12px' }}
                                            >
                                                <h4 className="font-semibold text-sm text-white">{secondaryGroup.secondaryGroupName}</h4>
                                            </button>
                                            <AnimatePresence>
                                                {isSecondaryOpen && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                                                    <div className="mt-2 ml-6">
                                                                {allChildren.map((child, index) => {
                                                                    const key = 'id' in child ? child.id : child.tertiaryGroupName;
                                                                    return (
                                                                        <React.Fragment key={key}>
                                                                            {'tertiaryGroupName' in child ? (
                                                                                (() => {
                                                                                    const tertiaryGroup = child;
                                                                                    const tertiaryKey = `${secondaryKey}-${tertiaryGroup.tertiaryGroupName}`;
                                                                                    const isTertiaryOpen = !collapsedGroups.has(tertiaryKey);
                                                                                    const tertiaryContainerKey = `${secondaryKey}-${tertiaryGroup.tertiaryGroupName}-container`;
                                                                                    return (
                                                                                        <div ref={el => tertiaryGroupContainerRefs.current[tertiaryContainerKey] = el} className="pl-12 relative mb-3">
                                                                                            <div className="absolute bg-gray-400 dark:bg-gray-600" style={{ left: '-48px', width: '2px', top: '-10000px', height: '10010px' }}></div>
                                                                                            <div className="absolute" style={{ left: '-48px', top: '10px' }}>
                                                                                                <svg width="32" height="2" style={{ overflow: 'visible' }}>
                                                                                                    <line x1="0" y1="0" x2="24" y2="0" stroke="currentColor" strokeWidth="2" className="text-gray-400 dark:text-gray-600" />
                                                                                                    <polygon points="32,0 24,-4 24,4" fill="currentColor" className="text-gray-400 dark:text-gray-600" />
                                                                                                </svg>
                                                                                            </div>
                                                                                            <button onClick={() => toggleGroup(tertiaryKey)} className="hover:opacity-70 transition-opacity">
                                                                                                <h5 className="font-medium text-sm text-white">{tertiaryGroup.tertiaryGroupName}</h5>
                                                                                            </button>
                                                                                            <AnimatePresence>
                                                                                                {isTertiaryOpen && (
                                                                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                                                                                                        <div className="mt-2 ml-6 space-y-2">
                                                                                                                {tertiaryGroup.items?.map((item: DemoShowcaseItemDto) => {
                                                                                                                    const hasVideo = !!item.videoPath;
                                                                                                                    const hasExecution = !!item.appId;
                                                                                                                    const iconData = item.appId ? itemIcons.get(item.appId) : undefined;
                                                                                                                    return (
                                                                                                                        <div key={item.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-3">
                                                                                                                            {iconData && <img src={iconData} alt={item.name || 'App icon'} className="w-12 h-12 rounded object-cover flex-shrink-0" />}
                                                                                                                            <div className="flex-1 min-w-0">
                                                                                                                                <h5 className="font-semibold text-white mb-1">{item.name || 'Untitled'}</h5>
                                                                                                                                <p className="text-sm text-white line-clamp-1">{item.description || 'No description available'}</p>
                                                                                                                            </div>
                                                                                                                            <div className="flex gap-2">
                                                                                                                                {hasExecution && <button onClick={(e) => { e.stopPropagation(); item.appId && onExecuteClick(item.appId, item.appType || '0', item.name || 'Untitled'); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all" title="Run"><Play size={16} fill="currentColor" /></button>}
                                                                                                                                {hasVideo && <button onClick={(e) => { e.stopPropagation(); item.videoPath && onVideoClick(item.videoPath, item.name, item.creatorFullName); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all" title="Watch"><Camera size={16} /></button>}
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    );
                                                                                                                })}
                                                                                                        </div>
                                                                                                    </motion.div>
                                                                                                )}
                                                                                            </AnimatePresence>
                                                                                        </div>
                                                                                    );
                                                                                })()
                                                                            ) : (
                                                                                (() => {
                                                                                    const item = child;
                                                                                    const hasVideo = !!item.videoPath;
                                                                                    const hasExecution = !!item.appId;
                                                                                    const iconData = item.appId ? itemIcons.get(item.appId) : undefined;
                                                                                    const itemKey = `item-${item.id}`;
                                                                                    return (
                                                                                        <div ref={el => directItemRefs.current[itemKey] = el} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all flex items-center gap-3">
                                                                                            {iconData && <img src={iconData} alt={item.name || 'App icon'} className="w-12 h-12 rounded object-cover flex-shrink-0" />}
                                                                                            <div className="flex-1 min-w-0">
                                                                                                <h5 className="font-semibold text-white mb-1">{item.name || 'Untitled'}</h5>
                                                                                                <p className="text-sm text-white line-clamp-1">{item.description || 'No description available'}</p>
                                                                                            </div>
                                                                                            <div className="flex gap-2">
                                                                                                {hasExecution && <button onClick={(e) => { e.stopPropagation(); item.appId && onExecuteClick(item.appId, item.appType || '0', item.name || 'Untitled'); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all" title="Run"><Play size={16} fill="currentColor" /></button>}
                                                                                                {hasVideo && <button onClick={(e) => { e.stopPropagation(); item.videoPath && onVideoClick(item.videoPath, item.name, item.creatorFullName); }} className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all" title="Watch"><Camera size={16} /></button>}
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                })()
                                                                            )}
                                                                        </React.Fragment>
                                                                    )
                                                                })}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                    </div>
                                )}
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}