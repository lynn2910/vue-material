<template>
  <div v-if="props.showMenu" ref="floating"
       class="bg-surface-container text-on-surface-variant shadow-lg rounded-lg"
       :style="floatingStyles">

    <div v-for="(item, index) in props.items" :key="index"
         class="flex flex-row items-center w-full"
         :class="{
           'px-4 min-h-[3rem] hover:bg-inverse-surface/10 cursor-pointer': item !== 'divider',
           'rounded-t-lg': index === 0,
           'rounded-b-lg': index === props.items.length - 1,
         }">
      <div v-if="typeof item === 'string'" class="w-full h-[1px] bg-on-surface-variant/50"/>

      <div v-else class="flex flex-row items-center gap-4 py-2 w-full">
        <div class="w-[24px] flex flex-row items-center" v-if="item.leading_icon">
          <Icon :icon="item.leading_icon"/>
        </div>
        <p>{{ item.label }}</p>

        <div v-if="item.trailing_icon || item.trailing_text" class="w-5"/>

        <div class="flex flex-row items-start gap-0.5 ml-auto">
          <div class="w-[24px]" v-if="item.trailing_icon">
            <Icon :icon="item.trailing_icon"/>
          </div>
          <p v-if="item.trailing_text">{{ item.trailing_text }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref, toRef} from "vue";
import {autoUpdate, type Middleware, offset, type Placement, useFloating} from "@floating-ui/vue";
import Icon from "@/components/material/Icon.vue";

export type MenuItem = {
  label: string,
  leading_icon?: string,
  trailing_icon?: string,
  trailing_text?: string,
  disabled?: boolean,

  onClick?: () => void,
}

export type MenuItems = (MenuItem | 'divider')[];

const props = defineProps<{
  anchor: any,
  showMenu: boolean,
  placement?: Placement,
  middleware?: Middleware[],
  items: MenuItems
}>();

const floating = ref(null);
const reference = toRef(props, 'anchor');

const {floatingStyles} = useFloating(reference, floating, {
  placement: props.placement || 'bottom-end',
  middleware: [
    offset(10),
    ...(props.middleware || [])
  ],
  whileElementsMounted: autoUpdate,
});
</script>
