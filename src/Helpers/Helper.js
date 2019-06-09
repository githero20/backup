import moment from "moment";
import React from "react";


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
    if(num)
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') || 0;
    else
        return "0";

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

export function getTotal(transactions) {
    console.log(transactions);
    if (transactions) {
        const sum = transactions.reduce((a, b) => ({amount: parseInt(a.amount) + parseInt(b.amount)}));
        return sum.amount;
    }
}

export function getTotalSteadySave(transactions) {
    if (transactions) {
        if (transactions.length > 1) {
            let sum = transactions.reduce((a, b) => ({amount: parseInt(a.start_amount) + parseInt(b.start_amount)}));
            return sum.amount;
        } else {
            let sum = transactions.reduce((a, b) => ({amount: parseInt(a.start_amount) + parseInt(b.start_amount)}));
            return sum.start_amount;
        }
    }
}


export function transformHour(hour) {
    switch (hour) {

        case 1 :
            return '1:00am';
        case 2:
            return '2:00am';

        case 3:
            return '3:00am';
        case 4:
            return '4:00am';
        case 5 :
            return '5:00am';
        case 6:
            return '6:00am';
        case 7:
            return '7:00am';
        case 8:
            return '8:00am';
        case 9:
            return '9:00am';
        case 10 :
            return '10:00am';
        case 11:
            return '11:00am';
        case 12:
            return '12:00noon';
        case 13:
            return '1:00am';
        case 14:
            return '2:00am';
        case 15:
            return '3:00am';
        case 16 :
            return '4:00am';
        case 17:
            return '5:00am';
        case 18:
            return '6:00am';
        case 19:
            return '7:00am';
        case 20:
            return '8:00am';
        case 21:
            return '9:00am';
        case 22:
            return '10:00am';
        case 23:
            return '11:00am';
        case 24:
            return '12:00am';
        default:
            return 'none';
    }
}


export function dateFormatter (cell) {
    return  <span>{moment(cell).format('LLL')}</span>
}

export function descriptionFormatter (cell) {
    return  <span className={cell==='credit'?'text-green':'text-red'}>{cell}</span>
}

export function amountFormatter (cell,row) {
    return (
        <span className={row.type === 'credit' ? 'text-green' : 'text-red'}>
                {row.type === 'credit' ? '+' : '-'} &#8358; &nbsp;
            {parseFloat(cell).toFixed(2)}
            </span>
    )
}
export function moneyFormatter (cell) {
    return (
        <span className={'text-green'}> + &#8358; &nbsp;{parseFloat(cell).toFixed(2)}</span>
    )
}

export function steadyStatusFormatter (cell,row) {

        if(row.is_pause){
            return <button className={'btn btn-warning'}>Paused</button>
        }else if (row.stop){
            return <button className={'btn btn-danger'}>Stopped</button>
        }
}

export function statusFormatter(cell){
    return  <label className={cell==='success'?'bg-light-green px-2 sm-pd':'bg-light-red px-2 sm-pd'}>{cell}</label>
}