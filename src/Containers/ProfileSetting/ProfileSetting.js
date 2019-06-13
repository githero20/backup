import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import deleteIcon from "../../admin/app-assets/images/svg/delete-icon.svg";
import avatar from "../../admin/app-assets/images/avatar@2x.png";
import editIcon from "../../admin/app-assets/images/svg/edit-icon.svg";
import MessageBox from "../../Components/Dashboard/DashboardContainer/MessageBox/MessageBox";
import AvatarImage from "../../admin/app-assets/images/portrait/small/avatar-s-19.png";
import ProfileForm from "../../Components/Dashboard/ProfileForm/ProfileForm";
import {getLocalStorage, request} from "../../ApiUtils/ApiUtils";
import {USERINFO} from "../../Components/Auth/HOC/authcontroller";
import {CentralVaultInterest, getUserInfoEndpoint} from "../../RouteLinks/RouteLinks";


class ProfileSetting extends Component {



    state = {
        userProfile: null
    };


    setupProfile = (status,res) => {
        if(status){
            console.log(res.data.data);
            this.setState({
                userProfile:res.data.data
            })

        }else{
            console.log(res);
        }
        //
        // this.setState({
        //     userProfile: profile,
        // })

    };


    componentDidMount() {
        // fetch User info
        // const data = getLocalStorage(USERINFO);
        // console.log(data);
        // if (data) {
        //     this.setupProfile(data);
        // }

            //make request
            request(getUserInfoEndpoint, null, true, 'GET', this.setupProfile);



            console.log('setting up profile');

    }


    render() {

        console.log(this.state.userProfile);

        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    {this.state.userProfile? <HorizontalNav userName={this.state.userProfile.name} /> : <HorizontalNav /> }
                    {this.state.userProfile? <VerticalNav userName={this.state.userProfile.name}  /> : <VerticalNav /> }

                    <div className="app-content content">
                        <div className="content-wrapper">
                            <div className="row mb-4">
                                <div className="col-12">
                                    {/* message box */}
                                    {/*<MessageBox/>   */}
                                </div>
                            </div>

                            <div className="content-header row">
                            </div>
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-8 col-12">
                                        <h3 className="gray-header-text mb-2 ">Profile

                                        </h3>
                                        <div className="card curved-radius">
                                            <div className="card-content collapse show">
                                                <div className="card-header">
                                                    <h4 className="card-title">Profile Settings</h4>
                                                </div>
                                                <div className="card-body px-md-3 py-md-3">
                                                   <ProfileForm
                                                       userProfile={this.state.userProfile}
                                                   />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default ProfileSetting;