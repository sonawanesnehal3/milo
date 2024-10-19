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
  // Create carousel wrapper
  const carouselWrapper = createTag('div', { class: 'carousel-wrapper' });

  // Create the individual carousel slides (with a sample structure)
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

  // Generate each slide
  slides.forEach((slide) => {
    const slideElement = createTag('div', { class: 'carousel-slide' });

    const title = createTag('h3', {}, slide.title);
    const desc = createTag('p', {}, slide.desc);
    const img = createTag('img', { src: slide.img, alt: slide.title });
    const button = createTag('button', { class: 'carousel-button' }, slide.actionButton);

    slideElement.append(title, desc, img, button);
    slideContainer.appendChild(slideElement);
  });

  // Append the slide container to the wrapper
  carouselWrapper.appendChild(slideContainer);

  // Add navigation buttons (previous, next)
  const previousBtn = createTag('button', { class: 'carousel-button previous' }, ARROW_PREVIOUS_IMG);
  const nextBtn = createTag('button', { class: 'carousel-button next' }, ARROW_NEXT_IMG);

  carouselWrapper.append(previousBtn, nextBtn);

  // Return the full carousel element
  return carouselWrapper;
}
