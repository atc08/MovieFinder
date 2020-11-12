import { alert, notice, info, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const myAlert = () =>
  alert({
    text: 'You should enter something',
    type: 'info',
    hide: true,
    delay: 1000,
    addclass: 'custom-notif',
  });

const myInfo = () =>
  info({
    text: 'Please, enter your query)',
    hide: true,
    delay: 1000,
    addclass: 'custom-notif',
  });

const myNotice = () =>
  notice({
    text: 'No more movies',
    hide: true,
    delay: 1500,
    addclass: 'custom-notif',
  });

const myError = () =>
  error({
    text: 'Something went wrong( Please, try again!',
    hide: true,
    delay: 1000,
    addclass: 'custom-notif',
  });

export { myAlert, myInfo, myNotice, myError, notice };