/**
 * Single source of truth for the editor's "open files".
 *
 * Tab strip, explorer tree, status bar, hash routes and the content switch all
 * derive from this list, so adding a page means adding one entry here.
 */

export type SectionId =
  | 'home'
  | 'about'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'contact';

export type ProjectId =
  | 'codecollab'
  | 'keyquest'
  | 'classfinder'
  | 'cockbots'
  | 'portfoliowebsite'
  | 'minesweeper'
  | 'sudokusolver';

export type TabId = SectionId | ProjectId;

/** Language shown in the status bar, keyed off the file extension. */
const LANGUAGES: Record<string, string> = {
  java: 'Java',
  py: 'Python',
  tsx: 'TypeScript JSX',
  cpp: 'C++',
  cs: 'C#',
  html: 'HTML',
  md: 'Markdown',
};

export interface TabMeta {
  id: TabId;
  /** Label in the tab strip and explorer, e.g. "Projects.java". */
  fileName: string;
  /** Short label for navigation and document titles. */
  label: string;
  /** URL fragment, without the leading "#". */
  path: string;
}

const file = (id: TabId, fileName: string, label: string, path: string): TabMeta => ({
  id,
  fileName,
  label,
  path,
});

/** Top-level sections, in tab-strip order. */
export const SECTIONS: TabMeta[] = [
  file('home', 'Welcome', 'Welcome', '/'),
  file('about', 'About.java', 'About', '/about'),
  file('experience', 'Experience.java', 'Experience', '/experience'),
  file('skills', 'Skills.java', 'Skills', '/skills'),
  file('projects', 'Projects.java', 'Projects', '/projects'),
  file('contact', 'Contact.java', 'Contact', '/contact'),
];

/** Project detail pages, in explorer order. */
export const PROJECT_FILES: TabMeta[] = [
  file('classfinder', 'ClassFinder.cs', 'Class Finder', '/projects/classfinder'),
  file('cockbots', 'CockBots.py', 'CockBots', '/projects/cockbots'),
  file('codecollab', 'CodeCollab.java', 'CodeCollab', '/projects/codecollab'),
  file('keyquest', 'KeyQuest.java', 'KeyQuest', '/projects/keyquest'),
  file('portfoliowebsite', 'PortfolioWebsite.tsx', 'Portfolio Website', '/projects/portfoliowebsite'),
  file('minesweeper', 'Minesweeper.cpp', 'Minesweeper', '/projects/minesweeper'),
  file('sudokusolver', 'SudokuSolver.html', 'Sudoku Solver', '/projects/sudokusolver'),
];

export const ALL_TABS: TabMeta[] = [...SECTIONS, ...PROJECT_FILES];

const BY_ID = new Map<string, TabMeta>(ALL_TABS.map((t) => [t.id, t]));
const BY_PATH = new Map<string, TabMeta>(ALL_TABS.map((t) => [t.path, t]));

export const getTab = (id: string): TabMeta | undefined => BY_ID.get(id);
export const getTabByPath = (path: string): TabMeta | undefined => BY_PATH.get(path);
export const isProjectId = (id: string): id is ProjectId =>
  PROJECT_FILES.some((p) => p.id === id);

/** Language label for the status bar, derived from the file name. */
export const languageOf = (tab: TabMeta | undefined): string => {
  const ext = tab?.fileName.split('.').pop()?.toLowerCase() ?? '';
  return LANGUAGES[ext] ?? 'Plain Text';
};

/**
 * Explorer tree. Files reference tabs by id so the tree can never drift out of
 * sync with the routes.
 */
export interface ExplorerFolder {
  name: string;
  tabs: TabMeta[];
}

export const EXPLORER: ExplorerFolder[] = [
  {
    name: 'about',
    tabs: SECTIONS.filter((s) => s.id !== 'home' && s.id !== 'contact'),
  },
  { name: 'projects', tabs: PROJECT_FILES },
  { name: 'contact', tabs: SECTIONS.filter((s) => s.id === 'contact') },
];

/** Decorative file-type glyph for the explorer. Purely visual — hidden from AT. */
export const fileGlyph = (fileName: string): { text: string; className: string } => {
  if (fileName.endsWith('.java')) return { text: 'J', className: 'text-[#e76f51]' };
  if (fileName.endsWith('.py')) return { text: 'Py', className: 'text-[#6bb3e8] text-[10px]' };
  if (fileName.endsWith('.tsx')) return { text: 'TS', className: 'text-[#4daafc] text-[10px]' };
  if (fileName.endsWith('.cpp')) return { text: 'C', className: 'text-[#9d7bd8]' };
  if (fileName.endsWith('.cs')) return { text: 'C#', className: 'text-[#68b98a] text-[10px]' };
  if (fileName.endsWith('.html')) return { text: '<>', className: 'text-[#e8a33d] text-[10px]' };
  return { text: '·', className: 'text-fg-muted' };
};
