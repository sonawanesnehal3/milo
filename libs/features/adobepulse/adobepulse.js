import createCarousel from './carouselpulse.js';

let config;
let createTag;
let loadStyle;

const MEDIA_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <g transform="translate(-10500 3403)">
    <circle cx="10" cy="10" r="10" transform="translate(10500 -3403)" fill="#707070"/>
    <path d="M10,4A5.373,5.373,0,0,0,4.5,9.5C4.5,13,10,19,10,19s5.5-6,5.5-9.5A5.373,5.373,0,0,0,10,4Zm0,7.5A2,2,0,1,1,12,9.5,2,2,0,0,1,10,11.5Z" transform="translate(10500 -3403)" fill="#fff"/>
  </g>
</svg>`;

const CLOSE_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <g transform="translate(-10500 3403)">
    <circle cx="10" cy="10" r="10" transform="translate(10500 -3403)" fill="#707070"/>
    <line y1="8" x2="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"/>
    <line x1="8" y1="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"/>
  </g>
</svg>`;

function closeToaster(toaster) {
  const closeEvent = new Event('toaster:closed');
  window.dispatchEvent(closeEvent);
  toaster.remove();
}

// Create a simple toaster element (with nav-arrow)
function createToaster() {
  const existingToaster = document.querySelector('.pulse-toaster');
  if (existingToaster) {
    existingToaster.remove(); // Remove existing toaster if one is open
  }

  const toaster = createTag('div', { class: 'pulse-toaster' });
  const toasterContent = createTag('div', { class: 'pulse-toaster-content' });

  // Create nav-arrow
  const navArrow = createTag('div', { class: 'nav-arrow' });
  const navArrowInner = createTag('div', { class: 'nav-arrow-inner' });

  const closeButton = createTag('button', { class: 'dialog-close', 'aria-label': 'Close' }, CLOSE_ICON);
  closeButton.addEventListener('click', () => {
    closeToaster(toaster);
  });

  navArrow.appendChild(navArrowInner);
  toasterContent.appendChild(closeButton);
  toasterContent.appendChild(navArrow);

  const carousel = createCarousel();
  toasterContent.appendChild(carousel);

  toaster.appendChild(toasterContent);

  const observer = new MutationObserver(() => {
    const mediaContainer = document.querySelector('.media-icon-container');
    if (mediaContainer) {
      mediaContainer.appendChild(toaster);
      observer.disconnect();
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}

// Function to add media icon and attach click event
async function appendMediaIcon() {
  const observer = new MutationObserver(() => {
    const navWrapper = document.querySelector('.feds-nav-wrapper');
    if (navWrapper) {
      const mediaIcon = document.createElement('div');
      mediaIcon.classList.add('media-icon-container');
      mediaIcon.innerHTML = MEDIA_ICON;
      navWrapper.appendChild(mediaIcon);

      // Attach click event to open the toaster
      mediaIcon.addEventListener('click', () => {
        console.log('Media icon clicked');
        createToaster(); // Call createToaster here
      });

      observer.disconnect();
    }
  });

  // Observe the DOM for changes to attach the icon after the navigation is loaded
  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}

export default async function loadPulseToaster(conf, createTagFunc, loadStyleFunc) {
  config = conf;
  createTag = createTagFunc;
  loadStyle = loadStyleFunc;

  // Add media icon to the global navigation
  await appendMediaIcon();
}
