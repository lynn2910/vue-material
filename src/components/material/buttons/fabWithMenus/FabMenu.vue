<template>
  <div v-if="props.showMenu"
       ref="floating"
       class="flex flex-col gap-2 items-end"
       :style="floatingStyles">
    <div v-for="(item, index) in props.items" :key="index">
      <FilledButton :label="item.label"
                    :icon="item.icon"
                    :color_set="props.color_set"
                    @click="handleItemClick(item)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref, toRef} from "vue";
import {autoUpdate, offset, shift, useFloating} from "@floating-ui/vue";
import FilledButton from "@/components/material/buttons/withLabels/FilledButton.vue";

export type FabMenuItem = {
  label: string,
  icon: string,
  onClick: () => void
}

const props = defineProps<{
  items: FabMenuItem[],
  color_set?: "primary" | "secondary" | "tertiary",

  anchor: any,
  showMenu: boolean,
}>();

const emit = defineEmits<{
  close: []
}>();

const floating = ref(null);
const reference = toRef(props, 'anchor');

const {floatingStyles} = useFloating(reference, floating, {
  placement: "top-end",
  middleware: [
    offset(10),
    shift(),
  ],
  whileElementsMounted: autoUpdate,
});

const handleClickOutside = (event: MouseEvent) => {
  if (!props.showMenu) return;

  const target = event.target as Node;
  const floatingEl = floating.value as HTMLElement | null;

  if (floatingEl && !floatingEl.contains(target)) {
    const getAnchorElement = (anchor: any): HTMLElement | null => {
      if (!anchor) return null;

      if (anchor instanceof HTMLElement) return anchor;

      if (anchor && typeof anchor === 'object' && '$el' in anchor) {
        return anchor.$el;
      }

      if (anchor && typeof anchor === 'object' && 'value' in anchor) {
        return anchor.value;
      }

      return null;
    };

    const anchorEl = getAnchorElement(reference.value);

    if (!anchorEl || !anchorEl.contains(target)) {
      emit('close');
    }
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.showMenu) {
    emit('close');
  }
};

const handleItemClick = (item: FabMenuItem | 'divider') => {
  if (typeof item !== 'string') {
    item.onClick?.();
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
  document.removeEventListener('keydown', handleKeydown);
});
</script>
