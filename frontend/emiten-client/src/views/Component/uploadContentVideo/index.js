import React, { Component } from 'react';
import { connect } from "react-redux";
import { Col,Button,FormGroup,Progress } from 'reactstrap';
import { uploadVideo } from '../../../thedux/action/courseAction';
import videoFormat from '../../../config/videoFormat';
import Player from '../video';
import config from '../../../config/config.json';

class UploadContentVideo extends Component{
    constructor(props){
        super(props)

        this.state = {
            error_msg: '',
            selectedFile: null,
            fileName: null,
            beginUpload: false,
            loaded: 0
        }

        this.handleselectedFile = this.handleselectedFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.uploadIsSuccess = this.uploadIsSuccess.bind(this);
        
    }

    handleselectedFile(event) {
        const file = event.target.files[0];
        
        if(!file) {
            return;
        }

        const name = file.name;
        const arr = name.split(".");

        if(videoFormat.indexOf(arr[arr.length - 1]) < 0) {
            return this.setState({
                error_msg: 'Format video tidak dikenali',
                selectedFile: event.target.files[0]
            });
        }

        if(Math.floor(file.size / 1000000) > 600) {
            return this.setState({
                error_msg: 'Ukuran video terlalu besar',
                selectedFile: event.target.files[0]
            });
        }
        
        return this.setState({
            error_msg: null,
            selectedFile: event.target.files[0],
            loaded: 0,
        });
    }

    handleUpload(e) {
        const file = this.state.selectedFile;
        
        // blocking submit if error
        if(this.state.error_msg) {
            return;
        }

        if(!this.props.courses.upload.beginUpload && file) {
            this.props.dispatch(uploadVideo(file, this.props.me));
        }
  
    }

    uploadIsSuccess(){
        if(this.props.courses.upload.uploadIsSuccess) {
            /// this.props.courses.data.content.video = this.props.courses.upload.file;
            return("Upload Success");
        }
    }

    render(){
        return(
            <Col sm="4">
                <div className="card">
                    <div className="card-header">
                        Video Preview
                    </div>

                    <div className="card-body">
                        <span className="text-danger">{this.state.error_msg}</span>
                        <FormGroup row>
                            <Col xs="12" md="12">
                                <div className='file-input'>
                                    <input type='file' name="file" onChange={this.handleselectedFile}/>
                                    <span className='button'>Choose</span>
                                    <span className='label' data-js-label>{this.state.selectedFile ? this.state.selectedFile.name : 'No file selected' }</span>
                                                
                                    <Progress   
                                        style={{marginTop: 20, marginBottom: 10}} 
                                        value={Math.round(this.props.courses.upload.loaded,2) } 
                                        className="mb-3" 
                                        hidden={ this.props.courses.upload.beginUpload ? false : true} 
                                    >
                                        {Math.round(this.props.courses.upload.loaded,2) }%
                                    </Progress>
                                                
                                    <div style={{textAlign: 'center'}}> 
                                        <span style={{marginTop:12, display: 'block' }}>{ this.props.courses.upload.uploadIsSuccess ? this.uploadIsSuccess()  : "" }</span>
                                    </div>
                                </div>

                                    <Col xs="12">
                                        <Button onClick={this.handleUpload} className={(this.props.courses.upload.beginUpload || this.state.error_msg) ? 'disabled' : ''} color="primary">Upload New Video</Button>
                                    </Col>

                            </Col>

                        </FormGroup>
                    </div>
                </div>
            </Col>
        )
    }

}

const mapStateToProps = state => ({
    courses: state.courses,
    me: state.me
});

export default connect(mapStateToProps)(UploadContentVideo);