<template>
  <div ref="anchor" class="w-full">
    <!-- Select -->
    <button @click="showMenu = !showMenu"
            :class="{
              'text-on-surface-variant/50': (!selectedValues || selectedValues.length === 0) && props.placeholder,
            }"
            class="w-full select-none flex flex-row items-center justify-between gap-2 bg-surface-container text-on-surface-variant py-2 px-4 rounded-lg cursor-pointer border-2 border-transparent focus:border-primary">
      <div class="flex-1 text-left">
        <div v-if="selectedValues && selectedValues.length > 0" class="flex flex-wrap gap-1">
          <span v-for="(value, index) in selectedValues" :key="index"
                class="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-sm">
            {{ getItemLabel(value) }}
            <Icon icon="close"
                  @click.stop="removeItem(value)"
                  class="text-primary hover:text-primary/70 cursor-pointer text-sm"/>
          </span>
        </div>
        <p v-else>{{ props.placeholder }}</p>
      </div>

      <Icon icon="arrow_drop_down" class="text-on-surface"/>
    </button>

    <div v-if="showMenu"
         ref="floating"
         class="select-none flex flex-col items-center justify-between bg-surface-container text-on-surface-variant py-2 rounded-lg shadow-lg"
         :style="{...floatingStyles, width: anchor?.clientWidth + 'px'}">

      <div v-if="props.showSelectAll"
           @click="handleSelectAll"
           class="flex flex-row items-center justify-between gap-2 w-full py-3 px-4 cursor-pointer hover:bg-primary/15 border-b border-outline-variant/20">
        <p class="font-medium">{{ allSelected ? 'Tout désélectionner' : 'Tout sélectionner' }}</p>
        <Icon :icon="allSelected ? 'select_all' : 'deselect'" class="text-on-surface-variant"/>
      </div>

      <div v-for="(item, index) in props.items"
           @click="handleClick(item)"
           :class="{
             'bg-primary/10 text-primary': isSelected(item.value),
             'hover:bg-primary/15': !isSelected(item.value),
           }"
           class="flex flex-row items-center justify-between gap-2 w-full py-3 px-4 cursor-pointer"
           :key="index">
        <p>{{ item.label }}</p>

        <Icon icon="check" v-if="isSelected(item.value)" class="text-primary"/>
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
  selected: any[],
  maxSelection?: number,
  showSelectAll?: boolean,
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

const selectedValues = computed(() => {
  return Array.isArray(props.selected) ? props.selected : [];
});

const allSelected = computed(() => {
  return props.items.length > 0 && selectedValues.value.length === props.items.length;
});

function getItemLabel(value: any) {
  return props.items.find(item => item.value === value)?.label || value;
}

function isSelected(value: any) {
  return selectedValues.value.includes(value);
}

function handleClick(item: any) {
  const currentSelected = [...selectedValues.value];
  const index = currentSelected.indexOf(item.value);

  if (index > -1) {
    currentSelected.splice(index, 1);
  } else {
    if (props.maxSelection && currentSelected.length >= props.maxSelection) {
      return;
    }
    currentSelected.push(item.value);
  }

  emit('change', currentSelected);
}

function removeItem(value: any) {
  const currentSelected = [...selectedValues.value];
  const index = currentSelected.indexOf(value);

  if (index > -1) {
    currentSelected.splice(index, 1);
    emit('change', currentSelected);
  }
}

function handleSelectAll() {
  if (allSelected.value) {
    emit('change', []);
  } else {
    let allValues = props.items.map(item => item.value);
    if (props.maxSelection && allValues.length > props.maxSelection) {
      allValues = allValues.slice(0, props.maxSelection);
    }
    emit('change', allValues);
  }
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
