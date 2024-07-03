import {icons} from '@assets/index';

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatPrice = (price: number) => {
  return USDollar.format(price);
};

export const screenName = {
  home: 'Home',
  short: 'Short',
  subscription: 'Subscription',
  library: 'Library',
  create: 'Create',
};

export const getIcon = (name: string, focused: boolean) => {
  switch (name) {
    case screenName.home:
      return focused ? icons.home_focus : icons.home;
    case screenName.short:
      return focused ? icons.short_focus : icons.short;
    case screenName.subscription:
      return focused ? icons.subscribe_focus : icons.subscribe;
    case screenName.library:
      return focused ? icons.library_focus : icons.library;
    case screenName.create:
      return icons.create;
    default:
      return icons.library;
  }
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
