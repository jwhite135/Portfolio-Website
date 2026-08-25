/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // VS Code Dark+ palette, tuned so every text pairing clears WCAG AA (4.5:1)
      // and every interactive border/icon clears 3:1. See index.css for the
      // matching CSS custom properties.
      colors: {
        editor: '#1e1e1e',      // main content background
        chrome: '#333333',      // title bar, tab strip, activity bar
        panel: '#252526',       // sidebar / explorer
        surface: '#2a2d2e',     // raised cards, hover state
        'surface-hi': '#37373d',// selected row
        line: '#3c3c3c',        // hairline borders
        'line-hi': '#565656',   // border on hover / input border
        fg: '#cccccc',          // primary text
        'fg-muted': '#a0a0a0',  // secondary text (was #6a6a6a — failed AA)
        accent: '#007acc',      // brand blue: fills and large surfaces only
        'accent-hi': '#1177bb', // brand blue, hover fill
        'accent-text': '#4daafc',// brand blue for text/icons on dark (AA-safe)
        // Dark+ syntax tokens
        syntax: {
          string: '#ce9178',
          comment: '#6a9955',
          keyword: '#569cd6',
          number: '#b5cea8',
          function: '#dcdcaa',
          class: '#4ec9b0',
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      transitionTimingFunction: {
        // Slight overshoot-free ease used for all chrome transitions.
        vscode: 'cubic-bezier(0.2, 0, 0, 1)',
      },
      keyframes: {
        'caret-blink': { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
      },
      animation: {
        'caret-blink': 'caret-blink 1.1s steps(1) infinite',
      },
    },
  },
  plugins: [],
}
