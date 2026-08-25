import { useCallback, useEffect, useState } from 'react';
import { getTab, getTabByPath, ALL_TABS, type TabId } from '../lib/site';

const HOME: TabId = 'home';

/** Read the current tab from location.hash, falling back to the welcome tab. */
const readHash = (): TabId => {
  const raw = window.location.hash.replace(/^#/, '');
  const path = raw === '' || raw === '/' ? '/' : raw.replace(/\/+$/, '');
  return (getTabByPath(path)?.id ?? HOME) as TabId;
};

/**
 * Hash-based routing for the editor tabs.
 *
 * Every page gets its own URL (`#/projects/codecollab`), so links are
 * shareable, the browser back button steps through visited tabs, and a reload
 * lands where the visitor left off — all without a router dependency, which
 * matters because GitHub Pages can't rewrite paths for a real SPA router.
 */
export function useHashRoute(): [TabId, (id: TabId) => void] {
  const [tab, setTab] = useState<TabId>(() =>
    typeof window === 'undefined' ? HOME : readHash()
  );

  useEffect(() => {
    const onChange = () => setTab(readHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  // Keep the document title in step with the visible tab so browser history
  // and bookmarks are readable.
  useEffect(() => {
    const meta = getTab(tab);
    document.title = meta && meta.id !== HOME
      ? `${meta.label} — Josiah White`
      : 'Josiah White — Software Engineer';
  }, [tab]);

  const navigate = useCallback((id: TabId) => {
    const meta = ALL_TABS.find((t) => t.id === id);
    if (!meta) return;
    // Assigning to hash pushes a history entry; the hashchange listener above
    // is what actually updates state, so back/forward stay authoritative.
    if (readHash() === id) return;
    window.location.hash = meta.path;
  }, []);

  return [tab, navigate];
}
