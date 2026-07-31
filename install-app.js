
<script>
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    document.getElementById('installBtn').style.display = 'inline-block';
});

document.getElementById('installBtn').addEventListener('click', async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    console.log('Install Result:', outcome);

    deferredPrompt = null;
    document.getElementById('installBtn').style.display = 'none';
});

window.addEventListener('appinstalled', () => {
    alert('App Installed Successfully!');
});
</script>

<!-- Service Worker Register -->
<script>
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
        .then(reg => {
            console.log('Service Worker Registered');
        })
        .catch(err => {
            console.log('SW Error:', err);
        });
    });
}
</script>
