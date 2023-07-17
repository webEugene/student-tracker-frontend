import { i18n } from '@/plugins/i18n.js';

export default function planStringFilter(value) {
    if (typeof value !== 'string') return i18n.t('error.type.invalid');
    let plan = null;

    switch (value) {
        case 'free': {
            plan = 0;
            break;
        }
        case 'light': {
            plan = 1;
            break;
        }
    }

    return plan;
}
