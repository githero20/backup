import React, { useEffect, useState } from "react";
import axios from 'axios'
import {BASE_URL} from "../../../RouteLinks/RouteLinks";
import {setLocalStorage} from "../../../ApiUtils/ApiUtils";

export const USERTOKEN = "token";
export const USERINFO = "us-info";
export const DASHBOARDINFO = "dashboard-info";
export const USERACTIVATED = "activated";

const verifyTokenURL = BASE_URL+"sfsbapi/v1/user";


const AuthController = component => {
    const Authenticate = props => {
        const [fetching, setFetching] = useState(true);

        const RenderComponent = props.component;
        const token = localStorage.getItem(USERTOKEN);

        useEffect(() => {

            if (!token) {
                props.history.push(
                    `/login`
                );
                localStorage.removeItem(USERTOKEN);
                localStorage.removeItem(USERINFO);
            }
            else{

                axios.get(verifyTokenURL, {headers: {Authorization: `Bearer ${localStorage.getItem(USERTOKEN)}`}}).then(
                    res => {
                        console.log('request made'+res);
                        localStorage.setItem(USERINFO, JSON.stringify(res.data.data));
                        setLocalStorage(USERACTIVATED,true);

                        setFetching(false);
                    },
                    err => {
                        console.log(JSON.stringify(err.response));
                        if(err.response.data.message === "Account has not been activated, click on resend"){
                            setLocalStorage(USERACTIVATED,false);

                        }else{

                            props.history.push(
                                `/login`
                            );
                            localStorage.removeItem(USERTOKEN);
                            localStorage.removeItem(USERINFO);
                            return null;

                        }

                    }
                )
            }


        }, [RenderComponent]);




        //
        // if (fetching) {
        //     return <h3>loading</h3>;
        //     ?redirect=${props.location.pathname}
        // }

        return <RenderComponent {...props} />;
    };

    Authenticate.defaultProps = {
        component
    };



    return Authenticate
};

export default AuthController;