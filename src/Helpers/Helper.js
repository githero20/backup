import moment from "moment";
import React, {Fragment} from "react";
import {_isDateAfterToday} from "../utils";
import {getLocalStorage, setLocalStorage} from "../ApiUtils/ApiUtils";
import {AMOUNT_LIMITS, APP_FREQUENCY, USERINFO, USERTOKEN} from "../Components/Auth/HOC/authcontroller";
import AutoNumeric from "autonumeric";
import {getUserData} from "../actions/UserAction";
import SimpleReactValidator from "simple-react-validator";


export const STANDARD_ACCOUNT = 1;
export const LOCKED_ACCOUNT = 2;
export const INTEREST_ACCOUNT = 3;
export const BACKUP_GOALS_ACCOUNT = 4;
export const ADD_CARD = '0';
export const CUSTOMER = 'customer';
export const ADMIN = 'administrator';
export const WITHDRAWAL_SOURCE = 'withdrawal';
export const STEADY_SAVE = 'auto save';
export const INTEREST_ON_VAULT = 'STANDARD_INTEREST_CRON_';
export const INTEREST_ON_BACKUP_GOAL = 'STANDARD_BACKUP_GOAL_INTEREST_CRON_';
export const MATURED_LOCKED_SAVINGS = 'STANDARD_LOCKED_CRON_';
export const ADMIN_LOGIN_URL = 'https://backupcash-be.atp-sevas.com/login';
export const CENTRAL_VAULT = 'central_vault';
export const BACKUP_STASH = 'backup_stash';
export const KYC = 'kyc';

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
    if (num)
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
    if (transactions) {
        const sum = transactions.reduce((a, b) => ({amount: parseInt(a.amount) + parseInt(b.amount)}));
        return sum.amount;
    }
}

export function getTotalSteadySave(transactions) {
    if (transactions && transactions.length > 0) {
        let credits;
        credits = transactions.filter((content) => (content.type === 'credit'));
        credits = credits.reduce((a, b) => ({amount: parseInt(a.start_amount) + parseInt(b.start_amount)}));
        return credits.amount;
    } else {
        return 0;
    }
}


export function getTotalSteadySaveDebit(transactions) {
    if (transactions) {
        if (transactions.length > 0) {
            let debits;
            debits = transactions.filter((content) => (content.type === 'debit'));
            debits = debits.reduce((a, b) => ({amount: parseInt(a.amount) + parseInt(b.amount)}));
            return debits.amount;
        } else {
            let sum = transactions.reduce((a, b) => ({amount: parseInt(a.amount) + parseInt(b.amount)}));
            return sum.amount;
        }
    }
}

export function validatePasswords(password, password_confirmation) {
    // perform all neccassary validations
    return (password == password_confirmation) ? true : false;
}

export function getTotalSuccessfulSS(transactions) {
    if (transactions && transactions.length > 0) {
        let successful;
        successful = transactions.filter((content) => (content.status === 'success'));
        successful = successful.reduce((a, b) => ({amount: parseInt(a.amount) + parseInt(b.amount)}));
        return successful.amount;
    } else {
        return 0;
    }
}

export function getTotalSuccessfulBG(transactions) {
    if (transactions && transactions.length > 0) {
        let successful;
        successful = transactions.filter((content) => (content.status === 'success'));
        successful = successful.reduce((a, b) => ({amount: parseInt(a.amount) + parseInt(b.amount)}));
        return successful.amount;
    } else {
        return 0;
    }
}

export function toggleTable(context) {
    window.addEventListener('resize', () => {
        context.setState({mobileTable: window.innerWidth <= 599})
    });
    if (window.innerWidth <= 559) {
        context.setState({mobileTable: true})
    } else {
        context.setState({mobileTable: false})
    }
}

export function getPercentage(startValue, endValue) {
    if (Number(startValue) != 0 && Number(endValue) != 0) {
        return (startValue / endValue) * 100;

    } else return 0;

}

export function readURL(input, context) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            context.setState({fileUpload: e.target.result});
        };
        reader.readAsDataURL(input.files[0]);
    }
}

export function getCards(key, object) {
    const userInfo = getLocalStorage(key);
    if (getLocalStorage(key) != undefined) {
        object.setState({
            userCards: userInfo.authorization.data
        })
    }
}

export function getCardsFromStorage(key, object) {
    const userInfo = getLocalStorage(key);
    if (userInfo != undefined) {
        object.setState({
            userCards: filterUserCards(userInfo)
        })
    }
}

export function hideLoader() {
    const loader = document.querySelector('.lds-loader-bg');
    loader.style.display = 'none';
}

export function showHomeLoader() {
    const loader = document.querySelector('.lds-loader-bg');
    loader.style.display = 'block';
}

export function capitalize(value) {
    let words = value.split(' ');
    if (words.length > 1) {
        return words.map((content) => content.charAt(0).toUpperCase() + content.slice(1)).join(' ');
    } else {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
};

export function validateInputEntry(e) {
    e.persist();
    validateLength(e);

    validateNumbers(e);


}

export function shiftFocus(e) {
    if (e.type == 'keyup' && e.keyCode !== 46 && e.keyCode !== 8 && e.keyCode > 47 && e.keyCode <= 58) {

        if (e.target.parentElement.nextElementSibling) {
            if (e.target.parentElement.nextElementSibling.firstChild.value == '') {
                e.target.parentElement.nextElementSibling.firstChild.focus();
            }
        }

    }

    //handle delete button

    if (e.type == 'keyup' && e.keyCode == 8) {
        if (e.target.parentElement.previousElementSibling) {
            if (e.target.parentElement.previousElementSibling.firstChild.value !== '') {
                e.target.parentElement.previousElementSibling.firstChild.focus();
            }
        }
    }
}

export function validateLength(e) {
    if (e.target.value.length > 0 && e.keyCode !== 46 && e.keyCode !== 8) {
        //only one input and delete
        e.preventDefault();

    }

}

export function validateNumbers(e) {
    let charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && ((charCode < 48 || charCode > 57) || (charCode > 96 && charCode < 105))) {
        e.preventDefault();
    }
    shiftFocus(e);
}


export function getTotalSuccessful(transactions) {
    if (transactions) {
        if (transactions.length > 1) {
            let successful;
            successful = transactions.filter((content) => (content.status == 'success'));
            return successful.length;
        } else {
            return transactions.length;
        }
    }
}

export function getSteadySaveData(transactions) {
    if (transactions) {
        if (transactions.length > 1) {
            let data;
            data = transactions.filter((content) => (content.status == 'success' || content == 'failed'));
            return data;
        }
    }
}

export function getTotalFailed(transactions) {
    if (transactions) {
        if (transactions.length > 1) {
            let failed;
            failed = transactions.filter((content) => (content.status == 'failed'));
            if (failed.length > 0) {
                failed = failed.reduce((a, b) => ({amount: parseInt(a.amount) + parseInt(b.amount)}));
                return failed.amount;
            } else {
                return 0
            }
        } else {
            return 0;
        }
    }
}

export function getCompletedGoals(transactions) {
    const now = moment().format('YYYY-MM-DD');
    if (transactions.length > 0) {
        let CompletedGoals = transactions.filter((content) => {
            return ((moment(content.end_date).format('YYYY-MM-DD') < now
                    && parseInt(content.is_pause) === 0
                    && parseInt(content.stop) === 0) ||
                (parseInt(content.stop) === 1)
            );
        });

        return CompletedGoals.length;

    }
    return 0;

}

export function isGoalCompleted(goal) {
    const now = moment().format('YYYY-MM-DD');
    if (goal && ((moment(goal.end_date).format('YYYY-MM-DD') < now
            && parseInt(goal.is_pause) === 0
            && parseInt(goal.stop) === 0)
    )) {
        return true;
    }
    return false;

}

export function getTotalBGSuccessful(transactions) {


    if (transactions) {
        if (transactions.length > 0) {
            let successful;
            successful = transactions.filter((content) => (content.status == 'success'));
            successful = successful.reduce((a, b) => ({amount: parseInt(a.amount) + parseInt(b.amount)}));
            return successful.amount;
        } else {
            return 0;
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

export const passwordValidator = new SimpleReactValidator({
    messages: {
        email: 'Please provide a valid Email.',
        name: 'Please fill in your first name.',
        last_name: 'Please fill in your last name.',
        phone: 'The phone number must match the required pattern (080********)',
        password: 'Password combination must have a lowercase letter, uppercase letter, number, special character and must be a minimum of 8 characters',
    },
    validators: {
        password: {  // name the rule
            message: 'The :attribute must be a strong password and must have :values.',
            rule: (val, params, validator) => {
                return validator.helpers.testRegex(val, /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
            },
            messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),  // optional
            required: true  // optional
        }
    }
});

export const EmailPhoneValidator = new SimpleReactValidator({
    messages: {
        password: 'Password combination must have a lowercase letter, uppercase letter, number, special character and must be a minimum of 8 characters',
        emailPhone: 'Please provide a valid email or phone number',
    },
    validators: {
        password: {  // name the rule
            message: 'The :attribute must be a strong password and must have :values.',
            rule: (val, params, validator) => {
                return validator.helpers.testRegex(val, /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
            },
            messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),  // optional
            required: true  // optional
        },
        emailPhone: {  // name the rule
            message: 'The :attribute must be a valid email or phone number :values.',
            rule: (val, params, validator) => {
                return validator.helpers.testRegex(val, /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|^[0]\d{10}$/)
            },
            messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),  // optional
            required: true  // optional
        }
    }
});


export function dateFormatter(cell) {
    let format =
        <span className='d-flex flex-column'>
            <span style={{minWidth: '90px'}}>{moment(cell).format('MMM Do YYYY')}&nbsp;</span>
            <small className='text-muted'>{moment(cell).format('h:mm a')}</small>
        </span>;
    return format;
}

export function disableKey(e) {
    e.preventDefault();
    // return false;
}

export function filterUserCards(array) {
    return array.authorization.data.filter((content) => content.channel == 'card');
}

export function showMobileMenu() {
    //add is-active on
    let nav = document.querySelector('.navbar-toggler');
    nav.classList.toggle('is-active');

    //show toggle menu
    let mobileMenu = document.querySelector('.vertical-menu-modern');
    mobileMenu.classList.toggle('menu-open');
}

export function hideMobileMenu() {
    //add is-active on
    let nav = document.querySelector('.navbar-toggler');
    nav.classList.remove('is-active');

    //show toggle menu
    let mobileMenu = document.querySelector('.vertical-menu-modern');
    mobileMenu.classList.remove('menu-open');

    // hide bg
    let bg = document.querySelector('.mobile-bg');
    bg.classList.add('d-none');
}

export function confirmedFormatter(cell) {
    return <label>{cell ? <span className='text-success'>Completed </span> :
        <span className='text-danger'>Failed </span>}</label>
}

export function descriptionFormatter(cell, row) {
    if (window.innerWidth < 600) {
        const date = moment(row.created_at).format('Do MMM YY');

        return (
            <div className="d-flex align-items-start">
                {
                    cell == 'credit' ? <div className="green-dot"></div> : <div className="red-dot"></div>
                }
                <div className='d-flex flex-column'>
                    <span className={'text-capitalize'}>{cell}</span>
                    <small className='text-muted'>{date}</small>
                </div>
            </div>

        );
    } else {
        return <span
            className={cell === 'credit' ? 'text-green text-capitalize' : 'text-red text-capitalize'}>{cell}</span>
    }

}

export function mobileDescFormatter(cell, row) {
    const date = moment(row.created_at).format('Do MMM YY');

    return (
        <div className="d-flex align-items-start">
            {
                cell == 'credit' ? <div className="green-dot"></div> : <div className="red-dot"></div>
            }
            <div className='d-flex flex-column'>
                <span className={'text-capitalize'}>{cell}</span>
                <small className='text-muted'>{date}</small>
            </div>
        </div>

    );
}

export function mobileTransDescFormatter(cell, row) {
    const date = moment(row.created_at).format('Do MMM YY');

    return (
        <div className='d-flex flex-column'>
            <span className={'text-capitalize'}>{cell}</span>
            <small className='text-muted'>{date}</small>
        </div>
    );
}

export function todaysDateForTable() {
    return new Date(moment().format('MM-DD-YYYY'))
}

export function sourceFormatter(cell, row) {
    let content;
    if (row.gw_authorization_code.includes(INTEREST_ON_BACKUP_GOAL)) {
        return (
            <p style={{minWidth: '140px'}}
               className={'text-secondary text-capitalize'}>{cell.data.name.replace(/_/g, ' ')}<br/>
                <small className='text-muted'>(Interest on backup goals)</small>
            </p>
        );
        //
        // return sourceMarkup(content);
    }
    if (row.gw_authorization_code.includes(MATURED_LOCKED_SAVINGS)) {
        return (
            <p style={{minWidth: '140px'}}
               className={'text-secondary text-capitalize'}>{cell.data.name.replace(/_/g, ' ')}<br/>
                <small className='text-muted'>(Matured locked savings)</small>
            </p>
        );
        //
        // return sourceMarkup(content);
    }

    if (row.gw_authorization_code.includes(INTEREST_ON_VAULT)) {
        return (
            <p style={{minWidth: '140px'}}
               className={'text-secondary text-capitalize'}>{cell.data.name.replace(/_/g, ' ')}<br/>
                <small className='text-muted'>(Interest on central vault)</small>
            </p>
        );
    }
    if (cell.data.name == WITHDRAWAL_SOURCE) {
        content = `${cell.data.name.replace(/_/g, ' ')}`;
        return sourceMarkup(content);
    }
    if (cell.data.name == STEADY_SAVE) {
        content = `Steady Savings`;
        return sourceMarkup(content);
    }

    content = `${cell.data.name.replace(/_/g, ' ')} savings`;
    return sourceMarkup(content);
}

export function transSourceFormatter(cell, row) {
    let content;
    console.log('cell',cell,row);
    if (row.gw_authorization_code.includes(INTEREST_ON_BACKUP_GOAL)) {
        return (
            <p style={{minWidth: '140px'}}
               className={'text-secondary text-capitalize'}>{cell.data.name.replace(/_/g, ' ')}<br/>
                <small className='text-muted'>(Interest on backup goals)</small>
            </p>
        );
        //
        // return sourceMarkup(content);
    }
    if (row.gw_authorization_code.includes(MATURED_LOCKED_SAVINGS)) {
        return (
            <p style={{minWidth: '140px'}}
               className={'text-secondary text-capitalize'}>{cell.data.name.replace(/_/g, ' ')}<br/>
                <small className='text-muted'>(Matured locked savings)</small>
            </p>
        );
        //
        // return sourceMarkup(content);
    }

    if (row.gw_authorization_code.includes(INTEREST_ON_VAULT)) {
        return (
            <p style={{minWidth: '140px'}}
               className={'text-secondary text-capitalize'}>{cell.data.name.replace(/_/g, ' ')}<br/>
                <small className='text-muted'>(Interest on central vault)</small>
            </p>
        );
    }
    if (cell.name == WITHDRAWAL_SOURCE) {
        content = `${cell.name.replace(/_/g, ' ')}`;
        return sourceMarkup(content);
    }
    if (cell.name == STEADY_SAVE) {
        content = `Steady Savings`;
        return sourceMarkup(content);
    }

    content = `${cell.name.replace(/_/g, ' ')} savings`;
    return sourceMarkup(content);
}

function sourceMarkup(content) {
    return <p style={{minWidth: '130px'}} className={'text-secondary text-capitalize'}>{content}</p>;
}

export function titleFormatter(cell) {
    return <p style={{minWidth: '100px'}} className={'text-secondary text-capitalize'}>{cell}</p>;
}

export function withdrawSourceFormatter(cell) {
    return <p style={{minWidth: '100px'}}
              className={'text-secondary text-capitalize'}>{`${cell.replace(/_/g, ' ')}`}</p>
}

export function amountFormatter(cell, row) {
    return (
        <p style={{minWidth: '100px'}} className={row.type === 'credit' ? 'text-green' : 'text-red'}>
            {row.type === 'credit' ? '+' : '-'}
            {cell != null ? (`₦ ${formatNumber(parseFloat(cell).toFixed(2))}`) : 'N/A'}
        </p>
    )
}

export function amountLastAmountFormatter(cell, row) {
    return (
        <div className="d-flex flex-column">
            <p style={{minWidth: '100px'}} className={row.type === 'credit' ? 'text-green' : 'text-red'}>
                {row.type === 'credit' ? '+' : '-'}
                {cell != null ? (`₦ ${formatNumber(parseFloat(cell).toFixed(2))}`) : 'N/A'}
            </p>
            <small className='text-muted'>Last Amount</small>
            <small> {row.last_amount != null ? (`₦ ${formatNumber(parseFloat(row.last_amount).toFixed(2))}`) : 'N/A'}</small>
            <small className='text-muted'>Date</small>
            <small> {moment(row.created_at).format('Do MMM YY')}</small>
        </div>

    )
}

export function amountBalanceFormatter(cell, row) {
    return (
        <div className="d-flex flex-column">
            <p style={{minWidth: '100px'}} className={row.type === 'credit' ? 'text-green' : 'text-red'}>
                {row.type === 'credit' ? '+' : '-'}
                {cell != null ? (`₦ ${formatNumber(parseFloat(cell).toFixed(2))}`) : 'N/A'}
            </p>
            <small>Balance</small>
            <small
                className='text-muted'> {row.balance != null ? (`₦ ${formatNumber(parseFloat(row.balance).toFixed(2))}`) : 'N/A'}</small>
            <small> {moment(row.created_at).format('Do MMM YY')}</small>
        </div>

    )
}

export function parseAndFormatNum(num) {
    return formatNumber(parseFloat(num).toFixed(2));
}

export function moneyFormatter(cell, row) {
    return (
        <p style={{minWidth: '150px'}}
           className={'text-green'}> {cell != null ? `+ ₦ ${formatNumber(parseFloat(cell).toFixed(2))}` : "N/A"}</p>
    )
}

export function contributionFormatter(cell, row) {
    let status;

    if (window.innerWidth < 600) {
        if (parseInt(row.is_pause)) {
            status = <small className={'text-warning'}>Paused</small>
        } else {
            status = <small className={'text-green'}>Ongoing</small>
        }
        return (
            <div className="d-flex flex-column">
                <small className='text-muted'>{row.title}</small>
                <p style={{minWidth: '100px'}}
                   className={'text-gray'}> {cell != null ? `₦ ${formatNumber(parseFloat(cell).toFixed(2))}` : "N/A"}</p>
            </div>
        )
    } else {

        return (
            <p style={{minWidth: '150px'}}
               className={'text-green'}> {cell != null ? `+ ₦ ${formatNumber(parseFloat(cell).toFixed(2))}` : "N/A"}</p>
        )
    }

}

export function amountCurrentStatusFormatter(cell, row) {
    return (
        <div className="d-flex flex-column">

            <p style={{minWidth: '100px'}}
               className={'text-green'}> {cell != null ? `+ ₦ ${formatNumber(parseFloat(cell).toFixed(2))}` : "N/A"}</p>
            <label
                className={
                    row.status == 'success' ? 'bg-light-green text-center round px-1 ' :
                        'bg-light-red text-center px-1 round '}>{row.status}
            </label>
            <small className='text-muted'>current amount</small>
            <small>
                {row.current_amount != null ? `+ ₦ ${formatNumber(parseFloat(row.current_amount).toFixed(2))}` : "N/A"}
            </small>

        </div>

    )
}

export function mobileSSMoneyFormatter(cell, row) {
    return (
        <div className="d-flex flex-column">
            <p style={{minWidth: '100px'}}
               className={'text-green'}> {cell != null ? `+ ₦ ${formatNumber(parseFloat(cell).toFixed(2))}` : "N/A"}</p>
            <label
                className={row.status == 'success' ? 'bg-light-green text-center round px-1 ' : 'bg-light-red text-center px-1 round '}>{row.status}</label>
        </div>
    )
}

export function ssMobileDescFormatter(cell, row) {
    let status;
    if (parseInt(row.is_pause)) {
        status = <small className={'text-warning'}>Paused</small>
    } else {
        status = <small className={'text-green'}>Ongoing</small>
    }
    return (
        <div className="d-flex flex-column">
            <small className='text-muted'>{row.title}</small>
            <p style={{minWidth: '100px'}}
               className={'text-gray'}> {cell != null ? `₦ ${formatNumber(parseFloat(cell).toFixed(2))}` : "N/A"}</p>
        </div>
    )
}

export function removeUnderscore(data) {
    return data.replace(/_/g, ' ');
}

export function toastMessage(message, status, context) {
    const {toastManager} = context.props;
    toastManager.add(message, {
        appearance: status,
        autoDismiss: true,
        autoDismissTimeout: 4000,
        pauseOnHover: false,
    });
}

export function toastReloadMessage(status, context, callback) {
    const {toastManager} = context.props;
    const message = (
        <Fragment>
            <span>Unable to retrieve data at the moment !! Click Here to </span>&nbsp;<a href='#'
                                                                                         className='retry dark-link'
                                                                                         onClick={() => callback()}>Try
            Again</a>
        </Fragment>
    );
    toastManager.add(message, {
        appearance: status,
        autoDismiss: true,
        autoDismissTimeout: 10000,
        pauseOnHover: true,
    });
}


export function calcPenalty(balance, penalty) {
    return Number(Number(balance).toFixed(2) * (Number(penalty).toFixed(2) / 100)).toFixed(2);
}


export function steadyStatusFormatter(cell, row) {
    if (parseInt(row.is_pause)) {
        return <button className={'btn btn-sm round btn-warning'}>Paused</button>
    } else {
        return <button className={'btn btn-sm round btn-success'}>Ongoing</button>
    }
}

export function statusFormatter(cell) {
    return <label
        className={cell === 'success' ? 'bg-light-green px-2 sm-pd text-capitalize' : 'bg-light-red px-2 sm-pd text-capitalize'}>{cell}</label>
}

export function interestFormatter(cell) {
    return (<label style={{minWidth: '60px'}}>+ {`₦ ${formatNumber(parseFloat(cell).toFixed(2))}`}</label>)

}

export function amountInterestFormatter(cell, row) {

    return (
        <div className="d-flex flex-column">
            <p style={{minWidth: '100px'}}
               className={'text-info'}> {row.amount != null ? `₦ ${formatNumber(parseFloat(row.amount).toFixed(2))}` : "N/A"}</p>
            <small className='text-muted'>Interest</small>
            <small className='text-green'>+ {`₦ ${formatNumber(parseFloat(cell).toFixed(2))}`}</small>
            <small style={{fontSize: '9px'}}
                   className='text-muted'> {moment(row.start_date).format('Do MMM YY')} - {moment(row.end_date).format('Do MMM YY')}</small>
        </div>
    )

}

export function viewFormatter(cell) {
    return <button className={'btn round btn-sm btn-blue-btn'}>View History</button>
}

export function actionFormatter(cell, row, rowIndex, {trans}) {
    const today = moment().format('MM-DD-YYYY');
    //get latest end date
    let latestDate = moment(Math.max.apply(null, trans.map(function (content) {
        if (content.end_date != null) {
            return new Date(content.end_date);
        }
    }))).format('MM-DD-YYYY');

    // if the latest date is past render convert steady save
    if (latestDate < today && latestDate == moment(row.end_date).format('MM-DD-YYYY')) {
        return <button name='convert-btn' className={'btn btn-block round btn-sm btn-success'}>Convert</button>
    } else if (row.end_date != null && moment(row.end_date).format('MM-DD-YYYY') < today) {
        return <button disabled={true} className={'btn round btn-sm btn-secondary'}>Disabled</button>
    } else if (row.end_date == null) {
        return <button className={'btn round btn-sm btn-secondary'}>Quick Actions</button>
    }
    return <button disabled={true} className={'btn round btn-sm btn-secondary'}>Disabled</button>

}

export function detailFormatter(cell) {
    return <button className={'btn round btn-sm btn-blue-btn'}>View Details</button>
}

export function balanceFormatter(cell) {
    return <label style={{minWidth: '100px'}}
                  className={'text-info'}>{cell != null ? `₦ ${formatNumber(parseFloat(cell).toFixed(2))}` : 'N/A'}</label>

}

export function sourceTypeFormatter(cell) {
    return <label style={{minWidth: '100px'}}
                  className={'text-info'}>{cell != null ? `₦ ${cell.data.name}` : 'N/A'}</label>
}

export function lockedStatusFormatter(cell) {
    return (_isDateAfterToday(cell) ? <button className={'btn btn-success'}>Completed</button> :
        <button className={'btn btn-sm btn-warning'}>Ongoing</button>)

}

export function frequencyFormatter(cell) {
    return (_isDateAfterToday(cell) ? <button className={'btn btn-success'}>Completed</button> :
        <button className={'btn btn-sm btn-warning'}>Ongoing</button>)

}

export function getTodaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

export async function getToken() {
    return await getLocalStorage(USERTOKEN);
}

export function setupUser(payload) {
    setLocalStorage(USERINFO, payload);
}


export function amountInput(selector) {

    const isAmount = AutoNumeric.multiple(selector, {
        currencySymbol: "₦",
        maximumValue: "1000000000",
        minimumValue: "0",
        currencySymbolPlacement: 'p',
        digitGroupSeparator: ',',
        noEventListeners: false,
        decimalPlacesShownOnFocus: 0,
        decimalPlacesShownOnBlur: 0,
        outputFormat: 'number'
    });
    return isAmount;
}


export function initializeAmountInput() {
    // initialize inputs with commas
    const isAmount = amountInput('.amount-input');

}

export function getUserName(context, callback) {
    //content must have state userName
    try {
        //get name from localStorage
        const user = localStorage.getItem(USERINFO);
        if (user != null) {
            let userInfo = JSON.parse(user);
            context.setState({userName: userInfo.name});
        } else {
            getUserData(callback);
        }
        // const user = getLocalStorage(USERINFO);

    } catch (e) {
        console.log(e);
    }
}


export function Support() {

    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/5d14844953d10a56bd7c1937/default';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();
    Tawk_API = Tawk_API || {};
    Tawk_API.onBeforeLoad = function () {
        //place your code here
    };

    Tawk_API.onLoad = function () {
        Tawk_API.hideWidget();
        window.showTawk = function () {
            var pages = ['', 'faq'];
            pages.forEach(function (elem) {
                if (window.location.pathname.endsWith("/" + elem)) {
                    Tawk_API.showWidget();
                }
            });
        };
    };
}

export function hideSupport() {

    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/5d14844953d10a56bd7c1937/default';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();
    Tawk_API = Tawk_API || {};
    Tawk_API.onBeforeLoad = function () {
        //place your code here
    };
    Tawk_API.onLoad = function () {
        Tawk_API.hideWidget();
    };
}

//Retrieves user inputs
export function changeHandler(event, context) {
    const name = event.target.name;
    const value = event.target.value;
    context.setState({
        [name]: value
    });
}


export function handleFiltering(date, comparator, context) {
    context.createdDateFilter({
        date: new Date(date),
        comparator: comparator
    });
};

export function handlePinConcatenation(name, event, context = this, callback = null) {
    let form = {...context.state.form};
    form[name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    if (name == 'pin_one' || name == 'pin_two' || name == 'pin_three' || name == 'pin_four') {
        form.withdrawal_pin = form.pin_one + form.pin_two + form.pin_three + form.pin_four;
        context.setState({form});
    }
    if (form.withdrawal_pin.length >= 4) {
        context.setState({
            pinErr: false
        })
    }
    if (callback != null) {
        callback();
    }
    return form;
};

export function validatePin(context = this) {
    if (context.state.form.withdrawal_pin.length != 4) {
        //validate pin
        context.setState({
            pinErr: true
        });
        return false;
    }
    return true;
}

export function validateSteadySaveAmount(frequency, contribution, context) {
    if (frequency == APP_FREQUENCY.daily && Number(contribution) < AMOUNT_LIMITS.minSteadySaveDaily) {
        toastMessage(`Thec mimimum amount for ${APP_FREQUENCY.daily} steady save is ₦ ${formatNumber(AMOUNT_LIMITS.minSteadySaveDaily)}`, 'error', context);
        return false;
    } else if (frequency == APP_FREQUENCY.monthly && Number(contribution) < AMOUNT_LIMITS.minSteadySaveMonthly) {
        toastMessage(`The mimimum amount for ${APP_FREQUENCY.monthly} steady save is ₦ ${formatNumber(AMOUNT_LIMITS.minSteadySaveMonthly)}`, 'error', context);
        return false;
    } else if (frequency == APP_FREQUENCY.weekly && Number(contribution) < AMOUNT_LIMITS.minBackUpGoalWeekly) {
        toastMessage(`The mimimum amount for ${APP_FREQUENCY.weekly} steady save is ₦ ${formatNumber(AMOUNT_LIMITS.minBackUpGoalWeekly)}`, 'error', context);
        return false;
    } else if (frequency == APP_FREQUENCY.daily && Number(contribution) > AMOUNT_LIMITS.maxSteadySaveDaily) {
        toastMessage(`The maximum amount for ${APP_FREQUENCY.daily} steady save is ₦ ${formatNumber(AMOUNT_LIMITS.maxSteadySaveDaily)}`, 'error', context);
        return false;
    } else if (frequency == APP_FREQUENCY.monthly && Number(contribution) > AMOUNT_LIMITS.maxSteadySaveMonthly) {
        toastMessage(`The maximum amount for ${APP_FREQUENCY.monthly} steady save is ₦ ${formatNumber(AMOUNT_LIMITS.maxSteadySaveMonthly)}`, 'error', context);
        return false;
    } else if (frequency == APP_FREQUENCY.weekly && Number(contribution) > AMOUNT_LIMITS.maxBackUpGoalWeekly) {
        toastMessage(`The maximum amount for ${APP_FREQUENCY.weekly} steady save is ₦ ${formatNumber(AMOUNT_LIMITS.maxBackUpGoalWeekly)}`, 'error', context);
        return false;
    } else {
        return true;
    }
}
export function validateBackupGoalAmount(frequency, contribution, context) {
    if (frequency == APP_FREQUENCY.daily && Number(contribution) < AMOUNT_LIMITS.minBackUpGoalDaily) {
        toastMessage(`The mimimum amount for ${APP_FREQUENCY.daily} backup goals is ₦ ${formatNumber(AMOUNT_LIMITS.minBackUpGoalDaily)}`, 'error', context);
        return false;
    } else if (frequency == APP_FREQUENCY.monthly && Number(contribution) < AMOUNT_LIMITS.minBackUpGoalMonthly) {
        toastMessage(`The mimimum amount for ${APP_FREQUENCY.monthly} backup goals is ₦ ${formatNumber(AMOUNT_LIMITS.minBackUpGoalMonthly)}`, 'error', context);
        return false;
    } else if (frequency == APP_FREQUENCY.weekly && Number(contribution) < AMOUNT_LIMITS.minBackUpGoalWeekly) {
        toastMessage(`The mimimum amount for ${APP_FREQUENCY.weekly} backup goals is ₦ ${formatNumber(AMOUNT_LIMITS.minBackUpGoalWeekly)}`, 'error', context);
        return false;
    } else if (frequency == APP_FREQUENCY.daily && Number(contribution) > AMOUNT_LIMITS.maxBackUpGoalDaily) {
        toastMessage(`The maximum amount for ${APP_FREQUENCY.daily} backup goals is ₦ ${formatNumber(AMOUNT_LIMITS.maxBackUpGoalDaily)}`, 'error', context);
        return false;
    } else if (frequency == APP_FREQUENCY.monthly && Number(contribution) > AMOUNT_LIMITS.maxBackUpGoalMonthly) {
        toastMessage(`The maximum amount for ${APP_FREQUENCY.monthly} backup goals is ₦ ${formatNumber(AMOUNT_LIMITS.maxBackUpGoalMonthly)}`, 'error', context);
        return false;
    } else if (frequency == APP_FREQUENCY.weekly && Number(contribution) > AMOUNT_LIMITS.maxBackUpGoalWeekly) {
        toastMessage(`The maximum amount for ${APP_FREQUENCY.weekly} backup goals is ₦ ${formatNumber(AMOUNT_LIMITS.maxBackUpGoalWeekly)}`, 'error', context);
        return false;
    }else {
        return true;
    }
}

