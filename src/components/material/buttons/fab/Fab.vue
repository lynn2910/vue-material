<template>
  <button
    @click="emit('click')"
    class="fab_after relative flex flex-row items-center justify-center gap-x-2 p-4 rounded-2xl overflow-hidden shadow-lg text-sm tracking-[.00714em] font-medium bg-primary-container cursor-pointer"
    :class="{
      'w-14': !props.show_label,
      'w-fit': props.show_label
    }">
    <i class="material-symbols-outlined text-2xl">{{ props.icon }}</i>
    {{ computedLabel }}
  </button>

</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  icon: string,
  label?: string,
  show_label?: boolean
}>();

const computedLabel = computed(() => props.show_label ? props.label || '' : '');

const emit = defineEmits(['click']);
</script>


<style scoped>
@reference "@/styles/index.css"

.fab_after {
  /*box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15);*/
}

.fab_after:not(:disabled)::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.fab_after:not(:disabled):hover::after {
  opacity: 1;
  @apply bg-primary/10;
}

.fab_after:not(:disabled):focus::after {
  opacity: 1;
  @apply bg-primary/20;
}
</style>
