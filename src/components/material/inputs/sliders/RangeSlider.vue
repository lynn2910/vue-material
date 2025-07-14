<template>
  <div
    class="relative flex items-center w-full gap-x-1"
    style="height: 20px;"
  >
    <div
      class="bg-surface-container-highest absolute rounded-l-sm"
      :style="inactiveTrackStartStyle"
    />

    <div
      class="bg-primary absolute rounded-full h-full"
      :style="activeTrackStyle"
    />

    <div
      class="bg-surface-container-highest absolute rounded-r-sm"
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

    <div class="rounded-full bg-primary absolute z-20 h-1 w-1 right-1"></div>
    <div class="rounded-full bg-primary absolute z-20 h-1 w-1 left-1"></div>

    <input
      type="range"
      :min="effectiveMin"
      :max="effectiveMax"
      :step="effectiveStep"
      :value="modelValue[0]"
      @input="event => updateStartValue((event.target as HTMLInputElement).value)"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 appearance-none bg-transparent"
      :style="{ clipPath: 'inset(0 50% 0 0)' }"
    />

    <input
      type="range"
      :min="effectiveMin"
      :max="effectiveMax"
      :step="effectiveStep"
      :value="modelValue[1]"
      @input="event => updateEndValue((event.target as HTMLInputElement).value)"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 appearance-none bg-transparent"
      :style="{ clipPath: 'inset(0 0 0 50%)' }"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, toRefs, computed} from "vue";

const props = defineProps<{
  min?: number;
  max?: number;
  step?: number;
  modelValue: [number, number];
}>();

const emit = defineEmits(["update:modelValue"]);

const {min, max} = toRefs(props);

const effectiveMin = computed(() => min?.value ?? 0);
const effectiveMax = computed(() => max?.value ?? 100);
const effectiveStep = computed(() => props.step ?? 1);

const thumbSizePx = 6;
const trackVisualSizeRem = 0.625;

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
    left: `calc(${startPercentage}% + ${thumbSizePx / 2}px + 0.25rem)`,
    width: `calc(${widthPercentage}% - ${thumbSizePx}px - 0.5rem)`,
    height: `${trackVisualSizeRem}rem`,
    top: "50%",
    transform: "translateY(-50%)",
  };
});

const inactiveTrackStartStyle = computed(() => {
  const startPercentage = getPercentage(props.modelValue[0]);
  return {
    left: 0,
    width: `calc(${startPercentage}% + ${thumbSizePx / 2}px)`,
    height: `${trackVisualSizeRem}rem`,
    top: "50%",
    transform: "translateY(-50%)",
  };
});

const inactiveTrackEndStyle = computed(() => {
  const endPercentage = getPercentage(props.modelValue[1]);
  return {
    right: 0,
    width: `calc(${100 - endPercentage}% + ${thumbSizePx / 2}px)`,
    height: `${trackVisualSizeRem}rem`,
    top: "50%",
    transform: "translateY(-50%)",
  };
});
</script>
