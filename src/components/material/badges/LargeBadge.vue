<template>
  <div class="bg-error rounded-full h-5.5 min-w-5.5 w-fit p-0.5">
    <p class="text-on-error text-body-small font-bold" style="font-size: 11px">{{ showed }}</p>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  n: number
}>();

const showed = computed(() => {
  if (props.n > 999) return '999+'
  else return props.n;
})
</script>
