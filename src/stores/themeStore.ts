import {defineStore} from 'pinia';
import {ref, computed, watchEffect} from 'vue';
import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
  Hct,
  type Theme
} from '@poupe/material-color-utilities';

export const getMissingColorMap = (
  theme: Theme,
  mode: "dark" | "light"
): Map<string, string> => {
  const {primary, secondary, tertiary, neutral} = theme.palettes;

  const globalColors = new Map<string, string>([
    ['primary-fixed', hexFromArgb(primary.tone(90))],
    ['primary-fixed-dim', hexFromArgb(primary.tone(80))],
    ['on-primary-fixed', hexFromArgb(primary.tone(10))],
    ['on-primary-fixed-variant', hexFromArgb(primary.tone(30))],
    ['secondary-fixed', hexFromArgb(secondary.tone(90))],
    ['secondary-fixed-dim', hexFromArgb(secondary.tone(80))],
    ['on-secondary-fixed', hexFromArgb(secondary.tone(10))],
    ['on-secondary-fixed-variant', hexFromArgb(secondary.tone(30))],
    ['tertiary-fixed', hexFromArgb(tertiary.tone(90))],
    ['tertiary-fixed-dim', hexFromArgb(tertiary.tone(80))],
    ['on-tertiary-fixed', hexFromArgb(tertiary.tone(10))],
    ['on-tertiary-fixed-variant', hexFromArgb(tertiary.tone(30))],
  ]);

  const lightColors = new Map<string, string>([
    ['surface-dim', hexFromArgb(neutral.tone(87))],
    ['surface-bright', hexFromArgb(neutral.tone(98))],
    ['surface-container-lowest', hexFromArgb(neutral.tone(100))],
    ['surface-container-low', hexFromArgb(neutral.tone(96))],
    ['surface-container', hexFromArgb(neutral.tone(94))],
    ['surface-container-high', hexFromArgb(neutral.tone(92))],
    ['surface-container-highest', hexFromArgb(neutral.tone(90))]
  ]);

  const darkColors = new Map<string, string>([
    ['surface-dim', hexFromArgb(neutral.tone(6))],
    ['surface-bright', hexFromArgb(neutral.tone(24))],
    ['surface-container-lowest', hexFromArgb(neutral.tone(4))],
    ['surface-container-low', hexFromArgb(neutral.tone(10))],
    ['surface-container', hexFromArgb(neutral.tone(12))],
    ['surface-container-high', hexFromArgb(neutral.tone(17))],
    ['surface-container-highest', hexFromArgb(neutral.tone(22))]
  ]);

  // Correction: retourner seulement les couleurs pour le mode spécifié
  const modeColors = mode === 'light' ? lightColors : darkColors;
  return new Map([...globalColors.entries(), ...modeColors.entries()]);
};

export const useThemeStore = defineStore('theme', () => {
  // Fonction utilitaire pour le parsing sécurisé du localStorage
  const parseStoredPreferences = () => {
    if (typeof window === 'undefined') return {};

    const saved = localStorage.getItem('theme-preferences');
    if (!saved) return {};

    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Erreur lors du parsing des préférences:', e);
      localStorage.removeItem('theme-preferences');
      return {};
    }
  };

  const preferences = parseStoredPreferences();

  const sourceColor = ref(preferences.sourceColor || '#6750A4');
  const isDarkMode = ref(preferences.isDarkMode !== undefined ? preferences.isDarkMode : true);
  const isSystemTheme = ref(preferences.isSystemTheme !== undefined ? preferences.isSystemTheme : false);
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
    try {
      const hct = Hct.from(h, c, t);
      return hexFromArgb(hct.toInt());
    } catch (e) {
      console.warn('Erreur conversion HCT vers Hex:', e);
      return sourceColor.value;
    }
  };

  const hexToHct = (hex: string) => {
    try {
      const hct = Hct.fromInt(argbFromHex(hex));
      return {
        hue: Math.round(hct.hue),
        chroma: Math.round(hct.chroma),
        tone: Math.round(hct.tone)
      };
    } catch (e) {
      console.warn('Erreur conversion Hex vers HCT:', e);
      return {hue: 258, chroma: 48, tone: 64};
    }
  };

  const updateSourceFromHct = () => {
    if (isUpdatingFromHct.value) return;

    isUpdatingFromHct.value = true;

    // Validation des valeurs HCT
    const validHue = Math.max(0, Math.min(360, hue.value));
    const validChroma = Math.max(0, Math.min(100, chroma.value));
    const validTone = Math.max(0, Math.min(100, tone.value));

    sourceColor.value = hctToHex(validHue, validChroma, validTone);

    setTimeout(() => {
      isUpdatingFromHct.value = false;
    }, 0);
  };

  const updateHctFromSource = () => {
    if (isUpdatingFromHct.value) return;

    const hctValues = hexToHct(sourceColor.value);
    hue.value = hctValues.hue;
    chroma.value = hctValues.chroma;
    tone.value = hctValues.tone;
  };

  const applyColors = (colors: Record<string, number>) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    Object.entries(colors).forEach(([key, argbValue]) => {
      try {
        const hexValue = hexFromArgb(argbValue);
        root.style.setProperty(`--color-${key}`, hexValue);
      } catch (e) {
        console.warn(`Erreur application couleur ${key}:`, e);
      }
    });
  };

  const getMaterialColors = (scheme: { [key: string]: number }) => {
    const camelCaseToKebabCase = (str: string) =>
      str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    const properties: { [key: string]: number } = {};

    Object.entries(scheme).forEach(([k, v]) => {
      properties[camelCaseToKebabCase(k)] = v;
    });

    return properties;
  };

  const setSourceColor = (color: string) => {
    if (!color) return;

    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!hexRegex.test(color)) {
      console.warn('Format de couleur invalide:', color);
      return;
    }

    sourceColor.value = color;
    updateHctFromSource();
  };

  const setHue = (value: number) => {
    if (isNaN(value)) return;

    // Normaliser la teinte (0-360)
    hue.value = ((value % 360) + 360) % 360;
    // S'assurer que chroma et tone sont dans les bonnes plages
    chroma.value = Math.min(100, Math.max(0, chroma.value));
    tone.value = Math.min(100, Math.max(0, tone.value));
    updateSourceFromHct();
  };

  const setChroma = (value: number) => {
    if (isNaN(value)) return;

    chroma.value = Math.min(100, Math.max(0, value));
    updateSourceFromHct();
  };

  const setTone = (value: number) => {
    if (isNaN(value)) return;

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
    if (typeof window === 'undefined') return;

    try {
      const preferences = {
        sourceColor: sourceColor.value,
        isDarkMode: isDarkMode.value,
        isSystemTheme: isSystemTheme.value,
        hue: hue.value,
        chroma: chroma.value,
        tone: tone.value
      };
      localStorage.setItem('theme-preferences', JSON.stringify(preferences));
    } catch (e) {
      console.error('Erreur sauvegarde préférences:', e);
    }
  };

  const loadPreferences = () => {
    if (typeof window === 'undefined') return;

    const preferences = parseStoredPreferences();

    sourceColor.value = preferences.sourceColor || '#6750A4';
    isDarkMode.value = preferences.isDarkMode !== undefined ? preferences.isDarkMode : true;
    isSystemTheme.value = preferences.isSystemTheme !== undefined ? preferences.isSystemTheme : false;
    hue.value = preferences.hue || 258;
    chroma.value = preferences.chroma || 48;
    tone.value = preferences.tone || 64;
  };

  let isApplyingTheme = false;

  watchEffect(() => {
    if (isApplyingTheme) return;

    try {
      isApplyingTheme = true;

      const theme = themeFromSourceColor(argbFromHex(sourceColor.value));
      const scheme = effectiveTheme.value ? theme.schemes.dark : theme.schemes.light;

      const colorSchemes: { [key: string]: number } = {};

      getMissingColorMap(theme, effectiveTheme.value ? 'dark' : 'light')
        .forEach((hexValue, name) => {
          colorSchemes[name] = argbFromHex(hexValue);
        });

      if (scheme && typeof scheme === 'object') {
        const schemeProps = (scheme as any).props || scheme;
        Object.entries(schemeProps).forEach(([k, v]) => {
          if (typeof v === 'number') {
            colorSchemes[k] = v;
          }
        });
      }

      const colors = getMaterialColors(colorSchemes);
      applyColors(colors);

    } catch (e) {
      console.error('Erreur application du thème:', e);
    } finally {
      isApplyingTheme = false;
    }
  });

  watchEffect(() => {
    savePreferences();
  });

  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (isSystemTheme.value) {
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
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
