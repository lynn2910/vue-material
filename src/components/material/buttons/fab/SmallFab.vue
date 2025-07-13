<template>
  <button
    @click="emit('click')"
    class="fab_after relative h-10 w-10 flex flex-row items-center justify-center gap-x-2 p-4 rounded-xl overflow-hidden text-sm shadow-lg tracking-[.00714em] font-medium bg-primary-container cursor-pointer">
    <i class="material-symbols-outlined !text-lg">{{ props.icon }}</i>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
}>();

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
