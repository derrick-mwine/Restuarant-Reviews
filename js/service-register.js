// Register Service worker
if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('./sw.js', { scope: './' })
    .then(function (registration) {
      console.log("Service worker is registered");
    })
    .catch(function (error) {
      console.log("Service worker is not registered", error);
    })
}
