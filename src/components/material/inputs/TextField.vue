<template>
  <div class="relative flex flex-col">

    <div class="relative z-0 bg-surface">
      <input :id="props.id"
             :type="props.type"
             :aria-label="props.label"
             :name="props.name"
             placeholder=""
             class="w-full h-14 leading-5 relative py-2 px-4 rounded border border-on-surface-variant/70 focus:border-primary outline-none focus:ring-0 peer"/>

      <label
        class="absolute tracking-[.03125em] text-on-surface-variant/70 duration-300 transform px-1 -translate-y-7 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:left-4 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 peer-focus:bg-surface peer-focus:px-1 peer-invalid:text-error"
        :for="props.name">
        {{ props.label }}
      </label>
    </div>

    <!--

    absolute tracking-[.03125em] bg-neutral-10 dark:bg-neutral-900
    duration-300 transform px-1 -translate-y-7 scale-75 top-4 z-10 origin-[0] left-4
    peer-focus:left-4 peer-focus:text-primary
    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
    peer-focus:-translate-y-7 peer-focus:bg-surface dark:peer-focus:bg-neutral-900
     dark:peer-invalid:text-error-200

    -->

    <p v-if="props.support_text" class="pt-1 px-4 text-xs tracking-[0.4px]">
      {{ props.support_text }}
    </p>
  </div>
</template>

<script setup lang="ts">

type AllowedTypes = "text" | "password" | "email" | "number";

const props = defineProps<{
  label: string,
  type: AllowedTypes,
  id: string,
  name: string,

  icon?: string,
  support_text?: string,
  filled?: boolean,

  disabled?: boolean,
}>();

</script>
