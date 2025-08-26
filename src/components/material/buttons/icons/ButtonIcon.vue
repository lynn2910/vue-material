<template>
  <button
    @click="clicked()"
    :disabled="props.disabled"
    class="btn_button_icon_after relative flex flex-row items-center justify-center w-12 h-12 gap-x-2 p-2.5 rounded-[6.25em] text-sm tracking-[.00714em] font-medium select-none"
    :class="[{
      'text-inverse-primary': !props.disabled && props.inverseColors,
      'text-primary': !props.disabled && !props.inverseColors,
      'cursor-pointer': !props.disabled,
      'text-on-surface-variant/70 cursor-default': props.disabled
    }, props.inverseColors ? 'inverse_colors' : '']">
    <i v-if="props.icon" class="material-symbols-outlined normal_outlined_icon">{{ props.icon }}</i>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string,
  disabled?: boolean,
  inverseColors?: boolean
}>();

const emit = defineEmits(['click'])

function clicked() {
  if (props.disabled) return;
  emit('click');
}
</script>

<style>
@reference "@/styles/index.css"

.btn_button_icon_after {
  /*box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15);*/
}

.btn_button_icon_after:not(:disabled)::after {
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

.btn_button_icon_after:not(:disabled):hover::after {
  opacity: 1;
}

.btn_button_icon_after:not(:disabled):hover::after {
  @apply bg-primary/10;
}

.btn_button_icon_after.inverse_colors:not(:disabled):hover::after {
  @apply bg-inverse-primary/10;
}

.btn_button_icon_after:not(:disabled):focus::after {
  opacity: 1;
}

.btn_button_icon_after:not(:disabled):focus::after {
  @apply bg-primary/20;
}

.btn_button_icon_after.inverse_colors:not(:disabled):focus::after {
  @apply bg-inverse-primary/20;
}

</style>
