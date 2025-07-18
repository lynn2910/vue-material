<template>
  <div>
    <div
      class="py-[18px] rounded-full flex flex-row items-center justify-between w-full"
      :class="{
        // 'px-4': !props.expand,
        'px-4': props.expand,
        'mx-auto': props.expand,
        'text-secondary': isActive,
        'cursor-pointer hover:bg-secondary/10 select-none': group.foldable && !('unfoldedItemsLimit' in group)
      }"
      @click="onGroupClick">

      <p class="text-sm tracking-[.00714em] font-medium w-full"
         :class="{
          'w-fit mx-auto text-center': !props.expand,
          'w-full': props.expand
         }">
        {{ group.label }}
      </p>

      <i v-show="group.foldable && !isFolded && !group.unfoldedItemsLimit"
         class="material-symbols-outlined">
        arrow_drop_down
      </i>

      <i v-show="group.foldable && isFolded  && !group.unfoldedItemsLimit"
         class="material-symbols-outlined">
        arrow_drop_up
      </i>
    </div>

    <ul class="flex flex-col" v-show="!group.foldable || group.unfoldedItemsLimit || !isFolded">
      <li v-for="(item, index) in visibleItems" :key="index"
          class="relative">

        <!-- Recursive hell -->
        <NavigationItem v-if="item.type === 'item'"
                        @navigate="navigateEventReceived"
                        :active="childActive"
                        :expand="props.expand"
                        :parent-id="[...props.parentId, group.id]"
                        :item="item as unknown as Item"/>
        <NavigationGroup v-else-if="item.type === 'group'"
                         class="mb-5"
                         @navigate="navigateEventReceived"
                         :active="childActive"
                         :expand="props.expand"
                         :parent-id="[...props.parentId, group.id]"
                         :group="item as unknown as ItemGroup"/>
        <Divider v-else-if="item.type === 'divider'" horizontal class="mt-5 mb-2"/>


        <div
          class="relative active flex flex-row items-center justify-between gap-3 py-2 pl-4 my-2 pr-6 rounded-full cursor-pointer bg-secondary/10 select-none"
          @click="folded = !folded"
          :class="{
            'w-full px-2': props.expand,
            'justify-center': !props.expand,
          }"
          v-if="group.unfoldedItemsLimit && index === group.unfoldedItemsLimit - 1">

          <p v-show="!folded && props.expand">Afficher plus</p>
          <i v-show="!folded" class="material-symbols-outlined">add</i>

          <p v-show="folded && props.expand">Afficher moins</p>
          <i v-show="folded" class="material-symbols-outlined">remove</i>
        </div>

      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">

import type {Item, ItemGroup} from "@/components/material/navigation/rails/NavigationRail.vue";
import {toRefs, computed, ref} from "vue";
import NavigationItem from "@/components/material/navigation/rails/NavigationItem.vue";
import Divider from "@/components/material/containment/dividers/Divider.vue";

const props = defineProps<{
  group: ItemGroup,
  active: string[],
  parentId: string[],
  expand: boolean
}>();

const {group} = toRefs(props);

const isActive = computed(() => {
  return props.active.length > 0 && props.active[0] === props.group.id;
});

const folded = ref(Boolean(group.value.showFoldedItemsByDefault));

const isFolded = computed(() => {
  return group.value.foldable && folded.value;
});

const childActive = computed(() => {
  if (isActive.value && props.active.length > 1) {
    return props.active.slice(1);
  }
  return [];
});


const visibleItems = computed(() => {
  if (group.value.unfoldedItemsLimit && !folded.value) {
    return group.value.items.slice(0, group.value.unfoldedItemsLimit);
  }
  return group.value.items;
})


const emit = defineEmits<{
  navigate: [id: string, path: string[]],
}>();

function navigateEventReceived(id: string, path: string[]) {
  emit('navigate', id, path);
}

function onGroupClick() {
  if (group.value.foldable) {
    folded.value = !folded.value;
    return;
  }

  // emit('navigate', props.group.id, [...props.parentId, props.group.id]);
}
</script>
