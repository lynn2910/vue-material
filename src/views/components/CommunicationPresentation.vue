<template>
  <div class="w-full m-10">
    <div
      class="flex flex-row gap-10  p-7 bg-surface rounded-lg border border-surface-container-highest w-full">

      <!-- Snackbars -->
      <div class="flex flex-col items-start gap-6">
        <h3 class="text-title-medium text-on-surface">Notifications (snackbar)</h3>

        <FilledButton label="Afficher la notification" icon="circle_notifications"
                      @click="showNotification()"/>
      </div>


      <!-- Loaders -->
      <div class="flex flex-col items-start gap-6">
        <h3 class="text-title-medium text-on-surface">Indicateur de progression</h3>

        <div
          class="border border-on-surface-variant/20 bg-surface-container-lowest p-10 h-80 rounded-xl gap-10 flex flex-row items-start">

          <div
            class="justify-between flex flex-col items-start gap-5 text-on-surface-variant h-full">

            <SegmentedButtons v-model="selectedSizeValue"
                              :items="availableSizes"
                              disallow_none
                              id="progress_indicator_thickness"/>


            <ProgressIndicator linear :percentage="percentage"
                               :thin="areProgressIndicatorsThin"
                               :medium="areProgressIndicatorsMedium"
                               :thick="areProgressIndicatorsThick"/>


            <ProgressIndicator linear indeterminate
                               :animationDuration="percentageAnimationDuration"
                               :thin="areProgressIndicatorsThin"
                               :medium="areProgressIndicatorsMedium"
                               :thick="areProgressIndicatorsThick"/>


            <div class="flex flex-row gap-6 w-full h-20 items-center">
              <ProgressIndicator circular :percentage="percentage"
                                 :thin="areProgressIndicatorsThin"
                                 :medium="areProgressIndicatorsMedium"
                                 :thick="areProgressIndicatorsThick"/>


              <ProgressIndicator circular indeterminate
                                 :animationDuration="percentageAnimationDuration"
                                 :thin="areProgressIndicatorsThin"
                                 :medium="areProgressIndicatorsMedium"
                                 :thick="areProgressIndicatorsThick"/>

              <p class="m-auto text-headline-large text-primary font-medium">
                {{ Math.floor(percentage) }}<span class="text-title-medium">%</span>
              </p>
            </div>

          </div>

          <Divider vertical/>

          <div class="flex flex-col justify-between h-full">
            <SegmentedButtons :items="percentageEvolutionMethod"
                              disallow_none
                              id="progress_indicators_percentage_evolution_method"
                              v-model="selectedPercentageEvolutionMethod"/>

            <p v-if="selectedPercentageEvolutionMethod === 'random'" class="text-on-surface">
              Méthode aléatoire sélectionnée
            </p>

            <FilledButton label="Réinitialiser" icon="refresh"
                          @click="updatePercentage(0)"/>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import FilledButton from "@/components/material/buttons/withLabels/FilledButton.vue";
import {useSnackbarStore} from "@/stores/material/snackbarStore.ts";
import ProgressIndicator
  from "@/components/material/communication/progress_indicators/ProgressIndicator.vue";
import CircularLoader
  from "@/components/material/communication/progress_indicators/CircularLoader.vue";
import SegmentedButtons from "@/components/material/buttons/segmented/SegmentedButtons.vue";
import {computed, onMounted, ref} from "vue";
import Divider from "@/components/material/containment/dividers/Divider.vue";

// Snackbars

const snackbarStore = useSnackbarStore();

function showNotification() {
  snackbarStore.addNotification({
    message: "A single message snackbar",
    duration: 0,
    show_close_btn: true,
  })
}

// Progress Indicators
const availableSizes = [
  {label: 'small', value: 'small'},
  {label: 'medium', value: 'medium'},
  {label: 'large', value: 'large'},
];
let selectedSizeValue = ref('medium');

let areProgressIndicatorsThin = computed(() => selectedSizeValue.value === 'small');
let areProgressIndicatorsMedium = computed(() => selectedSizeValue.value === 'medium');
let areProgressIndicatorsThick = computed(() => selectedSizeValue.value === 'large');

const percentage = ref(0);
let percentageAnimationDuration = ref(0);

let percentageEvolutionMethod = [
  {label: 'Aléatoire', value: 'random'},
  {label: 'Slider', value: 'slider'}
];

const selectedPercentageEvolutionMethod = ref('random');

function updatePercentage(new_percentage: number) {
  percentage.value = new_percentage;
  if (percentage.value > 100) percentage.value = 0;
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// hé hé
onMounted(async () => {
  do {
    let wait_time = percentage.value >= 100 ? 2000 : 250 + Math.random() * 1000;
    percentageAnimationDuration.value = wait_time - 250;

    if (selectedPercentageEvolutionMethod.value === 'random') {
      if (percentage.value >= 100) {
        updatePercentage(0);
      } else {
        updatePercentage(Math.min(percentage.value + (Math.random() * 17.98), 100))
      }
    }

    console.log(wait_time);
    await wait(wait_time);
  } while (true);

})
</script>
