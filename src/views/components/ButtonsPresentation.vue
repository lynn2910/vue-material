<template>
  <div>

    <h1>Boutons</h1>

    <h2>Il existe 5 types de boutons standards</h2>

    <br><br>

    <div
      class="flex flex-row gap-10  p-7 bg-surface-container-lowest rounded-lg border border-surface-container-highest">
      <div
        class="flex flex-col gap-5">

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
            <IconButton icon="settings"/>
            <FilledIcon icon="settings"/>
            <TonalIcon icon="settings"/>
            <OutlinedIcon icon="settings"/>
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
import IconButton from "@/components/material/buttons/icons/IconButton.vue";
import FilledIcon from "@/components/material/buttons/icons/FilledIcon.vue";
import TonalIcon from "@/components/material/buttons/icons/TonalIcon.vue";
import OutlinedIcon from "@/components/material/buttons/icons/OutlinedIcon.vue";
</script>
