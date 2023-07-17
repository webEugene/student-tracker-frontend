import { i18n } from '@/plugins/i18n.js';

export default function planNumberFilter(value) {
    if (typeof value !== 'object' && value !== null && !Object.keys(value).length) return i18n.t('error.type.invalid');

    switch (value.plan) {
        case 0: {
            value.plan = i18n.t('plans.list.free');
            break;
        }
        case 1: {
            value.plan = i18n.t('plans.list.light');
            break;
        }
    }

    return value;
}
