import {defineStore} from 'pinia';
import {ref, computed, watchEffect} from 'vue';
import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
  Hct, type Theme
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

  if (mode === 'light') {
    return new Map([...globalColors.entries(), ...lightColors.entries()]);
  } else if (mode === 'dark') {
    return new Map([...globalColors.entries(), ...darkColors.entries()]);
  } else {
    return new Map([...globalColors.entries(), ...lightColors.entries(), ...darkColors.entries()]);
  }
};

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

  const getMaterialColors = (scheme: { [key: string]: number }) => {
    const camelCaseToKebabCase = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    let properties: { [key: string]: number } = {};

    Object.entries(scheme)
      .forEach(([k, v]) => {
        properties[camelCaseToKebabCase(k)] = v;
      });

    return properties;
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

    let color_schemes: { [key: string]: number } = {};

    getMissingColorMap(theme, effectiveTheme.value ? 'dark' : 'light')
      .forEach((hexValue, name) => {
        color_schemes[name] = argbFromHex(hexValue);
      })

    Object.entries((scheme as unknown as { props: { [key: string]: number } }).props)
      .forEach(([k, v]) => {
        color_schemes[k] = v;
      });

    const colors = getMaterialColors(color_schemes);

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
