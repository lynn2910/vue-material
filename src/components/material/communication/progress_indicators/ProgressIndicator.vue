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
</script>

<style scoped>
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
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
}

.linear-progress-slow {
  animation: linear-progress-indeterminate-slow 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}

.linear-progress-fast {
  animation: linear-progress-indeterminate-fast 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  animation-delay: 1.15s;
}
</style>
