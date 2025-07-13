<template>
  <div class="w-full m-10">
    <div
      class="flex flex-row gap-10  p-7 bg-surface rounded-lg border border-surface-container-highest w-full">

      <!-- Cards -->
      <div class="flex flex-col items-start gap-6">
        <h3 class="text-title-medium text-on-surface">Notifications (snackbar)</h3>

        <FilledButton label="Afficher la notification" icon="circle_notifications"
                      @click="showNotification()"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilledButton from "@/components/material/buttons/withLabels/FilledButton.vue";
import {useSnackbarStore} from "@/stores/material/snackbarStore.ts";

const snackbarStore = useSnackbarStore();

function showNotification() {
  snackbarStore.addNotification({
    message: "A single message snackbar",
    duration: 0,
    show_close_btn: true,
  })
}
</script>
