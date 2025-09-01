<template>
  <div class="m-10">
    <div
      class="flex flex-col gap-10  p-7 bg-surface rounded-lg border border-surface-container-highest w-full">

      <!-- Snackbars -->
      <div class="flex flex-col items-start gap-6">
        <h3 class="text-title-medium text-on-surface">Notifications (snackbar)</h3>

        <FilledButton label="Afficher la notification" icon="circle_notifications"
                      :disabled="messageRef.length === 0"
                      @click="showNotification()"/>

        <div
          class="border border-on-surface-variant/20 bg-surface-container-lowest p-10 h-[30rem] rounded-xl gap-10 flex flex-row items-start">

          <div class="flex flex-col gap-10">

            <SegmentedButtons :items="availableLayout" id="banner_or_float" v-model="layoutRef"
                              :disallow_none="true"/>

            <Divider horizontal/>

            <div>
              <!-- Duration -->
              <BaseSlider v-model="durationRef" :min="0" :max="6000"
                          :step="100"/>
              <div class="flex flex-row justify-between my-3">
                <p><b>Durée d'affichage:</b></p>
                <p>{{ durationRef / 1000 }}s</p>
              </div>
              <br>
              <!-- Grid -->
              <div class="grid grid-cols-3 grid-rows-3 gap-1 w-40">
                <FilledIcon @click="updatePosition('top-left')"
                            :disabled="!isFloatingSnackbar || positionRef === 'top-left'"
                            icon="north_west"/>
                <FilledIcon @click="updatePosition('top-center')"
                            :disabled="!isFloatingSnackbar || positionRef === 'top-center'"
                            icon="north"/>
                <FilledIcon @click="updatePosition('top-right')"
                            :disabled="!isFloatingSnackbar || positionRef === 'top-right'"
                            icon="north_east"/>

                <FilledIcon @click="updatePosition('center-left')"
                            :disabled="!isFloatingSnackbar || positionRef === 'center-left'"
                            icon="west"/>
                <div></div>
                <FilledIcon @click="updatePosition('center-right')"
                            :disabled="!isFloatingSnackbar || positionRef === 'center-right'"
                            icon="east"/>

                <FilledIcon @click="updatePosition('bottom-left')"
                            :disabled="!isFloatingSnackbar || positionRef === 'bottom-left'"
                            icon="south_west"/>
                <FilledIcon @click="updatePosition('bottom-center')"
                            :disabled="!isFloatingSnackbar || positionRef === 'bottom-center'"
                            icon="south"/>
                <FilledIcon @click="updatePosition('bottom-right')"
                            :disabled="!isFloatingSnackbar || positionRef === 'bottom-right'"
                            icon="south_east"/>
              </div>
              <div class="flex flex-row justify-between my-6">
                <p><b>Sélectionné:</b></p>
                <p>{{ positionRef }}</p>
              </div>
            </div>

          </div>

          <Divider vertical/>

          <div class="flex flex-col">
            <TextField v-model="messageRef" label="Message" type="text" id="snackbar_message"
                       name="message"
                       class="w-96"/>
          </div>

        </div>
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

      <div class="flex flex-col items-start gap-6">
        <h3 class="text-title-medium text-on-surface">Dialogs</h3>

        <div
          class="border border-on-surface-variant/20 bg-surface-container-lowest p-10 rounded-xl gap-10 flex flex-row items-start">

          <FilledButton label="Show dialog" @click="showDialog = !showDialog"/>

          <Dialog v-if="showDialog"
                  icon="warning"
                  headline="Êtes vous sûr ?"
                  :buttons="dialogButtons"
                  @dismiss="showDialog = false">
            <p>Vous êtes sur le point de ne rien faire.</p>
            <p>C'est très dangereux, vous êtes vraiment sûr de vous ?</p>
          </Dialog>

        </div>
      </div>

      <div class="flex flex-col items-start gap-6">
        <h3 class="text-title-medium text-on-surface">Tooltips</h3>

        <div
          class="border border-on-surface-variant/20 bg-surface-container-lowest p-10 rounded-xl gap-10 flex flex-col items-start">

          <p>
            Souvent confondu avec son célèbre
            <rich-tooltip label="homonyme" subhead="Le grand panda"
                          :actions="[{label: 'En savoir plus', onClick: () => {}}]">
              <p>
                L'homonyme du <b>panda roux</b> est le <b>grand panda</b>, une autre espèce
                emblématique qui vit aussi en Asie. Malgré leur nom en commun, ils ne sont pas si
                proches sur le plan <i>génétique</i>
              </p>
            </rich-tooltip>
            , le panda roux est un mammifère arboricole
            qui vit dans les forêts tempérées de l'Himalaya oriental. Avec sa fourrure rousse et sa
            longue queue touffue, il ressemble plus à un raton laveur qu'à un ours.
          </p>

          <rich-tooltip>
            Aide

            <template #label>
              <Icon icon="help"/>
            </template>
          </rich-tooltip>

          <plain-tooltip message="Get help">
            <ButtonIcon icon="help"/>
          </plain-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilledButton from "@/components/material/buttons/withLabels/FilledButton.vue";
import {
  type SnackbarLayout,
  type SnackbarPosition,
  useSnackbarStore
} from "@/stores/material/snackbarStore.ts";
import ProgressIndicator
  from "@/components/material/communication/progress_indicators/ProgressIndicator.vue";
import CircularLoader
  from "@/components/material/communication/progress_indicators/CircularLoader.vue";
import SegmentedButtons from "@/components/material/buttons/segmented/SegmentedButtons.vue";
import {computed, onMounted, ref} from "vue";
import Divider from "@/components/material/containment/dividers/Divider.vue";
import TextField from "@/components/material/inputs/TextField.vue";
import BaseSlider from "@/components/material/inputs/sliders/BaseSlider.vue";
import ButtonIcon from "@/components/material/buttons/icons/ButtonIcon.vue";
import FilledIcon from "@/components/material/buttons/icons/FilledIcon.vue";
import Dialog from "@/components/material/communication/Dialog.vue";
import RichTooltip from "@/components/material/communication/tooltip/rich-tooltip.vue";
import Icon from "@/components/material/Icon.vue";
import PlainTooltip from "@/components/material/communication/tooltip/plain-tooltip.vue";

const showDialog = ref(false);
const dialogButtons = [
  {
    label: "Annuler",
    onClick: () => {
      showDialog.value = false;
    }
  },
  {
    label: "Confirmer",
    onClick: () => {
      showDialog.value = false;
    }
  }
]

// Snackbars

const snackbarStore = useSnackbarStore();

const layoutRef = ref('banner');
const availableLayout = [
  {label: 'Banner', value: 'banner'},
  {label: 'Floating', value: 'float'},
]

const positionRef = ref('bottom-right');
const durationRef = ref(0);
const messageRef = ref('Une notification');

function updatePosition(new_position: string) {
  positionRef.value = new_position;
}

const isFloatingSnackbar = computed(() => layoutRef.value === 'float');


function showNotification() {
  snackbarStore.addNotification({
    message: messageRef.value,
    duration: durationRef.value,
    show_close_btn: true,
    position: positionRef.value as SnackbarPosition,
    layout: layoutRef.value as SnackbarLayout
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
  } while (true); // oxlint-disable-line no-constant-condition
})
</script>
