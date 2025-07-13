<template>
  <!-- Linear determinate -->
  <div v-if="props.linear && !props.indeterminate"
       class="relative w-full rounded-full bg-secondary-container"
       :style="{ height: strikeThickness + 'px'}">

    <div class="absolute left-0 top-0 bg-primary h-full rounded-full"
         v-if="props.percentage && props.percentage > 0"
         :style="{width: `${props.percentage}%`}"/>
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
        class="stroke-primary"
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
  return circularCircumference.value * (1 - props.percentage / 100);
});
</script>

<style scoped>
@keyframes linear-progress-indeterminate-slow {
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -70%;
  }
  100% {
    left: 100%;
    right: -70%;
  }
}

@keyframes linear-progress-indeterminate-fast {
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: 15%;
  }
  100% {
    left: 107%;
    right: 15%;
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
