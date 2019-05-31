import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import DashboardContainer from "../../Components/Dashboard/DashboardContainer/DashboardContainer";
import SteadySaveModal from "../../Components/Dashboard/SteadySaveModal/SteadySaveModal";
import LockedSavingModal from "../../Components/Dashboard/LockedSavingModal/LockedSavingModal";
import {activateUserEndpoint, getUserInfoEndpoint} from "../../RouteLinks/RouteLinks";
import {api, apiGet, getLocalStorage, setLocalStorage} from "../../ApiUtils/ApiUtils";


class DashboardIndex extends Component {


    state = {
        showSteadySavingModal: false,
        showActiveGoalModal: false,
        showlockedSavingsModal: false,
        error: false,
        errorMessage: '',
        activationSuccss: false,
        userDashboardInfo:''
    };

    showSteadySaveModal = () => {
        this.setState({
            showSteadySavingModal: true
        });

    };
    showActiveGoalModal = () => {
        this.setState({
            showActiveGoalModal: true
        });

    };

    closeActiveGoalModal = () => {
        this.setState({
            showActiveGoalModal: false
        });
    };

    closeSteadySaveModal = () => {
        this.setState({
            showSteadySavingModal: false
        });
    };

    showLSModal = () => {
        this.setState({
            showlockedSavingsModal: true
        });
    };

    closeLSModal = () => {
        this.setState({
            showlockedSavingsModal: false
        });
    };


    getUserInfo = (url) => {
        api(url)


    };

    setupDashBoard() {

        //get data from localStorage
        let data = JSON.parse(getLocalStorage('userInfo'));
       this.setState({
           userDashboardInfo:data
       })


    }


    handleUserInfo = (state, response) => {

        if (state) {

            // display info to user to activate their email

            // console.log(JSON.stringify(response));
            setLocalStorage('userInfo',JSON.stringify(response.data));

            this.setState({
                error: false,
            });

            //setup dashboard

        } else {
            //
            this.setState({
                error:true,
                errorMessage:response.data.message
            });
        }

    };


    activateAccount = () => {

        const url = activateUserEndpoint;
        api(url, null, true, false, this.handleUserActivation)

    };


    handleUserActivation = (state, res) => {
        if (state) {
            console.log(res);
            this.setState({
                activationSuccess: true,
                error: false,
            })
        }

    };


    componentDidMount() {


        this.setupDashBoard();


        //call endpoint to get user info
        // const url = getUserInfoEndpoint;

        //get token

        // let token = getLocalStorage('token');
        //
        // if (token !== null) {
        //
        //     api(url, null, true, false, this.handleUserInfo);
        //
        // }

        // else user is not activated display modal that shows user is not activated


        //setup the dashboard


    }


    render() {
        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav/>
                    <VerticalNav/>

                    <DashboardContainer
                        info={this.state.userDashboardInfo}
                        error={this.state.error}
                        errorMessage={this.state.errorMessage}
                        activateAccount={this.activateAccount}
                        hideSSModal={this.closeSteadySaveModal}
                        showSSModal={this.showSteadySaveModal}
                        hideAGModal={this.closeActiveGoalModal}
                        showAGModal={this.showActiveGoalModal}
                        hideLSModal={this.closeLSModal}
                        showLSModal={this.showLSModal}
                    />

                    {/* steady save modal */}
                    <SteadySaveModal

                        show={this.state.showSteadySavingModal}
                        onHide={this.closeSteadySaveModal}

                    />

                    <LockedSavingModal
                        show={this.state.showlockedSavingsModal}
                        onHide={this.closeLSModal}
                    />

                </div>
            </React.Fragment>
        );
    }
}

export default DashboardIndex;