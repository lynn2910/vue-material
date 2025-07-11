<!--<template>-->
<!--  <main class="p-20 transition-colors duration-300">-->
<!--    <div class="space-y-6">-->
<!--      <div class="flex items-center gap-4">-->
<!--        <label for="color_picker" class="text-on-surface">-->
<!--          Sélection de la couleur d'accentuation:-->
<!--        </label>-->
<!--        <input-->
<!--          type="color"-->
<!--          id="color_picker"-->
<!--          v-model="accentColor"-->
<!--          class="w-12 h-12 rounded border-2 border-outline cursor-pointer"-->
<!--        >-->
<!--      </div>-->

<!--      <div class="flex items-center gap-4">-->
<!--        <label for="theme_toggle" class="text-on-surface">-->
<!--          Mode sombre:-->
<!--        </label>-->
<!--        <button-->
<!--          @click="toggleTheme"-->
<!--          class="relative w-12 h-6 bg-surface-variant rounded-full transition-colors duration-200"-->
<!--        >-->
<!--          <div-->
<!--            class="absolute top-1 left-1 w-4 h-4 bg-primary rounded-full transition-transform duration-200"-->
<!--            :class="{ 'translate-x-6': isDarkMode }"-->
<!--          ></div>-->
<!--        </button>-->
<!--      </div>-->

<!--      &lt;!&ndash; Tests des couleurs &ndash;&gt;-->
<!--      <div class="space-y-4 flex flex-col gap-4 pt-3">-->
<!--        <div class="bg-primary text-on-primary p-4 rounded">-->
<!--          <h2 class="text-xl font-bold">Couleur primaire</h2>-->
<!--          <p>Texte sur couleur primaire</p>-->
<!--        </div>-->

<!--        <div class="bg-secondary text-on-secondary p-4 rounded">-->
<!--          <h2 class="text-xl font-bold">Couleur secondaire</h2>-->
<!--          <p>Texte sur couleur secondaire</p>-->
<!--        </div>-->

<!--        <div class="bg-tertiary text-on-tertiary p-4 rounded">-->
<!--          <h2 class="text-xl font-bold">Couleur tertiaire</h2>-->
<!--          <p>Texte sur couleur tertiaire</p>-->
<!--        </div>-->

<!--        <div class="bg-surface text-on-surface p-4 rounded border border-outline">-->
<!--          <h2 class="text-xl font-bold">Surface</h2>-->
<!--          <p class="text-on-surface-variant">Texte variant sur surface</p>-->
<!--        </div>-->

<!--        <div class="bg-error text-on-error p-4 rounded">-->
<!--          <h2 class="text-xl font-bold">Erreur</h2>-->
<!--          <p>Texte sur couleur d'erreur</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </main>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import {ref, watchEffect} from "vue";-->
<!--import {argbFromHex, themeFromSourceColor, hexFromArgb} from "@material/material-color-utilities";-->

<!--const accentColor = ref("#6750A4");-->
<!--const isDarkMode = ref(true);-->

<!--const toggleTheme = () => {-->
<!--  isDarkMode.value = !isDarkMode.value;-->
<!--};-->

<!--// Fonction pour appliquer les couleurs au CSS-->
<!--const applyColors = (colors: Record<string, number>) => {-->
<!--  const root = document.documentElement;-->

<!--  Object.entries(colors).forEach(([key, argbValue]) => {-->
<!--    const hexValue = hexFromArgb(argbValue);-->
<!--    root.style.setProperty(`&#45;&#45;color-${key}`, hexValue);-->
<!--  });-->
<!--};-->

<!--// Fonction pour convertir les couleurs Material en format utilisable-->
<!--const getMaterialColors = (scheme: any) => {-->
<!--  return {-->
<!--    'background': scheme.background,-->
<!--    'on-background': scheme.onBackground,-->
<!--    'surface': scheme.surface,-->
<!--    'surface-dim': scheme.surfaceDim,-->
<!--    'surface-bright': scheme.surfaceBright,-->
<!--    'surface-container-lowest': scheme.surfaceContainerLowest,-->
<!--    'surface-container-low': scheme.surfaceContainerLow,-->
<!--    'surface-container': scheme.surfaceContainer,-->
<!--    'surface-container-high': scheme.surfaceContainerHigh,-->
<!--    'surface-container-highest': scheme.surfaceContainerHighest,-->
<!--    'on-surface': scheme.onSurface,-->
<!--    'surface-variant': scheme.surfaceVariant,-->
<!--    'on-surface-variant': scheme.onSurfaceVariant,-->
<!--    'inverse-surface': scheme.inverseSurface,-->
<!--    'inverse-on-surface': scheme.inverseOnSurface,-->
<!--    'outline': scheme.outline,-->
<!--    'outline-variant': scheme.outlineVariant,-->
<!--    'shadow': scheme.shadow,-->
<!--    'scrim': scheme.scrim,-->
<!--    'surface-tint': scheme.surfaceTint,-->
<!--    'primary': scheme.primary,-->
<!--    'on-primary': scheme.onPrimary,-->
<!--    'primary-container': scheme.primaryContainer,-->
<!--    'on-primary-container': scheme.onPrimaryContainer,-->
<!--    'inverse-primary': scheme.inversePrimary,-->
<!--    'secondary': scheme.secondary,-->
<!--    'on-secondary': scheme.onSecondary,-->
<!--    'secondary-container': scheme.secondaryContainer,-->
<!--    'on-secondary-container': scheme.onSecondaryContainer,-->
<!--    'tertiary': scheme.tertiary,-->
<!--    'on-tertiary': scheme.onTertiary,-->
<!--    'tertiary-container': scheme.tertiaryContainer,-->
<!--    'on-tertiary-container': scheme.onTertiaryContainer,-->
<!--    'error': scheme.error,-->
<!--    'on-error': scheme.onError,-->
<!--    'error-container': scheme.errorContainer,-->
<!--    'on-error-container': scheme.onErrorContainer-->
<!--  };-->
<!--};-->

<!--// Watcher pour mettre à jour les couleurs-->
<!--watchEffect(() => {-->
<!--  const theme = themeFromSourceColor(argbFromHex(accentColor.value));-->
<!--  const scheme = isDarkMode.value ? theme.schemes.dark : theme.schemes.light;-->

<!--  const colors = getMaterialColors(scheme);-->
<!--  applyColors(colors);-->
<!--});-->
<!--</script>-->

<template></template>
