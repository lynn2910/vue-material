<template>
  <div class="relative flex flex-col" :class="{'cursor-disabled select-none': props.disabled}">

    <div class="relative z-0 bg-surface">

      <div v-if="props.icon" class="absolute left-4 top-4 z-10">
        <Icon :icon="props.icon" class="text-on-surface-variant/70"/>
      </div>

      <input
        :id="props.id"
        :type="props.type"
        :aria-label="props.label"
        :name="props.name"
        :required="props.required"
        placeholder=""
        :value="modelValue"
        @input="handleInput"
        :disabled="props.disabled"
        :min="props.min"
        :max="props.max"
        :size="props.size"
        :pattern="props.pattern"
        :autocomplete="props.autocomplete"
        :readonly="props.readonly"
        :class="{
          'pl-12': props.icon,
          'px-4': true,
          'border-error text-error': hasError && !props.disabled,
          'border-on-surface-variant/70 focus:border-primary': !hasError && !props.disabled,
          'cursor-not-allowed bg-surface-variant/30 text-on-surface-variant/50': props.disabled
        }"
        class="w-full h-14 leading-5 relative py-2 rounded border outline-none focus:ring-0 peer"
      />

      <label
        :for="props.name"
        :class="{
          'bg-surface': !props.disabled,
          'left-12 peer-focus:left-12': props.icon,
          'left-4 peer-focus:left-4': !props.icon,
          'text-error': hasError && !props.disabled,
          'text-on-surface-variant/70 peer-focus:text-primary': !hasError && !props.disabled,
          'text-on-surface-variant/50 select-none': props.disabled
        }"
        class="absolute tracking-[.03125em] duration-300 transform px-1 -translate-y-7 scale-75 top-4 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 peer-focus:bg-surface"
      >
        {{ props.label }}
      </label>
    </div>

    <p v-if="props.support_text && !hasError"
       class="pt-1 px-4 text-xs tracking-[0.4px] text-on-surface-variant">
      {{ props.support_text }}
    </p>
    <p v-if="hasError" class="pt-1 px-4 text-xs tracking-[0.4px] text-error">
      {{ props.error_message || 'Format invalide.' }}
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
}>();

const emit = defineEmits(['update:modelValue', 'validation-change']);

const isValid = ref(true);

const hasError = computed(() => {
  if (!props.pattern) {
    return false;
  }

  if (props.required && !props.modelValue && props.pattern) {
    isValid.value = false;
    return true;
  }

  if (props.pattern && props.modelValue) {
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
