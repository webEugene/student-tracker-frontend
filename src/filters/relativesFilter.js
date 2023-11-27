import { i18n } from '@/plugins/i18n.js';

export default function relativesFilter(value) {
  if (isNaN(value) || typeof value !== 'number') return i18n.t('error.type.invalid');
  let relative = '';

  switch (value) {
    case 0: {
      relative = i18n.t('general.relatives.father');
      break;
    }
    case 1: {
      relative = i18n.t('general.relatives.mother');
      break;
    }
    case 2: {
      relative = i18n.t('general.relatives.grandpa');
      break;
    }
    case 3: {
      relative = i18n.t('general.relatives.grandma');
      break;
    }
    case 4: {
      relative = i18n.t('general.relatives.nanny');
      break;
    }
  }

  return relative;
}
