import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronRight, Files, PanelLeftClose, X } from 'lucide-react';

import Welcome from './components/Welcome';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import ProjectDetails from './components/ProjectDetails';

import { useHashRoute } from './hooks/useHashRoute';
import { useIsDesktop } from './hooks/useMediaQuery';
import {
  EXPLORER,
  SECTIONS,
  getTab,
  fileGlyph,
  isProjectId,
  languageOf,
  type TabId,
} from './lib/site';

/** Renders the panel body for a tab. */
const Panel: React.FC<{ tab: TabId; onOpen: (t: TabId) => void }> = ({ tab, onOpen }) => {
  if (isProjectId(tab)) return <ProjectDetails projectName={tab} onBack={() => onOpen('projects')} />;
  switch (tab) {
    case 'about': return <About />;
    case 'experience': return <Experience />;
    case 'skills': return <Skills />;
    case 'projects': return <Projects onProjectClick={onOpen} />;
    case 'contact': return <Contact />;
    default: return <Welcome onOpen={onOpen} />;
  }
};

function App() {
  const prefersReducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const [activeTab, navigate] = useHashRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    about: true,
    projects: true,
    contact: true,
  });

  const contentRef = useRef<HTMLElement>(null);
  const tabStripRef = useRef<HTMLDivElement>(null);
  const sidebarToggleRef = useRef<HTMLButtonElement>(null);

  // The splash is a deliberate nod to an editor booting, not a real wait, so
  // keep it brief — and skip it entirely when the visitor has asked for less
  // motion or the tab is restored from the back/forward cache.
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsLoading(false);
      return;
    }
    const timer = setTimeout(() => setIsLoading(false), 550);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // The explorer starts open on desktop and closed on phones, where it would
  // otherwise cover the content it is meant to navigate.
  useEffect(() => {
    setSidebarOpen(isDesktop);
  }, [isDesktop]);

  // Opening a file scrolls the editor pane back to the top; without this the
  // previous page's scroll offset carries over and the new page opens midway.
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeTab]);

  const openTab = useCallback(
    (tab: TabId) => {
      navigate(tab);
      // On phones the explorer is a modal overlay, so opening a file closes it.
      if (!isDesktop) setSidebarOpen(false);
    },
    [navigate, isDesktop]
  );

  // Escape closes the mobile explorer and returns focus to the button that
  // opened it, so keyboard users are never stranded inside the overlay.
  useEffect(() => {
    if (isDesktop || !sidebarOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        sidebarToggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isDesktop, sidebarOpen]);

  const toggleFolder = (name: string) =>
    setExpandedFolders((prev) => ({ ...prev, [name]: !prev[name] }));

  // Tabs shown in the strip: the fixed sections, plus the open project file.
  const openProject = isProjectId(activeTab) ? getTab(activeTab) : undefined;
  const stripTabs = openProject ? [...SECTIONS, openProject] : SECTIONS;
  const activeMeta = getTab(activeTab);

  // Keep the selected tab in view when it is opened from the explorer or a
  // deep link rather than by clicking the strip itself.
  useEffect(() => {
    tabStripRef.current
      ?.querySelector<HTMLElement>('[aria-selected="true"]')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [activeTab]);

  /** Arrow-key navigation across the tab strip, per the WAI-ARIA tabs pattern. */
  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const i = stripTabs.findIndex((t) => t.id === activeTab);
    const last = stripTabs.length - 1;
    const next =
      e.key === 'ArrowLeft' ? (i <= 0 ? last : i - 1)
      : e.key === 'ArrowRight' ? (i >= last ? 0 : i + 1)
      : e.key === 'Home' ? 0
      : last;
    navigate(stripTabs[next].id);
    tabStripRef.current
      ?.querySelectorAll<HTMLElement>('[role="tab"]')[next]
      ?.focus();
  };

  if (isLoading) {
    return (
      <div className="h-[100dvh] bg-editor flex items-center justify-center">
        <div role="status" className="text-center">
          <div
            className="w-12 h-12 border-2 border-line border-t-accent-text rounded-full animate-spin mx-auto mb-5"
            aria-hidden="true"
          />
          <p className="text-sm text-fg-muted tracking-wide">Opening workspace…</p>
        </div>
      </div>
    );
  }

  const explorer = (
    <nav className="vscode-explorer flex-1 overflow-y-auto vscode-scrollbar p-2" aria-label="Explorer">
      {EXPLORER.map((folder) => {
        const isExpanded = !!expandedFolders[folder.name];
        return (
          <div key={folder.name} className="mb-2">
            <button
              type="button"
              className="vscode-folder w-full text-left flex items-center gap-1 cursor-pointer
                         text-xs font-semibold uppercase tracking-[0.08em]"
              onClick={() => toggleFolder(folder.name)}
              aria-expanded={isExpanded}
            >
              <span className="vscode-icon" aria-hidden="true">
                {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </span>
              <span>{folder.name}</span>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                  className="overflow-hidden ml-3"
                >
                  {folder.tabs.map((file) => {
                    const isActive = activeTab === file.id;
                    const glyph = fileGlyph(file.fileName);
                    return (
                      <li key={file.id}>
                        <button
                          type="button"
                          className={`vscode-file w-full text-left flex items-center gap-2 cursor-pointer text-sm ${
                            isActive ? 'active' : ''
                          }`}
                          onClick={() => openTab(file.id)}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <span
                            className={`vscode-icon font-bold ${glyph.className}`}
                            aria-hidden="true"
                          >
                            {glyph.text}
                          </span>
                          <span className="truncate">{file.fileName}</span>
                        </button>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="h-[100dvh] flex flex-col bg-editor overflow-hidden">
        <a href="#editor" className="skip-link">Skip to content</a>

        {/* Tab strip */}
        <header className="vscode-title-bar flex-shrink-0">
          <div
            ref={tabStripRef}
            role="tablist"
            aria-label="Portfolio sections"
            className="flex overflow-x-auto vscode-tabstrip"
          >
            {stripTabs.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={isActive}
                  aria-controls="editor-panel"
                  tabIndex={isActive ? 0 : -1}
                  className="vscode-tab"
                  onClick={() => navigate(t.id)}
                  onKeyDown={onTabKeyDown}
                >
                  {t.fileName}
                  {isActive && (
                    <motion.span
                      layoutId="active-tab-underline"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-accent-text"
                      transition={{ duration: 0.22, ease: [0.2, 0, 0, 1] }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </header>

        {/* Activity bar + explorer + editor */}
        <div className="flex flex-1 min-h-0 relative">
          <div className="vscode-activity-bar flex flex-col flex-shrink-0">
            <button
              ref={sidebarToggleRef}
              type="button"
              className={`vscode-activity-item ${sidebarOpen ? 'active' : ''}`}
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label={sidebarOpen ? 'Hide Explorer' : 'Show Explorer'}
              aria-expanded={sidebarOpen}
              aria-controls="explorer-panel"
            >
              {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <Files className="w-5 h-5" />}
            </button>
          </div>

          {/* Explorer: an inline column on desktop, a dismissible overlay on phones. */}
          <AnimatePresence initial={false}>
            {sidebarOpen && !isDesktop && (
              <motion.div
                key="scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 z-20 bg-black/50"
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
              />
            )}

            {sidebarOpen && (
              <motion.div
                key="explorer"
                id="explorer-panel"
                initial={{ width: isDesktop ? 0 : undefined, x: isDesktop ? 0 : '-100%' }}
                animate={{ width: isDesktop ? 280 : undefined, x: 0 }}
                exit={{ width: isDesktop ? 0 : undefined, x: isDesktop ? 0 : '-100%' }}
                transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
                className={`vscode-sidebar flex flex-col flex-shrink-0 overflow-hidden ${
                  isDesktop ? '' : 'absolute inset-y-0 left-0 z-30 w-[min(20rem,80vw)]'
                }`}
                {...(!isDesktop && { role: 'dialog', 'aria-modal': true, 'aria-label': 'Explorer' })}
              >
                {!isDesktop && (
                  <div className="flex items-center justify-between px-3 py-2 border-b border-line">
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-fg-muted">
                      Explorer
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSidebarOpen(false);
                        sidebarToggleRef.current?.focus();
                      }}
                      className="p-1 rounded text-fg-muted hover:text-fg hover:bg-surface transition-colors"
                      aria-label="Close Explorer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {explorer}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Editor pane */}
          {/* The landmark and the tab panel are separate elements: <main>
              already carries an implicit `main` role, and ARIA forbids
              overriding it with `tabpanel`. */}
          {/* tabIndex=0 makes the scroll container itself focusable, so the
              pane can be scrolled with the arrow keys on pages that contain no
              links or buttons of their own (Skills). It is also where the skip
              link lands. */}
          <main
            ref={contentRef}
            id="editor"
            tabIndex={0}
            className="flex-1 vscode-content overflow-y-auto vscode-scrollbar min-w-0"
          >
            <div
              id="editor-panel"
              role="tabpanel"
              aria-labelledby={`tab-${activeTab}`}
              className="min-h-full"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                  className="min-h-full"
                >
                  <Panel tab={activeTab} onOpen={openTab} />
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>

        {/* Status bar */}
        <footer className="vscode-status-bar flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-4 min-w-0">
            <span className="truncate">{activeMeta?.fileName ?? 'Welcome'}</span>
            <span className="hidden sm:inline">UTF-8</span>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="hidden sm:inline">Spaces: 4</span>
            <span>{languageOf(activeMeta)}</span>
          </div>
        </footer>

        {/* Announce file changes to screen readers, which otherwise get no
            notification when the tab panel swaps its contents. */}
        <p role="status" aria-live="polite" className="sr-only">
          {activeMeta ? `${activeMeta.label} opened` : ''}
        </p>
      </div>
    </MotionConfig>
  );
}

export default App;
