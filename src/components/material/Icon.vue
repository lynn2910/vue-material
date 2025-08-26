<template>
  <i class="material-symbols-outlined select-none w-fit h-fit"
     :class="props.class || ''">{{ props.icon }}</i>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string,
  class?: string
}>();
</script>
