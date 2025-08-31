<template>
  <button
    @click="clicked()"
    :disabled="props.disabled"
    class="btn_after relative flex flex-row items-center justify-center gap-x-2 py-2.5 px-6 rounded-[6.25em] shadow-lg text-sm tracking-[.00714em] font-medium select-none"
    :class="{
      'bg-primary text-on-primary cursor-pointer': !props.disabled && (!props.color_set || !['secondary', 'tertiary'].includes(props.color_set)),
      'bg-secondary text-on-secondary cursor-pointer': !props.disabled && props.color_set === 'secondary',
      'bg-tertiary text-on-tertiary cursor-pointer': !props.disabled && props.color_set === 'tertiary',
      'bg-surface-container text-on-surface-variant/70 cursor-default': props.disabled
    }">
    <i v-if="props.icon" class="material-symbols-outlined normal_outlined_icon">{{ props.icon }}</i>
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string,
  icon?: string,
  disabled?: boolean,
  color_set?: "primary" | "secondary" | "tertiary",
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15);
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
  @apply bg-on-primary/20;
}

.btn_after:not(:disabled):focus::after {
  opacity: 1;
  @apply bg-on-primary/30;
}
</style>


