import createCarousel from './carouselpulse.js';

let config;
let createTag;
let loadStyle;

const MEDIA_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <circle cx="12" cy="12" r="12" fill="#9a9a9a"/>
  <rect x="6" y="6" width="12" height="12" rx="2" ry="2" fill="white"/>
  <rect x="7.5" y="8" width="9" height="2" fill="#9a9a9a"/>
  <rect x="7.5" y="11" width="5" height="2" fill="#9a9a9a"/>
  <rect x="7.5" y="14" width="5" height="2" fill="#9a9a9a"/>
  <rect x="13.5" y="11" width="3" height="5" fill="#9a9a9a"/>
</svg>
`;

const CLOSE_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <g transform="translate(-10500 3403)">
    <circle cx="10" cy="10" r="10" transform="translate(10500 -3403)" fill="#9a9a9a"/>
    <line y1="8" x2="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"/>
    <line x1="8" y1="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"/>
  </g>
</svg>`;

function closeToaster(toaster) {
  const closeEvent = new Event('toaster:closed');
  window.dispatchEvent(closeEvent);
  toaster.remove();
}

function handleClickOutside(event) {
  const toaster = document.querySelector('.pulse-toaster');
  if (toaster && !toaster.contains(event.target) && !event.target.closest('.media-icon-container')) {
    closeToaster(toaster);
    document.removeEventListener('click', handleClickOutside);
  }
}

// Create a simple toaster element (with nav-arrow)
async function createToaster() {
  const existingToaster = document.querySelector('.pulse-toaster');
  if (existingToaster) {
    existingToaster.remove();
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
  //toasterContent.appendChild(closeButton);
  toasterContent.appendChild(navArrow);

  const carousel = await createCarousel();
  toasterContent.appendChild(carousel);

  toaster.appendChild(toasterContent);

  const mediaContainer = document.querySelector('.media-icon-container');
  if (mediaContainer) {
    mediaContainer.appendChild(toaster);
  }

  // Listen for clicks outside the toaster to close it
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 0);
}

function toggleToaster() {
  const existingToaster = document.querySelector('.pulse-toaster');
  if (existingToaster) {
    closeToaster(existingToaster);
  } else {
    createToaster();
  }
}

function attachMediaIcon(navWrapper) {
  const mediaIcon = document.createElement('div');
  mediaIcon.classList.add('media-icon-container');
  mediaIcon.innerHTML = MEDIA_ICON;
  navWrapper.appendChild(mediaIcon);

  // Attach click event to open the toaster
  mediaIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('Media icon clicked');
    toggleToaster();
  });
}

// Function to add media icon and attach click event
async function appendMediaIcon() {
  let navWrapper = document.querySelector('.feds-nav-wrapper');
  if (navWrapper) {
    attachMediaIcon(navWrapper);
  } else {
    const observer = new MutationObserver(() => {
      navWrapper = document.querySelector('.feds-nav-wrapper');
      if (navWrapper) {
        attachMediaIcon(navWrapper);
        observer.disconnect();
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }
}

export default async function loadPulseToaster(conf, createTagFunc, loadStyleFunc) {
  config = conf;
  createTag = createTagFunc;
  loadStyle = loadStyleFunc;

  await appendMediaIcon();
}
