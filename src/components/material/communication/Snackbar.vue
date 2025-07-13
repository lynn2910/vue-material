<template>
  <Transition name="slide-up">
    <div
      v-if="currentNotification"
      class="fixed left-4 right-4 bottom-4 sm:w-80 gap-4 py-3 px-4 shadow-md rounded bg-inverse-surface text-surface flex flex-row items-center"
    >
      <p class="flex flex-grow text-sm tracking-[0.25px]">{{ currentNotification?.message }}</p>
      <button
        class="flex items-center cursor-pointer"
        @click="snackbarStore.closeNotification()"
        v-if="currentNotification?.show_close_btn || (currentNotification?.duration && currentNotification?.duration > 0)"
      >
        <Icon icon="close"/>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {useSnackbarStore} from "@/stores/material/snackbarStore.ts";
import Icon from "@/components/material/Icon.vue";
import {storeToRefs} from "pinia";

const snackbarStore = useSnackbarStore();
const {currentNotification} = storeToRefs(snackbarStore);
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
