import './style.scss';

const mainElement = document.getElementById('main');
let seconds = 0; // Counter for the number of seconds

setInterval(() => {
  seconds += 1; // Increment the counter each second
  mainElement.textContent = `You've been on this page for ${seconds} seconds.`; // Update the text content of the main element
}, 1000);
