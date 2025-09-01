<template>
  <span ref="anchor"
        @mouseenter="showTooltip = true"
        @mouseleave="showTooltip = false">
    <div
      v-if="showTooltip"
      ref="floating"
      class="pb-3 max-w-96"
      :style="floatingStyles">
      <div class="bg-surface-container py-3 px-5 rounded-xl flex flex-col gap-5 shadow-lg">
        <h2 v-if="label" class="text-title-large text-on-surface-variant mt-3">
          {{ props.subhead }}
        </h2>
        <div class="text-on-surface-variant">
          <slot/>
        </div>
        <div v-if="props.actions && props.actions.length > 0"
             class="flex flex-row items-center justify-start">
          <div v-for="(action, index) in props.actions" :key="index">
            <TextButton color_set="primary"
                        :label="action.label"
                        :icon="action.icon"
                        @click="action.onClick"/>
          </div>
        </div>
      </div>
    </div>
    <slot name="label">
      <span class="border-b border-dashed">{{ props.label }}</span>
    </slot>
  </span>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {autoUpdate, shift, useFloating} from "@floating-ui/vue";
import TextButton from "@/components/material/buttons/withLabels/TextButton.vue";

const props = defineProps<{
  label?: string,
  subhead?: string,
  actions?: { label: string, icon?: string, onClick: () => void }[]
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
