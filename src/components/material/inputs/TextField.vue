<template>
  <div class="relative flex flex-col" :class="{'cursor-disabled select-none': props.disabled}">

    <div class="relative z-0">
      <label v-if="props.icon"
             :for="props.name"
             class="absolute left-4 z-10 top-4 select-none">
        <Icon :icon="props.icon"
              :class="{
                'text-on-surface-variant/70': !hasError && !props.disabled && !isFocused,
                'text-primary': isFocused && !hasError && !props.disabled,
                'text-error': hasError && !props.disabled,
                'text-on-surface-variant/50': props.disabled
              }"/>
      </label>

      <input
        :id="props.id"
        :type="props.type"
        :aria-label="props.label"
        :name="props.name"
        :required="props.required"
        placeholder=""
        :value="modelValue"
        @input="handleInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :disabled="props.disabled"
        :min="props.min"
        :max="props.max"
        :size="props.size"
        :pattern="props.pattern"
        :autocomplete="props.autocomplete"
        :readonly="props.readonly"
        :class="{
          // Common styles
          'w-full h-14 leading-5 relative py-2 rounded outline-none focus:ring-0 peer': true,
          'cursor-not-allowed text-on-surface-variant/50': props.disabled,

          // Padding based on icon presence
          'pl-12': props.icon,
          'px-4': !props.icon,
          'pr-4': true,

          // Outlined specific styles
          'border': !props.filled,
          'border-on-surface-variant/70 focus:border-primary': !props.filled && !hasError && !props.disabled,
          'bg-surface': !props.filled,
          'rounded': !props.filled,

          // Filled specific styles
          'rounded-t bg-surface-container-highest': props.filled,
          'pb-3 pt-6': props.filled,
          'border-b-2 border-on-surface-variant/70': props.filled && !hasError && !props.disabled,
          'hover:bg-surface-container-high': props.filled && !props.disabled,
          'focus:bg-surface-container-highest': props.filled && !props.disabled,

          // Error states
          'border-error text-error': hasError && !props.disabled && !props.filled,
          'border-b-error text-error': hasError && !props.disabled && props.filled,

          // Disabled states for background and border
          'bg-surface-variant/30 border-on-surface-variant/20': props.disabled && !props.filled,
          'bg-surface-variant/30 border-b-on-surface-variant/20': props.disabled && props.filled
        }"
      />

      <label
        :for="props.name"
        class="pointer-events-none select-none"
        :class="{
          // Common styles for floating label
          'absolute tracking-[.03125em] duration-300 transform px-1 z-10 origin-[0]': true,
          'select-none': props.disabled,

          // Background for floating label
          'bg-surface': !props.disabled && !props.filled,

          // Scale and position based on focus OR content presence
          'scale-75': isFocused || hasContent,
          'scale-100': !isFocused && !hasContent,

          // Horizontal position
          // 'left-12 ': props.icon && props.filled && (isFocused || hasContent),
          'left-12': props.icon,
          // 'left-3 ': !props.icon && props.filled && (isFocused || hasContent),
          'left-3': !props.icon,

          // Vertical position for outlined
          'top-4 -translate-y-7': !props.filled && (isFocused || hasContent),
          'top-4 translate-y-0': !props.filled && !isFocused && !hasContent,

          // Vertical position for filled
          'top-1 translate-y-0': props.filled && (isFocused || hasContent),
          'top-4 translate-y-0 ': props.filled && !isFocused && !hasContent,

          // Text color
          'text-error': hasError && !props.disabled,
          'text-primary': isFocused && !hasError && !props.disabled,
          'text-on-surface-variant/70': !isFocused && !hasError && !props.disabled,
          'text-on-surface-variant/50': props.disabled
        }"
      >
        {{ props.label }}
      </label>

      <div v-if="props.filled"
           :class="{
             'absolute bottom-0 left-0 right-0 h-0.5 transform origin-bottom scale-x-0 transition-transform duration-300 peer-focus:scale-x-100': true,
             'bg-primary': !hasError,
             'bg-error': hasError
           }">
      </div>

    </div>

    <p v-if="props.support_text && !hasError && !props.disabled"
       class="pt-1 px-4 text-xs tracking-[0.4px] text-on-surface-variant">
      {{ props.support_text }}
    </p>
    <p v-if="hasError && !props.disabled" class="pt-1 px-4 text-xs tracking-[0.4px] text-error">
      {{ props.error_message || 'Format invalide.' }}
    </p>
    <p v-if="props.disabled && props.support_text"
       class="pt-1 px-4 text-xs tracking-[0.4px] text-on-surface-variant/50">
      {{ props.support_text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import Icon from "@/components/material/Icon.vue";

type AllowedTypes = "text" | "password" | "email" | "number" | "search" | "tel" | "url";

const props = defineProps<{
  label: string;
  type: AllowedTypes;
  id: string;
  name: string;

  modelValue?: string | number;

  icon?: string;
  support_text?: string;
  error_message?: string;

  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  size?: number;
  pattern?: string;
  autocomplete?: string;
  readonly?: boolean;
  filled?: boolean;
}>();

const emit = defineEmits(['update:modelValue', 'validation-change']);

const isValid = ref(true);
const isFocused = ref(false);

const hasContent = computed(() => {
  return props.modelValue !== undefined &&
    props.modelValue !== null &&
    String(props.modelValue).trim() !== '';
});

const hasError = computed(() => {
  if (props.disabled) {
    isValid.value = true;
    return false;
  }

  if (!props.pattern) {
    return false;
  }

  if (props.required && !props.modelValue && props.pattern) {
    isValid.value = false;
    return true;
  }

  if (props.pattern && props.modelValue !== undefined && props.modelValue !== null && String(props.modelValue) !== '') {
    const regex = new RegExp(props.pattern);
    const valid = regex.test(String(props.modelValue));
    isValid.value = valid;
    return !valid;
  }

  isValid.value = true;
  return false;
});

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  let value: string | number = target.value;

  if (props.type === 'number') {
    value = parseFloat(value);
    if (isNaN(value)) {
      value = '';
    }
  }

  emit('update:modelValue', value);
  emit('validation-change', !hasError.value);
}

</script>
