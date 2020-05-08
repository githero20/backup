import {_axios, _getHeader} from "../utils";
import {instantSaveEndpoint} from "../RouteLinks/RouteLinks";

export function handleLeastAmount(input,value) {

    if(input==='amount' && value <= 500){
       value = parseInt(500);
        return value;
    }

}

export const CreateInstantSave = (payload, callback) => {

    _axios.post(`${instantSaveEndpoint}`, payload, {
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};
