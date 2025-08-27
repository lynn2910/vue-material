<template>
  <nav class="flex flex-col w-full">
    <div class="flex flex-row justify-between">
      <div class="flex flex-row items-center gap-x-5">
        <ButtonIcon :icon="props.leading_icon || 'arrow_back'"
                    v-if="props.leading_icon"
                    @click="leadingIconClick()"
                    class="!text-headline-medium !text-on-background"/>
        <div v-else class="w-3"/>

        <div class="flex flex-col" v-if="size == 'small'">
          <h1 class="text-headline-small font-medium">
            {{ props.headline }}
          </h1>
          <p v-if="props.subtitle">{{ props.subtitle }}</p>

        </div>
      </div>

      <!-- Actions -->

      <div class="flex flex-row items-center"
           v-if="props.actions && props.actions.length > 0">
        <ButtonIcon v-for="(action, index) in props.actions" :key="index"
                    :icon="action.icon"
                    @click="action.onClick"
                    class="!text-headline-medium !text-on-background"/>
      </div>
    </div>
    <div v-if="size !== 'small'" class="mt-3 ml-3">
      <h1 class="font-medium"
          :class="{
            'text-headline-small': size === 'medium',
            'text-headline-large': size === 'large',
          }">
        {{ props.headline }}
      </h1>
      <p v-if="props.subtitle && props.subtitle.length > 0" class="mt-2">{{ props.subtitle }}</p>
    </div>

  </nav>
</template>

<script setup lang="ts">
import {toRefs} from "vue";
import ButtonIcon from "@/components/material/buttons/icons/ButtonIcon.vue";

export type AppBarAction = {
  icon: string,
  alt: string,
  onClick: () => void,
}

const emit = defineEmits(['click']);

const props = defineProps<{
  leading_icon?: string | null,
  onClick?: () => void,
  actions?: AppBarAction[],
  headline: string,
  subtitle?: string,

  size?: "small" | "medium" | "large"
}>();

function leadingIconClick() {
  if (props.onClick) props.onClick();
}

const {size = "small"} = toRefs(props);

</script>
