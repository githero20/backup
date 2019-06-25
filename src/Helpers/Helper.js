import moment from "moment";
import React from "react";
import {_isDateAfterToday} from "../utils";
import {getLocalStorage, setLocalStorage} from "../ApiUtils/ApiUtils";
import {USERINFO, USERTOKEN} from "../Components/Auth/HOC/authcontroller";
import AutoNumeric from "autonumeric";


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
            let credits;
            credits = transactions.filter((content)=>(content.type==='credit'));
            credits = credits.reduce((a, b) => ({amount: parseInt(a.start_amount) + parseInt(b.start_amount)}));
            return credits.amount;
        } else {
            let sum = transactions.reduce((a, b) => ({amount: parseInt(a.start_amount) + parseInt(b.start_amount)}));
            return sum.start_amount;
        }
    }
}
export function getTotalSteadySaveDebit(transactions) {
    if (transactions) {
        if (transactions.length > 1) {
            let debits;
            debits = transactions.filter((content)=>(content.type==='debit'));
            debits = debits.reduce((a, b) => ({amount: parseInt(a.amount) + parseInt(b.amount)}));
            return debits.amount;
        } else {
            let sum = transactions.reduce((a, b) => ({amount: parseInt(a.amount) + parseInt(b.amount)}));
            return sum.amount;
        }
    }
}
export function getTotalSuccessful(transactions) {
    if (transactions) {
        if (transactions.length > 1) {
            let successful;
            successful = transactions.filter((content)=>(content.status=='success'));
            return successful.length;
        } else {
            return transactions.length;
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
    return  <p style={{minWidth:'150px'}}>{moment(cell).format('LLL')}</p>
}
export function confirmedFormatter (cell) {
    return   <label>{cell ? <span className='text-success'>Completed </span>:<span className='text-danger'>Failed </span>}</label>
}

export function descriptionFormatter (cell) {
    return  <span className={cell==='credit'?'text-green text-capitalize':'text-red text-capitalize'}>{cell}</span>
}
export function sourceFormatter (cell,row) {
    console.log(cell,row)
    return  <p style={{minWidth:'150px'}} className={'text-secondary text-capitalize'} >{`${cell.data.name.replace(/_/g,' ')} savings`}</p>
}

export function amountFormatter (cell,row) {
    return (
        <p style={{minWidth:'100px'}} className={row.type === 'credit' ? 'text-green' : 'text-red'}>
                {row.type === 'credit' ? '+' : '-'}
            {cell!=null?(`₦ ${formatNumber(parseFloat(cell).toFixed(2))}`):'N/A'}
            </p>
    )
}
export function moneyFormatter (cell) {
    return (
        <p style={{minWidth:'150px'}} className={'text-green'}> {cell!=null?`+ ₦ ${formatNumber(parseFloat(cell).toFixed(2))}`:"N/A"}</p>
    )
}

export function steadyStatusFormatter (cell,row) {
        if(parseInt(row.is_pause)){
            return <button className={'btn round btn-warning'}>Paused</button>
        }else {
            return <button className={'btn round btn-success'}>Ongoing</button>
        }
}

export function statusFormatter(cell){
    return  <label className={cell==='success'?'bg-light-green px-2 sm-pd text-capitalize':'bg-light-red px-2 sm-pd text-capitalize'}>{cell}</label>
}
export function interestFormatter(cell){
    return (<label style={{minWidth:'100px'}}>+ {`₦ ${formatNumber(parseFloat(cell).toFixed(2))}`}</label>)

}

export function viewFormatter(cell){
    return <button className={'btn round btn-custom-blue btn-block'}>View History</button>

}
export function balanceFormatter(cell){
    return <label style={{minWidth:'100px'}} className={'text-info'}>{cell!=null?`₦ ${formatNumber(parseFloat(cell).toFixed(2))}`:'N/A'}</label>

}
export function sourceTypeFormatter(cell){
    return <label style={{minWidth:'100px'}} className={'text-info'}>{cell!=null?`₦ ${cell.data.name}`:'N/A'}</label>

}
export function lockedStatusFormatter(cell){
    return (_isDateAfterToday(cell) ? <button className={'btn btn-success'}>Completed</button> : <button className={'btn btn-warning'}>Ongoing</button>)

}
export function frequencyFormatter(cell){
    return (_isDateAfterToday(cell) ? <button className={'btn btn-success'}>Completed</button> : <button className={'btn btn-warning'}>Ongoing</button>)

}

export function getTodaysDate () {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return   yyyy + '-' + mm + '-' + dd  ;
}

export async function getToken() {
    return await getLocalStorage(USERTOKEN);
}

export  function setupUser(payload){
    setLocalStorage(USERINFO,payload);
}


export function amountInput (selector){


    // AutoNumeric initialisation
    // const isAmount = new AutoNumeric(className, {currencySymbol: "₦",
    //     maximumValue: "1000000000",
    //     minimumValue: "0",
    //     currencySymbolPlacement:'p',
    //     digitGroupSeparator:',',
    //     noEventListeners:false,
    // });

    const isAmount = AutoNumeric.multiple(selector, {currencySymbol: "₦",
        maximumValue: "1000000000",
        minimumValue: "0",
        currencySymbolPlacement:'p',
        digitGroupSeparator:',',
        noEventListeners:false,
        decimalPlacesShownOnFocus:0,
        decimalPlacesShownOnBlur:0,
        outputFormat:'number'
    });

    return isAmount;

}


export function initializeAmountInput() {
    // initialize inputs with commas
    const isAmount = amountInput('.amount-input');

    console.log(isAmount);
}