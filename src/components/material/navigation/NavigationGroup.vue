<template>
  <div>
    <div
      class="py-[18px] px-4 rounded-full"
      :class="{ 'text-secondary': isActive }"
      @click="onGroupClick">
      <p class="text-sm tracking-[.00714em] font-medium">{{ group.label }}</p>
    </div>

    <ul class="flex flex-col">
      <li v-for="(item, index) in group.items" :key="index"
          class="relative">

        <!-- Recursive hell -->
        <NavigationItem v-if="item.type === 'item'"
                        @navigate="navigateEventReceived"
                        :active="childActive"
                        :parent-id="[...props.parentId, group.id]"
                        :item="item as unknown as Item"/>
        <NavigationGroup v-else-if="item.type === 'group'"
                         class="mb-5"
                         @navigate="navigateEventReceived"
                         :active="childActive"
                         :parent-id="[...props.parentId, group.id]"
                         :group="item as unknown as ItemGroup"/>
        <Divider v-else-if="item.type === 'divider'" horizontal class="mt-5 mb-2"/>
        
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import type {Item, ItemGroup} from "@/components/material/navigation/NavigationRail.vue";
import {toRefs, computed} from "vue";
import NavigationItem from "@/components/material/navigation/NavigationItem.vue";
import Divider from "@/components/material/containment/dividers/Divider.vue";

const props = defineProps<{
  group: ItemGroup,
  active: string[],
  parentId: string[],
}>();

const {group} = toRefs(props);

const isActive = computed(() => {
  return props.active.length > 0 && props.active[0] === props.group.id;
});

const childActive = computed(() => {
  if (isActive.value && props.active.length > 1) {
    return props.active.slice(1);
  }
  return [];
});

const emit = defineEmits<{
  navigate: [id: string, path: string[]],
}>();

function navigateEventReceived(id: string, path: string[]) {
  emit('navigate', id, path);
}

function onGroupClick() {
  emit('navigate', props.group.id, [...props.parentId, props.group.id]);
}
</script>
