// service-worker to save the serve offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}
window.onload = function () {
    let bodyElement = document.getElementsByTagName('body')[0];
    let localStorageContent = localStorage.getItem('notepad');
    let notepadElement = document.getElementById('notepad_div');
    notepadElement.innerHTML = localStorageContent === null ? "" : localStorageContent;

    bodyElement.addEventListener('input', function () {
        // Avoid saving to local storage on every input key if they type very fast
        // The function will execute after 500 milli seconds
        setTimeout(function () {
            localStorage.setItem('notepad', notepadElement.innerHTML);
        }, 500);
    });
};
