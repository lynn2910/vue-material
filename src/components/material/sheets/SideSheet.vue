<template>
  <Transition
    name="side-sheet"
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-300 ease-in"
    enter-from-class="transform translate-x-full opacity-0"
    enter-to-class="transform translate-x-0 opacity-100"
    leave-from-class="transform translate-x-0 opacity-100"
    leave-to-class="transform translate-x-full opacity-0"
    mode="out-in"
  >
    <div v-if="visible" class="flex flex-row h-screen">
      <Divider vertical v-show="props.showDivider"/>

      <!-- Divider -->
      <div class="w-full">
        <div class="w-full ml-1">
          <AppBar :headline="props.headline" size="small"
                  :actions="appbar_actions"/>
        </div>
        <div class="p-9 pt-5">
          <slot/>
        </div>
      </div>
    </div>
  </Transition>
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
