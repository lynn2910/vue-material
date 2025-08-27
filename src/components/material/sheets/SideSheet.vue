<template>
  <div class="flex flex-row h-screen">
    <Divider vertical v-show="props.showDivider"/>

    <!-- Divider -->
    <div class="w-full">
      <div class="w-full ml-1">
        <AppBar :headline="props.headline" size="small"
                :actions="appbar_actions"/>
      </div>
      <div class="p-9 pt-5">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Divider from "@/components/material/containment/dividers/Divider.vue";
import AppBar from "@/components/material/navigation/bars/AppBar.vue";

const props = defineProps<{
  headline: string,
  showDivider?: boolean,
  leading_icon?: string,
}>();

const emit = defineEmits(['close']);

const appbar_actions = [
  {
    icon: 'close',
    alt: 'Close',
    onClick: () => emit('close')
  }
]
</script>
