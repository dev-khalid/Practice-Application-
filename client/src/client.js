export default function swDev(payload) {
  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  console.log(swUrl);
  const publicVapidKey =
    'BCw9DyYE6hfa2rWNxwjxJbN_CcMniLbmIbpFs3lZNkCHYxJ9-n7F3FJPUHLmGCqtj0RG9Yroajg1weEyT-O6Wg4';

  // Check for service worker
  if ('serviceWorker' in navigator) {
    send().catch((err) => console.error(err));
  }

  // Register SW, Register Push, Send Push
  async function send() {
    // Register Service Worker
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('/worker.js', {
      scope: '/',
    });
    console.log('Service Worker Registered...');

    // Register Push
    console.log('Registering Push...');
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    console.log('Push Registered...');

    // Send Push Notification
    //push take eibar just react theke push kora lagbe .
    console.log('Sending Push...');
    await fetch('http://localhost:5000/subscribe', {
      method: 'POST',
      body: JSON.stringify({ subscription, payload}),
      headers: {
        'content-type': 'application/json',
      },
    });
    console.log('Push Sent...');
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
