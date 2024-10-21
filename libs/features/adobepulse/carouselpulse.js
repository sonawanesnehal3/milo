const ARROW_NEXT_IMG = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><defs><style>.a{fill:#f0f;opacity:0;}.b{fill:#767676;}</style></defs><g transform="translate(10 16) rotate(180)"><rect class="a" width="10" height="16"/><path class="b" d="M9.115,13.853l0,0L3.051,8,9.117,2.15l0,0A1.246,1.246,0,1,0,7.386.353l0,0L7.367.366h0L.382,7.1l0,0a1.237,1.237,0,0,0,0,1.794l0,0,6.982,6.732,0,0,.015.014,0,0a1.246,1.246,0,1,0,1.73-1.794Z"/></g></svg>';

const ARROW_PREVIOUS_IMG = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><defs><style>.a{fill:#f0f;opacity:0;}.b{fill:#767676;}</style></defs><g transform="translate(10 16) rotate(180)"><rect class="a" width="10" height="16"/><path class="b" d="M9.115,13.853l0,0L3.051,8,9.117,2.15l0,0A1.246,1.246,0,1,0,7.386.353l0,0L7.367.366h0L.382,7.1l0,0a1.237,1.237,0,0,0,0,1.794l0,0,6.982,6.732,0,0,.015.014,0,0a1.246,1.246,0,1,0,1.73-1.794Z"/></g></svg>';

const products = ['ACROBAT', 'ACROBAT_MOBILE', 'AFTER_EFFECTS_AUDITION', 'DESIGN_OTHER', 'EXPRESS', 'ILLUSTRATOR', 'INDESIGN', 'LIGHTROOM_MOBILE', 'PHOTO_BUNDLE', 'PHOTOSHOP', 'PHOTOSHOP_EXPRESS', 'PREMIERE', 'SUBSTANCE_3D'];

function createTag(tag, attributes, innerHTML) {
  const element = document.createElement(tag);
  if (attributes) {
    Object.keys(attributes).forEach((attr) => element.setAttribute(attr, attributes[attr]));
  }
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

async function fetchPosts(url) {
  // const posts = [{ title: 'Adobe Product Name', desc: 'This is some monkey PS art', mediaUrl: 'http://localhost:3005/videos/photoshop-monkey.mov', actionButton: 'Get Photoshop', mediaType: 'VIDEO' }];
  const posts = [];
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }, // Replace with your actual access token if needed
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const resp = await response.json();
    const data = resp.slides;
    data.forEach((item) => {
      // eslint-disable-next-line max-len
      posts.push({
        // eslint-disable-next-line max-len
        title: item.title || item.product, product: item.product, desc: item.desc || item.caption, mediaUrl: item.media, actionButton: item.actionButton, mediaType: item.mediaType, link: item.link,
      });
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  console.log(posts);
  return posts;
}

export default async function createCarousel() {
  const carouselWrapper = createTag('div', { class: 'carousel-wrapper' });
  let profile = null;
  const { default: getUserEntitlements } = await import('../../blocks/global-navigation/utilities/getUserEntitlements.js');
  const entitlements = await getUserEntitlements();
  let codes = entitlements.fulfilled_codes;
  codes = Object.keys(codes).filter((e) => codes[e]).toString();
  const userProducts = products.filter((product) => codes.includes(product.toLowerCase())).join(',');
  console.log(userProducts);
  let url = '';
  if (!window.adobeIMS.isSignedInUser()) {
    // const ecid = window.alloy ? await window.alloy('getIdentity')
    //   .then((data) => data?.identity?.ECID).catch(() => undefined) : undefined;
    const ecid = '02279645834466605853330731451781951578';
    url = `http://localhost:3005/api/posts/anon?ecid=${ecid}`;
  } else {
    profile = await window.adobeIMS.getProfile();
    url = `http://localhost:3005/api/posts/filter?email=${encodeURIComponent(profile.email)}&entitlements=${userProducts}`;
  }
  // const url = 'http://localhost:3005/api/posts';

  const slides = await fetchPosts(url);

  const slideContainer = createTag('div', { class: 'carousel-slides' });

  // Clone the first and last slides
  console.log(slides);
  // const firstSlideClone = { ...slides[0] };
  // const lastSlideClone = { ...slides[slides.length - 1] };
  // slides.unshift(lastSlideClone);
  // slides.push(firstSlideClone);

  // Set width for slides container based on the number of slides (including clones)
  slideContainer.style.width = `${slides.length * 100}%`;

  // Generate each slide
  slides.forEach((slide) => {
    const slideElement = createTag('div', { class: 'carousel-slide' });

    // Set each slide to take full width of the container
    slideElement.style.width = `${100 / slides.length}%`;

    const title = createTag('h3', { class: 'carousel-title' }, slide.title);
    let media = null;
    if (!slide.mediaType || slide.mediaType?.toLowerCase() === 'image') {
      media = createTag('img', { class: 'carousel-img', src: slide.mediaUrl || `http://localhost:3005/images/${slide.product}_LOGO.webp`, alt: slide.title });
    } else {
      media = createTag('video', {
        class: 'carousel-video',
        src: slide.mediaUrl, // Set the video source directly
        autoplay: true,
        loop: true,
        muted: true,
        playsinline: true, // For iOS devices
        style: 'width: 100%; max-width: 600px;', // Adjust styles as needed
      });

      // Add fallback text for unsupported browsers
      const fallbackText = document.createTextNode('Your browser does not support the video tag.');
      media.appendChild(fallbackText);
    }
    const descWrapper = createTag('div', { class: 'carousel-desc' });
    const desc = createTag('p', {}, slide.desc);
    descWrapper.appendChild(desc); // Add the description to the wrapper
    const button = createTag('a', { class: 'carousel-button', href: slide.link }, slide.actionButton);
    slideElement.append(title, media, descWrapper, button);
    slideContainer.appendChild(slideElement);
  });

  carouselWrapper.appendChild(slideContainer);

  let currentIndex = 1; // Start from the first "real" slide
  let autoSlideInterval;

  function updateCarouselPosition(instant = false) {
    const slideWidth = 100; // Since each slide is now percentage-based
    slideContainer.style.transition = instant ? 'none' : 'transform 0.5s ease-in-out';
    slideContainer.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
  }

  const previousBtn = createTag('button', { class: 'carousel-button previous' }, ARROW_PREVIOUS_IMG);
  const nextBtn = createTag('button', { class: 'carousel-button next' }, ARROW_NEXT_IMG);

  previousBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    currentIndex -= 1;
    updateCarouselPosition();

    // Transition from first slide clone to last slide
    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = slides.length - 2;
        updateCarouselPosition(true);
      }, 500);
    }
  });

  nextBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    currentIndex += 1;
    updateCarouselPosition();

    // Transition from last slide clone to first slide
    if (currentIndex === slides.length - 1) {
      setTimeout(() => {
        currentIndex = 1;
        updateCarouselPosition(true);
      }, 500);
    }
  });

  carouselWrapper.append(previousBtn, nextBtn);

  // Function to start the auto slide
  // function startAutoSlide() {
  //   autoSlideInterval = setInterval(() => {
  //     nextBtn.click();
  //   }, 5000); // Automatically move to the next slide every 5 seconds
  // }

  // function stopAutoSlide() {
  //   clearInterval(autoSlideInterval);
  // }

  // carouselWrapper.addEventListener('mouseover', stopAutoSlide);
  // carouselWrapper.addEventListener('mouseout', startAutoSlide);
  // setTimeout(() => { startAutoSlide(); }, 10000);

  // setTimeout(updateCarouselPosition, 0);

  return carouselWrapper;
}
