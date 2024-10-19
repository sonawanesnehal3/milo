const ARROW_NEXT_IMG = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><defs><style>.a{fill:#f0f;opacity:0;}.b{fill:#767676;}</style></defs><g transform="translate(10 16) rotate(180)"><rect class="a" width="10" height="16"/><path class="b" d="M9.115,13.853l0,0L3.051,8,9.117,2.15l0,0A1.246,1.246,0,1,0,7.386.353l0,0L7.367.366h0L.382,7.1l0,0a1.237,1.237,0,0,0,0,1.794l0,0,6.982,6.732,0,0,.015.014,0,0a1.246,1.246,0,1,0,1.73-1.794Z"/></g></svg>`;

const ARROW_PREVIOUS_IMG = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><defs><style>.a{fill:#f0f;opacity:0;}.b{fill:#767676;}</style></defs><g transform="translate(10 16) rotate(180)"><rect class="a" width="10" height="16"/><path class="b" d="M9.115,13.853l0,0L3.051,8,9.117,2.15l0,0A1.246,1.246,0,1,0,7.386.353l0,0L7.367.366h0L.382,7.1l0,0a1.237,1.237,0,0,0,0,1.794l0,0,6.982,6.732,0,0,.015.014,0,0a1.246,1.246,0,1,0,1.73-1.794Z"/></g></svg>`;

function createTag(tag, attributes, innerHTML) {
  const element = document.createElement(tag);
  if (attributes) {
    Object.keys(attributes).forEach((attr) => element.setAttribute(attr, attributes[attr]));
  }
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

export default function createCarousel() {
  const carouselWrapper = createTag('div', { class: 'carousel-wrapper' });
  const slides = [
    {
      title: 'Slide 1 Title',
      desc: 'Breaking news from The Daily MAX! 🎙️ Photoshop latest upgrades are a game-changer: the new Remove tool wipes away distractions like people and wires, while Generative Fill and Expand boost your creative freedom! 🎨✨',
      img: 'https://via.placeholder.com/500x500', // Sample image with width 200px
      actionButton: 'Learn More',
    },
    {
      title: 'Slide 2 Title',
      desc: 'Discover the latest Photoshop features that will redefine your creative process! From seamless distraction removal to next-gen generative AI capabilities, these updates are here to supercharge your workflow. 🚀',
      img: 'https://via.placeholder.com/500x500',
      actionButton: 'Learn More',
    },
    {
      title: 'Slide 3 Title',
      desc: 'Strap on your boots and grab your sparkles! 💖✨ We’re ‘dancing through the chaos’ as we turn this cowboy karaoke night into art!',
      img: 'https://via.placeholder.com/500x500',
      actionButton: 'Learn More',
    },
  ];

  // Create container for slides
  const slideContainer = createTag('div', { class: 'carousel-slides' });

  // Set width for slides container based on number of slides
  slideContainer.style.width = `${slides.length * 100}%`;

  // Generate each slide
  slides.forEach((slide) => {
    const slideElement = createTag('div', { class: 'carousel-slide' });

    // Set each slide to take full width of the container
    slideElement.style.width = `${100 / slides.length}%`;

    // Append title, image, description, and button one below the other
    const title = createTag('h3', { class: 'carousel-title' }, slide.title);
    const img = createTag('img', { src: slide.img, alt: slide.title });

    // Create a div for the description
    const descWrapper = createTag('div', { class: 'carousel-desc' });
    const desc = createTag('p', {}, slide.desc);
    descWrapper.appendChild(desc); // Add the description to the wrapper
    const button = createTag('button', { class: 'carousel-button' }, slide.actionButton);

    slideElement.append(title, img, descWrapper, button);
    slideContainer.appendChild(slideElement);
  });

  carouselWrapper.appendChild(slideContainer);

  let currentIndex = 0;

  function updateCarouselPosition() {
    const slideWidth = 100; // Since each slide is now percentage-based
    slideContainer.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    slideContainer.style.transition = 'transform 0.5s ease-in-out';
  }

  const previousBtn = createTag('button', { class: 'carousel-button previous' }, ARROW_PREVIOUS_IMG);
  const nextBtn = createTag('button', { class: 'carousel-button next' }, ARROW_NEXT_IMG);

  previousBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateCarouselPosition();
  });

  nextBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateCarouselPosition();
  });

  carouselWrapper.append(previousBtn, nextBtn);
  setTimeout(updateCarouselPosition, 0);

  return carouselWrapper;
}
