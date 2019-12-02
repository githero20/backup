import React, {Component, Fragment} from 'react';
import Form from "react-bootstrap/Form";
import {_handleFormChange} from "../../../utils/index";
import SimpleReactValidator from "simple-react-validator";
import {withToastManager} from 'react-toast-notifications';
import ButtonLoader from "../../../Components/Auth/Buttonloader/ButtonLoader";
import moment from "moment";
import {toastMessage} from "../../../Helpers/Helper";
import {createWithdrawalSettings} from "../../../actions/WithdrawalAction";

class WithdrawalSettingsForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			form: {
				first_quarter: "01",
				second_quarter: "04",
				third_quarter: "07",
				fourth_quarter: "10",
				first_quarter_day: "01",
				second_quarter_day: "01",
				third_quarter_day: "01",
				fourth_quarter_day: "01",
			},
			lastDay: moment().year() + "-12-31"
		};
		this.validator = new SimpleReactValidator();

		this.validateForm = this.validateForm.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}


	validateDates = (form) => {
		console.log('second withdrawal', moment(form.second_quarter).quarter());
		if (moment(form.first_quarter).quarter() != 1) {
			toastMessage('First Withdrawal Date must be in the First quarter', 'error', this);
			return false;
		} else if (moment(form.second_quarter).quarter() != 2) {
			toastMessage('Second Withdrawal Date must be in the Second quarter', 'error', this);
			return false;
		} else if (moment(form.third_quarter).quarter() != 3) {
			toastMessage('Third Withdrawal Date must be in the Third quarter', 'error', this);
			return false;
		} else if (moment(form.fourth_quarter).quarter() != 4) {
			toastMessage('Fourth Withdrawal Date must be in the Fourth quarter', 'error', this);
			return false;
		} else {
			return true
		}
	};

	validateForm(e) {
		const {form} = this.state;
		e.preventDefault();
		if (!this.validator.allValid()) {
			this.validator.showMessages();
			// this.props.toastManager("An Error Occured");
			// rerender to show messages for the first time
			this.forceUpdate();
		} else {
			this.setState({loading: true});
			//send api

			const param = {
				label: ["First Quarter", "Second Quarter", "Third Quarter", "Fourth Quarter"],
				withdrawal_date: [
					`${form.first_quarter}/${form.first_quarter_day}`,
					`${form.second_quarter}/${form.second_quarter_day}`,
					`${form.third_quarter}/${form.third_quarter_day}`,
					`${form.fourth_quarter}/${form.fourth_quarter_day}`
				]
			};

			createWithdrawalSettings(param, (status, payload) => {
				this.setState({loading: false});
				if (status) {
					toastMessage("Settings Updated", 'success', this);
					setTimeout(() => {
						this.props.getWithdrawalSettings();
						this.props.onHide();
					}, 3000);
				} else {
					toastMessage(payload, 'error', this);
				}
			})


		}
	};


	//handle response
	handleChange(e) {
		this.setState({resolved: false});
		_handleFormChange(e.target.name, e, this)
	}


	render() {
		const {form} = this.state;

		const dayOptions = [
			<option value={'01'}>1</option>,
			<option value={'02'}>2</option>,
			<option value={'03'}>3</option>,
			<option value={'04'}>4</option>,
			<option value={'05'}>5</option>,
			<option value={'06'}>6</option>,
			<option value={'07'}>7</option>,
			<option value={'08'}>8</option>,
			<option value={'09'}>9</option>,
			<option value={'10'}>10</option>,
			<option value={'11'}>11</option>,
			<option value="12">12</option>,
			<option value="13">13</option>,
			<option value="14">14</option>,
			<option value="15">15</option>,
			<option value="16">16</option>,
			<option value="17">17</option>,
			<option value="18">18</option>,
			<option value="19">19</option>,
			<option value="20">20</option>,
			<option value="21">21</option>,
			<option value="22">22</option>,
			<option value="23">23</option>,
			<option value="24">24</option>,
			<option value="25">25</option>,
			<option value="26">26</option>,
			<option value="27">27</option>,
			<option value="28">28</option>,
			<option value="29">29</option>,
			<option value="30">30</option>,
			<option value="31">31</option>,
		];


		return (
			<React.Fragment>
				<Fragment>
					<form className="form lock-form" onSubmit={this.validateForm}>
						<Form.Text className='mb-1'>
							You are using Backup Cash's FREE WITHDRAWAL DATES. You can either accept these DATES as your
							Free Withdrawal Dates or set your own Dates . To accept these dates, click "Save Settings"
							below, otherwise edit the dates to reflect your own withdrawal dates.
						</Form.Text>
						<Form.Text className="alert-info rounded pl-2 py-1">
							Please note that you can ONLY change these Dates once
						</Form.Text>
						<div className="form-body">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="first_quarter" className=" col-form-label">First Quarter</label>
										<select name="first_quarter" value={form.first_quarter}
												onChange={this.handleChange} required className='form-control'
												id="first_quarter"
										>
											<option value="01">January</option>
											<option value="02">February</option>
											<option value="03">March</option>
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="first_quarter_day" className="col-form-label">Day in First Quarter </label>
										<select name="first_quarter_day" onChange={this.handleChange} required defaultValue={form.first_quarter_day}
												className='form-control' id="first_quarter_day">
											{dayOptions}
										</select>
									</div>
								</div>

								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="second_quarter" className="col-form-label">Second Quarter</label>
										<select name="second_quarter" required value={form.second_quarter}
												onChange={this.handleChange} className='form-control'
												id="second_quarter">
											<option value="04">April</option>
											<option value="05">May</option>
											<option value="06">June</option>
										</select>
									</div>

									<div className="form-group">
										<label htmlFor="second_quarter_day" className="col-form-label">Day in Second Quarter </label>
										<select name="second_quarter_day" onChange={this.handleChange} required defaultValue={form.second_quarter_day}
												className='form-control' id="second_quarter_day">
											{dayOptions}
										</select>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="third_quarter" className=" col-form-label">Third Quarter</label>
										<select name="third_quarter" required value={form.third_quarter}
												onChange={this.handleChange} className='form-control'
												id="third_quarter">
											<option value="07">July</option>
											<option value="08">August</option>
											<option value="09">September</option>
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="third_quarter_day" className="col-form-label">Day in Third Quarter </label>
										<select name="third_quarter_day" onChange={this.handleChange} required defaultValue={form.third_quarter_day}
												className='form-control' id="third_quarter_day">
											{dayOptions}
										</select>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="fourth_quarter" className=" col-form-label">Third Quarter</label>
										<select name="fourth_quarter" required value={form.fourth_quarter}
												onChange={this.handleChange} className='form-control'
												id="third_quarter">
											<option value="10">October</option>
											<option value="11">November</option>
											<option value="12">December</option>
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="fourth_quarter_day" className="col-form-label">Day in Fourth Quarter </label>
										<select name="fourth_quarter_day" onChange={this.handleChange} required defaultValue={form.fourth_quarter_day}
												className='form-control' id="fourth_quarter_day">
											{dayOptions}
										</select>
									</div>
								</div>
							</div>
						</div>

						<div className="form-actions d-flex justify-content-center justify-content-md-end">
							<button type="button"
									className="btn mr-1 px-3 py-1 round "
									onClick={this.props.onHide}>Cancel
							</button>
							<button type="submit"
									className="btn btn-custom-blue btn-bg-shade-2 px-3 py-1 round ">
								{this.state.loading ? <ButtonLoader/> : <span>Update</span>}
							</button>
						</div>
					</form>
				</Fragment>

			</React.Fragment>
		);
	}
}

export default withToastManager(WithdrawalSettingsForm);