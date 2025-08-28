<template>
  <div class="flex flex-row gap-x-1 group">
    <button
      @click="clicked()"
      :disabled="props.disabled"
      class="btn_after_group relative flex flex-row items-center justify-center gap-x-2 py-2.5 px-6 rounded-l-[6.25em] rounded-r-[1em] text-sm tracking-[.00714em] font-medium select-none"
      :class="{
        'bg-primary-container text-primary cursor-pointer': !props.disabled,
        'bg-surface-container text-on-surface-variant/70 cursor-default': props.disabled
      }">
      <i v-if="props.leading_icon"
         class="material-symbols-outlined normal_outlined_icon">{{ props.leading_icon }}</i>
      {{ props.label }}
    </button>
    <button
      @click="clicked()"
      :disabled="props.disabled"
      class="btn_after_group relative flex items-center justify-center min-w-[2.5rem] h-10 px-2 text-sm tracking-[.00714em] font-medium select-none"
      :class="{
        'rounded-[6.25em]': props.opened,
        'rounded-l-[1em] rounded-r-[6.25em]': !props.opened,
        'bg-primary-container text-primary cursor-pointer': !props.disabled,
        'bg-surface-container text-on-surface-variant/70 cursor-default': props.disabled
      }">
      <i
        class="material-symbols-outlined normal_outlined_icon transform translate-x-0 transition-transform duration-100 ease-in-out text-center leading-none"
        :class="{
          'rotate-0': props.opened,
          'rotate-180': !props.opened
        }">keyboard_arrow_up</i>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  leading_icon?: string,
  label: string,
  disabled?: boolean,
  opened: boolean
}>();

const emit = defineEmits(['click'])

function clicked() {
  if (props.disabled) return;
  emit('click');
}
</script>

<style scoped>
@reference "@/styles/index.css"

.btn_after_group {
  /*box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15);*/
}

.btn_after_group:not(:disabled)::after {
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

/* Hover sur n'importe quel bouton du groupe */
.group:hover .btn_after_group:not(:disabled)::after {
  opacity: 1;
  @apply bg-primary/10;
}

/* Focus sur n'importe quel bouton du groupe */
.group:focus-within .btn_after_group:not(:disabled)::after {
  opacity: 1;
  @apply bg-primary/20;
}
</style>
