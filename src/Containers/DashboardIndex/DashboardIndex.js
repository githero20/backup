import React, {Component} from 'react';
import HorizonalNav from "../../Components/Dashboard/HorizontalNav/HorizonalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import DashboardContainer from "../../Components/Dashboard/DashboardContainer/DashboardContainer";



class DashboardIndex extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizonalNav/>
                    <VerticalNav/>
                    <DashboardContainer/>
                </div>
            </React.Fragment>
        );
    }
}
export default DashboardIndex;