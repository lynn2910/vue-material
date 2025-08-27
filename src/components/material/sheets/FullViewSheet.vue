<template>
  <Teleport to="body">
    <div class="fixed top-0 left-0 w-full h-full z-50 bg-surface p-4 text-on-surface">
      <AppBar :headline="props.headline" leading_icon="close" size="small" @click="emit('close')"/>
      <div class="mt-3 mx-3">
        <slot/>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import AppBar from "@/components/material/navigation/bars/AppBar.vue";

const props = defineProps<{
  headline: string,
}>();

const emit = defineEmits(['close']);
</script>
