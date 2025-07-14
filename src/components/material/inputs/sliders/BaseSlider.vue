<template>
  <div
    class="relative flex items-center w-full gap-x-1"
    style="height: 20px;"
  >
    <div
      class="bg-surface-container-highest absolute rounded-r-full rounded-l-sm"
      :style="inactiveTrackStyle"
    />

    <div
      class="bg-primary absolute rounded-l-full rounded-r-sm h-full"
      :style="activeTrackStyle"
    />

    <div
      class="rounded-full bg-primary absolute z-10 h-full w-1.5"
      :style="thumbStyle"
    />

    <div class="rounded-full bg-primary absolute z-20 h-1 w-1 right-1"></div>
    <div class="rounded-full bg-primary absolute z-20 h-1 w-1 left-1"></div>

    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      v-model.number="modelValue"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 appearance-none bg-transparent"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, toRefs, computed} from "vue";

const props = defineProps<{
  min?: number,
  max?: number,
  step?: number,
  modelValue: number,
}>();

const emit = defineEmits(['update:modelValue']);

const {min, max} = toRefs(props);

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
  return {
    width: `calc(${percentage}% + ${thumbSize / 2}rem - 0.75rem)`,
    height: `${trackVisualSize}rem`,
    top: '50%',
    transform: 'translateY(-50%)',
    left: 0,
  };
});

const inactiveTrackStyle = computed(() => {
  const percentage = ((modelValue.value - effectiveMin.value) / (effectiveMax.value - effectiveMin.value)) * 100;
  return {
    width: `calc(${100 - percentage}% + ${thumbSize / 2}rem - 0.75rem)`,
    height: `${trackVisualSize}rem`,
    top: '50%',
    transform: 'translateY(-50%)',
    right: 0,
  };
});

const thumbStyle = computed(() => {
  const percentage = ((modelValue.value - effectiveMin.value) / (effectiveMax.value - effectiveMin.value)) * 100;
  return {
    left: `calc(${percentage}% - ${thumbSize / 2}rem)`,
    top: '50%',
    transform: 'translateY(-50%)',
  };
});
</script>
