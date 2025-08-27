<template>
  <Teleport to="#bottom_sheets_container" v-if="props.opened">
    <Transition
      name="bottom-sheet"
      appear
    >
      <div
        v-if="props.opened"
        class="absolute left-1/2 -translate-x-1/2 bottom-0 z-50 w-full sm:w-5/6 md:w-2/3 min-h-[40%] max-h-[60%] bg-surface text-on-surface rounded-t-xl">

        <!-- Glider -->
        <div class="p-4 w-full">
          <div class="w-8 h-1 opacity-40 bg-gray-500 rounded-full mx-auto"></div>
        </div>

        <div class="p-4 pt-0">
          <slot/>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {useBottomSheetsStore} from "@/stores/material/bottomSheetsStore.ts";
import {watch} from "vue";

const props = defineProps<{
  opened: boolean,
}>();

const emit = defineEmits(['close']);

const bottomSheetsStore = useBottomSheetsStore();

const uuid = crypto.randomUUID();

function onClose() {
  emit('close');
}

watch(props, () => {
  if (props.opened) {
    bottomSheetsStore.registerSheet({id: uuid, onClose});
  } else {
    bottomSheetsStore.closeSheet(uuid);
  }
})
</script>

<style scoped>
.bottom-sheet-enter-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bottom-sheet-enter-from {
  transform: translateY(100%);
}

.bottom-sheet-enter-to {
  transform: translateY(0);
}

.bottom-sheet-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bottom-sheet-leave-from {
  transform: translateY(0);
}

.bottom-sheet-leave-to {
  transform: translateY(100%);
}
</style>
