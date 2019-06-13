import {_axios, _getUser, _setUser} from "../utils";
import {getUserInfoEndpoint} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";

export const getUserData =  callback =>{
    _axios.get(getUserInfoEndpoint)
        .then(res => {
            console.log("Res",res);
            if(callback){
                callback(true, res.data.data);
            }
        })
        .catch(err => {
            console.log("Err",JSON.stringify(err));
            checkResponse(err);
            callback(false, err.response);
            // if(err.response) {callback(false, err.response.data.data || err.response.data.message);
            //
            // }
        })
};
