<template>
  <div
    class="active flex flex-row items-center gap-3 py-4 pl-4 pr-6 rounded-full cursor-pointer"
    :class="{
      'hover:bg-secondary/15': !isActive,
      'bg-secondary/30': isActive,
    }"
    @click="onClick()"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">

    <i class="material-symbols-outlined" :style="iconStyle">{{ props.item.icon }}</i>

    {{ props.item.name }}

    <span v-if="props.item.counter" class="flex flex-grow justify-end text-sm tracking-[.00714em]">{{
        props.item.counter
      }}</span>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import type {Item} from "@/components/material/navigation/NavigationRail.vue";

const props = defineProps<{
  item: Item,
  active: string[],
  parentId: string[],
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
