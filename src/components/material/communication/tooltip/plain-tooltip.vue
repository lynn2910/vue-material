<template>
  <span ref="anchor"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false">
    <div
      v-if="showTooltip"
      ref="floating"
      class="pb-3 max-w-96"
      :style="floatingStyles">
      <div
        class="bg-inverse-surface text-inverse-on-surface text-body-small py-2 px-3 rounded-xl flex flex-col gap-5 shadow-lg">
        <p>{{ props.message }}</p>
      </div>
    </div>
    <slot/>
  </span>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {autoUpdate, shift, useFloating} from "@floating-ui/vue";

const props = defineProps<{
  message: string
}>();

const showTooltip = ref(false);

const anchor = ref<HTMLElement | null>(null);
const floating = ref<HTMLElement | null>(null);

const {floatingStyles} = useFloating(anchor, floating, {
  placement: "top",
  middleware: [
    shift(),
  ],
  whileElementsMounted: autoUpdate,
});
</script>
