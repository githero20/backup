import React, { useEffect, useState } from "react";
import axios from 'axios'
import {BASE_URL} from "../../../RouteLinks/RouteLinks";

export const USERTOKEN = "token";
export const USERINFO = "us-info"

const verifyTokenURL = BASE_URL+"sfsbapi/v1/user"


const AuthController = component => {
    const Authenticate = props => {
        const [fetching, setFetching] = useState(true);

        const RenderComponent = props.component;
        const token = localStorage.getItem(USERTOKEN);

        useEffect(() => {

            if (!token) {
                props.history.push(
                    `/login?redirect=${encodeURIComponent(
                        props.location.pathname
                    )}`
                );
                localStorage.removeItem(USERTOKEN);
                localStorage.removeItem(USERINFO);
            }
            else{

                axios.get(verifyTokenURL, {headers: {Authorization: `Bearer ${localStorage.getItem(USERTOKEN)}`}}).then(
                    res => {
                        localStorage.setItem("userInfo", JSON.stringify(res.data.data));

                        setFetching(false);
                    },
                    err => {
                        console.log(err)
                        props.history.push(
                            `/login?redirect=${props.location.pathname}`
                        );
                        localStorage.removeItem(USERTOKEN);
                        localStorage.removeItem(USERINFO);
                        return null;
                    }
                )
            }


        }, [RenderComponent]);




        //
        // if (fetching) {
        //     return <h3>loading</h3>;
        // }

        return <RenderComponent {...props} />;
    };

    Authenticate.defaultProps = {
        component
    };



    return Authenticate
};

export default AuthController;