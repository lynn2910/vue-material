<template>
  <button
    @click="clicked()"
    :disabled="props.disabled"
    class="btn_shadow relative flex flex-row items-center justify-center gap-x-2 py-2.5 px-6 rounded-[6.25em] shadow-lg text-sm tracking-[.00714em] font-medium select-none"
    :class="{
      'bg-surface-container hover:bg-surface-container-high focus:bg-surface-container-highest text-primary cursor-pointer': !props.disabled,
      'bg-surface-container text-on-surface-variant/70 cursor-default': props.disabled
    }">
    <i v-if="props.icon" class="  material-icons-outlined">{{ props.icon }}</i>
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
.btn_shadow {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)
}
</style>


