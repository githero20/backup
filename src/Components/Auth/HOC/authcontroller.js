import React, { useEffect, useState } from "react";
import {
  LoginEndpoint,
  getUserInfoEndpoint,
} from "../../../RouteLinks/RouteLinks";
import { api, setLocalStorage } from "../../../ApiUtils/ApiUtils";
import swal from "sweetalert";
import moment from "moment";
import { CUSTOMER } from "../../../Helpers/Helper";
import { _axios } from "../../../utils";

export const USERTOKEN = "token";
export const SESSION_INTERVAL = "time-stamp";
export const USERINFO = "user";
export const USERWITHDRAWAL = "user-withdrawal";
export const MINIMUM_WITHDRAWAL = 500;
export const MIN_INSTANT_SAVE = 500;
export const AMOUNT_LIMITS = {
  minSteadySaveDaily: 500,
  maxSteadySaveDaily: 50000,
  minSteadySaveWeekly: 500,
  maxSteadySaveWeekly: 200000,
  minSteadySaveMonthly: 500,
  maxSteadySaveMonthly: 2000000,
  minBackUpGoalDaily: 500,
  maxBackUpGoalDaily: 50000,
  minBackUpGoalWeekly: 500,
  maxBackUpGoalWeekly: 200000,
  minBackUpGoalMonthly: 500,
  maxBackUpGoalMonthly: 2000000,
};
export const APP_FREQUENCY = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
};
export const ADD_BANK = 0;
export const DASHBOARDINFO = "dashboard-info";
export const USERACTIVATED = "activated";
export const ACTIVATIONMESG = "activation-msg";
export const ACTIVATONEMAIL = "activation-email";
export const SHOWAD = "show-ad";

const doLogin = (data, callback) => {
  const password = document.getElementById("password").value;
  Login(LoginEndpoint, { email: data.email, password: password }, callback);
};
function checkAuth() {
  let cb = (status, res) => {
    if (status) {
      console.log("success");
    } else {
      localStorage.removeItem(USERTOKEN);
      localStorage.removeItem(USERINFO);
      if (window.location.pathname !== `/login`) {
        window.location.href = `/login`;
      }
    }
  };
  api(getUserInfoEndpoint, {}, true, false, cb);
}
checkAuth();
export function setAuthorisationToken(token, callback) {
  //setup interceptors for 401 errors
  _axios.interceptors.response.use(
    function (response) {
      // Do something with response data
      callback(true, response);
      return response;
    },
    function (error) {
      //check the response status
      if (error.response && error.response.status === 401) {
        callback(false, error);
      }
      // Do something with response error
      return Promise.reject(error);
    }
  );
  if (token) {
    //setting authorization header
    _axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete _axios.defaults.headers.common["Authorization"];
  }
}

const Login = (url, param, login) => {
  api(url, param, false, true, login);
};

const AuthController = (Component) => {
  const Authenticate = (props) => {
    const [reload, setReload] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = JSON.parse(localStorage.getItem(USERTOKEN));
    const swalLoginConfig = {
      text: "Enter your password to continue",
      title: "Your Session has expired!",
      icon: "info",
      content: {
        element: "input",
        attributes: {
          placeholder: "Type your password",
          type: "password",
          name: "password",
          id: "password",
        },
      },
      buttons: {
        cancel: "Log Out",
        yes: "continue",
      },
    };

    const handleUserAuth = () => {
      // swal(swalLoginConfig).then((value) => {
      //     if (value) {
      //         let data = JSON.parse(localStorage.getItem(USERINFO));
      //         doLogin(data, onLogin);
      //     } else {
      //         setIsLoggedIn(false);
      //         window.location.href = `/login`;
      //         localStorage.removeItem(USERTOKEN);
      //         localStorage.removeItem(USERINFO);
      //     }
      // });
      localStorage.removeItem(USERTOKEN);
      localStorage.removeItem(USERINFO);
      window.location.href = `/login`;
    };

    useEffect(() => {
      //   Axios.get(`${BASE_URL}sfsbapi/v1/user/snap`)
      //     .then((res) => {
      //       if (res.data && res.data.success && res.data.status_code === 401) {
      //         localStorage.removeItem(USERTOKEN);
      //         localStorage.removeItem(USERINFO);
      //         console.log("result", res.data);
      //         window.location.href = `/login`;
      //       } else {
      //         console.log(res);
      //       }
      //     })
      //     .catch((err) => console.log(err.data));
      if (!token) {
        localStorage.removeItem(USERTOKEN);
        localStorage.removeItem(USERINFO);
        window.location.href = `/login`;
      }

      setAuthorisationToken(token, (status, data) => {
        if (status) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          if (
            data &&
            data.response &&
            data.response.data &&
            data.response.data.message ===
              "Account has not been activated, click on resend"
          ) {
            setLocalStorage(USERACTIVATED, false);
          } else handleUserAuth();
        }
      });
    }, [Component]);

    const onLogin = (state, response) => {
      if (state && response && response.data) {
        //set session time
        const timeStamp = moment().format("MM-DD-YYYY HH:mm:ss");
        // handle admin login

        if (response.data.role === CUSTOMER) {
          swal("Awesome!!", "You have successfully logged in", "success", {
            button: false,
            timer: 2000,
          });
          localStorage.setItem(USERTOKEN, JSON.stringify(response.data.token));
          localStorage.setItem(SESSION_INTERVAL, JSON.stringify(timeStamp));
          localStorage.setItem(USERINFO, JSON.stringify(response.data.user));
          setIsLoggedIn(true);
          setReload(true);
        }
      } else {
        if (
          response &&
          response.status == 401 &&
          response.data.message === "invalid_credentials"
        ) {
          swal("Oops!!", `Invalid Credentials`, "warning");
        } else if (
          response &&
          response.status == 401 &&
          response.data.message === "Incorrect email or password,Try again"
        ) {
          swal("Oops!!", "Incorrect Email or Password", "warning", {
            button: false,
            timer: 2000,
          });
        } else {
          swal("Oops!!", `Unable to login at the moment.Try Again`, "warning", {
            button: false,
            timer: 2000,
          });
        }
      }
    };

    return <Component {...props} reload={reload} isLoggedIn={isLoggedIn} />;
  };

  Authenticate.defaultProps = {
    Component,
  };

  return Authenticate;
};

export default AuthController;
