import moment from "../Components/Dashboard/TransactionTable/TransactionTable";


export const STANDARD_ACCOUNT = 1;
export const LOCKED_ACCOUNT = 2;
export const INTEREST_ACCOUNT = 3;
export const BACKUP_GOALS_ACCOUNT = 4;
export const ADD_CARD = '0';

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

export function Paginator(items, page, per_page) {

    var page = page || 1,
        per_page = per_page || 10,
        offset = (page - 1) * per_page,

        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}

export function getTotal(transactions){
    console.log(transactions);
    if(transactions){
        const sum =  transactions.reduce((a,b) => ({amount: parseInt(a.amount ) + parseInt(b.amount ) }));
        return sum.amount;
    }
}
export function getTotalSteadySave(transactions){
    if(transactions){
        if(transactions.length>1){
            let sum =  transactions.reduce((a,b) => ({amount: parseInt(a.start_amount) + parseInt(b.start_amount) }));
            return sum.amount;
        }else {
            let sum =  transactions.reduce((a,b) => ({amount: parseInt(a.start_amount) + parseInt(b.start_amount) }));
            return sum.start_amount;
        }
    }
}
