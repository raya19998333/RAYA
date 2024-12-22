import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import c1 from "../Photos/c11.jpg"; // Image 1
import c2 from "../Photos/c2.jpg"; // Image 2
import c3 from "../Photos/c2.jpg"; // Image 3

const items = [
  {
    src: c1,
    altText:
      "Explore our collection of plant-based cosmetics designed to bring out the best in your skin. Clean beauty, powered by nature.",
    caption: "Raya Beauty: Embrace Your Natural Glow",
    key: 1,
    className: "c-img",
  },
  {
    src: c2,
    altText:
      "Each product at Raya Beauty is crafted with the finest natural ingredients, ensuring a flawless and eco-friendly beauty routine.",
    caption: "Pure Ingredients, Pure Beauty",
    key: 2,
    className: "c-img",
  },
  {
    src: c3,
    altText:
      "Indulge in premium beauty products that are as kind to the planet as they are to your skin. Beauty that doesn’t compromise.",
    caption: "Sustainability Meets Luxury",
    key: 3,
    className: "c-img",
  },
];

function Console(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  // Map each item to a CarouselItem
  const slides = items.map((item) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.key} // Use the key to make it unique
    >
      <img src={item.src} alt={item.altText} className={item.className} />
      <CarouselCaption
        captionText={item.altText}
        captionHeader={item.caption}
      />
    </CarouselItem>
  ));

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default Console;
