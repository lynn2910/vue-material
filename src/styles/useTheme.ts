// composables/useTheme.ts
import {ref, watchEffect} from 'vue';
import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
  Scheme
} from '@material/material-color-utilities';

export const useTheme = () => {
  const accentColor = ref('#6750A4');
  const isDarkMode = ref(true);

  const applyColors = (colors: Record<string, number>) => {
    const root = document.documentElement;

    Object.entries(colors).forEach(([key, argbValue]) => {
      const hexValue = hexFromArgb(argbValue);
      root.style.setProperty(`--color-${key}`, hexValue);
    });
  };

  const getMaterialColors = (scheme: Scheme) => {
    return {
      'background': scheme.background,
      'on-background': scheme.onBackground,
      'surface': scheme.surface,
      // 'surface-dim': scheme.surfaceDim,
      // 'surface-bright': scheme.surfaceBright,
      // 'surface-container-lowest': scheme.surfaceContainerLowest,
      // 'surface-container-low': scheme.surfaceContainerLow,
      // 'surface-container': scheme.surfaceContainer,
      // 'surface-container-high': scheme.surfaceContainerHigh,
      // 'surface-container-highest': scheme.surfaceContainerHighest,
      'on-surface': scheme.onSurface,
      'surface-variant': scheme.surfaceVariant,
      'on-surface-variant': scheme.onSurfaceVariant,
      'inverse-surface': scheme.inverseSurface,
      'inverse-on-surface': scheme.inverseOnSurface,
      'outline': scheme.outline,
      'outline-variant': scheme.outlineVariant,
      'shadow': scheme.shadow,
      'scrim': scheme.scrim,
      // 'surface-tint': scheme.surfaceTint,
      'primary': scheme.primary,
      'on-primary': scheme.onPrimary,
      'primary-container': scheme.primaryContainer,
      'on-primary-container': scheme.onPrimaryContainer,
      'inverse-primary': scheme.inversePrimary,
      'secondary': scheme.secondary,
      'on-secondary': scheme.onSecondary,
      'secondary-container': scheme.secondaryContainer,
      'on-secondary-container': scheme.onSecondaryContainer,
      'tertiary': scheme.tertiary,
      'on-tertiary': scheme.onTertiary,
      'tertiary-container': scheme.tertiaryContainer,
      'on-tertiary-container': scheme.onTertiaryContainer,
      'error': scheme.error,
      'on-error': scheme.onError,
      'error-container': scheme.errorContainer,
      'on-error-container': scheme.onErrorContainer
    };
  };

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  const setAccentColor = (color: string) => {
    accentColor.value = color;
  };

  watchEffect(() => {
    const theme = themeFromSourceColor(argbFromHex(accentColor.value));
    const scheme = isDarkMode.value ? theme.schemes.dark : theme.schemes.light;

    const colors = getMaterialColors(scheme);
    applyColors(colors);
  });

  const savePreferences = () => {
    localStorage.setItem('theme-preferences', JSON.stringify({
      accentColor: accentColor.value,
      isDarkMode: isDarkMode.value
    }));
  };

  const loadPreferences = () => {
    const saved = localStorage.getItem('theme-preferences');
    if (saved) {
      const preferences = JSON.parse(saved);
      accentColor.value = preferences.accentColor || '#6750A4';
      isDarkMode.value = preferences.isDarkMode !== undefined ? preferences.isDarkMode : true;
    }
  };

  return {
    accentColor,
    isDarkMode,
    toggleTheme,
    setAccentColor,
    savePreferences,
    loadPreferences
  };
};
