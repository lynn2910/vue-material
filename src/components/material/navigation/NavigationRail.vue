<template>
  <div class="flex flex-col bg-surface mx-3"
       :class="{
          'w-26': !isExpanded,
          'min-w-56 max-w-[360px]': isExpanded,
        }">
    <div class="select-none cursor-pointer text-2xl ml-10 pt-7 pb-5" @click="toggleExpanded">
      <i v-if="!hideMenuButton && !isExpanded" class="material-icons-outlined">menu</i>
      <i v-else-if="isExpanded" class="material-icons-outlined">menu_open</i>
    </div>

    <div v-for="(item, index) in items" :key="index"
         class="relative mt-1">

      <div v-if="item.type === 'section'">
        <p class="text-secondary mt-9 mb-5 w-fit pl-2">{{ item.label }}</p>
      </div>
      <div v-else
           class="flex items-center content-center cursor-pointer w-fit gap-2 mb-1.5"
           :class="{
             'flex-row py-4 px-5': isExpanded,
             'bg-secondary-container rounded-full text-on-secondary-container': isExpanded && item.selected,
             'flex-col mx-auto': !isExpanded,
           }">

        <i class="material-icons-outlined text-center select-none text-2xl"
           :class="{
           'text-on-secondary-container': item.selected,
           'text-on-surface-variant': !item.selected,
           'bg-secondary-container rounded-full': item.selected && !isExpanded,
           'w-7/12 py-2': !isExpanded,
          }">
          {{ item.icon }}
        </i>
        <p class="text-secondary">{{ item.label }}</p>


        <!-- badge -->
        <div v-if="item.show_badge" class="absolute top-0 right-0 bg-error rounded-full">
        <span v-if="item.badge_type === 'large'"
              class="bg-on-error">{{ item.badge_label }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const isExpanded = ref(false)

const props = defineProps<{
  expandedLayout?: ExpandedLayout,
  hideMenuButton?: Boolean,
  items: NavigationItem[]
}>();

const {
  items,
  hideMenuButton = false,
  expandedLayout = ExpandedLayout.Standard,
} = props;

function toggleExpanded() {
  if (hideMenuButton) return;
  isExpanded.value = !isExpanded.value;
}

</script>

<script lang="ts">
/**
 * Specify whether the layout should use the document space or go over
 *
 * See more: [Navigation rails - Specs | Configurations](https://m3.material.io/components/navigation-rail/specs#272d0b54-d47f-42bc-80af-35ff411ff1b7)
 */
export enum ExpandedLayout {
  /**
   * Expanded content will take spaces in the document
   */
  Standard,
  /**
   * Expanded content will pass over the document
   */
  Modal
}

export type NavigationItem = {
  type?: "item" | "section",
  selected: boolean,
  icon?: string,
  label: string,
  onClick?: () => void,
  show_badge?: boolean,
  badge_type?: "large" | "small",
  badge_label?: string
}
</script>
