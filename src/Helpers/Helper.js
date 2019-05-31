import Axios from "axios";


export function post(url,param,header,func,errfunc) {
   Axios.post(url,param,header).then(func).catch(errfunc);
}

export function get(url,param,header,func,errfunc) {
    Axios.get(url,param).then(func).catch(errfunc);

}