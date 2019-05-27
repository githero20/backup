import React, {Component} from 'react';
import HorizonalNav from "../../Components/Dashboard/HorizontalNav/HorizonalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";

class KycSetting extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizonalNav/>
                    <VerticalNav/>
                    <h2>Kyc Settings </h2>
                </div>
            </React.Fragment>
        );
    }
}
export default KycSetting;