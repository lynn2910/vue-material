<template>
  <Transition name="slide-up">
    <div
      v-if="currentNotification"
      class="fixed left-4 right-4 bottom-4 sm:w-80 gap-4 py-1 px-4 pr-1 shadow-md rounded bg-inverse-surface text-surface flex flex-row items-center select-none"
    >
      <p class="flex flex-grow text-sm tracking-[0.25px]">{{ currentNotification?.message }}</p>
      <button
        class="flex items-center cursor-pointer"
        @click="snackbarStore.closeNotification()"
        v-if="currentNotification?.show_close_btn || (currentNotification?.duration && currentNotification?.duration > 0)"
      >
        <ButtonIcon inverse-colors icon="close"/>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {useSnackbarStore} from "@/stores/material/snackbarStore.ts";
import {storeToRefs} from "pinia";
import ButtonIcon from "@/components/material/buttons/icons/ButtonIcon.vue";

const snackbarStore = useSnackbarStore();
const {currentNotification} = storeToRefs(snackbarStore);
</script>
