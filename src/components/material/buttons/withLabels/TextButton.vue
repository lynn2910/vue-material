<template>
  <button
    @click="clicked()"
    :disabled="props.disabled"
    class="btn_after relative flex flex-row items-center justify-center gap-x-2 py-2.5 px-6 rounded-[6.25em] text-sm tracking-[.00714em] font-medium select-none"
    :class="{
      'text-primary cursor-pointer': !props.disabled,
      'text-on-surface-variant/70 cursor-default': props.disabled
    }">
    <i v-if="props.icon" class="material-symbols-outlined normal_outlined_icon">{{ props.icon }}</i>
    {{ props.label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string,
  icon?: string,
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


