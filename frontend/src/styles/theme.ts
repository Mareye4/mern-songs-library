export const breakpoints = ['640px', '768px', '1024px', '1280px'];

// Alias helpers
export const mediaQueries = {
  sm: `@media screen and (min-width: ${breakpoints[0]})`,
  md: `@media screen and (min-width: ${breakpoints[1]})`,
  lg: `@media screen and (min-width: ${breakpoints[2]})`,
  xl: `@media screen and (min-width: ${breakpoints[3]})`,
};

export const theme = {
  breakpoints,
  mediaQueries,
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
  fontSizes: [12, 13, 14, 16, 18, 20, 24, 28, 32, 40],
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  fonts: {
    sans: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
    mono: "Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
  },
  colors: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primaryLight: '#eff6ff',
    primaryBorder: '#dbeafe',

    success: '#16a34a',
    successLight: '#f0fdf4',
    successBorder: '#bbf7d0',
    successText: '#15803d',

    warning: '#d97706',
    warningLight: '#fffbeb',
    warningBorder: '#fde68a',

    danger: '#dc2626',
    dangerHover: '#b91c1c',
    dangerLight: '#fef2f2',
    dangerBorder: '#fecaca',
    dangerText: '#991b1b',

    purple: '#7c3aed',
    purpleLight: '#f5f3ff',

    bg: '#f8fafc',
    surface: '#ffffff',
    surfaceHover: '#f8fafc',
    text: '#0f172a',
    textMuted: '#64748b',
    border: '#e2e8f0',
    borderDark: '#cbd5e1',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    modal: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
};

export type AppTheme = typeof theme;