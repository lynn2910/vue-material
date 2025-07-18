<template>
  <!-- Linear determinate -->
  <div v-if="props.linear && !props.indeterminate"
       class="relative w-full rounded-full bg-secondary-container"
       :style="{ height: strikeThickness + 'px'}">

    <div class="absolute left-0 top-0 bg-primary h-full rounded-full progress-bar-transition"
         v-if="props.percentage && props.percentage > 0"
         :style="{width: `${Math.min(props.percentage, 100)}%`}"/>
    <!-- Stop -->
    <div class="absolute right-0 top-0 bg-primary h-full rounded-full"
         :style="{width: `${strikeThickness}px`}"/>
  </div>
  <!-- Linear indeterminate-->
  <div v-else-if="props.linear"
       class="relative w-full rounded-full bg-secondary-container overflow-hidden"
       :style="{ height: strikeThickness + 'px'}">

    <div class="absolute top-0 h-full bg-primary rounded-full linear-progress-slow"/>
    <div class="absolute top-0 h-full bg-primary rounded-full linear-progress-fast"/>

  </div>

  <!-- Circular determinate -->
  <div v-else-if="props.circular && !props.indeterminate"
       class="relative inline-block"
       :style="{ width: circularSize + 'px', height: circularSize + 'px' }">

    <svg class="transform -rotate-90" :width="circularSize" :height="circularSize">
      <!-- Background circle -->
      <circle
        :cx="circularSize / 2"
        :cy="circularSize / 2"
        :r="circularRadius"
        fill="none"
        class="stroke-secondary-container"
        :stroke-width="strikeThickness"
      />
      <!-- Progress circle -->
      <circle
        v-if="props.percentage && props.percentage > 0"
        :cx="circularSize / 2"
        :cy="circularSize / 2"
        :r="circularRadius"
        fill="none"
        class="stroke-primary circular-progress-transition"
        :stroke-width="strikeThickness"
        :stroke-dasharray="circularCircumference"
        :stroke-dashoffset="circularDashOffset"
        stroke-linecap="round"
      />
    </svg>
  </div>

  <!-- Circular indeterminate -->
  <div v-else-if="props.circular"
       class="relative inline-block"
       :style="{ width: circularSize + 'px', height: circularSize + 'px' }">

    <svg class="transform -rotate-90 circular-progress-indeterminate" :width="circularSize"
         :height="circularSize">
      <!-- Background circle -->
      <circle
        :cx="circularSize / 2"
        :cy="circularSize / 2"
        :r="circularRadius"
        fill="none"
        class="stroke-secondary-container"
        :stroke-width="strikeThickness"
      />
      <!-- Progress circle -->
      <circle
        :cx="circularSize / 2"
        :cy="circularSize / 2"
        :r="circularRadius"
        fill="none"
        class="stroke-primary"
        :stroke-width="strikeThickness"
        :stroke-dasharray="circularCircumference"
        :stroke-dashoffset="circularCircumference * 0.8"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">

import {computed} from "vue";

const props = defineProps<{
  circular?: boolean,
  linear?: boolean,

  thin?: boolean,
  thick?: boolean,

  percentage?: number,
  indeterminate?: boolean,

  animationDuration?: number,
  animationEasing?: string,
}>();

const strikeThickness = computed(() => {
  if (props.thin) return 6;
  else if (props.thick) return 10;
  else return 8;
});

const circularSize = computed(() => {
  if (props.thin) return 45;
  else if (props.thick) return 70;
  else return 55;
});

const circularRadius = computed(() => {
  return (circularSize.value - strikeThickness.value) / 2;
});

const circularCircumference = computed(() => {
  return 2 * Math.PI * circularRadius.value;
});

const circularDashOffset = computed(() => {
  if (!props.percentage) return circularCircumference.value;
  return circularCircumference.value * (1 - (Math.min(props.percentage, 100)) / 100);
});

const animationDuration = computed(() => props.animationDuration || 1000);
const animationEasing = computed(() => props.animationEasing || 'cubic-bezier(.6,0,.52,1)');
</script>

<style scoped>
.progress-bar-transition {
  transition: width v-bind(animationDuration+ 'ms') v-bind(animationEasing);
}

.circular-progress-transition {
  transition: stroke-dashoffset v-bind(animationDuration+ 'ms') v-bind(animationEasing);
}

@keyframes linear-progress-indeterminate-slow {
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
}

@keyframes linear-progress-indeterminate-fast {
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -90%;
  }
  100% {
    left: 107%;
    right: -90%;
  }
}

.linear-progress-slow {
  animation: linear-progress-indeterminate-slow 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}

.linear-progress-fast {
  animation: linear-progress-indeterminate-fast 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  animation-delay: 1.15s;
}

@keyframes circular-progress-indeterminate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.circular-progress-indeterminate {
  animation: circular-progress-indeterminate 1.4s linear infinite;
}
</style>
