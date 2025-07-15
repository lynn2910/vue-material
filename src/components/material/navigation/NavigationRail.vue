<template>
  <nav class="relative">
    <div
      class="w-full md:w-[360px] inline-flex flex-col p-3 rounded-2xl bg-surface-container-lowest">

      <div v-for="(item, index) in props.items" :key="index">
        <NavigationItem v-if="'icon' in item"
                        @navigate="navigateEventReceived"
                        :active="active"
                        :item="item as unknown as Item"
                        :parent-id="[]"/>
        <NavigationGroup v-else
                         @navigate="navigateEventReceived"
                         :active="active"
                         :group="item as unknown as ItemGroup"
                         :parent-id="[]"/>
      </div>

    </div>
  </nav>
</template>

<script setup lang="ts">

import NavigationItem from "@/components/material/navigation/NavigationItem.vue";
import NavigationGroup from "@/components/material/navigation/NavigationGroup.vue";
import {toRefs} from "vue";

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
export type Item = {
  allow_expand?: boolean,

  name: string,
  id: string,
  icon: string,

  onClick?: (name: string) => void,
  children?: NavStructure,

  counter?: number
};

export type ItemGroup = {
  label: string,
  id: string,
  items: Item[]
}

export function createGroup(label: string, id: string, items: NavStructure): ItemGroup {
  return {label, id, items} as ItemGroup;
}

export type NavStructure = (Item | ItemGroup)[];

</script>
