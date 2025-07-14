<template>
  <label class="flex items-center gap-2">
    <input type="checkbox"
           ref="checkboxRef"
           :checked="modelValue === 1"
           @change="updateValue"
           :name="props.name"
           :disabled="props.disabled"
           class="h-[18px] w-[18px] text-white focus:ring-2 focus: ring-primary"
           :class="{
             'cursor-pointer': !props.disabled,
             'accent-outline': modelValue === 0 || props.disabled,
             'accent-primary': !props.disabled && ((modelValue === 1 && !is_error) || modelValue === 2),
             'accent-error': !props.disabled && (modelValue === 1 && is_error),
           }"/>
    <span v-if="label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import {toRefs, watch, ref, nextTick} from "vue";

// TODO add 'disabled'

const props = defineProps<{
  modelValue: number,
  label?: string,
  is_error?: boolean,
  name: string,
  disabled?: boolean
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
