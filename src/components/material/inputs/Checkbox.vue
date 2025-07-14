<template>
  <div class="flex items-center gap-2">
    <input type="checkbox"
           ref="checkboxRef"
           :checked="modelValue === 1"
           @change="updateValue"
           class="h-[18px] w-[18px] cursor-pointer text-white focus:ring-2 focus: ring-primary"
           :class="{
             'accent-outline': modelValue === 0,
             'accent-primary': (modelValue === 1 && !is_error) || modelValue === 2,
             'accent-error': modelValue === 1 && is_error,
           }"/>
    <span v-if="label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import {toRefs, watch, ref, nextTick} from "vue";

const props = defineProps<{
  modelValue: number,
  label?: string,
  is_error?: boolean,
}>();

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>();

const {modelValue, is_error} = toRefs(props);
const checkboxRef = ref<HTMLInputElement>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked ? 1 : 0);
};

watch(modelValue, (newValue) => {
  nextTick(() => {
    if (checkboxRef.value) {
      checkboxRef.value.indeterminate = newValue === 2;
    }
  });
}, {immediate: true});
</script>
