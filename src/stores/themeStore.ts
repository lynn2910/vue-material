import {defineStore} from 'pinia';
import {ref, computed, watchEffect} from 'vue';
import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
  Hct
} from '@material/material-color-utilities';

export const useThemeStore = defineStore('theme', () => {
  const saved = localStorage.getItem('theme-preferences');
  let preferences;
  try {
    preferences = saved ? JSON.parse(saved) : {};
  } catch (e) {
    console.error(e);
    localStorage.removeItem('theme-preferences');
    preferences = {};
  }

  const sourceColor = ref(preferences.sourceColor || '#6750A4');
  const isDarkMode = ref(preferences.isDarkMode !== undefined ? preferences.isDarkMode : true);
  const isSystemTheme = ref(preferences.isSystemTheme || false);
  const isUpdatingFromHct = ref(false);

  const hue = ref(preferences.hue || 258);
  const chroma = ref(preferences.chroma || 48);
  const tone = ref(preferences.tone || 64);

  const systemPrefersDark = computed(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const effectiveTheme = computed(() => {
    return isSystemTheme.value ? systemPrefersDark.value : isDarkMode.value;
  });

  const hctToHex = (h: number, c: number, t: number): string => {
    const hct = Hct.from(h, c, t);
    return hexFromArgb(hct.toInt());
  };

  const hexToHct = (hex: string) => {
    const hct = Hct.fromInt(argbFromHex(hex));
    return {
      hue: hct.hue,
      chroma: hct.chroma,
      tone: hct.tone
    };
  };

  const updateSourceFromHct = () => {
    isUpdatingFromHct.value = true;
    sourceColor.value = hctToHex(hue.value, chroma.value, tone.value);

    setTimeout(() => {
      isUpdatingFromHct.value = false;
    }, 0);
  };

  const updateHctFromSource = () => {
    const hctValues = hexToHct(sourceColor.value);
    hue.value = Math.round(hctValues.hue);
    chroma.value = Math.round(hctValues.chroma);
    tone.value = Math.round(hctValues.tone);
  };

  const applyColors = (colors: Record<string, number>) => {
    const root = document.documentElement;

    Object.entries(colors).forEach(([key, argbValue]) => {
      const hexValue = hexFromArgb(argbValue);
      root.style.setProperty(`--color-${key}`, hexValue);
    });
  };

  const getMaterialColors = (scheme: any) => {
    return {
      'background': scheme.background,
      'on-background': scheme.onBackground,
      'surface': scheme.surface,
      'surface-dim': scheme.surfaceDim,
      'surface-bright': scheme.surfaceBright,
      'surface-container-lowest': scheme.surfaceContainerLowest,
      'surface-container-low': scheme.surfaceContainerLow,
      'surface-container': scheme.surfaceContainer,
      'surface-container-high': scheme.surfaceContainerHigh,
      'surface-container-highest': scheme.surfaceContainerHighest,
      'on-surface': scheme.onSurface,
      'surface-variant': scheme.surfaceVariant,
      'on-surface-variant': scheme.onSurfaceVariant,
      'inverse-surface': scheme.inverseSurface,
      'inverse-on-surface': scheme.inverseOnSurface,
      'outline': scheme.outline,
      'outline-variant': scheme.outlineVariant,
      'shadow': scheme.shadow,
      'scrim': scheme.scrim,
      'surface-tint': scheme.surfaceTint,
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

  const setSourceColor = (color: string) => {
    sourceColor.value = color;
    updateHctFromSource();
  };

  const setHue = (value: number) => {
    hue.value = value;
    // Ensure chroma and tone are within valid ranges
    chroma.value = Math.min(100, Math.max(0, chroma.value));
    tone.value = Math.min(100, Math.max(0, tone.value));
    updateSourceFromHct();
  };

  const setChroma = (value: number) => {
    chroma.value = Math.min(100, Math.max(0, value));
    updateSourceFromHct();
  };

  const setTone = (value: number) => {
    tone.value = Math.min(100, Math.max(0, value));
    updateSourceFromHct();
  };

  const toggleTheme = () => {
    if (isSystemTheme.value) {
      isSystemTheme.value = false;
      isDarkMode.value = !systemPrefersDark.value;
    } else {
      isDarkMode.value = !isDarkMode.value;
    }
  };

  const setSystemTheme = () => {
    isSystemTheme.value = true;
  };

  const setManualTheme = (dark: boolean) => {
    isSystemTheme.value = false;
    isDarkMode.value = dark;
  };

  const savePreferences = () => {
    console.log("saving preferences")
    if (typeof window !== 'undefined') {
      const preferences = {
        sourceColor: sourceColor.value,
        isDarkMode: isDarkMode.value,
        isSystemTheme: isSystemTheme.value,
        hue: hue.value,
        chroma: chroma.value,
        tone: tone.value
      };
      localStorage.setItem('theme-preferences', JSON.stringify(preferences));
    }
  };

  const loadPreferences = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-preferences');
      if (saved) {
        try {
          const preferences = JSON.parse(saved);
          sourceColor.value = preferences.sourceColor || '#6750A4';
          isDarkMode.value = preferences.isDarkMode !== undefined ? preferences.isDarkMode : true;
          isSystemTheme.value = preferences.isSystemTheme || false;
          hue.value = preferences.hue || 258;
          chroma.value = preferences.chroma || 48;
          tone.value = preferences.tone || 64;
        } catch (e) {
          console.warn('Erreur lors du chargement des préférences du thème:', e);
        }
      }
    }
  };

  watchEffect(() => {
    const theme = themeFromSourceColor(argbFromHex(sourceColor.value));
    const scheme = effectiveTheme.value ? theme.schemes.dark : theme.schemes.light;

    const colors = getMaterialColors(scheme);
    applyColors(colors);
  });

  watchEffect(() => {
    savePreferences();
  });

  if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (_) => {
      if (isSystemTheme.value) {
        // The theme will automatically be updated using the computed
      }
    });
  }

  return {
    // States
    sourceColor,
    isDarkMode,
    isSystemTheme,
    isUpdatingFromHct,
    hue,
    chroma,
    tone,

    // Computed
    systemPrefersDark,
    effectiveTheme,

    // Actions
    setSourceColor,
    setHue,
    setChroma,
    setTone,
    toggleTheme,
    setSystemTheme,
    setManualTheme,
    loadPreferences,
    savePreferences,

    // Utils
    hctToHex,
    hexToHct
  };
});
