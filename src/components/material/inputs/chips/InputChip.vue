<template>
  <Chip :label="props.label"
        :trailing_icon="trailing_icon"
        :leading_icon="props.icon"
        :filled="props.filled"
        @click="emit('click')"/>
</template>

<script setup lang="ts">

import Chip from "@/components/material/inputs/chips/Chip.vue";
import {computed} from "vue";

const props = defineProps<{
  label: string,
  icon?: string,
  allow_delete?: boolean,
  filled?: boolean,
}>();

const trailing_icon = computed(() => props.allow_delete ? 'close' : undefined);

const emit = defineEmits(['click']);
</script>
