let config;
let createTag;
let loadStyle;

const LOCATION_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <g transform="translate(-10500 3403)">
    <circle cx="10" cy="10" r="10" transform="translate(10500 -3403)" fill="#707070"/>
    <path d="M10,4A5.373,5.373,0,0,0,4.5,9.5C4.5,13,10,19,10,19s5.5-6,5.5-9.5A5.373,5.373,0,0,0,10,4Zm0,7.5A2,2,0,1,1,12,9.5,2,2,0,0,1,10,11.5Z" transform="translate(10500 -3403)" fill="#fff"/>
  </g>
</svg>`;

function closeToaster(toaster) {
  const closeEvent = new Event('toaster:closed');
  window.dispatchEvent(closeEvent);
  toaster.remove();
}

// Create a simple toaster element (currently empty)
function createToaster() {
  const toaster = createTag('div', { class: 'pulse-toaster' });

  const toasterContent = createTag('div', { class: 'pulse-toaster-content' });
  const closeButton = createTag('button', { class: 'dialog-close', 'aria-label': 'Close' }, '×');
  closeButton.addEventListener('click', () => {
    closeToaster(toaster);
  });

  toasterContent.appendChild(closeButton);
  const text = createTag('p', {}, 'This is an empty toaster.');
  toasterContent.appendChild(text);

  toaster.appendChild(toasterContent);
  document.body.appendChild(toaster);
}

// Function to add location icon and attach click event
async function appendLocationIcon() {
  const observer = new MutationObserver(() => {
    const navWrapper = document.querySelector('.feds-nav-wrapper');
    if (navWrapper) {
      // Create location icon container
      const locationIcon = document.createElement('div');
      locationIcon.classList.add('location-icon-container');
      locationIcon.innerHTML = LOCATION_ICON;
      navWrapper.appendChild(locationIcon);

      // Attach click event to open the toaster
      locationIcon.addEventListener('click', () => {
        createToaster();
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

  // Add location icon to the global navigation
  await appendLocationIcon();

  // Optionally, load the CSS for the toaster
  const { miloLibs, codeRoot } = config;
  await new Promise((resolve) => {
    loadStyle(`${miloLibs || codeRoot}/features/pulse/pulse.css`, resolve);
  });
}
