import { useEffect } from 'react';

const useScrollAnimation = (selector = '.animate', options = { threshold: 0.2 }) => {
  useEffect(() => {
    // Select all elements with the given selector (default is '.animate')
    const elementsToAnimate = document.querySelectorAll(selector);

    // Create the IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add 'visible' class when the element comes into view
          entry.target.classList.add('visible');
        } else {
          // Optional: Remove 'visible' when it goes out of view (for repeated animations)
          entry.target.classList.remove('visible');
        }
      });
    }, options);

    // Observe each selected element
    elementsToAnimate.forEach((el) => observer.observe(el));

    // Cleanup: Unobserve all elements on component unmount
    return () => {
      elementsToAnimate.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [selector, options]); // Only re-run if selector or options change
};

export default useScrollAnimation;
