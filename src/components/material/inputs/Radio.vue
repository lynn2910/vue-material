<template>
  <label class="flex cursor-pointer items-center gap-2">
    <input
      type="radio"
      :checked="modelValue === value"
      :value="value"
      :name="props.name"
      :disabled="disabled"
      @change="updateValue"
      class="h-[18px] w-[18px] text-white focus:ring-2 focus:ring-primary"
      :class="{
        'cursor-pointer': !disabled,
        'accent-primary': !disabled && !is_error,
        'accent-error': !disabled && is_error,
        'accent-outline': disabled,
      }"
    />
    <span v-if="label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import {toRefs} from "vue";

const props = defineProps<{
  modelValue: any;
  value: any;
  name: string;
  label?: string;
  is_error?: boolean;
  disabled?: boolean;
}>();

const {modelValue, is_error, disabled} = toRefs(props);

const emit = defineEmits<{
  'update:modelValue': [value: any];
}>();

const updateValue = () => {
  // Quand ce radio est cliqué, il émet sa propre valeur pour devenir la nouvelle modelValue
  emit('update:modelValue', props.value);
};
</script>
