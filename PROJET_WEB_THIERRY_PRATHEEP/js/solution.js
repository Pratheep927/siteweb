document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in, .fade-list li');
  
    const reveal = () => {
      fadeElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.style.animationPlayState = 'running';
        }
      });
    };
  
    window.addEventListener("scroll", reveal);
    reveal(); 
  });
  