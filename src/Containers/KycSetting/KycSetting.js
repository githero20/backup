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
import {request,multipartrequest} from "../../ApiUtils/ApiUtils";
import {GetUserKYC} from "../../RouteLinks/RouteLinks";
import {withToastManager,ToastProvider} from "react-toast-notifications";

let formData = new FormData();

class KycSetting extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            loading:false,
            form: {
                maiden_name:"",
                password:"",
                address:"",
                relationship_status:"single",
                employment_status:"student",
                end_year_amount:"less_than50000",
                id:"",
                date_of_birth: this.getTodayDate(),
                identification_type:"InternationalPassport",
                identification_type_number:"",
                issue_date:this.getTodayDate(),
                expiry_date:this.getTodayDate(),
                edit :0,
                gender: "male"
            }
        };
        this.validator = new SimpleReactValidator();

       this.validateForm = this.validateForm.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.handleKyc = this.handleKyc.bind(this);
       this.handleStoreKyc =  this.handleStoreKyc.bind(this);
    }
    getTodayDate(){
        var today = new Date();
        var date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate(); 
        return date;   
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
        _handleFormChange(e.target.name,e, this)
    }
    
    handleFileChange(e){
        console.log("files");
        console.log(e);
        const file = e.target.files[0];
        formData.append("identification_type_picture_url", file)
           
}

    componentWillMount() {
        this.getUserKyc();
    }
    toastMessage(message,status){
        const { toastManager } = this.props;
        toastManager.add(message, {
            appearance: status,
            autoDismiss: true,
            pauseOnHover: false,
          })
    }

    storeUserKyc(){
        const {form} = this.state;
        for (var k in form){
            if (form.hasOwnProperty(k)) {
            formData.append(k,form[k])
            }
        }
        multipartrequest(GetUserKYC,formData,true,'POST',this.handleStoreKyc)
    }
    getUserKyc(){
        request(GetUserKYC, null, true, 'GET', this.handleKyc);
    }
    handleKyc(status,result){
    
        if(status){
            try{
                if(result.data.edit == "1"){
                    let {form} = this.state;
                    form = result.data.data;
                    form.edit = result.data.edit;
                    this.setState({form});
                
                }
            }catch(e){
                console.log("err",e);
            }
            
        }
        else{
        console.log(status);
        console.log(result);
        }

    }
    handleStoreKyc(status,result){
        console.log(status);
        console.log(result);
        if(status){
            this.toastMessage("Kyc Updated","success")
        }else{
            if(result.data.status == "failed"){
                //password mismatch
                this.toastMessage(result.data.message,"error");
            }
        }
        this.setState({loading:false});
        
    }

    render() {
        return (
        
            <React.Fragment>
        <ToastProvider>
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
                                         <Form className="form lock-form" onSubmit={this.validateForm} encType="multipart/form-data">
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
                                                            
       
                                                               
                                                                    <div className="form-body">
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                          <Form.Group controlId="kycForm.gender">
                                                                                                <Form.Label>Gender</Form.Label>
                                                                                                <Form.Control as="select" name="gender"  value={this.state.form.gender} onChange={this.handleChange} className="form-control">
                                                                                                <option value ="male" >Male</option>
                                                                                                <option value="female">Female</option>
                                                    
                                                                                            </Form.Control>
                                                                                            </Form.Group>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                <Form.Group controlId="kycForm.relationship">
                                                                                                <Form.Label>Relationship</Form.Label>
                                                                                                <Form.Control as="select" name="relationship_status" onChange={this.handleChange} value={this.state.form.relationship_status} className="form-control">
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
                                                                                <Form.Group controlId="kycForm.employment_status">
                                                                                                <Form.Label>Employment Status</Form.Label>
                                                                                                <Form.Control as="select" name="employment_status" onChange={this.handleChange} value={this.state.form.employment_status} className="form-control">
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
                                                                                <Form.Group controlId="kycForm.end_year_amount">
                                                                                                <Form.Label>Annual Income</Form.Label>
                                                                                                <Form.Control as="select" name="end_year_amount" onChange={this.handleChange} value={this.state.form.end_year_amount} className="form-control">
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
                                                                                           placeholder="" 
                                                                                           value={this.state.form.date_of_birth}
                                                                                           onChange={this.handleChange}
                                                                                           name="date_of_birth"
                                                                                           required
                                                                                        />
                                                                                </div>

                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                <Form.Group controlId="kycForm.address">
                                                                                        <Form.Label>Address</Form.Label>
                                                                                        <Form.Control name="address" as="textarea" value={this.state.form.address} rows="3" onChange={this.handleChange}/>
                                                                                        </Form.Group>
                                                                                        {this.validator.message("address",this.state.form.address,"required")}
                                                                              </div>
                                                                            </div>



                                                                        </div>


                                                                    </div>

                        
                                                               
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
                                                                                <Form.Group controlId="kycForm.identification_type">
                                                                                                <Form.Label>Identification
                                                                                        Type - ID Type</Form.Label>
                
                                                                                                <Form.Control as="select" name="identification_type"  onChange={this.handleChange} className="form-control">
                                                                                                <option value="InternationalPassport">International Passport</option>
                                                                                                <option value="Driver'sLicence">Driver's Licence</option>
                                                                                                <option value="NationalIdCard">National Id Card</option>
                                                                                                <option value="PermanentVotersCard">Permanent Voters Card</option>
                                                                                            </Form.Control>
                                                                                            </Form.Group>
                                                                        
                                                                                </div>
                                                                            </div>
                                                                           
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                <Form.Group controlId="kycForm.password">
                                                                                    <Form.Label>Identification
                                                                                        Number</Form.Label>
                                                                                    <Form.Control name = "identification_type_number" type="number" onChange={this.handleChange} value={this.state.form.identification_type_number} placeholder="e.g 1234456765" />
                                                                                </Form.Group>
                                                                                {this.validator.message("identification_type_number",this.state.form.identification_type_number,"required")}
                                                                                    
                                                                                </div>
                                                                            </div>
                                                                            <div className=" col-md-12">
                                                                            

                                                                                <div className="form-group">
                                                                                <Form.Group controlId="kycForm.password">
                                                                                    <Form.Label>Identification
                                                                                        File</Form.Label>
        
                                                                                </Form.Group>
                                                                                    <input type ="file"
                                                                                                onChange={this.handleFileChange} name = "identification_type_picture_url" required/>
                                                                                    {/* <div className="custom-file1"> 
                                                                                        <input type="file"
                                                    
                                                                                                onChange={this.handleFileChange}
                                                                                                 className="custom-file-input"
                                                                                               name = "identification_type_picture_url"
                                                                                               id="inputGroupFile01" required/> 
                                                                                            <label
                                                                                                className="custom-file-label"
                                                                                                htmlFor="inputGroupFile01">Browse</label> 
                                                                                   </div> */}
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
                                                                                           placeholder=""
                                                                                           value={this.state.form.issue_date}
                                                                                           onChange={this.handleChange}
                                                                                           name="issue_date" required/>
                                                                                </div>

                                                                            </div>
                                                                            <div className="col-md-6">

                                                                                <div className="form-group">
                                                                                    <label htmlFor="expirydate">Id
                                                                                        Expiry Date</label>
                                                                                    <input type="date" id="expirydate"
                                                                                        value={this.state.form.expiry_date}
                                                                                        onChange={this.handleChange}
                                                                                           className="form-control"
                                                                                           placeholder=""
                                                                                           name="expiry_date" required/>
                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-6">

                                                                                <div className="form-group">
                                                                                <Form.Group controlId="kycForm.password">
                                                                                    <Form.Label>Please Re-Enter
                                                                                        Password</Form.Label>
                                                                                    <Form.Control name = "password" value={this.state.form.password} onChange={this.handleChange} type="password" placeholder="******" />
                                                                                </Form.Group>
                                                                                {this.validator.message("password",this.state.form.password,"required")}
                                                                                
                                                                                </div>
                                                                            </div>
                                                                        </div>


                                                                    </div>

                                                                    <div className="form-actions left">

                                                                    <Form.Row className={'d-flex justify-content-end mt-2'}>
                    
                                                                       
                                                                            <Button className={'blue-round-btn auth-btn'} type="submit">
                                                                                {this.state.loading ? <ButtonLoader/>  : "Update KYC"}
                                                                            </Button>
                                                                        

                                                                    </Form.Row>
                                                                        
                                                                    </div>
                                                                </form>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                         </Form>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                </ToastProvider>
            </React.Fragment>
        );
    }
}

export default withToastManager(KycSetting);