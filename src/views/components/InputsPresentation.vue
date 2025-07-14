<template>
  <div class="w-full m-10">
    <div
      class="flex flex-row gap-10  p-7 bg-surface rounded-lg border border-surface-container-highest w-full">

      <!-- Snackbars -->
      <div class="flex flex-col items-start gap-6">
        <h3 class="text-title-medium text-on-surface">Sliders</h3>

        <div
          class="border border-on-surface-variant/20 p-10 flex flex-row items-start rounded-xl gap-5 text-on-surface-variant">

          <!-- Horizontal -->
          <div class="flex flex-col gap-5 w-64">
            <BaseSlider v-model="horizontalSlider1" :min="0" :max="10"/>
            <BaseSlider v-model="horizontalSliderStepped" :min="0" :max="10" :step="1" showSteps/>
            <RangeSlider v-model="horizontalRange" :min="0" :max="10"/>
          </div>

          <Divider vertical/>

          <div class="flex flex-col gap-3.5 w-64">
            <p class="m-0">{{ horizontalSlider1 }}</p>
            <p class="m-0">{{ horizontalSliderStepped }}</p>
            <p class="m-0">{{ horizontalRange[0] }} - {{ horizontalRange[1] }}</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSlider from "@/components/material/inputs/sliders/BaseSlider.vue";
import Divider from "@/components/material/containment/dividers/Divider.vue";
import {ref} from "vue";
import RangeSlider from "@/components/material/inputs/sliders/RangeSlider.vue";

const horizontalSlider1 = ref(4);
const horizontalSliderStepped = ref(3);
const horizontalRange = ref([2, 6]);
</script>
