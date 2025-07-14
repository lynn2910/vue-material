<template>
  <div class="w-full m-10">
    <div
      class="flex flex-row gap-10  p-7 bg-surface rounded-lg border border-surface-container-highest w-full">

      <!-- Sliders -->
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


      <!-- Checkbox -->
      <div class="flex flex-col items-start gap-6">
        <h3 class="text-title-medium text-on-surface">Checkbox</h3>

        <div
          class="border border-on-surface-variant/20 p-9 flex flex-col items-start rounded-xl gap-2 text-on-surface-variant">

          <p>Standard</p>
          <div class="flex flex-row items-center justify-start gap-5">
            <Checkbox name="checkbox_1" v-model="checkbox1"/>
            <Checkbox name="checkbox_2" v-model="checkbox2"/>
            <Checkbox name="checkbox_3" v-model="checkbox3"/>
            <Checkbox name="checkbox_3" v-model="checkboxDisabled" disabled/>
            <Checkbox name="checkbox_3" v-model="checkbox2Disabled" disabled/>
          </div>

          <p>Erreur</p>
          <div class="flex flex-row items-center justify-start gap-5">
            <Checkbox name="checkbox_1" v-model="checkbox1" is_error/>
            <Checkbox name="checkbox_2" v-model="checkbox2" is_error/>
            <Checkbox name="checkbox_3" v-model="checkbox3" is_error/>
            <Checkbox name="checkbox_3" v-model="checkboxDisabled" is_error disabled/>
            <Checkbox name="checkbox_3" v-model="checkbox2Disabled" is_error disabled/>
          </div>

        </div>
      </div>

      <!-- Radio -->
      <div class="flex flex-col items-start gap-6">
        <h3 class="text-title-medium text-on-surface">Radio</h3>

        <div
          class="border border-on-surface-variant/20 p-9 flex flex-col items-start rounded-xl gap-2 text-on-surface-variant h-full">

          <Radio name="radio" label="Valeur 1" :value="1" v-model="radioTest"/>
          <Radio name="radio" label="Valeur 2" :value="2" v-model="radioTest"/>
          <Radio name="radio" label="Valeur 4 (désactivée)" :value="4" v-model="radioTest"
                 disabled/>
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
import Checkbox from "@/components/material/inputs/Checkbox.vue";
import Radio from "@/components/material/inputs/Radio.vue";

const horizontalSlider1 = ref(4);
const horizontalSliderStepped = ref(3);
const horizontalRange = ref([2, 6]);

const checkbox1 = ref(0);
const checkbox2 = ref(1);
const checkbox3 = ref(-1);
const checkboxDisabled = ref(0);
const checkbox2Disabled = ref(1);

const radioTest = ref(0);
</script>
