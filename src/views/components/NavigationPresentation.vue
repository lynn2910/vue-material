<template>
  <div class="m-10 flex flex-col gap-y-5">
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

    <div
      class="flex flex-row gap-10 p-7 bg-surface rounded-lg border border-surface-container-highest w-full">

      <div class="flex flex-col items-start gap-6 w-full">
        <h3 class="text-title-medium text-on-surface">Toolbar</h3>

        <div class="flex flex-col gap-6 w-full items-start">

          <Toolbar layout="horizontal" :items="horizontalToolbarItems" theme="standard"/>
          <Toolbar layout="horizontal" :items="horizontalToolbarItems" theme="vibrant"/>

          <div class="flex flex-row gap-6">
            <Toolbar layout="vertical" :items="verticalToolbarItems" theme="standard"/>
            <Toolbar layout="vertical" :items="verticalToolbarItems" theme="vibrant"/>
          </div>

        </div>
      </div>
    </div>

    <div
      class="flex flex-row gap-10  p-7 bg-surface rounded-lg border border-surface-container-highest w-full">

      <div class="flex flex-col items-start gap-6 w-full">
        <h3 class="text-title-medium text-on-surface">Barres de navigations</h3>

        <div class="flex flex-col md:flex-row gap-6 w-full items-center">

          <div class="bg-surface-container-lowest p-5 w-full rounded-xl">
            <AppBar :actions="appbar_actions" headline="Titre" size="small"
                    leading_icon="arrow_back"
                    :on-click="onLeadingIconClick"/>
          </div>

          <div class="bg-surface-container-lowest p-5 w-full rounded-xl">
            <AppBar :actions="appbar_actions" headline="Titre" size="small"
                    subtitle="Sous-titre"
                    leading_icon="arrow_back"
                    :on-click="onLeadingIconClick"/>
          </div>

        </div>

        <div class="flex flex-col md:flex-row gap-6 w-full">

          <div class="bg-surface-container-lowest p-5 w-full rounded-xl">
            <AppBar :actions="appbar_actions" headline="Titre" size="medium"
                    subtitle="Sous-titre"
                    leading_icon="arrow_back"
                    :on-click="onLeadingIconClick"/>
          </div>

        </div>

        <div class="flex flex-col md:flex-row gap-6 w-full">

          <div class="bg-surface-container-lowest p-5 w-full rounded-xl">
            <AppBar :actions="appbar_actions" headline="Titre" size="large"
                    subtitle="Sous-titre"
                    leading_icon="arrow_back"
                    :on-click="onLeadingIconClick"/>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import Tabs from "@/components/material/navigation/Tabs.vue";
import {ref} from "vue";
import AppBar, {type AppBarAction} from "@/components/material/navigation/bars/AppBar.vue";
import Toolbar from "@/components/material/communication/toolbars/Toolbar.vue";
import type {ToolbarItem} from "@/components/material/communication/toolbars/toolbar.ts";

const selectedTab1 = ref('music');
const selectedTab2 = ref('music');

const tabs = [
  {name: 'Music', value: 'music', icon: 'album'},
  {name: 'Photos', value: 'photos', icon: 'photo'},
  {name: 'Video', value: 'video', icon: 'videocam'},
];

const appbar_actions: AppBarAction[] = [
  {
    icon: "search",
    alt: "search",
    onClick: () => {
      alert("Tu veux chercher quelque chose ?")
    }
  },
  {
    icon: "edit",
    alt: "modifier",
    onClick: () => {
      alert("Tu peux ouvrir une popup, ou rediriger à une autre page")
    }
  },
  {
    icon: "share",
    alt: "partager",
    onClick: () => {
      alert("Et on peut partager !")
    }
  }
]

function onLeadingIconClick() {
  alert("On peut revenir en arrière facilement !")
}

const horizontalToolbarItems: ToolbarItem[] = [
  {
    variant: "icon",
    icon: "arrow_back",
    onClick: () => {
    },
  },
  {
    variant: "icon",
    icon: "arrow_forward",
    onClick: () => {
    },
  },
  {
    variant: "fab",
    icon: "add",
    onClick: () => {
    },
  },
  {
    variant: "icon",
    icon: "tab",
    onClick: () => {
    },
  },
  {
    variant: "icon",
    icon: "more_vert",
    onClick: () => {
    },
  }
]
const verticalToolbarItems: ToolbarItem[] = [
  {
    variant: "icon",
    icon: "undo",
    onClick: () => {
    },
  },
  {
    variant: "icon",
    icon: "redo",
    onClick: () => {
    },
  },
  {
    variant: "fab",
    icon: "add",
    onClick: () => {
    },
  },
  {
    variant: "icon",
    icon: "tab",
    onClick: () => {
    },
  },
  {
    variant: "icon",
    icon: "more_vert",
    onClick: () => {
    },
  }
]
</script>
