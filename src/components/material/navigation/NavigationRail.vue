<template>
  <nav class="relative">
    <div
      class="w-full md:w-[360px] inline-flex flex-col p-3 rounded-2xl bg-surface-container-lowest">

      <div v-for="(item, index) in props.items" :key="index">
        <NavigationItem v-if="item.type === 'item'"
                        @navigate="navigateEventReceived"
                        :active="active"
                        :item="item as unknown as Item"
                        :parent-id="[]"/>
        <NavigationGroup v-else-if="item.type === 'group'"
                         class="mb-5"
                         @navigate="navigateEventReceived"
                         :active="active"
                         :group="item as unknown as ItemGroup"
                         :parent-id="[]"/>
        <Divider v-else-if="item.type === 'divider'" horizontal class="mt-5 mb-2"/>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">

import NavigationItem from "@/components/material/navigation/NavigationItem.vue";
import NavigationGroup from "@/components/material/navigation/NavigationGroup.vue";
import {toRefs} from "vue";
import Divider from "@/components/material/containment/dividers/Divider.vue";

const props = defineProps<{
  hideMenuButton?: Boolean,
  items: NavStructure,
  fab?: { icon: string, label: string },

  active: string[]
}>();

const {active = []} = toRefs(props);

const emit = defineEmits<{
  navigate: [id: string, path: string[]],
}>();

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
  children?: NavStructure,

  counter?: number
  allow_expand?: boolean,
};

export type ItemGroup = {
  type: NavItemType,

  label: string,
  id: string,
  items: Item[]
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
