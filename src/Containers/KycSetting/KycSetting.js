import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import MessageBox from "../../Components/Dashboard/DashboardContainer/MessageBox/MessageBox";
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import ButtonLoader from "../../Components/Auth/Buttonloader/ButtonLoader";
import SimpleReactValidator from "simple-react-validator";
import {_handleFormChange} from "../../utils/index";
import {getUserKyc,storeUserKyc} from "../../actions/KycAction"

class KycSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kyc: [],
            loading:false,
            resolved:false,
            form: {
                maiden_name:"",
                password:"",
                address:"",
                relationship_status:"",
                employment_status:"",
                end_year_amount:"",
                edit:"",
                identification_type:"",
                // identification_type_picture_url:"",
                identification_type_number:"",
                issue_date:"",
                expiry_date:"",
                edit :0
            }
        };
        this.validator = new SimpleReactValidator();

       this.validateForm = this.validateForm.bind(this);
       this.handleChange = this.handleChange.bind(this);

       
    }
    validateForm(e){
        e.preventDefault();
    
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            // this.props.toastManager("An Error Occured");
            // rerender to show messages for the first time
            this.forceUpdate();
        }else{
            this.setState({loading:true});
            this.storeUserKyc();
            
        }
    
    }
    handleChange(e){
        this.setState({resolved:false});
        _handleFormChange(e.target.name,e, this)
    }

    componentWillMount() {
        this.getUserKych();
    }

    storeUserKyc(){
        const {form} = this.state;
        storeUserKyc(form,(status,result)=>{
            console.log(status);
            console.log(result);
        });

    }
    getUserKych(){
        getUserKyc((status,result) => {
            console.log("get user kyc")
            console.log(status);
            console.log(result);
            if(status){
                console.log(result.edit)
                if(result.edit == 1){
                    this.form.maiden_name= result.data.maiden_name;
                    
                }
            }
            else{

            }
        });

    }

    render() {
        return (
            <React.Fragment>
                <div className="vertical-layout vertical-menu-modern 2-columns fixed-navbar  menu-expanded pace-done"
                     data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
                    <HorizontalNav/>
                    <VerticalNav/>
                    <div className="app-content content">
                        <div className="content-wrapper">
                            <div className="row mb-4">
                                <div className="col-12">
                                    {/* TODO Add Message box */}
                                    {/*<MessageBox/>*/}
                                </div>
                            </div>
                            <div className="content-header row">
                            </div>
                            <div className="content-body">
                                <div className="row">
                                    <div className="col-lg-12 col-12">
                                        <h3 className="gray-header-text mb-2 ">KYC Settings

                                        </h3>
                                        <section id="basic-form-layouts">
                                            <div className="row match-height">
                                                <div className="col-md-6">
                                                    <div className="card curved-radius"
                                                         data-height="60px">
                                                        <div className="card-header">
                                                            <h4 className="card-title"
                                                                id="basic-layout-form">General</h4>
                                                            <a className="heading-elements-toggle"><i
                                                                className="la la-ellipsis-v font-medium-3"></i></a>
                                                            <div className="heading-elements">
                                                                <ul className="list-inline mb-0">
                                                                    <li><a data-action="collapse"><i
                                                                        className="ft-minus"></i></a></li>

                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="card-content collapse show" >
                                                            <div className="card-body px-5">
                                                            
       
                                                                <Form className="form lock-form" onSubmit={this.validateForm}>
                                                                    <div className="form-body">
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                          <Form.Group controlId="exampleForm.ControlSelect1">
                                                                                                <Form.Label>Gender</Form.Label>
                                                                                                <Form.Control as="select" name="gender"  value={this.state.form.gender} onChange={this.handleChange} className="form-control">
                                                                                                <option value ="male">Male</option>
                                                                                                <option value="female">Female</option>
                                                    
                                                                                            </Form.Control>
                                                                                            </Form.Group>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                                                                <Form.Label>Relationship</Form.Label>
                                                                                                <Form.Control as="select" name="relationship" className="form-control">
                                                                                                <option value="single">Single</option>
                                                                                                <option value ="married">Married</option>
                                                                                                <option value="divorced">Divorce</option>
                                                    
                                                                                            </Form.Control>
                                                                                            </Form.Group>
                                                        
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                                                                <Form.Label>Employment Status</Form.Label>
                                                                                                <Form.Control as="select" name="employment_status" className="form-control">
                                                                                                <option value="student">Student</option>
                                                                                                <option value ="employed">Employed</option>
                                                                                                <option value="unemployed">UnEmployed</option>
                                                                                                <option value="self-employed/entrepreneur">Self-Employed/Entrepreneur</option>
                                                    
                                                                                            </Form.Control>
                                                                                            </Form.Group>
                                                                                                                                                                            </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                                                                <Form.Label>Employment Status</Form.Label>
                                                                                                <Form.Control as="select" name="employment_status" className="form-control">
                                                                                                <option value="student">Student</option>
                                                                                                <option value ="employed">Employed</option>
                                                                                                <option value="unemployed">UnEmployed</option>
                                                                                                <option value="self-employed/entrepreneur">Self-Employed/Entrepreneur</option>
                                                    
                                                                                            </Form.Control>
                                                                                            </Form.Group>
                                                                                                                                                                            </div>
                                                                            </div>

                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                                                                <Form.Label>Annual Income</Form.Label>
                                                                                                <Form.Control as="select" name="end_year_amount" className="form-control">
                                                                                                <option value="less_than50000">Less than N50,000</option>
                                                                                                <option value="51000-150000">N51,000 - N150,000</option>
                                                                                                <option value="151000-250000">N151,000 - N250,000</option>
                                                                                                <option value="251000-500000">N251,000 - N500,000</option>
                                                                                                <option value="501000-1Million">N501,000 - N1 Million</option>
                                                                                                <option value="1Million-5Million">N1 Million - N5 Million</option>
                                                                                                <option value="5Million-10Million">N5 Million - N10 Million</option>
                                                                                                <option value="Above10Million">Above N10 Million</option>
                                                                                            </Form.Control>
                                                                                            </Form.Group>
                                                                                    
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-6">

                                                                                <div className="form-group">
                                                                                    
                                                                                        <Form.Row>
                                                                                        <Form.Group as={Col} controlId="kycForm.maiden_name">
                                                                                            <Form.Label>Mothers
                                                                                        maiden Name: </Form.Label>
                                                                                            <Form.Control
                                                                                                name="maiden_name"
                                                                                                type="text"
                                                                                                onChange={this.handleChange}
                                                                                                value={this.state.form.maiden_name}
                                                                                                placeholder ="maiden name"
                                                                                            />
                                                                                        </Form.Group>
                                                                                        {/* <Form.Text>Mother maiden name.</Form.Text> */}
                                                                                         {this.validator.message("maiden_name",this.state.form.maiden_name,"required")}
                                                                                    </Form.Row>
                                                                                     </div>

                                                                            </div>
                                                                            <div className="col-md-6">

                                                                                <div className="form-group">
                                                                                    <label htmlFor="companyName">Date of
                                                                                        Birth</label>
                                                                                    <input type="date" id="dateofbirth"
                                                                                           className="form-control"
                                                                                           placeholder="Company Name"
                                                                                           name="company"/>
                                                                                </div>

                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                <Form.Group controlId="kycForm.address">
                                                                                        <Form.Label>Address</Form.Label>
                                                                                        <Form.Control as="textarea" rows="3" />
                                                                                        </Form.Group>
                                                                              </div>
                                                                            </div>



                                                                        </div>


                                                                    </div>

                        
                                                                    <Form.Row className={'d-flex justify-content-between mt-2'}>
                    
                                                                    <div className={'d-flex justify-content-end'}>
                                                                        <Button className={'round btn-gradient-blue '} type="submit">
                                                                            {this.state.loading ? <ButtonLoader/>  : "Update KYC"}
                                                                        </Button>
                                                                    </div>

                                                                </Form.Row>
                                                                </Form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="card curved-radius" >
                                                        <div className="card-header">
                                                            <h4 className="card-title"
                                                                id="basic-layout-colored-form-control">
                                                                Identification</h4>
                                                            <a className="heading-elements-toggle"><i
                                                                className="la la-ellipsis-v font-medium-3"></i></a>
                                                            <div className="heading-elements">
                                                                <ul className="list-inline mb-0">
                                                                    <li><a data-action="collapse"><i
                                                                        className="ft-plus"></i></a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="card-content " >
                                                            <div className="card-body px-5">
                                                                <form className="form lock-form">
                                                                    <div className="form-body">
                                                                        <div className="row">
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="identification">Identification
                                                                                        Type - ID Type</label>
                                                                                    <select id="identification"
                                                                                            name="interested"
                                                                                            className="form-control">
                                                                                        <option value="none" selected=""
                                                                                                disabled="">Driver's
                                                                                            License
                                                                                        </option>
                                                                                        <option value="design">design
                                                                                        </option>
                                                                                        <option
                                                                                            value="development">development
                                                                                        </option>
                                                                                        <option
                                                                                            value="illustration">illustration
                                                                                        </option>
                                                                                        <option
                                                                                            value="branding">branding
                                                                                        </option>
                                                                                        <option value="video">video
                                                                                        </option>
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="userinput2">Identification
                                                                                        Number</label>
                                                                                    <input type="text" id="userinput2"
                                                                                           className="form-control "
                                                                                           placeholder="Company"
                                                                                           name="company"/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="userinput2">Identification
                                                                                        Number</label>
                                                                                    <input type="text" id="userinput2"
                                                                                           className="form-control "
                                                                                           placeholder="Company"
                                                                                           name="company"/>
                                                                                </div>
                                                                            </div>
                                                                            <div className=" col-md-12">

                                                                                <div className="form-group">
                                                                                    <div className="custom-file">
                                                                                        <input type="file"
                                                                                               className="custom-file-input"
                                                                                               id="inputGroupFile01"/>
                                                                                            <label
                                                                                                className="custom-file-label"
                                                                                                htmlFor="inputGroupFile01">Browse</label>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-6">

                                                                                <div className="form-group">
                                                                                    <label htmlFor="issuedate">Id Issue
                                                                                        Date</label>
                                                                                    <input type="date" id="issuedate"
                                                                                           className="form-control"
                                                                                           placeholder="Company Name"
                                                                                           name="company"/>
                                                                                </div>

                                                                            </div>
                                                                            <div className="col-md-6">

                                                                                <div className="form-group">
                                                                                    <label htmlFor="expirydate">Id
                                                                                        Expiry Date</label>
                                                                                    <input type="date" id="expirydate"
                                                                                           className="form-control"
                                                                                           placeholder="Company Name"
                                                                                           name="company"/>
                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-6">

                                                                                <div className="form-group">
                                                                                    <label>Please Re-Enter
                                                                                        Password</label>
                                                                                    <input className="form-control "
                                                                                           id="userinput7"
                                                                                           type="password"
                                                                                           placeholder="password"/>
                                                                                </div>
                                                                            </div>
                                                                        </div>


                                                                    </div>

                                                                    <div className="form-actions right">
                                                                        <button type="button"
                                                                                className="btn  btn-bg-shade-2 round px-3 py-1 ">
                                                                            Save
                                                                        </button>
                                                                    </div>
                                                                </form>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
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
export default KycSetting;