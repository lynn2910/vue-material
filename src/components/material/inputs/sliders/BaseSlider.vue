<template>
  <div
    class="relative flex items-center w-full gap-x-1"
    :class="{
      'flex-row': horizontal,
      'flex-col': vertical,
    }"
    style="height: 20px;"
  >
    <div
      class="bg-surface-container-highest absolute"
      :class="{
        'rounded-r-full rounded-l-sm': horizontal,
        'rounded-b-full rounded-t-sm': vertical,
      }"
      :style="inactiveTrackStyle"
    />

    <div
      class="bg-primary absolute"
      :class="{
        'rounded-l-full rounded-r-sm h-full': horizontal,
        'rounded-t-full rounded-b-sm w-full': vertical,
      }"
      :style="activeTrackStyle"
    />

    <div
      class="rounded-full bg-primary absolute z-10"
      :class="{
        'h-full w-1.5': horizontal,
        'w-full h-1.5': vertical,
      }"
      :style="thumbStyle"
    />

    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="modelValue"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
      :class="{
        'appearance-none': true,
        'bg-transparent': true,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, toRefs, computed} from "vue";

const props = defineProps<{
  horizontal?: boolean,
  vertical?: boolean,
  min?: number,
  max?: number,
  step?: number,
  modelValue: number,
}>();

const emit = defineEmits(['update:modelValue']);

const {horizontal, vertical, min, max} = toRefs(props);

const effectiveMin = computed(() => min?.value ?? 0);
const effectiveMax = computed(() => max?.value ?? 100);
const effectiveStep = computed(() => props.step ?? 1);

const modelValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
});

const thumbSize = 0.375;
const trackVisualSize = 0.625;

const activeTrackStyle = computed(() => {
  const percentage = ((modelValue.value - effectiveMin.value) / (effectiveMax.value - effectiveMin.value)) * 100;
  if (horizontal.value) {
    return {
      width: `calc(${percentage}% + ${thumbSize / 2}rem - 0.75rem)`,
      height: `${trackVisualSize}rem`,
      top: '50%',
      transform: 'translateY(-50%)',
      left: 0,
    };
  } else {
    return {
      height: `calc(${percentage}% + ${thumbSize / 2}rem - 0.75rem)`,
      width: `${trackVisualSize}rem`,
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: 0,
    };
  }
});

const inactiveTrackStyle = computed(() => {
  const percentage = ((modelValue.value - effectiveMin.value) / (effectiveMax.value - effectiveMin.value)) * 100;
  if (horizontal.value) {
    return {
      width: `calc(${100 - percentage}% + ${thumbSize / 2}rem - 0.75rem)`,
      height: `${trackVisualSize}rem`,
      top: '50%',
      transform: 'translateY(-50%)',
      right: 0,
    };
  } else {
    return {
      height: `calc(${100 - percentage}% + ${thumbSize / 2}rem - 0.75rem))`,
      width: `${trackVisualSize}rem`,
      left: '50%',
      transform: 'translateX(-50%)',
      top: 0,
    };
  }
});

const thumbStyle = computed(() => {
  const percentage = ((modelValue.value - effectiveMin.value) / (effectiveMax.value - effectiveMin.value)) * 100;
  if (horizontal.value) {
    return {
      left: `calc(${percentage}% - ${thumbSize / 2}rem)`,
      top: '50%',
      transform: 'translateY(-50%)',
    };
  } else {
    return {
      bottom: `calc(${percentage}% - ${thumbSize / 2}rem)`,
      left: '50%',
      transform: 'translateX(-50%)',
    };
  }
});
</script>
