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
          <div class="flex flex-col gap-5 w-48">
            <BaseSlider v-model="horizontalSlider1" :min="0" :max="10"/>
          </div>

          <Divider vertical/>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSlider from "@/components/material/inputs/sliders/BaseSlider.vue";
import Divider from "@/components/material/containment/dividers/Divider.vue";
import {ref} from "vue";

const horizontalSlider1 = ref(3);
const verticalSlider1 = ref(3);
</script>
