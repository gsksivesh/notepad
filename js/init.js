let firebaseAuthEnabled = false;

// service-worker to save the serve offline
if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('service-worker.js');
}

window.onload = function () {
    localDatabase();
};
