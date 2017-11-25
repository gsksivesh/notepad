// service-worker to save the serve offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}
window.onload = function () {
    let bodyElement = document.getElementsByTagName('body')[0];
    let localStorageContent = localStorage.getItem('notepad');
    bodyElement.innerHTML = localStorageContent === null ? "" : localStorageContent;

    bodyElement.addEventListener('input', function () {
        // Avoid saving to local storage on every input key if they type very fast
        // The function will execute after 500 milli seconds
        setTimeout(function () {
            localStorage.setItem('notepad', bodyElement.innerHTML);
        }, 500);
    });
    console.log(bodyElement.innerHTML);
};
