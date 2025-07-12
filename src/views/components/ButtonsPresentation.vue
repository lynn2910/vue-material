<template>
  <div>

    <h1>Boutons</h1>

    <h2>Il existe 5 types de boutons standards</h2>

    <br><br>

    <div
      class="flex flex-col gap-5 p-3 bg-surface-container-lowest rounded-lg border border-surface-container-highest">
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

  </div>
</template>

<script setup lang="ts">
import ElevatedButton from "@/components/material/buttons/withLabels/ElevatedButton.vue";
import FilledButton from "@/components/material/buttons/withLabels/FilledButton.vue";
import TonalButton from "@/components/material/buttons/withLabels/TonalButton.vue";
import OutlinedButton from "@/components/material/buttons/withLabels/OutlinedButton.vue";
import TextButton from "@/components/material/buttons/withLabels/TextButton.vue";
</script>
