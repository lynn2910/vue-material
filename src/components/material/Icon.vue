<template>
  <i class="material-symbols-outlined">{{ props.icon }}</i>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
}>();
</script>
