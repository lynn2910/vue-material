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
      class="absolute rounded-l-full rounded-r-sm h-full flex flex-row justify-around items-center"
      :class="props.disabled ? 'bg-on-surface-variant/35' : 'bg-primary'"
      :style="activeTrackStyle"/>

    <!-- step points -->
    <div v-if="stepPoints">
      <span v-for="p in stepPoints" :key="p"
            class="w-1 h-1 bg-surface-container-highest rounded-full absolute z-30 top-1/2 -translate-y-1/2"
            :style="{
              'left': `calc(${((p - effectiveMin) / (effectiveMax - effectiveMin)) * 100}% * 0.95 + 2.5% - 0.125rem)`
           }"
            :class="{
              'opacity-100': isPointActive(p),
              'opacity-0': !isPointActive(p),
           }"/>
    </div>

    <div
      class="rounded-full absolute z-10 h-full w-1.5"
      :class="props.disabled ? 'bg-on-surface-variant/35' : 'bg-primary'"
      :style="thumbStyle"
    />

    <div v-show="modelValue > effectiveMin"
         class="rounded-full bg-primary absolute z-20 h-1 w-1 left-1"></div>
    <div v-show="modelValue < effectiveMax"
         class="rounded-full bg-primary absolute z-20 h-1 w-1 right-1"></div>

    <input
      type="range"
      :min="min"
      :max="max"
      :disabled="props.disabled"
      :step="effectiveStep"
      v-model.number="modelValue"
      :class="props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
      class="absolute inset-0 w-full h-full opacity-0 z-20 appearance-none bg-transparent"
    />
  </div>
</template>

<script setup lang="ts">
import {toRefs, computed} from "vue";

const props = defineProps<{
  min?: number,
  max?: number,
  step?: number,
  modelValue: number,
  maxStepPoints?: number,
  showSteps?: boolean,

  disabled?: boolean
}>();

const emit = defineEmits(['update:modelValue']);

const {min, max} = toRefs(props);

const effectiveMin = computed(() => min?.value ?? 0);
const effectiveMax = computed(() => max?.value ?? 100);
const effectiveStep = computed(() => props.step ?? 1);

const stepPoints = computed(() => {
  if (!props.showSteps || !props.step || props.step <= 0) return [];

  const points = [];
  const range = effectiveMax.value - effectiveMin.value;
  const stepCount = Math.floor(range / effectiveStep.value);

  const allPoints = [];
  for (let i = 0; i <= stepCount; i++) {
    const point = effectiveMin.value + (effectiveStep.value * i);
    if (point <= effectiveMax.value) {
      allPoints.push(point);
    }
  }

  const maxPoints = props.maxStepPoints ?? 20;

  if (allPoints.length <= maxPoints) {
    return allPoints;
  }

  const interval = Math.ceil(allPoints.length / maxPoints);
  for (let i = 0; i < allPoints.length; i += interval) {
    points.push(allPoints[i]);
  }

  if (points[points.length - 1] !== allPoints[allPoints.length - 1]) {
    points.push(allPoints[allPoints.length - 1]);
  }

  return points;
});

const modelValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
});

const isPointActive = (point: number) => {
  const pointPositionPercent = ((point - effectiveMin.value) / (effectiveMax.value - effectiveMin.value)) * 100;
  const pointPosition = pointPositionPercent * 0.95 + 2.5;

  const thumbPositionPercent = ((modelValue.value - effectiveMin.value) / (effectiveMax.value - effectiveMin.value)) * 100;
  const thumbPosition = thumbPositionPercent * 0.95 + 2.5;

  return pointPosition < thumbPosition;
};

const thumbSize = 0.375;
const trackVisualSize = 0.625;

const activeTrackStyle = computed(() => {
  const percentage = ((modelValue.value - effectiveMin.value) / (effectiveMax.value - effectiveMin.value)) * 100;
  const adjustedPercentage = percentage * 0.95 + 2.5;
  return {
    width: `calc(${adjustedPercentage}% - 5% + ${thumbSize / 2}rem)`,
    height: `${trackVisualSize}rem`,
    top: '50%',
    transform: 'translateY(-50%)',
    left: '0',
  };
});

const inactiveTrackStyle = computed(() => {
  const percentage = ((modelValue.value - effectiveMin.value) / (effectiveMax.value - effectiveMin.value)) * 100;
  const adjustedPercentage = percentage * 0.95 + 2.5;
  return {
    width: `calc(${100 - adjustedPercentage}% - 5% + ${thumbSize / 2}rem)`,
    height: `${trackVisualSize}rem`,
    top: '50%',
    transform: 'translateY(-50%)',
    right: '0',
  };
});

const thumbStyle = computed(() => {
  const percentage = ((modelValue.value - effectiveMin.value) / (effectiveMax.value - effectiveMin.value)) * 100;
  return {
    left: `calc(${percentage * 0.95 + 2.5}% - ${thumbSize / 2}rem)`,
    top: '50%',
    transform: 'translateY(-50%)',
  };
});
</script>
