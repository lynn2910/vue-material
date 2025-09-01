<template>
  <div ref="anchor" class="w-full relative">
    <!-- Select -->
    <button @click="showMenu = !showMenu"
            :class="{
              'text-on-surface-variant/50': !selectedValue && props.placeholder,
            }"
            class="w-full select-none flex flex-row items-center justify-between gap-2 bg-surface-container text-on-surface-variant py-2 px-4 rounded-lg cursor-pointer border-2 border-transparent focus:border-primary">
      <p>{{ selectedValue || props.placeholder }}</p>

      <Icon icon="arrow_drop_down" class="text-on-surface"/>
    </button>

    <!-- Dropdown -->
    <div v-if="showMenu"
         ref="floating"
         class="w-full select-none flex flex-col items-center justify-between bg-surface-container text-on-surface-variant py-2 rounded-lg"
         :style="floatingStyles">

      <div v-for="(item, index) in props.items"
           @click="handleClick(item)"
           :class="{
             'bg-primary text-on-primary': isSelected(item.value),
             'hover:bg-primary/15': !isSelected(item.value),
           }"
           class="flex flex-row items-center justify-between gap-2 w-full py-3 px-4 cursor-pointer"
           :key="index">
        <p>{{ item.label }}</p>

        <Icon icon="check" v-if="isSelected(item.value)" class="text-on-primary"/>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
import {autoUpdate, offset, shift, useFloating} from "@floating-ui/vue";
import Icon from "@/components/material/Icon.vue";

const showMenu = ref(false);

const props = defineProps<{
  items: { value: any, label: string, icon?: string }[],
  placeholder?: string,
  disallowNull?: boolean,
  selected: any,
}>();

const emit = defineEmits(['change']);

const anchor = ref<HTMLElement | null>(null);
const floating = ref<HTMLElement | null>(null);

const {floatingStyles} = useFloating(anchor, floating, {
  placement: 'bottom-start',
  middleware: [
    offset(5),
    shift(),
  ],
  whileElementsMounted: autoUpdate,
});

const selectedValue = computed(() => {
  if (props.disallowNull && props.selected == null) {
    return props.placeholder || '';
  }
  return props.items.find(item => item.value === props.selected)?.label;
});

function isSelected(value: any) {
  return props.selected === value;
}

function handleClick(item: any) {
  if (props.selected === item.value && !props.disallowNull) {
    emit('change', null);
    showMenu.value = false;
    return;
  }
  emit('change', item.value);
  showMenu.value = false;
}

const handleClickOutside = (event: MouseEvent) => {
  if (!showMenu) return;

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

    const anchorEl = getAnchorElement(anchor.value);

    if (!anchorEl || !anchorEl.contains(target)) {
      showMenu.value = false;
    }
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showMenu.value) {
    showMenu.value = false;
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
