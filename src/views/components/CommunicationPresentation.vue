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
          class="border border-on-surface-variant/20 p-10 flex flex-col items-start rounded-xl gap-5 text-on-surface-variant bg-surface-container-lowest">

          <SegmentedButtons v-model="selectedSizeValue"
                            :items="availableSizes"
                            disallow_none
                            id="progress_indicator_thickness"/>

          <ProgressIndicator linear :percentage="58"
                             :thin="areProgressIndicatorsThin"
                             :medium="areProgressIndicatorsMedium"
                             :thick="areProgressIndicatorsThick"/>


          <ProgressIndicator linear indeterminate
                             :thin="areProgressIndicatorsThin"
                             :medium="areProgressIndicatorsMedium"
                             :thick="areProgressIndicatorsThick"/>


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
import {computed, ref} from "vue";

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
let selectedSizeValue = ref(['medium']);

let areProgressIndicatorsThin = computed(() => selectedSizeValue.value[0] === 'small');
let areProgressIndicatorsMedium = computed(() => selectedSizeValue.value[0] === 'medium');
let areProgressIndicatorsThick = computed(() => selectedSizeValue.value[0] === 'large');
</script>
