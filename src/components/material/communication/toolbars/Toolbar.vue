<template>
  <div
    class="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg"
    :class="{
      'flex-row h-[64px]': props.layout === 'horizontal',
      'flex-col w-[64px]': props.layout === 'vertical',
      'bg-surface-container': props.theme === 'standard',
      'bg-primary-container': props.theme === 'vibrant',
    }">


    <div v-for="(item, index) in props.items"
         :key="index">

      <button
        v-if="item.variant === 'fab'"
        @click="item.onClick()"
        :class="{
          'bg-primary-container text-on-primary-container focus:bg-primary focus:text-on-primary transition-all duration-200': props.theme === 'standard',
          'bg-primary text-on-primary focus:bg-surface-container focus:text-on-surface transition-all duration-200': props.theme === 'vibrant',
        }"
        class="fab_after relative h-10 w-10 flex flex-row items-center justify-center gap-x-2 p-4 rounded-xl overflow-hidden text-sm shadow-lg tracking-[.00714em] font-medium cursor-pointer">
        <i class="material-symbols-outlined !text-lg">{{ item.icon }}</i>
      </button>
      <button v-else
              :class="{
                'text-on-primary-container! focus:text-on-primary transition-all duration-200': props.theme === 'standard',
                'text-on-primary-container! focus:bg-surface-container focus:text-on-surface transition-all duration-200': props.theme === 'vibrant',
              }"
              class="btn_button_icon_after relative flex flex-row items-center justify-center w-12 h-12 gap-x-2 p-2.5 text-sm tracking-[.00714em] font-medium select-none rounded-full">
        <i class="material-symbols-outlined normal_outlined_icon ">
          {{ item.icon }}
        </i>
      </button>

    </div>

  </div>
</template>

<script setup lang="ts">
import type {
  ToolbarLayout, ToolbarItem, ToolbarTheme, ButtonVariant
} from "@/components/material/communication/toolbars/toolbar.ts";

import ButtonIcon from "@/components/material/buttons/icons/ButtonIcon.vue";
import SmallFab from "@/components/material/buttons/fab/SmallFab.vue";

const props = defineProps<{
  layout: ToolbarLayout,
  items: ToolbarItem[],
  theme: ToolbarTheme
}>();

</script>
