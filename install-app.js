let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const btn = document.getElementById('installBtn');
    if (btn) btn.style.display = 'inline-block';
});

document.addEventListener('click', async (e) => {
    if (e.target && e.target.id === 'installBtn') {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;
        console.log('Install Result:', outcome);

        deferredPrompt = null;
        e.target.style.display = 'none';
    }
});

window.addEventListener('appinstalled', () => {
    alert('App Installed Successfully!');
});

// Service Worker Register
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => {
                console.log('Service Worker Registered');
            })
            .catch((err) => {
                console.log('SW Error:', err);
            });
    });
}
