import moment from "../Components/Dashboard/TransactionTable/TransactionTable";

export const STANDARD_ACCOUNT = 1;
export const LOCKED_ACCOUNT = 2;
export const INTEREST_ACCOUNT = 3;
export const BACKUP_GOALS_ACCOUNT = 4;

export function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element);
    node.classList.add('animated', animationName);

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName);
        node.removeEventListener('animationend', handleAnimationEnd);

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

export function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function formatDate(date) {

    date = new moment(date);
    return date.format('DD|MM|YYYY');
}

export function formatTime(time) {
    time = new moment(time);
    return time.format('hh:mm a');
}
