<template>
  <Chip :label="props.label"
        :filled="props.filled"
        :disabled="props.disabled"/>
</template>

<script setup lang="ts">
import Chip from "@/components/material/inputs/chips/Chip.vue";

const props = defineProps<{
  label: string,
  filled?: boolean,

  disabled?: boolean
}>();
</script>
