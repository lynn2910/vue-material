<template>
  <div
    class="relative flex items-center w-full gap-x-1"
    style="height: 20px;"
  >
    <div
      class="bg-surface-container-highest absolute rounded-r-sm rounded-l-full"
      :style="inactiveTrackStartStyle"
    />

    <div
      class="bg-primary absolute h-full"
      :style="activeTrackStyle"
    />

    <div
      class="bg-surface-container-highest absolute rounded-l-sm rounded-r-full"
      :style="inactiveTrackEndStyle"
    />

    <div
      class="rounded-full bg-primary absolute z-10 h-full w-1.5"
      :style="thumbStartStyle"
    />

    <div
      class="rounded-full bg-primary absolute z-10 h-full w-1.5"
      :style="thumbEndStyle"
    />

    <div v-show="(modelValue[0] > effectiveMin) && (modelValue[1] > effectiveMin)"
         class="rounded-full bg-primary absolute z-20 h-1 w-1 left-1"></div>
    <div v-show="(modelValue[0] < effectiveMax) && (modelValue[1] < effectiveMax)"
         class="rounded-full bg-primary absolute z-20 h-1 w-1 right-1"></div>

    <input
      type="range"
      :min="effectiveMin"
      :max="effectiveMax"
      :step="effectiveStep"
      :value="modelValue[0]"
      @input="event => updateStartValue((event.target as HTMLInputElement).value)"
      @mousedown="activeSlider = 'start'"
      :class="[
        'absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none bg-transparent',
        getSliderZIndex('start')
      ]"
      :style="getSliderClipPath('start')"
    />

    <input
      type="range"
      :min="effectiveMin"
      :max="effectiveMax"
      :step="effectiveStep"
      :value="modelValue[1]"
      @input="event => updateEndValue((event.target as HTMLInputElement).value)"
      @mousedown="activeSlider = 'end'"
      :class="[
        'absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none bg-transparent',
        getSliderZIndex('end')
      ]"
      :style="getSliderClipPath('end')"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, toRefs, computed} from "vue";

const props = defineProps<{
  min?: number;
  max?: number;
  step?: number;
  modelValue: number[];
}>();

const emit = defineEmits(["update:modelValue"]);

const {min, max} = toRefs(props);

const effectiveMin = computed(() => min?.value ?? 0);
const effectiveMax = computed(() => max?.value ?? 100);
const effectiveStep = computed(() => props.step ?? 1);

const thumbSizePx = 6;
const trackVisualSizeRem = 0.625;
const trackGap = 4;

const activeSlider = ref<'start' | 'end'>('start');

const updateStartValue = (newValue: string) => {
  let newStart = parseFloat(newValue);

  if (newStart > props.modelValue[1]) {
    newStart = props.modelValue[1];
  }
  emit("update:modelValue", [newStart, props.modelValue[1]]);
};

const updateEndValue = (newValue: string) => {
  let newEnd = parseFloat(newValue);

  if (newEnd < props.modelValue[0]) {
    newEnd = props.modelValue[0];
  }
  emit("update:modelValue", [props.modelValue[0], newEnd]);
};

const getPercentage = (value: number) => {
  return (
    ((value - effectiveMin.value) /
      (effectiveMax.value - effectiveMin.value)) *
    100
  );
};

const thumbStartStyle = computed(() => {
  const percentage = getPercentage(props.modelValue[0]);
  return {
    left: `calc(${percentage}% - ${thumbSizePx / 2}px)`,
    top: "50%",
    transform: "translateY(-50%)",
  };
});

const thumbEndStyle = computed(() => {
  const percentage = getPercentage(props.modelValue[1]);
  return {
    left: `calc(${percentage}% - ${thumbSizePx / 2}px)`,
    top: "50%",
    transform: "translateY(-50%)",
  };
});

const activeTrackStyle = computed(() => {
  const startPercentage = getPercentage(props.modelValue[0]);
  const endPercentage = getPercentage(props.modelValue[1]);
  const widthPercentage = endPercentage - startPercentage;

  return {
    left: `calc(${startPercentage}% + ${thumbSizePx / 2}px + ${trackGap / 2}px + 0.25rem)`,
    width: `calc(${widthPercentage}% - ${thumbSizePx}px - ${trackGap}px - 0.5rem)`,
    height: `${trackVisualSizeRem}rem`,
    top: "50%",
    transform: "translateY(-50%)",
  };
});

const inactiveTrackStartStyle = computed(() => {
  const startPercentage = getPercentage(props.modelValue[0]);
  return {
    left: 0,
    width: `calc(${startPercentage}% + ${thumbSizePx / 2}px - ${trackGap / 2}px - 0.75rem)`,
    height: `${trackVisualSizeRem}rem`,
    top: "50%",
    transform: "translateY(-50%)",
  };
});

const inactiveTrackEndStyle = computed(() => {
  const endPercentage = getPercentage(props.modelValue[1]);
  return {
    right: 0,
    width: `calc(${100 - endPercentage}% + ${thumbSizePx / 2}px - ${trackGap / 2}px - 0.75rem)`,
    height: `${trackVisualSizeRem}rem`,
    top: "50%",
    transform: "translateY(-50%)",
  };
});

const getSliderClipPath = (slider: 'start' | 'end') => {
  const startPercentage = getPercentage(props.modelValue[0]);
  const endPercentage = getPercentage(props.modelValue[1]);

  const isOverlapping = Math.abs(endPercentage - startPercentage) < 5;

  if (isOverlapping) {
    if (activeSlider.value === slider) {
      return {clipPath: 'inset(0 0 0 0)'};
    } else {
      return {clipPath: 'inset(0 100% 0 0)'};
    }
  } else {
    const midPoint = (startPercentage + endPercentage) / 2;

    if (slider === 'start') {
      return {clipPath: `inset(0 ${100 - midPoint}% 0 0)`};
    } else {
      return {clipPath: `inset(0 0 0 ${midPoint}%)`};
    }
  }
};

const getSliderZIndex = (slider: 'start' | 'end') => {
  const startPercentage = getPercentage(props.modelValue[0]);
  const endPercentage = getPercentage(props.modelValue[1]);
  const isOverlapping = Math.abs(endPercentage - startPercentage) < 5;

  if (isOverlapping && activeSlider.value === slider) {
    return 'z-30';
  }
  return 'z-20';
};
</script>
