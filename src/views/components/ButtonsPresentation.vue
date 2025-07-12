<template>
  <div>

    <h1>Boutons</h1>

    <h2>Il existe 5 types de boutons standards</h2>

    <br><br>

    <div
      class="flex flex-col gap-5 p-3 bg-surface-container-lowest rounded-lg border border-surface-container-highest">
      <div class="flex flex-row gap-5">
        <ElevatedButton label="Elevated"/>
        <ElevatedButton label="Elevated" icon="water_drop"/>
        <ElevatedButton label="Elevated" disabled/>
      </div>
      <div class="flex flex-row gap-5">
        <FilledButton label="Elevated"/>
        <FilledButton label="Elevated" icon="water_drop"/>
        <FilledButton label="Elevated" disabled/>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import ElevatedButton from "@/components/material/buttons/ElevatedButton.vue";
import FilledButton from "@/components/material/buttons/FilledButton.vue";
</script>
