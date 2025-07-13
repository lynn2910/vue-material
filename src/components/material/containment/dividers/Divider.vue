<template>
  <div v-if="label && horizontal" class="w-full flex flex-row items-center">
    <Divider horizontal/>
    <p class="px-2 m-0">{{ label }}</p>
    <Divider horizontal/>
  </div>
  <hr v-else class="border border-on-surface-variant/20"
      :class="{'w-full': horizontal, 'h-full': vertical}"/>
</template>

<script setup lang="ts">
import {toRefs} from "vue";

const props = defineProps<{
  vertical?: boolean,
  horizontal?: boolean,
  label?: string,
}>();

const {label, horizontal, vertical} = toRefs(props);
</script>
