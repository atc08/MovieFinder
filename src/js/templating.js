import detailsPageTpl from '../templates/detailsPage.hbs';
import refs from './refs';

export function updateDetailsPageMarkUp(result) {
  const markUp = detailsPageTpl(result); 
  refs.detailsPage.insertAdjacentHTML('beforeend', markUp);
};