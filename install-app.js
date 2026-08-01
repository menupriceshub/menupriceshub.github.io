let deferredPrompt;
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    if (installBtn) {
        installBtn.style.display = 'inline-block';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                // Normal Chrome flow
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log('Install Result:', outcome);
                deferredPrompt = null;
                installBtn.style.display = 'none';
            } else {
                // Fallback for Kiwi/other browsers where prompt never fires
                alert("App install karne ke liye:\n\nBrowser menu (⋮) kholo > 'Add to Home screen' ya 'Install app' option select karo.");
            }
        });

        // Kiwi/unsupported browsers me bhi button dikhao (manual fallback ke liye)
        setTimeout(() => {
            if (!deferredPrompt) {
                installBtn.style.display = 'inline-block';
            }
        }, 2000); // 2 sec wait taaki beforeinstallprompt ko chance mile fire hone ka
    }
});
