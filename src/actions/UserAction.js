import {_axios, _getUser, _setUser} from "../utils";
import {getUserInfoEndpoint} from "../RouteLinks/RouteLinks";

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
            if(callback)
                callback(false, err.response.data.data || err.response.data.message);
        })
};
