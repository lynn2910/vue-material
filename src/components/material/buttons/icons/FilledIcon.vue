<template>
  <button
    @click="clicked()"
    :disabled="props.disabled"
    class="btn_after relative flex flex-row items-center justify-center w-12 h-12 gap-x-2 p-2.5 rounded-[6.25em] shadow-lg text-sm tracking-[.00714em] font-medium select-none"
    :class="{
      'bg-primary text-on-primary cursor-pointer': !props.disabled,
      'bg-surface-container text-on-surface-variant/70 cursor-default': props.disabled
    }">
    <span v-if="props.icon" class="material-symbols-outlined normal_outlined_icon">{{
        props.icon
      }}</span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string,
  disabled?: boolean
}>();

const emit = defineEmits(['click'])

function clicked() {
  if (props.disabled) return;
  emit('click');
}
</script>

<style scoped>
@reference "@/styles/index.css"

.btn_after {
  /*box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15);*/
}

.btn_after:not(:disabled)::after {
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

.btn_after:not(:disabled):hover::after {
  opacity: 1;
  @apply bg-primary/10;
}

.btn_after:not(:disabled):focus::after {
  opacity: 1;
  @apply bg-primary/20;
}
</style>


