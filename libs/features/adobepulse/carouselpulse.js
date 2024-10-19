// carouselpulse.js
const ARROW_NEXT_IMG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <path d="M10,2 L14,6 L10,10" stroke="black" fill="none"></path>
</svg>`;

const ARROW_PREVIOUS_IMG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <path d="M10,2 L6,6 L10,10" stroke="black" fill="none"></path>
</svg>`;

function createTag(tag, attributes, innerHTML) {
  const element = document.createElement(tag);
  if (attributes) {
    Object.keys(attributes).forEach((attr) => element.setAttribute(attr, attributes[attr]));
  }
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

// Create the carousel logic
export default function createCarousel() {
  const carouselWrapper = createTag('div', { class: 'carousel-wrapper' });
  const slides = [
    {
      title: 'Slide 1 Title',
      desc: 'This is the description for slide 1',
      img: 'https://via.placeholder.com/150', // Sample image
      actionButton: 'Learn More',
    },
    {
      title: 'Slide 2 Title',
      desc: 'This is the description for slide 2',
      img: 'https://via.placeholder.com/150',
      actionButton: 'Learn More',
    },
    {
      title: 'Slide 3 Title',
      desc: 'This is the description for slide 3',
      img: 'https://via.placeholder.com/150',
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

    const title = createTag('h3', {}, slide.title);
    const desc = createTag('p', {}, slide.desc);
    const img = createTag('img', { src: slide.img, alt: slide.title });
    const button = createTag('button', { class: 'carousel-button' }, slide.actionButton);

    slideElement.append(title, desc, img, button);
    slideContainer.appendChild(slideElement);
  });

  // Append the slide container to the wrapper
  carouselWrapper.appendChild(slideContainer);

  let currentIndex = 0;

  // Function to update the carousel position
  function updateCarouselPosition() {
    const slideWidth = 100; // Since each slide is now percentage-based
    slideContainer.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    slideContainer.style.transition = 'transform 0.5s ease-in-out';
  }

  // Add navigation buttons (previous, next)
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
  // Return the full carousel element
  return carouselWrapper;
}
