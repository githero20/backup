import {_axios, _getHeader} from "../utils";
import {GetUserKYC} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";

// export async const getDashboardData() {
//
//     // Make first two requests
//     const [firstResponse, secondResponse] = await Promise.all([
//         axios.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=${this.props.p1}`),
//         axios.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=${this.props.p2}`)
//     ]);
//
//     // Make third request using responses from the first two
//     const thirdResponse = await axios.get('https://maps.googleapis.com/maps/api/directions/json?origin=place_id:' + firstResponse.data.results.place_id + '&destination=place_id:' + secondResponse.data.results.place_id + '&key=' + 'API-KEY-HIDDEN');
//
//     // Update state once with all 3 responses
//     this.setState({
//         p1Location: firstResponse.data,
//         p2Location: secondResponse.data,
//         route: thirdResponse.data,
//     });
//
// }


export const getUserKyc = (callback) =>{
    _axios.get(GetUserKYC,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data);
        })
        .catch(err => {

            // callback(false, err || "An Error Occurred");
            checkResponse(err);
            callback(false, err.response);
        })
};
