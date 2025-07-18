<template>
  <div class="relative flex flex-row items-center border-b border-b-on-surface-variant/25">
    <button v-for="item in props.items"
            :key="item.value"
            @click="changeSelectedTab(item.value)"
            class="px-4 py-2 flex flex-col justify-end items-center gap-1 md:w-[120px] hover:bg-primary/5 cursor-pointer">
      <Icon :icon="item.icon"/>
      {{ item.name }}
    </button>

    <div
      class="absolute left-0 bottom-0 transition-all duration200 ease-in-out bg-primary  h-0.5 rounded-t-full "
      :class="{
          'w-[42px] ml-[11%]': displayMode === 'primary',
          'w-[120px] ml-0': displayMode === 'secondary',
      }"
      :style="{left: `${120 * currentActiveItemIndex}px`}"/>
  </div>
</template>

<script setup lang="ts">

import {computed} from "vue";
import Icon from "@/components/material/Icon.vue";

const props = defineProps<{
  primary?: boolean,
  secondary?: boolean,
  items: { name: string, icon: string, value: any }[],
  modelValue: any
}>();

const displayMode = computed(() => props.primary ? 'primary' : (props.secondary ? 'secondary' : 'primary'));

const currentActiveItemIndex = computed(() => props.items.findIndex(item => item.value === props.modelValue));

const emit = defineEmits(['update:modelValue']);

function changeSelectedTab(value: any) {
  emit('update:modelValue', value);
}
</script>
