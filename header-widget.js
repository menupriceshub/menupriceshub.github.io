let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const btn = document.getElementById('installBtn');
    if (btn) btn.style.display = 'inline-block';
});

function setupInstallButton() {
    const installBtn = document.getElementById('installBtn');
    if (!installBtn) return;

    installBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;
        console.log('Install Result:', outcome);

        deferredPrompt = null;
        installBtn.style.display = 'none';
    });
}

// header-widget.js dispatches "headerReady" after injecting #installBtn
document.addEventListener('headerReady', setupInstallButton);

// fallback: agar headerReady kabhi miss ho jaye (script order badal jaye)
if (document.getElementById('installBtn')) {
    setupInstallButton();
}

window.addEventListener('appinstalled', () => {
    alert('App Installed Successfully!');
});

// Service Worker Register
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('Service Worker Registered'))
            .catch(err => console.log('SW Error:', err));
    });
}
