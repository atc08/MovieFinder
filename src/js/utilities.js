// import selectMovie from './filmDetailsPage';

export function toStorage (key, value) {
  window.localStorage.setItem(key,value)
}

export function fromStorage (key) {
  return window.localStorage.getItem(key)
}
