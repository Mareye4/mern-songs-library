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
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
  },
  colors: {
    // Primary Indigo-Blue Accent Scale
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primaryActive: '#1e40af',
    primaryLight: '#eff6ff',
    primaryBorder: '#bfdbfe',
    primaryBorderSoft: '#dbeafe',

    // Success Scale (Green)
    success: '#059669',
    successHover: '#047857',
    successLight: '#ecfdf5',
    successBorder: '#a7f3d0',
    successText: '#065f46',

    // Warning Scale (Amber)
    warning: '#d97706',
    warningHover: '#b45309',
    warningLight: '#fffbeb',
    warningBorder: '#fde68a',
    warningText: '#92400e',

    // Danger Scale (Red)
    danger: '#dc2626',
    dangerHover: '#b91c1c',
    dangerLight: '#fef2f2',
    dangerBorder: '#fecaca',
    dangerText: '#991b1b',

    // Purple Scale
    purple: '#7c3aed',
    purpleHover: '#6d28d9',
    purpleLight: '#f5f3ff',
    purpleBorder: '#ddd6fe',
    purpleText: '#5b21b6',

    // Nuanced Neutral Scale
    gray50: '#f8fafc',
    gray100: '#f1f5f9',
    gray200: '#e2e8f0',
    gray300: '#cbd5e1',
    gray400: '#94a3b8',
    gray500: '#64748b',
    gray600: '#475569',
    gray700: '#334155',
    gray800: '#1e293b',
    gray900: '#0f172a',

    // Semantic Canvas Surfaces & Text
    bg: '#f8fafc',
    surface: '#ffffff',
    surfaceSubtle: '#f8fafc',
    surfaceHover: '#f1f5f9',
    text: '#0f172a',
    textSecondary: '#334155',
    textMuted: '#64748b',
    textSubtle: '#94a3b8',
    border: '#e2e8f0',
    borderDark: '#cbd5e1',
    borderSoft: 'rgba(226, 232, 240, 0.9)',
  },
  radii: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
    md: '0 4px 12px -2px rgba(15, 23, 42, 0.05), 0 2px 4px -1px rgba(15, 23, 42, 0.02)',
    lg: '0 10px 20px -3px rgba(15, 23, 42, 0.07), 0 4px 6px -2px rgba(15, 23, 42, 0.03)',
    cardHover: '0 10px 20px -3px rgba(37, 99, 235, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
    modal: '0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
  },
};

export type AppTheme = typeof theme;