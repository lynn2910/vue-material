<template>
  <div
    class="active flex items-center rounded-full cursor-pointer group"
    :class="{
      'hover:bg-secondary/15': !isActive && props.expand,
      'bg-secondary/30': isActive && props.expand,
      'flex-row pl-4 pr-6 py-4 gap-3': props.expand,
      'flex-col py-2 gap-1.5': !props.expand,
    }"
    @click="onClick()"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">

    <div
      :style="iconStyle"
      :class="{
         'w-14 h-8 group-hover:bg-secondary/15 rounded-2xl flex items-center justify-center': !props.expand,
         'bg-secondary/30': !props.expand && isActive,
       }">
      <i class="material-symbols-outlined">{{ props.item.icon }}</i>
    </div>

    {{ props.item.name }}

    <span v-if="props.item.counter" v-show="props.expand"
          class="flex flex-grow justify-end text-sm tracking-[.00714em]">
      {{ props.item.counter }}
    </span>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import type {Item} from "@/components/material/navigation/NavigationRail.vue";

const props = defineProps<{
  item: Item,
  active: string[],
  parentId: string[],
  expand: boolean
}>();

const isHovered = ref(false);

const currentPath = computed(() => [...props.parentId, props.item.id])
const isActive = computed(() => {
  if (props.active.join('/') === currentPath.value.join('/')) {
    return true;
  }

  return props.active.length > 0 && props.active[props.active.length - 1] === props.item.id;
})

const iconStyle = computed(() =>
  isHovered.value || isActive.value
    ? {fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48"}
    : {}
);

const emit = defineEmits<{
  navigate: [id: string, path: string[]],
}>();

function onClick() {
  emit(
    'navigate',
    props.item.id,
    [...props.parentId, props.item.id]
  )
}
</script>
