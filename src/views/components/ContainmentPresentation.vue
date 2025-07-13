<template>
  <div class="w-full m-10">
    <div
      class="flex flex-row gap-10  p-7 bg-surface rounded-lg border border-surface-container-highest w-full">

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

    </div>
  </div>

</template>

<script setup lang="ts">

import OutlinedCard from "@/components/material/containment/cards/OutlinedCard.vue";
import FilledCard from "@/components/material/containment/cards/FilledCard.vue";
</script>
