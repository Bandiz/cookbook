import { Dayjs } from 'dayjs';

export function displayDate(value?: Dayjs) {
    if (!value) {
        return '';
    }
    return value.format('YYYY-MM-DD HH:mm');
}
