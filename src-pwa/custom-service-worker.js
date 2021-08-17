/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

/*
    Dependecies
*/
import { precacheAndRoute } from 'workbox-precaching';


/*
    Config
*/
precacheAndRoute(self.__WB_MANIFEST);

console.log('Custom service worker');

/*
    Events - Notifications
*/

self.addEventListener('notificationclick', event => {
    let notification = event.notification

    let action = event.action

    if (action == 'hello'){
        console.log('Hellow Action')
    }else if (action == 'goodbay'){
        console.log('Goodbay Action')
    }else{
        console.log('Main Action')
    }
})

self.addEventListener('notificationclose', event => {
    console.log('Notification was closed')
})

self.addEventListener('push', event => {

    console.log(event)

    if (event.data) {
        console.log('DATA')
        let data = JSON.parse(event.data.text())
        event.waitUntil(
            self.registration.showNotification(
                data.title,
                {
                    body: data.body,
                    image: 'icons/icon-128x128.png',
                    badge: 'icons/icon-128x128.png',
                }
            )
        )
    }else{
        console.log('No data')

    }

})