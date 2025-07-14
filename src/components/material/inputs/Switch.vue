<template>
  <label class="flex items-center gap-2 relative">
    <div class="inline-flex items-center">
      <input
        type="checkbox"
        :checked="modelValue"
        :name="props.name"
        :disabled="disabled"
        @change="updateValue"
        class="sr-only"
      />
      <div
        class="w-[52px] h-8 rounded-full transition-colors duration-medium2 ease-emphasized relative"
        :class="{
          'bg-primary': !disabled && modelValue,
          'bg-surface-variant': !disabled && !modelValue,
          'bg-surface-variant opacity-40': disabled,
          'cursor-pointer': !disabled
        }"
      >
        <div
          class="absolute top-1 left-1 w-6 h-6 rounded-full shadow-dp1 transition-all duration-medium2 ease-emphasized flex items-center justify-center"
          :class="{
            'translate-x-[20px] bg-on-primary': modelValue,
            'bg-outline': !disabled && !modelValue,
            'bg-outline opacity-40': disabled,
          }"
        >
          <Icon v-if="show_icon && modelValue" icon="check"
                class="text-xs normal_outlined_icon select-none text-primary"/>
          <Icon v-if="show_icon && !modelValue" icon="close"
                class="text-xs normal_outlined_icon text-on-surface-variant select-none"/>
        </div>
      </div>
    </div>
    <span v-if="label" :class="{ 'opacity-40': disabled }">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import {toRefs} from "vue";
import Icon from "@/components/material/Icon.vue";

const props = defineProps<{
  modelValue: boolean,
  name: string,
  label?: string,
  disabled?: boolean,
  show_icon?: boolean,
}>();

const {modelValue, disabled} = toRefs(props);

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
};
</script>
