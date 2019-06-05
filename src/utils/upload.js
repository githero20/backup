import React, {Component} from 'react';
import {_setState, Loading} from '../utils';
import Dropzone from 'react-dropzone';
import {connect} from "react-redux";
import {uploadImage} from "../actions";


class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            image: null,
            loading: false,
        };
        this.uploadImage = this.uploadImage.bind(this);
    }

    onDrop(files) {
        this.setState({
            files: files.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        });
    }
    
    onCancel() {
        this.setState({
            files: []
        });
    }

    componentWillReceiveProps(nextProps) {
        let error = {};
        let success = {};
        error.message = nextProps.uploadError;   
        success.message = nextProps.uploadSuccess;        
        if (this.props.uploadError !== nextProps.uploadError) {
            this.setState({ error });
        }
        if (this.props.uploadSuccess !== nextProps.uploadSuccess) {
            this.setState({ success });
        }
    }

    uploadImage(e) {
        e.preventDefault();
        let file = this.state.files[0];
        _setState("loading", true, this);
        if(file) {
            let formData = new FormData();
            formData.append('file', file);
            return this.props.uploadImage({ formData , token: this.props.token }).then(() => {
                setTimeout( () => { _setState("loading", false, this); }, 1000);   
            }).catch(() => {
                setTimeout( () => { _setState("loading", false, this); }, 1000);
            });
        }
    }

    componentWillUnmount() {
      this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
    }
      
    render() {
        const {files} = this.state;
        const dropzoneRef = React.createRef();
        
        return (
            <>
                <div className="col">
                    <div className="image-dropzone">
                        {this.state.files.length !== 0 ? 
                            <>
                                <img src={files[0].preview} alt="avatar" className="img-preview" />
                                <p>Click on next to submit your picture</p>
                            </> :
                            <Dropzone
                                multiple={false}
                                accept="image/*"
                                ref={dropzoneRef}
                                onDrop={this.onDrop.bind(this)}
                                onFileDialogCancel={this.onCancel.bind(this)}
                                disableClick
                            >
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()}>
                                        <img src={this.props.avatarUrl} alt="avatar" style={{ width: 'inherit' }} />
                                        <input {...getInputProps()} />
                                        <p>Click to select picture for your device or <br /> Drag and Drop</p>

                                        <button className="btn border" type="button" onClick={() => dropzoneRef.current.open()}>
                                            Choose Picture
                                        </button>
                                    </div>
                                )}
                            </Dropzone>
                        }
                    </div>
                </div>
                <div className="col">
                    {this.state.loading && <><Loading isSpinning={this.state.loading} /><br /></>}
                    {!this.state.loading && <button type="submit" onClick={this.uploadImage} className="btn-1 btn-primary btn pointer">NEXT</button>}
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    const { token } = state.auth;
    const { uploadError, uploadSuccess } = state.utils;
    return { uploadError, token, uploadSuccess };
  };
  
export default connect(
    mapStateToProps,
    { uploadImage }
)(Upload);