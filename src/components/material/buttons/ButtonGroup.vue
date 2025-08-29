<template>
  <div class="flex flex-row gap-1.5">
    <div v-for="(button, index) in props.buttons" :key="index">
      <FilledButton v-if="button.label"
                    @click="button.onClick()"
                    :label="button.label"
                    :icon="button.icon"/>
      <FilledIcon v-else :icon="button.icon!" @click="button.onClick()"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilledButton from "@/components/material/buttons/withLabels/FilledButton.vue";
import FilledIcon from "@/components/material/buttons/icons/FilledIcon.vue";

export type Button = {
  label: string,
  icon?: string,
  enabled?: boolean,
  onClick: () => void,
} | {
  icon: string,
  label?: string,
  enabled?: boolean,
  onClick: () => void,
};

export type Buttons = Button[];

const props = defineProps<{
  buttons: Button[],
}>();
</script>
