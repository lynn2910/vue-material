<template>
  <Teleport to="body">
    <Transition
      name="modal-backdrop"
      enter-active-class="transition-opacity duration-300 ease-out"
      leave-active-class="transition-opacity duration-300 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="visible" class="fixed top-0 left-0 w-screen h-screen">
        <div class="absolute h-screen w-screen bg-black/50 z-40" @click="handleClose"/>
      </div>
    </Transition>

    <Transition
      name="modal-sheet"
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-300 ease-in"
      enter-from-class="transform translate-x-full"
      enter-to-class="transform translate-x-0"
      leave-from-class="transform translate-x-0"
      leave-to-class="transform translate-x-full"
    >
      <div
        v-if="visible"
        class="flex flex-row h-full fixed top-0 right-0 z-50 bg-surface text-on-surface w-1/3 rounded-l-xl">
        <Divider vertical v-show="props.showDivider"/>

        <!-- Divider -->
        <div class="w-full">
          <div class="w-full ml-1 mt-2">
            <AppBar :headline="props.headline" size="small"
                    :actions="appbar_actions"/>
          </div>
          <div class="p-9 pt-5">
            <slot/>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick} from 'vue';
import Divider from "@/components/material/containment/dividers/Divider.vue";
import AppBar from "@/components/material/navigation/bars/AppBar.vue";

const props = defineProps<{
  headline: string,
  showDivider?: boolean,
  leading_icon?: string,
}>();

const emit = defineEmits(['close']);

const visible = ref(false);

const handleClose = () => {
  visible.value = false;

  setTimeout(() => {
    emit('close');
  }, 300);
};

const appbar_actions = [
  {
    icon: 'close',
    alt: 'Close',
    onClick: handleClose
  }
];

onMounted(() => {
  nextTick(() => {
    visible.value = true;
  });
});

defineExpose({
  close: handleClose
});
</script>
