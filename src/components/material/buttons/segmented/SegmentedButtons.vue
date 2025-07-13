<template>
  <div
    class="inline-flex flex-row items-center border border-on-surface-variant/70 rounded-full">
    <div v-for="(item, index) in props.items" :key="item.value"
         class="segmented_after h-10 py-2.5 relative inline-flex flex-row items-center justify-center text-sm gap-x-2 tracking-[.00714em] px-6 font-medium text-primary"
         :class="{
           'rounded-l-full': index === 0,
           'rounded-r-full': index === props.items.length - 1,
           'border-r border-r-on-surface-variant/70': index < props.items.length - 1,
           'bg-primary/25': modelValue.includes(item.value),
         }">

      <input :id="props.id + '_' + item.value"
             @change="selected(item)"
             :value="item.value"
             :checked="modelValue.includes(item.value)"
             class="z-10 opacity-0 absolute inset-0"
             type="checkbox">

      <label class="flex items-center gap-3"
             :for="props.id + '_' + item.value">
        <i class="material-symbols-outlined normal_outlined_icon"
           v-if="modelValue.includes(item.value)">
          check
        </i>
        {{ item.label }}
      </label>

    </div>

  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

type Item = { label: string, value: any };

const props = defineProps<{
  items: Item[],
  id: string,
  allow_multiple?: boolean,
  disallow_none?: boolean,
  modelValue: any[]
}>();

const emit = defineEmits(['update:modelValue']);

const selectedItemsComputed = computed({
  get: () => props.modelValue,
  set: (newValue) => {
    emit('update:modelValue', newValue);
  }
});

const modes: Record<string, (selected_item: Item) => void> =
  {
    'single': (selected_item: Item) => {
      if (!props.disallow_none && selectedItemsComputed.value.includes(selected_item.value)) {
        selectedItemsComputed.value = [];
      } else {
        selectedItemsComputed.value = [selected_item.value];
      }
    },
    'multiple': (selected_item: Item) => {
      const index = selectedItemsComputed.value.findIndex(item => item === selected_item.value);
      if (index === -1) {
        selectedItemsComputed.value = [...selectedItemsComputed.value, selected_item.value];
      } else {
        const newArray = [...selectedItemsComputed.value];
        if (!props.disallow_none || (props.disallow_none && newArray.length > 1)) {
          newArray.splice(index, 1);
        }
        selectedItemsComputed.value = newArray;
      }
    }
  }

function selected(selected_item: Item) {
  if (props.allow_multiple) {
    modes['multiple'](selected_item);
  } else {
    modes['single'](selected_item);
  }
}
</script>

<style scoped>
@reference "@/styles/index.css"

.segmented_after {
}

.segmented_after:not(:disabled)::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.segmented_after:not(:disabled):hover::after {
  opacity: 1;
  @apply bg-primary/20;
}

.segmented_after:not(:disabled):focus::after {
  opacity: 1;
  @apply bg-primary/30;
}
</style>
