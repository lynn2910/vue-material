<template>
  <nav
    class="relative flex flex-col items-start p-3 py-10 bg-surface-container-lowest h-full"
    :class="{
      'rounded-r-2xl bg-surface-container': props.display_mode === 'modal',
      'w-full md:w-[300px]': props.modelValue,
      'w-40 px-4 justify-start items-center': !props.modelValue,
    }">

    <div v-if="props.allow_expand_change" class="mb-5 select-none cursor-pointer"
         :class="{
            'ml-12': props.modelValue,
            'mx-auto': !props.modelValue
         }"
         @click="toggle">
      <span v-if="props.modelValue"
            class="material-symbols-outlined !text-4xl">{{ top_icon_name_active }}</span>
      <span v-else-if="!props.modelValue"
            class="material-symbols-outlined !text-4xl">{{ top_icon_name }}</span>
    </div>

    <div
      class="mb-5"
      :class="{
        'px-5': props.modelValue,
        'mx-auto': !props.modelValue,
      }">
      <slot name="top"/>
    </div>

    <div
      class="mb-5"
      :class="{
        'px-5': props.modelValue,
        'mx-auto': !props.modelValue,
      }">
      <Fab v-if="props.fab"
           :show_label="props.modelValue"
           :icon="props.fab.icon"
           :label="props.fab.label"/>
    </div>

    <div class="overflow-y-auto h-full w-full pl-1 overflow-x-hidden">
      <div v-for="(item, index) in props.items" :key="index"
           class="w-full"
           :class="{'mx-auto': !props.modelValue, 'pl-5': props.modelValue}">
        <NavigationItem v-if="item.type === 'item'"
                        @navigate="navigateEventReceived"
                        :active="active"
                        :expand="modelValue ?? true"
                        :item="item as unknown as Item"
                        :parent-id="[]"/>
        <NavigationGroup v-else-if="item.type === 'group'"
                         class="mb-5"
                         @navigate="navigateEventReceived"
                         :active="active"
                         :expand="modelValue ?? true"
                         :group="item as unknown as ItemGroup"
                         :parent-id="[]"/>
        <Divider v-else-if="item.type === 'divider'" horizontal class="mt-5 mb-2"/>
      </div>
    </div>

  </nav>
</template>

<style scoped>
nav {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

nav::-webkit-scrollbar {
  display: none;
}
</style>

<script setup lang="ts">
import NavigationItem from "@/components/material/navigation/NavigationItem.vue";
import NavigationGroup from "@/components/material/navigation/NavigationGroup.vue";
import {toRefs} from "vue";
import Divider from "@/components/material/containment/dividers/Divider.vue";
import Fab from "@/components/material/buttons/fab/Fab.vue";

const props = withDefaults(defineProps<{
  hideMenuButton?: Boolean,
  items: NavStructure,

  show_top_icon?: boolean,

  active?: string[],
  allow_expand_change?: boolean,

  modelValue?: boolean,

  top_icon_name?: string,
  top_icon_name_active?: string,

  fab?: { icon: string, label: string },
  display_mode?: "active" | "modal",
}>(), {
  top_icon_name: 'menu',
  top_icon_name_active: 'menu_open',
  active: () => []
});

const {active, top_icon_name, top_icon_name_active} = toRefs(props);

const emit = defineEmits<{
  navigate: [id: string, path: string[]],
  'update:modelValue': [value: boolean],
}>();

function toggle() {
  emit('update:modelValue', !props.modelValue)
}

function navigateEventReceived(id: string, path: string[]) {
  emit('navigate', id, path);
}

</script>

<script lang="ts">
export type NavItemType = 'item' | 'group' | 'divider';

export type Item = {
  type: NavItemType,

  name: string,
  id: string,
  icon: string,

  onClick?: (name: string) => void,

  counter?: number
  allow_expand?: boolean,
};

export type ItemGroup = {
  type: NavItemType,

  label: string,
  id: string,
  items: Item[],

  /**
   * Declares how many items are shown before a "show more" label is shown
   */
  unfoldedItemsLimit?: number,

  showFoldedItemsByDefault?: boolean,
  foldable?: boolean,
}

export type Divider = {
  type: NavItemType,
}

export function createGroup(group: Omit<ItemGroup, 'type'>): ItemGroup {
  return {...group, type: 'group'};
}

export function createItem(item: Omit<Item, 'type'>): Item {
  return {...item, type: 'item'}
}

export function addDivider(): Divider {
  return {type: 'divider'};
}

export type NavStructure = (Item | Divider | ItemGroup)[];

</script>
