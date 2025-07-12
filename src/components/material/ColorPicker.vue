<template>
  <div class="bg-surface rounded-xl p-6 w-80 shadow-lg dark:border-primary dark:border-2">
    <!-- Head -->
    <div class="flex flex-row justify-between items-center">
      <h2 class="text-title-large text-on-surface">Editeur de thème</h2>
      <i class="material-icons-outlined select-none cursor-pointer text-on-surface"
         @click="copyColor">copy</i>
    </div>

    <!-- Color picker -->
    <br>
    <div class="rounded-xl bg-secondary-container flex flex-row items-center justify-between p-3">
      <label for="hex_color_picker" class="text-title-medium text-on-secondary-container">Couleur
        hexadécimale</label>
      <input type="color" v-model="themeStore.sourceColor" id="hex_color_picker"
             class="w-10 h-10 rounded-md border-2 border-primary">
    </div>

    <br>
    <div
      class="rounded-xl bg-secondary-container flex flex-col items-center justify-between p-3 gap-3">
      <!-- Hue -->
      <div class="flex flex-col gap-2 w-full">
        <label for="hue_picker" class="text-title-medium text-on-secondary-container">Hue</label>
        <input type="range" min="0" max="360" id="hue_picker" v-model="hue" class="mx-2">
        <div class="hue_gradient_bg rounded-full border border-white w-full h-6"></div>
      </div>

      <!-- Chroma -->
      <div class="flex flex-col gap-2 w-full">
        <label for="chroma_picker"
               class="text-title-medium text-on-secondary-container">Chroma</label>
        <input type="range" min="0" max="100" id="chroma_picker" v-model="chroma" class="mx-2">
        <div class="rounded-full border border-white w-full h-6" :style="chromaGradientStyle"></div>
      </div>

      <!-- Tone -->
      <div class="flex flex-col gap-2 w-full">
        <label for="tone_picker" class="text-title-medium text-on-secondary-container">Tone</label>
        <input type="range" min="0" max="100" id="tone_picker" v-model="tone" class="mx-2">
        <div class="rounded-full border border-white w-full h-6" :style="toneGradientStyle"></div>
      </div>
    </div>


    <br>
    <div class="rounded-xl bg-secondary-container flex flex-col items-center justify-between p-3">
      <select :value="themeMode"
              @input="event => setThemeMode((event.target as HTMLInputElement).value)"
              class="text-on-secondary-container bg-secondary-container">
        <option class="text-surface bg-surface" value="dark">Mode sombre</option>
        <option class="text-surface bg-surface" value="auto">Automatique</option>
        <option class="text-surface bg-surface" value="light">Mode clair</option>
      </select>
    </div>

  </div>
</template>

<script setup lang="ts">
import {useThemeStore} from '@/stores/themeStore';
import {ref, watch, computed} from "vue";
import {Hct, hexFromArgb} from '@poupe/material-color-utilities';

const themeStore = useThemeStore();

const themeMode = computed(() => {
  if (themeStore.isSystemTheme) {
    return 'auto';
  } else if (themeStore.isDarkMode) {
    return 'dark';
  } else {
    return 'light';
  }
})

function setThemeMode(mode: string) {
  switch (mode) {
    case 'auto': {
      themeStore.setSystemTheme();
      break;
    }
    case 'dark': {
      themeStore.setManualTheme(true);
      break;
    }
    case 'light': {
      themeStore.setManualTheme(false);
      break;
    }
    default: {
      console.error(`Mode ${mode} inconnu`);
      break;
    }
  }
}

const hue = ref(themeStore.hue);
const chroma = ref(themeStore.chroma);
const tone = ref(themeStore.tone);

watch(hue, (newVal) => {
  themeStore.setHue(newVal);
});

watch(chroma, (newVal) => {
  themeStore.setChroma(newVal);
});

watch(tone, (newVal) => {
  themeStore.setTone(newVal);
});

watch(() => themeStore.sourceColor, (newColor) => {
  const hctValues = themeStore.hexToHct(newColor);

  if (!themeStore.isUpdatingFromHct) {
    hue.value = Math.round(hctValues.hue);
    chroma.value = Math.round(hctValues.chroma);
    tone.value = Math.round(hctValues.tone);
  }
}, {immediate: true});

const STOPS = 20;

const chromaGradientStyle = computed(() => {
  let gradient = 'linear-gradient(to right';

  const safeHue = hue.value;
  const safeTone = Math.max(10, Math.min(90, tone.value));

  for (let i = 0; i <= STOPS; i++) {
    const currentChroma = (i / STOPS) * 100;
    try {
      const color = Hct.from(safeHue, currentChroma, safeTone);
      gradient += `, ${hexFromArgb(color.toInt())} ${i * (100 / STOPS)}%`;
    } catch (e) {
      gradient += `, #808080 ${i * (100 / STOPS)}%`;
    }
  }
  gradient += ')';
  return {background: gradient};
});

const toneGradientStyle = computed(() => {
  let gradient = 'linear-gradient(to right';

  const safeHue = hue.value;
  const safeChroma = Math.min(100, Math.max(0, chroma.value));

  for (let i = 0; i <= STOPS; i++) {
    const currentTone = (i / STOPS) * 100;
    try {
      const color = Hct.from(safeHue, safeChroma, currentTone);
      gradient += `, ${hexFromArgb(color.toInt())} ${i * (100 / STOPS)}%`;
    } catch (e) {
      gradient += `, #808080 ${i * (100 / STOPS)}%`;
    }
  }
  gradient += ')';
  return {background: gradient};
});

// TODO Ajouter gestion de l'erreur et notification
function copyColor() {
  try {
    navigator.clipboard.writeText(themeStore.sourceColor);
  } catch (e) {
    alert('Impossible de copier la couleur dans le presse-papier');
  }
}
</script>

<style scoped>
.hue_gradient_bg {
  background: linear-gradient(to right, #e7007d 0%, #e90070 1%, #ea0064 2%, #eb0057 3%, #ec044a 4%, #ec0e3d 5%, #eb162f 6%, #ea1c1f 7%, #e92207 8%, #e03400 9%, #d84200 10%, #d04b00 11%, #ca5100 12%, #c45600 13%, #bf5b00 14%, #ba5e00 15%, #b56100 16%, #b16400 17%, #ad6600 18%, #a96800 19%, #a56a00 20%, #a26c00 21%, #9e6e00 22%, #9b7000 23%, #977100 24%, #937300 25%, #907400 26%, #8c7600 27%, #887700 28%, #847800 29%, #7f7a00 30%, #7a7b00 31%, #757d00 32%, #6f7e00 33%, #698000 34%, #618200 35%, #588300 36%, #4c8500 37%, #3d8700 38%, #238a00 39%, #008b18 40%, #008a2f 41%, #008a3d 42%, #008948 43%, #008951 44%, #008858 45%, #00885f 46%, #008865 47%, #00876a 48%, #00876f 49%, #008673 50%, #008677 51%, #00867b 52%, #00857f 53%, #008583 54%, #008586 55%, #00848a 56%, #00848d 57%, #008491 58%, #008394 59%, #008398 60%, #00829c 61%, #00829f 62%, #0081a3 63%, #0081a7 64%, #0080ac 65%, #007fb1 66%, #007fb6 67%, #007ebb 68%, #007dc1 69%, #007bc8 70%, #007ad0 71%, #0078da 72%, #0075e5 73%, #0072f2 74%, #126eff 75%, #326bff 76%, #4568ff 77%, #5365ff 78%, #5f62ff 79%, #695fff 80%, #735bff 81%, #7d57ff 82%, #8653ff 83%, #8e4eff 84%, #9748ff 85%, #a040ff 86%, #aa37ff 87%, #b329ff 88%, #be0dff 89%, #c400f6 90%, #ca00ea 91%, #ce00de 92%, #d300d2 93%, #d600c6 94%, #da00ba 95%, #dd00ad 96%, #e000a1 97%, #e20095 98%, #e50089 99%);
}
</style>
