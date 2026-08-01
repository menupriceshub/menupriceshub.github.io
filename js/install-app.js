let deferredPrompt;

// PWA Install Button
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();

    deferredPrompt = e;

    const installBtn = document.getElementById('installBtn');

    if (installBtn) {
        installBtn.style.display = 'inline-block';
    }
});


document.addEventListener('DOMContentLoaded', () => {

    const installBtn = document.getElementById('installBtn');

    if (installBtn) {

        installBtn.addEventListener('click', async () => {

            if (!deferredPrompt) return;

            deferredPrompt.prompt();

            const { outcome } = await deferredPrompt.userChoice;

            console.log('Install Result:', outcome);

            deferredPrompt = null;

            installBtn.style.display = 'none';
        });
    }

});


// App Installed Event
window.addEventListener('appinstalled', () => {
    console.log('PWA Installed Successfully');
});


// Service Worker Register
if ('serviceWorker' in navigator) {

    window.addEventListener('load', () => {

        navigator.serviceWorker.register('/sw.js')
        .then((reg) => {

            console.log(
                'Service Worker Registered:',
                reg.scope
            );

        })
        .catch((err) => {

            console.log(
                'Service Worker Error:',
                err
            );

        });

    });

}
