<template>
  <div class="relative flex flex-col">

    <div class="relative z-0 bg-surface">

      <div class="absolute left-4 top-4 z-10">
        <Icon v-if="props.icon" :icon="props.icon" class="text-on-surface-variant/70"/>
      </div>

      <input :id="props.id"
             :type="props.type"
             :aria-label="props.label"
             :name="props.name"
             :required="props.required"
             placeholder=""

             :class="{ 'pl-12': props.icon }"
             class="w-full h-14 leading-5 relative py-2 px-4 rounded border border-on-surface-variant/70 focus:border-primary outline-none focus:ring-0 peer"/>
      <label
        class="absolute tracking-[.03125em] text-on-surface-variant/70 duration-300 transform px-1 -translate-y-7 scale-75 top-4 z-10 origin-[0] peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 peer-focus:bg-surface peer-focus:px-1 peer-invalid:text-error"
        :class="{
          'left-12 peer-focus:left-12': props.icon,
          'left-4 peer-focus:left-4': !props.icon
        }"
        :for="props.name">
        {{ props.label }}
      </label>
    </div>

    <p v-if="props.support_text" class="pt-1 px-4 text-xs tracking-[0.4px]">
      {{ props.support_text }}
    </p>
  </div>
</template>

<script setup lang="ts">

import Icon from "@/components/material/Icon.vue";

type AllowedTypes = "text" | "password" | "email" | "number";

const props = defineProps<{
  label: string,
  type: AllowedTypes,
  id: string,
  name: string,

  icon?: string,
  support_text?: string,
  filled?: boolean,

  required?: boolean,
  disabled?: boolean,
}>();

</script>
