"use client";

import { useState, useCallback } from 'react';
import Notification, { NotificationType } from '@/components/ui/Notification';

interface NotificationData {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

export function useNotification() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const addNotification = useCallback((
    type: NotificationType,
    title: string,
    message?: string,
    duration?: number
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: NotificationData = {
      id,
      type,
      title,
      message,
      duration
    };

    setNotifications(prev => [...prev, notification]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const showSuccess = useCallback((title: string, message?: string) => {
    addNotification('success', title, message);
  }, [addNotification]);

  const showError = useCallback((title: string, message?: string) => {
    addNotification('error', title, message);
  }, [addNotification]);

  const showInfo = useCallback((title: string, message?: string) => {
    addNotification('info', title, message);
  }, [addNotification]);

  const NotificationContainer = useCallback(() => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  ), [notifications, removeNotification]);

  return {
    showSuccess,
    showError,
    showInfo,
    NotificationContainer
  };
}