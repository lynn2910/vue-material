<template>
  <div
    class="bg-surface rounded-xl p-6 w-full h-full shadow-lg dark:border-primary dark:border-2">

    <div class="flex flex-row justify-between items-center">
      <h2 class="text-title-large text-on-surface">Éditeur de thème</h2>
      <FilledButton icon="content_copy" label="Copier" @click="copyColor"/>
    </div>

    <br>
    <div class="rounded-xl bg-surface-container-highest p-3 flex flex-col gap-4">
      <TextField
        label="Couleur hexadécimale"
        id="hex_color_picker_input"
        name="hex_color_picker"
        type="text"
        v-model="hexValue"
        :pattern="'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'"
        @update:model-value="handleHexInput"
        @validation-change="handleValidation"
        :error-message="'Format hexadécimal invalide'"
        filled
      />

      <div class="flex flex-row justify-between items-center">
        <label for="color_picker" class="text-title-medium text-on-surface">Sélection
          visuelle</label>
        <div class="flex gap-2 items-center">
          <!-- Preview de la couleur actuelle HCT -->
          <div
            class="w-12 h-12 rounded-md border-2 border-outline"
            :style="{ backgroundColor: currentHctColor }"
            :title="`HCT: ${Math.round(themeStore.hue)}°, ${Math.round(themeStore.chroma)}, ${Math.round(themeStore.tone)}`"
          ></div>
          <input
            type="color"
            :value="themeStore.sourceColor"
            @input="handleColorInput"
            id="color_picker"
            class="w-12 h-12 rounded-md border-2 border-primary cursor-pointer">
        </div>
      </div>
    </div>

    <!-- Preview des différents tons pour mieux voir l'effet -->
    <br>
    <div class="rounded-xl bg-surface-container-highest p-3">
      <p class="text-title-small text-on-surface mb-3">Aperçu des tons</p>
      <div class="flex gap-1 w-full">
        <div
          v-for="tone in tonePreviewValues"
          :key="tone"
          class="flex-1 h-8 border border-outline rounded"
          :style="{ backgroundColor: getColorAtTone(tone) }"
          :title="`Tone: ${tone}`"
        ></div>
      </div>
      <div class="flex justify-between text-xs text-on-surface-variant mt-1">
        <span>0 (noir)</span>
        <span>50</span>
        <span>100 (blanc)</span>
      </div>
    </div>

    <br>
    <div
      class="rounded-xl bg-surface-container-highest flex flex-col items-center justify-between p-3 gap-5">
      <div class="flex flex-col gap-2 w-full">
        <div class="flex justify-between items-center text-on-surface">
          <label for="hue_picker" class="text-title-medium">Teinte (Hue)</label>
          <span class="text-body-small">{{ Math.round(hueValue) }}°</span>
        </div>
        <BaseSlider
          :min="0" :max="360" :step="1"
          v-model="hueValue"
        />
        <div class="hue_gradient_bg rounded-full border border-outline w-full h-6"/>
      </div>

      <div class="flex flex-col gap-2 w-full">
        <div class="flex justify-between items-center text-on-surface">
          <label for="chroma_picker" class="text-title-medium">Chroma (Saturation)</label>
          <span class="text-body-small">{{ Math.round(chromaValue) }}</span>
        </div>
        <BaseSlider
          :min="0" :max="100" :step="1"
          v-model="chromaValue"
        />
        <div class="rounded-full border border-outline w-full h-6" :style="chromaGradientStyle"/>
      </div>

      <div class="flex flex-col gap-2 w-full">
        <div class="flex justify-between items-center text-on-surface">
          <label for="tone_picker" class="text-title-medium">Tonalité (Luminosité)</label>
          <div class="flex items-center gap-2">
            <span class="text-body-small">{{ Math.round(toneValue) }}</span>
            <div
              class="w-6 h-6 rounded border border-outline"
              :style="{ backgroundColor: currentHctColor }"
            ></div>
          </div>
        </div>
        <BaseSlider
          :min="0" :max="100" :step="1"
          v-model="toneValue"
        />
        <div class="rounded-full border border-outline w-full h-6" :style="toneGradientStyle"/>
      </div>
    </div>

    <br>
    <div class="flex flex-col gap-2">
      <p class="text-title-small text-on-surface">Mode de thème</p>
      <SegmentedButtons
        :items="themeModes"
        id="theme_mode_selector"
        v-model="themeMode"
        :allow_multiple="false"
        :disallow_none="true"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import {useThemeStore} from '@/stores/themeStore';
import {ref, watch, computed} from "vue";
import {Hct, hexFromArgb} from '@poupe/material-color-utilities';
import BaseSlider from "@/components/material/inputs/sliders/BaseSlider.vue";
import SegmentedButtons from "@/components/material/buttons/segmented/SegmentedButtons.vue";
import FilledButton from "@/components/material/buttons/withLabels/FilledButton.vue";
import TextField from "@/components/material/inputs/TextField.vue";
import {useSnackbarStore} from "@/stores/material/snackbarStore.ts";


const themeStore = useThemeStore();
const showDecimalDialog = ref(false);

const themeModes = [
  {label: 'Clair', value: 'light'},
  {label: 'Système', value: 'auto'},
  {label: 'Sombre', value: 'dark'},
];

const hueValue = computed({
  get: () => themeStore.hue,
  set: (value) => themeStore.setHue(value)
});

const chromaValue = computed({
  get: () => themeStore.chroma,
  set: (value) => themeStore.setChroma(value)
});

const toneValue = computed({
  get: () => themeStore.tone,
  set: (value) => themeStore.setTone(value)
});

const hexValue = computed({
  get: () => themeStore.sourceColor,
  set: (value) => themeStore.setSourceColor(value)
})

const currentHctColor = computed(() => {
  try {
    const color = Hct.from(themeStore.hue, themeStore.chroma, themeStore.tone);
    return hexFromArgb(color.toInt());
  } catch (e) {
    return themeStore.sourceColor;
  }
});

const tonePreviewValues = [10, 20, 30, 40, 50, 60, 70, 80, 90];

const getColorAtTone = (tone: number) => {
  try {
    const color = Hct.from(themeStore.hue, themeStore.chroma, tone);
    return hexFromArgb(color.toInt());
  } catch (e) {
    return `hsl(0, 0%, ${tone}%)`;
  }
};

const themeMode = computed({
  get: () => {
    if (themeStore.isSystemTheme) {
      return ['auto'];
    } else if (themeStore.isDarkMode) {
      return ['dark'];
    } else {
      return ['light'];
    }
  },
  set: (newValue) => {
    if (newValue.includes('auto')) {
      themeStore.setSystemTheme();
    } else if (newValue.includes('dark')) {
      themeStore.setManualTheme(true);
    } else {
      themeStore.setManualTheme(false);
    }
  }
});

const handleHexInput = (value: string) => {
  themeStore.setSourceColor(value);
};

const handleColorInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  themeStore.setSourceColor(target.value);
};

const handleValidation = (isValid: boolean) => {
  console.log("Input hex is valid:", isValid);
};

const snackbarStore = useSnackbarStore();

async function copyColor() {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(currentHctColor.value);
      console.log('Couleur HCT copiée:', currentHctColor.value);

      snackbarStore.addNotification({
        message: `La couleur HCT a été copiée: ${currentHctColor.value}`,
        duration: 5000,
        show_close_btn: true,
        layout: "banner"
      })
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = currentHctColor.value;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      console.log('Couleur HCT copiée (fallback):', currentHctColor.value);
    }
  } catch (e) {
    console.error('Erreur de copie:', e);
  }
}

const STOPS = 20;

const chromaGradientStyle = computed(() => {
  let gradient = 'linear-gradient(to right';
  const safeHue = themeStore.hue;
  const safeTone = Math.max(10, Math.min(90, themeStore.tone));

  for (let i = 0; i <= STOPS; i++) {
    const currentChroma = (i / STOPS) * 100;
    try {
      const color = Hct.from(safeHue, currentChroma, safeTone);
      gradient += `, ${hexFromArgb(color.toInt())} ${i * (100 / STOPS)}%`;
    } catch (e) {
      const fallbackTone = Math.max(10, Math.min(90, safeTone));
      gradient += `, hsl(0, 0%, ${fallbackTone}%) ${i * (100 / STOPS)}%`;
    }
  }
  gradient += ')';
  return {background: gradient};
});

const toneGradientStyle = computed(() => {
  let gradient = 'linear-gradient(to right';
  const safeHue = themeStore.hue;
  const safeChroma = Math.min(100, Math.max(0, themeStore.chroma));

  for (let i = 0; i <= STOPS; i++) {
    const currentTone = (i / STOPS) * 100;
    try {
      const color = Hct.from(safeHue, safeChroma, currentTone);
      gradient += `, ${hexFromArgb(color.toInt())} ${i * (100 / STOPS)}%`;
    } catch (e) {
      gradient += `, hsl(0, 0%, ${currentTone}%) ${i * (100 / STOPS)}%`;
    }
  }
  gradient += ')';
  return {background: gradient};
});
</script>

<style scoped>
.hue_gradient_bg {
  background: linear-gradient(to right, #e7007d 0%, #e90070 1%, #ea0064 2%, #eb0057 3%, #ec044a 4%, #ec0e3d 5%, #eb162f 6%, #ea1c1f 7%, #e92207 8%, #e03400 9%, #d84200 10%, #d04b00 11%, #ca5100 12%, #c45600 13%, #bf5b00 14%, #ba5e00 15%, #b56100 16%, #b16400 17%, #ad6600 18%, #a96800 19%, #a56a00 20%, #a26c00 21%, #9e6e00 22%, #9b7000 23%, #977100 24%, #937300 25%, #907400 26%, #8c7600 27%, #887700 28%, #847800 29%, #7f7a00 30%, #7a7b00 31%, #757d00 32%, #6f7e00 33%, #698000 34%, #618200 35%, #588300 36%, #4c8500 37%, #3d8700 38%, #238a00 39%, #008b18 40%, #008a2f 41%, #008a3d 42%, #008948 43%, #008951 44%, #008858 45%, #00885f 46%, #008865 47%, #00876a 48%, #00876f 49%, #008673 50%, #008677 51%, #00867b 52%, #00857f 53%, #008583 54%, #008586 55%, #00848a 56%, #00848d 57%, #008491 58%, #008394 59%, #008398 60%, #00829c 61%, #00829f 62%, #0081a3 63%, #0081a7 64%, #0080ac 65%, #007fb1 66%, #007fb6 67%, #007ebb 68%, #007dc1 69%, #007bc8 70%, #007ad0 71%, #0078da 72%, #0075e5 73%, #0072f2 74%, #126eff 75%, #326bff 76%, #4568ff 77%, #5365ff 78%, #5f62ff 79%, #695fff 80%, #735bff 81%, #7d57ff 82%, #8653ff 83%, #8e4eff 84%, #9748ff 85%, #a040ff 86%, #aa37ff 87%, #b329ff 88%, #be0dff 89%, #c400f6 90%, #ca00ea 91%, #ce00de 92%, #d300d2 93%, #d600c6 94%, #da00ba 95%, #dd00ad 96%, #e000a1 97%, #e20095 98%, #e50089 99%);
}
</style>
