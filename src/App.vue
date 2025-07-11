<script setup lang="ts">
import {RouterView} from 'vue-router'
import {ref} from "vue";
import ColorPicker from "@/components/material/ColorPicker.vue";

const showThemeControls = ref(true);
</script>

<template>
  <div
    class="min-h-screen min-w-screen bg-background text-on-background transition-colors duration-300">

    <button @click="showThemeControls = !showThemeControls"
            class="fixed top-2 right-2">
      <i class="material-icons-outlined">palette</i>
    </button>

    <div v-show="showThemeControls" class="fixed top-12 right-2">
      <ColorPicker/>
    </div>

    <router-view/>

  </div>
</template>
