<template>
  <div class="m-10">

    <h1>Boutons</h1>

    <h2>Il existe 5 types de boutons standards</h2>

    <br><br>

    <div
      class="flex flex-row gap-10  p-7 bg-surface rounded-lg border border-surface-container-highest w-full">
      <div class="flex flex-col gap-5">

        <h3 class="text-title-medium text-on-surface">Boutons</h3>

        <div class="flex flex-row gap-5">
          <ElevatedButton label="Elevated"/>
          <ElevatedButton label="Elevated" icon="add"/>
          <ElevatedButton label="Elevated" disabled/>
        </div>
        <div class="flex flex-row gap-5">
          <FilledButton label="Filled"/>
          <FilledButton label="Filled" icon="add"/>
          <FilledButton label="Filled" disabled/>
        </div>
        <div class="flex flex-row gap-5">
          <TonalButton label="Tonal"/>
          <TonalButton label="Tonal" icon="add"/>
          <TonalButton label="Tonal" disabled/>
        </div>
        <div class="flex flex-row gap-5">
          <OutlinedButton label="Outlined"/>
          <OutlinedButton label="Outlined" icon="add"/>
          <OutlinedButton label="Outlined" disabled/>
        </div>
        <div class="flex flex-row gap-5">
          <TextButton label="Text"/>
          <TextButton label="Text" icon="add"/>
          <TextButton label="Text" disabled/>
        </div>
      </div>
      <div class="flex flex-col gap-10">
        <div>
          <h3 class="text-title-medium text-on-surface">Boutons icons</h3>

          <div class="flex flex-row gap-5 items-center my-5">
            <ButtonIcon icon="settings"/>
            <FilledIcon icon="settings"/>
            <TonalIcon icon="settings"/>
            <OutlinedIcon icon="settings"/>
          </div>

        </div>
        <div>
          <h3 class="text-title-medium text-on-surface">Boutons d'action flottants (Fabs)</h3>

          <div class="flex flex-row gap-2 items-center my-5">
            <FabBig icon="edit"/>
            <Fab icon="edit" label="Compose" show_label/>
            <Fab icon="edit" label="Compose"/>
            <SmallFab icon="edit"/>
          </div>
        </div>
        <div>
          <h3 class="text-title-medium text-on-surface">Boutons segmentés (Checkbox & Radio)</h3>

          <div class="flex flex-col gap-5 items-start my-5">
            <SegmentedButtons
              :items="[
                {label: 'Rouge', value: 1},
                {label: 'Vert', value: 2},
                {label: 'Bleu', value: 3},
              ]"
              id="radio_segmented"
              v-model="selectedOptions"
            />

            <SegmentedButtons
              :items="[
                {label: 'Rouge', value: 1},
                {label: 'Vert', value: 2},
                {label: 'Bleu', value: 3},
              ]"
              id="radio_segmented"
              allow_multiple
              v-model="selectedOptionsMultiple"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import ElevatedButton from "@/components/material/buttons/withLabels/ElevatedButton.vue";
import FilledButton from "@/components/material/buttons/withLabels/FilledButton.vue";
import TonalButton from "@/components/material/buttons/withLabels/TonalButton.vue";
import OutlinedButton from "@/components/material/buttons/withLabels/OutlinedButton.vue";
import TextButton from "@/components/material/buttons/withLabels/TextButton.vue";
import ButtonIcon from "@/components/material/buttons/icons/ButtonIcon.vue";
import FilledIcon from "@/components/material/buttons/icons/FilledIcon.vue";
import TonalIcon from "@/components/material/buttons/icons/TonalIcon.vue";
import OutlinedIcon from "@/components/material/buttons/icons/OutlinedIcon.vue";
import FabBig from "@/components/material/buttons/fab/FabBig.vue";
import Fab from "@/components/material/buttons/fab/Fab.vue";
import SmallFab from "@/components/material/buttons/fab/SmallFab.vue";
import SegmentedButtons from "@/components/material/buttons/segmented/SegmentedButtons.vue";

import {ref} from "vue";

const selectedOptions = ref<number[]>([1]);

const selectedOptionsMultiple = ref<number[]>([2, 3]);
</script>
