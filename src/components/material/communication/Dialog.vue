<template>
  <Teleport to="body">
    <div
      class="bg-scrim/20 fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center"
      @click="handleBackgroundClick">
      <div
        class="rounded-xl bg-surface-container-high text-on-surface-variant p-5"
        @click.stop>
        <div class="flex flex-col items-center justify-center">
          <Icon class="text-headline-large! text-secondary!" v-if="props.icon" :icon="props.icon"/>
          <h1 class="text-headline-large text-on-surface mt-2 mb-5">{{ props.headline }}</h1>
        </div>

        <slot/>

        <div class="flex flex-row items-center justify-end mt-4">
          <TextButton v-for="(button, index) in buttons" :key="index"
                      :label="button.label"
                      @click="button.onClick"/>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import Icon from "@/components/material/Icon.vue";
import TextButton from "@/components/material/buttons/withLabels/TextButton.vue";

const props = defineProps<{
  icon?: string,
  headline: string,
  buttons: { label: string, onClick: () => void }[],
  /**
   * Authorize whether clicking in the background can close the dialog
   */
  disallowDismiss?: boolean,
}>();

const emit = defineEmits<{
  dismiss: []
}>();

const handleBackgroundClick = () => {
  console.log("fuck");
  console.log(props.disallowDismiss)
  if (!props.disallowDismiss) {
    emit('dismiss');
  }
};
</script>
