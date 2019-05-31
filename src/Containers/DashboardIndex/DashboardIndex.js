import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import DashboardContainer from "../../Components/Dashboard/DashboardContainer/DashboardContainer";
import SteadySaveModal from "../../Components/Dashboard/SteadySaveModal/SteadySaveModal";
import ActiveGoalsModal from "../../Components/Dashboard/ActiveGoalsModal/ActiveGoalsModal";



class DashboardIndex extends Component {

    state = {
        showSteadySavingModal:false,
        showActiveGoalModal:false,
    };

    ShowSteadySaveModal = () => {
        this.setState({
            showSteadySavingModal:true
        });

    };
    ShowActiveGoalModal = () => {
        this.setState({
            showActiveGoalModal:true
        });

    };

    closeActiveGoalModal =()=>{
        this.setState({
            showActiveGoalModal:false
        });
    };

    closeSteadySaveModal = () => {
       this.setState({
           showSteadySavingModal:false
       });
    };

    render() {
        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav />
                    <VerticalNav/>
                    <DashboardContainer onHide={this.closeSteadySaveModal}
                                        showModal={this.ShowSteadySaveModal}

                    />
                    {/* steady save modal */}
                    <SteadySaveModal
                        show={this.state.showSteadySavingModal}
                        onHide={this.closeSteadySaveModal}
                    />

                    <ActiveGoalsModal
                        show={this.state.showActiveGoalModal}
                        onHide={this.closeActiveGoalModal}
                    />

                </div>
            </React.Fragment>
        );
    }
}
export default DashboardIndex;