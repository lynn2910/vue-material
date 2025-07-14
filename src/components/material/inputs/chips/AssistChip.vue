<template>
  <Chip :label="props.label"
        :leading_icon="props.icon"
        :filled="props.filled"
        :disabled="props.disabled"
        @click="emit('click')"/>
</template>

<script setup lang="ts">

import Chip from "@/components/material/inputs/chips/Chip.vue";

const props = defineProps<{
  label: string,
  icon?: string,

  filled?: boolean,
  disabled?: boolean,
}>();

const emit = defineEmits(['click']);

</script>
