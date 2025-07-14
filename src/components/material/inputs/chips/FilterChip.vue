<template>
  <Chip :label="props.label"
        :leading_icon="leading_icon"
        :filled="props.filled"
        :disabled="props.disabled"
        :trailing_icon="trailing_icon"
        @click="emit('click')"/>
</template>

<script setup lang="ts">
import Chip from "@/components/material/inputs/chips/Chip.vue";
import {computed} from "vue";

const props = defineProps<{
  label: string,
  checked?: boolean,

  show_trailing?: boolean,

  filled?: boolean,
  disabled?: boolean,
}>();

const leading_icon = computed(() => props.checked ? 'check' : undefined);
const trailing_icon = computed(() => props.show_trailing ? 'arrow_drop_down' : undefined);
const emit = defineEmits(['click']);
</script>
