import refs from './refs';

function upButtonHandler() {
  window.scrollTo({
    top: document.documentElement.offsetTop,
    behavior: 'smooth'
  });
}
let scroll = 0;
window.addEventListener('scroll', function(e) {
  scroll = window.scrollY;
  if (scroll > 0) {
    refs.upButton.classList.remove('is-hidden');
  };
  if (scroll === 0) {
    refs.upButton.classList.add('is-hidden');
  }
});

export default upButtonHandler;