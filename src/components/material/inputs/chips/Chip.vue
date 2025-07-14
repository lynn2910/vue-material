<template>

  <button :disabled="props.disabled" @click="chipClicked"
          class="relative flex flex-row w-fit rounded-lg gap-x-3 py-1.5 px-3 focus:ring-2 focus-ring-primary"
          :class="{
            'opacity-35': props.disabled,
            'chip_after cursor-pointer': !props.disabled,
            'border border-on-surface-variant/70': !props.filled,
            'bg-primary-container text-on-primary-container border border-transparent shadow-sm': props.filled,
          }">
    <Icon v-if="props.leading_icon" :icon="props.leading_icon"/>
    <p class="select-text cursor-text">{{ props.label }}</p>
    <Icon v-if="props.trailing_icon" :icon="props.trailing_icon"/>
  </button>

</template>

<script setup lang="ts">
import Icon from "@/components/material/Icon.vue";

const props = defineProps<{
  label: string,
  leading_icon?: string,
  trailing_icon?: string,

  disabled?: boolean,

  filled?: boolean,
}>();

const emit = defineEmits(['click']);

function chipClicked() {
  if (props.disabled) return;
  emit('click');
}

</script>


<style scoped>
@reference "@/styles/index.css"

.chip_after {
}

.chip_after::after {
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

.chip_after:hover::after {
  opacity: 1;
  @apply bg-primary/10;
}

.chip_after:focus::after {
  opacity: 1;
  @apply bg-primary/20;
}
</style>

