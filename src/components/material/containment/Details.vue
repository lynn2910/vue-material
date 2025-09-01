<template>
  <details :label="props.label" @click="opened = !opened" :open="opened">
    <summary
      class="flex flex-row items-center justify-between gap-1.5 select-none border-transparent border-t-2 border-b-2 focus:border-primary mb-2 transition-all duration-200 ease-in-out"
      :class="{
                'py-4': !opened,
                'py-2': opened
             }">
      <div class="flex flex-row items-center gap-x-3">
        <Icon v-if="props.icon" :icon="props.icon"/>
        {{ props.label }}
      </div>
      <Icon icon="keyboard_arrow_down" v-if="!opened"/>
      <Icon icon="keyboard_arrow_up" v-else/>
    </summary>
    <slot/>
  </details>
</template>

<script setup lang="ts">
import Icon from "@/components/material/Icon.vue";
import {ref} from "vue";

const opened = ref(false);

const props = defineProps<{
  icon?: string,
  label: string,
}>();
</script>
