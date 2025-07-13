<template>
  <!-- Modal overlay with simple fade -->
  <Transition name="fade">
    <div v-show="isExpanded && expandedLayout === ExpandedLayout.Modal"
         @click="toggleExpanded()"
         class="fixed top-0 left-0 w-full h-full bg-shadow/50 z-50"/>
  </Transition>

  <nav class="flex flex-col px-3 h-screen transition-[width] duration-300 ease-standard"
       aria-label="Navigation"
       :class="{
          'w-26': !isExpanded,
          'min-w-56 max-w-[360px]': isExpanded,
          // 'bg-surface': expandedLayout === ExpandedLayout.Standard,
          'fixed z-[100] top-0 h-dvh left-0 rounded-r-xl bg-surface': isExpanded && expandedLayout === ExpandedLayout.Modal,
        }">

    <!-- Menu button -->
    <button type="button"
            class="select-none cursor-pointer text-2xl ml-7 pt-7 pb-5 w-fit"
            :aria-expanded="isExpanded"
            @click="toggleExpanded">
      <i v-if="!hideMenuButton && !isExpanded"
         class="material-symbols-outlined normal_outlined_icon">menu</i>
      <i v-else-if="isExpanded" class="material-symbols-outlined normal_outlined_icon">menu_open</i>
    </button>

    <!-- FAB -->
    <button v-if="fab" type="button"
            :aria-label="fab.label"
            class="flex flex-row mt-2 mb-7 transition-all duration-300 ease-standard"
            :class=" {
              'bg-primary-container rounded-lg text-on-primary-container w-fit gap-2 ml-6 py-4 pb-2.5 px-4': isExpanded
            }"
    >
      <div :class="{'mx-auto w-fit p-4 pb-2.5 bg-primary-container rounded-lg': !isExpanded,}"
           class="transition-all duration-300 ease-standard">
        <i aria-hidden="true"
           class="material-symbols-outlined normal_outlined_icon text-2xl text-on-primary-container">
          {{ fab.icon }}
        </i>
      </div>
      <Transition name="text-reveal">
        <p v-if="isExpanded" class="whitespace-nowrap">{{ fab.label }}</p>
      </Transition>
    </button>

    <!-- Items -->
    <ul>
      <li v-for="(item, index) in items" :key="index"
          class="mt-1 group">

        <div v-if="item.type === 'section'">
          <Transition name="text-reveal">
            <p class="text-secondary mt-9 mb-5 w-fit">{{ item.label }}</p>
          </Transition>
        </div>

        <button v-else type="button"
                @click="item.onClick || (() => {})"
                :aria-selected="item.selected"
                class="flex items-center content-center cursor-pointer gap-2 mb-1.5 rounded-full transition-colors duration-200 ease-standard"
                :class="{
                  'group-hover:bg-secondary-container/50': isExpanded && !item.selected,
                  'flex-row ml-5 py-4 px-5 w-fit': isExpanded,
                  'bg-secondary-container rounded-full text-on-secondary-container': isExpanded && item.selected,
                  'flex-col mx-auto w-full': !isExpanded,
                }">

          <div
            class="relative text-center select-none text-2xl rounded-full transition-colors duration-200 ease-standard"
            :class="{
               'group-hover:bg-secondary-container/50': !isExpanded && !item.selected,
               'text-on-secondary-container': item.selected,
               'text-on-surface-variant': !item.selected,
               'bg-secondary-container': item.selected && !isExpanded,
               'w-3/4 py-4 pb-2.5': !isExpanded,
              }">
            <i aria-hidden="true" class="material-symbols-outlined normal_outlined_icon mt-1">
              {{ item.icon }}
            </i>

            <!-- Badge -->
            <div v-if="item.show_badge">
              <SmallBadge v-if="item.badge_type === 'small'"
                          class="absolute z-[101] top-0 right-0 translate-y-1/2"/>
              <LargeBadge v-else :n="item.badge_label || 0"
                          class="absolute z-[101] translate-x-full"
                          :class="{
                            '-translate-y-10 right-3 top-7.5': isExpanded,
                            'top-0 right-7 translate-y-1/2': !isExpanded
                          }"/>
            </div>
          </div>

          <Transition name="text-reveal">
            <p class="text-secondary whitespace-nowrap">{{ item.label }}</p>
          </Transition>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {ref} from "vue";
import SmallBadge from "@/components/material/badges/SmallBadge.vue";
import LargeBadge from "@/components/material/badges/LargeBadge.vue";

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
  badge_label?: number
}
</script>

<style scoped>
.ease-standard {
  transition-timing-function: cubic-bezier(0.2, 0.0, 0, 1.0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.text-reveal-enter-active {
  transition: opacity 0.15s ease;
  transition-delay: 0.1s;
}

.text-reveal-leave-active {
  transition: opacity 0.1s ease;
}

.text-reveal-enter-from,
.text-reveal-leave-to {
  opacity: 0;
}
</style>
