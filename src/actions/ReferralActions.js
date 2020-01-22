import {_axios, _getHeader} from "../utils";
import {referralsEndpoint} from "../RouteLinks/RouteLinks";

export const getReferrals = (url, callback) => {

    _axios.get(`${referralsEndpoint}`, {
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {

            try {

                callback(false, err.response);
            } catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};
