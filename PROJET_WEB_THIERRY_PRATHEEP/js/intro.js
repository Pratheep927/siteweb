function enterSite() {
    const overlay = document.getElementById('intro-overlay');
    overlay.style.animation = 'fadeOut 1s ease forwards';
  
    setTimeout(() => {
      overlay.style.display = 'none';
      document.querySelector('header').style.display = '';
      document.querySelector('nav').style.display = '';
      document.querySelector('section').style.display = '';
      document.querySelector('footer').style.display = '';
    }, 1000);
  }
  