<template>
  <div class="m-10 h-full flex flex-row">
    <div
      class="flex flex-col gap-10  p-7 bg-surface rounded-lg border border-surface-container-highest w-full">

      <div class="flex flex-row gap-10">
        <!-- Cards -->
        <div class="flex flex-col items-start gap-6">
          <h3 class="text-title-medium text-on-surface">Cards</h3>

          <div class="flex flex-col md:flex-row gap-6">

            <div class="h-36 w-36">
              <OutlinedCard>

                <div class="flex items-center justify-center h-full w-full text-on-surface-variant">
                  Outlined
                </div>

              </OutlinedCard>
            </div>
            <div class="h-36 w-36">
              <FilledCard>

                <div class="flex items-center justify-center h-full w-full text-on-surface-variant">
                  Filled
                </div>

              </FilledCard>
            </div>
          </div>
        </div>

        <!-- Dividers -->
        <div class="flex flex-col items-start gap-6">
          <h3 class="text-title-medium text-on-surface">Diviseurs</h3>

          <div
            class="border border-on-surface-variant/20 p-10 flex flex-col items-start rounded-xl gap-5 text-on-surface-variant">
            <Divider horizontal/>
            <Divider horizontal label="Centre"/>

            <div class="flex flex-row items-center gap-2">
              <Icon icon="format_align_left"/>
              <Icon icon="format_align_center"/>
              <Icon icon="format_align_right"/>
              <Divider vertical/>
              <Icon icon="format_bold"/>
              <Icon icon="format_italic"/>
            </div>
          </div>
        </div>
      </div>


      <div class="w-80">
        <h3 class="text-title-medium text-on-surface">Details</h3>

        <br>

        <Details label="Style" icon="style">
          <div class="grid grid-cols-2 w-56 gap-y-3">
            <Chip label="Material 3"/>
            <Chip label="Material 2"/>
            <Chip label="Material 1"/>
            <Chip label="Cupertino"/>
          </div>
        </Details>
      </div>

      <!-- Sheets -->
      <div>
        <h3 class="text-title-medium text-on-surface">Sheets</h3>
        <br>

        <FilledButton :label="showBottomSheet ? 'Close bottom sheet' : 'Show bottom sheet'"
                      icon="bottom_sheets" @click="openBottomSheet"/>

        <BottomSheet :opened="showBottomSheet" @close="closeBottomSheet">
          Coucou !
        </BottomSheet>

        <br><br>

        <FilledButton :label="showSideSheet ? 'Close side sheet' : 'Show side sheet'"
                      icon="side_navigation" @click="openSideSheet"/>

        <br><br>

        <FilledButton
          :label="showModalSideSheet ? 'Close modal side sheet' : 'Show modal side sheet'"
          icon="view_sidebar" @click="openModalSideSheet"/>

        <ModalSideSheet v-if="showModalSideSheet" headline="Titre intéressant"
                        @close="closeModalSideSheet"/>

        <br><br>

        <FilledButton
          :label="showFullViewSheet ? 'Close full view sheet' : 'Show full view sheet'"
          icon="fullscreen" @click="openFullViewSheet"/>

        <FullViewSheet v-if="showFullViewSheet" headline="Titre intéressant"
                       @close="closeFullViewSheet">
          On peut mettre plein de contenu dedans
        </FullViewSheet>
      </div>

    </div>

    <div class="w-2/3" v-show="showSideSheet">
      <SideSheet headline="Titre intéressant" @close="closeSideSheet">

        Bonjour !

      </SideSheet>
    </div>
  </div>

</template>

<script setup lang="ts">
import OutlinedCard from "@/components/material/containment/cards/OutlinedCard.vue";
import FilledCard from "@/components/material/containment/cards/FilledCard.vue";
import Divider from "@/components/material/containment/dividers/Divider.vue";
import Icon from "@/components/material/Icon.vue";
import FilledButton from "@/components/material/buttons/withLabels/FilledButton.vue";
import BottomSheet from "@/components/material/sheets/BottomSheet.vue";
import {ref} from "vue";
import SideSheet from "@/components/material/sheets/SideSheet.vue";
import ModalSideSheet from "@/components/material/sheets/ModalSideSheet.vue";
import FullViewSheet from "@/components/material/sheets/FullViewSheet.vue";
import Details from "@/components/material/containment/Details.vue";
import Chip from "@/components/material/inputs/chips/Chip.vue";

const showBottomSheet = ref(false);

function openBottomSheet() {
  showBottomSheet.value = !showBottomSheet.value;
}

function closeBottomSheet() {
  showBottomSheet.value = false;
}

const showSideSheet = ref(false);

function openSideSheet() {
  showSideSheet.value = !showSideSheet.value;
}

function closeSideSheet() {
  showSideSheet.value = false;
}

const showModalSideSheet = ref(false);

function openModalSideSheet() {
  showModalSideSheet.value = !showModalSideSheet.value;
}

function closeModalSideSheet() {
  showModalSideSheet.value = false;
}


const showFullViewSheet = ref(false);

function openFullViewSheet() {
  showFullViewSheet.value = !showFullViewSheet.value;
}

function closeFullViewSheet() {
  showFullViewSheet.value = false;
}
</script>
