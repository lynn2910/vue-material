<template>
  <div class="m-10">
    <div
      class="flex flex-row gap-10  p-7 bg-surface rounded-lg border border-surface-container-highest w-full">

      <!-- Cards -->
      <div class="flex flex-col items-start gap-6">
        <h3 class="text-title-medium text-on-surface">Tabs</h3>

        <div class="flex flex-col md:flex-row gap-6">

          <div>
            <p>Mode 'primary'</p><br>
            <Tabs :items="tabs" v-model="selectedTab1" primary/>

            <!-- Content -->
            <div class="py-5 px-3">
              <div v-show="selectedTab1 === 'music'">
                <p>Musique</p>
              </div>
              <div v-show="selectedTab1 === 'photos'">
                <p>Photos</p>
              </div>
              <div v-show="selectedTab1 === 'video'">
                <p>Video</p>
              </div>
            </div>

          </div>
          <div>
            <p>Mode 'secondary'</p><br>
            <Tabs :items="tabs" v-model="selectedTab2" secondary/>

            <!-- Content -->
            <div class="py-5 px-3">
              <div v-show="selectedTab2 === 'music'">
                <p>Musique</p>
              </div>
              <div v-show="selectedTab2 === 'photos'">
                <p>Photos</p>
              </div>
              <div v-show="selectedTab2 === 'video'">
                <p>Video</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script setup lang="ts">
import Tabs from "@/components/material/navigation/Tabs.vue";
import {ref} from "vue";

const selectedTab1 = ref('music');
const selectedTab2 = ref('music');

const tabs = [
  {name: 'Music', value: 'music', icon: 'album'},
  {name: 'Photos', value: 'photos', icon: 'photo'},
  {name: 'Video', value: 'video', icon: 'videocam'},
]
</script>
