import {defineStore} from 'pinia';
import Queue from "@/stores/material/Queue.ts";
import {computed, ref, watch} from "vue";

export type SnackbarPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'center-left' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type SnackbarLayout = 'floating' | 'banner';

export interface Notification {
  message: string,
  duration?: number,
  show_close_btn?: boolean,
  action?: { label: string, onClick: () => void },
  position?: SnackbarPosition,
  layout?: SnackbarLayout,
  id?: string,
}

export const useSnackbarStore = defineStore('snackbar', () => {
  const notificationsQueue = ref(new Queue<Notification>());
  const currentNotification = computed(() => notificationsQueue.value.peek() || null);
  const isClosing = ref(false);

  let durationTimer: number | null = null;
  let notificationCounter = 0;

  function closeNotification() {
    if (isClosing.value) return;

    isClosing.value = true;

    setTimeout(() => {
      notificationsQueue.value.dequeue();
      isClosing.value = false;
    }, 300);
  }

  function addNotification(notification: Notification) {
    if (!notification.id) {
      notification.id = `notification_${++notificationCounter}`;
    }

    // Valeurs par défaut
    if (!notification.position) {
      notification.position = 'bottom-center';
    }
    if (!notification.layout) {
      notification.layout = 'floating';
    }

    notificationsQueue.value.enqueue(notification);
  }

  watch(currentNotification, (newNotification: Notification | null) => {
    if (durationTimer !== null) {
      clearTimeout(durationTimer);
      durationTimer = null;
    }

    if (newNotification && newNotification.duration && newNotification.duration > 0) {
      durationTimer = setTimeout(() => {
        closeNotification();
      }, newNotification.duration);
    }
  }, {immediate: true});

  return {
    // states
    notificationsQueue,
    isClosing,

    // computed
    currentNotification,

    // actions
    closeNotification,
    addNotification,
  }
})
