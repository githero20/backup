import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import menuIcon from "../../admin/app-assets/images/svg/three-dot-icon.svg";
import visaImage from "../../admin/app-assets/images/svg/visa.svg";
import masterCardImage from "../../admin/app-assets/images/svg/mastercard.svg";
import BankModal from "./Bank/BankModal";
import {getUserBanks} from "../../actions/BankAction";
import CardModal from "./Card/CardModal";
import {deleteUserCard, getUserCards, verifyTransaction} from "../../actions/CardAction";
import {withToastManager} from "react-toast-notifications";
import {getUserData} from "../../actions/UserAction";
import DashboardLoader from "../../Components/Dashboard/DashboardLoader/DashboardLoader";
import Footer from "../../Components/Dashboard/Footer/Footer";
import './banksetting.css';
import {toastMessage} from "../../Helpers/Helper";
import AppModal from "../../Components/Commons/AppModal";

class BankCardSetting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBankModal: false,
            showCardModal: false,
            banks: [],
            cards: [],
            userName: null,
            showLoader: false,
            deleteLoading: false,
            showModal: false,
            id: '',
        };

        this.showBankModal = this.showBankModal.bind(this);
        this.hideBankModal = this.hideBankModal.bind(this);
        this.showCardModal = this.showCardModal.bind(this);
        this.hideCardModal = this.hideCardModal.bind(this);
        this.getUserBanks = this.getUserBanks.bind(this);
        this.resolvePaystackResponse = this.resolvePaystackResponse.bind(this);
        this.getUserCards = this.getUserCards.bind(this);
    }

    getUserBanks() {
        getUserBanks((status, payload) => {
            if (status) {
                this.setState({banks: payload});
            } else {
                toastMessage("Unable to fetch Bank Accounts", 'error', this);
            }
        })
    }


    getUserCards() {
        getUserCards((status, payload) => {
            if (status) {
                this.setState({cards: payload});
            } else {
                toastMessage("Unable to fetch Cards", 'error', this);
            }
        })
    }

    componentWillMount() {

        this.setState({
            showLoader: true,
        });

        this.fetchUserData();
    }

    fetchUserData = () => {
        getUserData(this.handleUserInfo);
        this.getUserBanks();
        this.getUserCards();
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.reload) {
            this.setState({showLoader: true});
            this.fetchUserData();
        }
    }


    handleUserInfo = (status, res) => {
        this.setState({showLoader: false});
        if (status) {
            this.setState({userName: res.name})
        }
    };


    showBankModal() {
        this.setState({showBankModal: true});
    }

    showCardModal() {
        this.setState({showCardModal: true});
    }

    hideBankModal(status = false) {
        this.setState({showBankModal: false});
        if (status) {
            this.getUserBanks()
        }
    }

    hideCardModal() {
        this.setState({showCardModal: false})
    }

    resolvePaystackResponse(response) {
        verifyTransaction({
            ref: response.reference,
            type: "instant"
        }, (status, payload) => {
            if (status) {

                toastMessage("Card Added Successfully", 'success', this);

                this.getUserCards();
            } else {
                toastMessage("Unable to add card at this moment", 'error', this);
            }
        })

    }

    handleDelete = (id) => {
        this.setState({deleteLoading: true});
        deleteUserCard(id, (status, data) => {
            this.setState({deleteLoading: false});
            if (status) {
                this.fetchUserData();
                toastMessage("Card Deleted Successfully!", 'success', this);
            } else {
                console.log('err', data);
                toastMessage(data.data.message, 'error', this);
            }
        });
    };

    showDeleteModal = (id) => {
        this.setState({showModal: true, id});
    };

    hideDeleteModal = (id) => {
        this.setState({showModal: false, id});
    };


    toastMessage = (message, status) => {
        const {toastManager} = this.props;
        toastManager.add(message, {
            appearance: status,
            autoDismiss: true,
            autoDismissTimeout: 4000,
            pauseOnHover: false,
        })
    };

    render() {
        const {deleteLoading, showModal, id} = this.state;
        const randomGradient = ["gray-gradient", "blue-gradient"];
        const cards = this.state.cards.map((card, index) => {
            const grad = randomGradient[Math.floor(Math.random() * randomGradient.length)];
            let cardType = masterCardImage;
            //TODO(get verve image)
            if (card.brand == "visa")
                cardType = visaImage;
            else if (card.brand == "verve")
                cardType = visaImage;
            return (
                <div key={index} className={"bank-card " + grad + " mb-2 mb-md-0  mr-2"}>
                    <div className="d-flex justify-content-end">
                        <div className="card__options">
                            <div className="card__action" onClick={() => this.showDeleteModal(card.id)}>Remove</div>
                            {/*<img src={menuIcon} className=" big-dots"/> */}
                            <i className={'fa fa-trash fa-2x'}/>
                        </div>
                    </div>
                    <p className="mb-md-3 mt-2 ml-1 ml-md-0 mt-md-0">**** **** **** {card.last4}</p>
                    <div className="ml-1 ml-md-0 sm-font">
                        <span className="mr-5 mb-1 sm-font"/>
                        <span>{card.exp_month}/{card.exp_year}</span>
                    </div>
                    <div>
                        <img className="card-img-icon"
                             src={cardType}/>
                    </div>
                </div>

            );
        });
        return (
            <>
                <BankModal show={this.state.showBankModal} onHide={this.hideBankModal}/>
                <CardModal show={this.state.showCardModal}
                           onHide={this.hideCardModal}
                           onResolve={this.resolvePaystackResponse}
                />

                <AppModal show={showModal}
                          title={'Delete Card'}
                          buttonLabel={'Delete'}
                          loading={deleteLoading}
                          handleClose={this.hideDeleteModal}
                          onHide={this.hideDeleteModal}
                          func={() => this.handleDelete(id)}>
                    <p>Are you sure you want to delete this card ? </p>
                </AppModal>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav userName={this.state.userName}/>
                    <VerticalNav userName={this.state.userName}/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            {this.state.showLoader ? <DashboardLoader/> : null}
                            <div className="row mb-4 d-none">
                                <div className="col-12"/>
                            </div>
                            <div className="content-body">
                                <section id="text-alignment">
                                    <div className="row">
                                        <div className="col-12 mt-3 mb-1">
                                            <h3 className="gray-header-text mb-2 ">Settings <span
                                                className="dot">.</span> Bank/Cards</h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className=" col-md-12">
                                            <div className="card round px-md-3">
                                                <div className="card-content">
                                                    <div className="card-body account-card">
                                                        <div
                                                            className=" d-flex justify-content-between align-items-center light-gray setting-header">
                                                            <h5>My Banks</h5>
                                                            <span className="pull-right right-btn-holder"
                                                                  onClick={this.showBankModal}>
                                                            <span
                                                                className="btn-custom-round-blue plus-btn-shadow mr-1">
                                                                <i className='fa fa-plus text-white'/>
                                                            </span>Add Bank</span>
                                                        </div>

                                                        <div
                                                            className="d-flex justify-content-md-between justify-content-center flex-column flex-md-row mt-4">
                                                            {
                                                                this.state.banks.map((bank, index) => {
                                                                    return (
                                                                        <div key={index}
                                                                             className={"bank-card gray-gradient mb-2 mb-md-0  mr-2"}>
                                                                            <div className="d-flex justify-content-end">
                                                                                <img
                                                                                    src={menuIcon}
                                                                                    className=" big-dots"/>
                                                                            </div>
                                                                            <p className="mb-md-3 mt-2 ml-1 ml-md-0 mt-md-0"> {bank.bank_number}</p>
                                                                            <div className="ml-1 ml-md-0 sm-font">
                                                                                <span className="mr-5 mb-1 sm-font"/>
                                                                                <span>{bank.bank}</span>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" col-md-12">
                                            <div className="card round px-md-3">
                                                <div className="card-content">
                                                    <div className="card-body account-card">
                                                        <div
                                                            className=" d-flex justify-content-between align-items-center light-gray setting-header">
                                                            <h5>{deleteLoading ? "Deleting Card ..." : "Debit/Credit"}</h5>
                                                            <span className="pull-right right-btn-holder"
                                                                  onClick={this.showCardModal}>
                                                                <span
                                                                    className="btn-custom-round-blue plus-btn-shadow mr-1">
                                                                    <i className="fa fa-plus"/>
                                                            </span>Add Card</span>
                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-md-between justify-content-center flex-column flex-md-row mt-4">
                                                            {cards}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </>
        );
    }
}


export default withToastManager(BankCardSetting);