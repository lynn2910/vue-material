<template>
  <nav class="flex flex-col bg-surface mx-3 m"
       aria-label="Navigation"
       :class="{
          'w-26': !isExpanded,
          'min-w-56 max-w-[360px]': isExpanded,
        }">
    <button type="button" class="select-none cursor-pointer text-2xl ml-10 pt-7 pb-5 w-fit"
            :aria-expanded="isExpanded"
            @click="toggleExpanded">
      <i v-if="!hideMenuButton && !isExpanded" class="material-icons-outlined">menu</i>
      <i v-else-if="isExpanded" class="material-icons-outlined">menu_open</i>
    </button>

    <!-- FAB -->
    <button v-if="fab" type="button"
            :aria-label="fab.label"
            class="flex flex-row mt-2 mb-7"
            :class=" {
              'bg-primary-container rounded-lg text-on-primary-container w-fit gap-2 ml-6 py-4 pb-2.5 px-4': isExpanded
            }"
    >
      <div :class="{'mx-auto w-fit p-4 pb-2.5 bg-primary-container rounded-lg': !isExpanded,}">
        <i aria-hidden="true"
           class="material-icons-outlined text-2xl text-on-primary-container">{{ fab.icon }}</i>
      </div>
      <p v-if="isExpanded">{{ fab.label }}</p>
    </button>

    <!-- Items -->
    <ul>
      <li v-for="(item, index) in items" :key="index"
          class="relative mt-1 focus:outline">

        <div v-if="item.type === 'section'">
          <p class="text-secondary mt-9 mb-5 w-fit pl-2">{{ item.label }}</p>
        </div>
        <button v-else type="button"
                @click="item.onClick || (() => {})"
                :aria-selected="item.selected"
                class="flex items-center content-center cursor-pointer gap-2 mb-1.5 group"
                :class="{
                  'flex-row ml-5 py-4 px-5 w-fit': isExpanded,
                  'bg-secondary-container rounded-full text-on-secondary-container': isExpanded && item.selected,
                  'flex-col mx-auto w-full': !isExpanded,
                }">

          <i aria-hidden="true"
             class="material-icons-outlined text-center select-none text-2xl rounded-full"
             :class="{
               'group-hover:bg-secondary-container/50 transition duration-short4': !isExpanded && !item.selected,
               'text-on-secondary-container': item.selected,
               'text-on-surface-variant': !item.selected,
               'bg-secondary-container': item.selected && !isExpanded,
               'w-8/12 py-4': !isExpanded,
              }">
            {{ item.icon }}
          </i>
          <p class="text-secondary">{{ item.label }}</p>


          <!-- badge -->
          <div v-if="item.show_badge" class="absolute top-0 right-0 bg-error rounded-full">
            <span v-if="item.badge_type === 'large'" class="bg-on-error">
              {{ item.badge_label }}
            </span>
          </div>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  expandedLayout?: ExpandedLayout,
  hideMenuButton?: Boolean,
  items: NavigationItem[],
  fab?: { icon: string, label: string }
}>();

const isExpanded = ref(false);

const {
  items,
  hideMenuButton = false,
  expandedLayout = ExpandedLayout.Standard,
  fab
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
  selected?: boolean,
  icon?: string,
  label: string,
  onClick?: () => void,
  show_badge?: boolean,
  badge_type?: "large" | "small",
  badge_label?: string
}
</script>
