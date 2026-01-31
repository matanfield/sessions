export function isNotificationSupported() {
  return 'Notification' in window
}

export async function requestNotificationPermission() {
  if (!isNotificationSupported()) {
    console.warn('Notifications are not supported in this browser')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission === 'denied') {
    console.warn('Notification permission was denied')
    return false
  }

  try {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  } catch (error) {
    console.error('Error requesting notification permission:', error)
    return false
  }
}

export function sendNotification(title, options = {}) {
  if (!isNotificationSupported()) {
    return null
  }

  if (Notification.permission !== 'granted') {
    console.warn('Notification permission not granted')
    return null
  }

  try {
    const notification = new Notification(title, {
      icon: '/vite.svg',
      badge: '/vite.svg',
      tag: 'sessions-timer',
      renotify: true,
      ...options,
    })

    // Auto-close after 10 seconds
    setTimeout(() => {
      notification.close()
    }, 10000)

    return notification
  } catch (error) {
    console.error('Error creating notification:', error)
    return null
  }
}

export function getNotificationPermissionStatus() {
  if (!isNotificationSupported()) {
    return 'unsupported'
  }
  return Notification.permission
}
