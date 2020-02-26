import React, { Component } from 'react';
import { connect } from "react-redux";
import { Col,Button,FormGroup,Progress } from 'reactstrap';
import config from '../../../config/config.json';
import {uploadVideoPoster} from '../../../thedux/action/courseAction';

class UploadContentVideoPoster extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedFile: null,
            fileName: null,
            beginUpload: false,
            loaded: 0
        }

        this.handleselectedFile = this.handleselectedFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.uploadIsSuccess = this.uploadIsSuccess.bind(this);
    }

    handleselectedFile(event){
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    handleUpload(){
        const file = this.state.selectedFile
        this.props.dispatch(uploadVideoPoster(file));
        
    }

    uploadIsSuccess(){
        if(this.props.courses.poster.uploadIsSuccess){
            this.props.courses.data.content.imagePreview = this.props.courses.poster.file;
            

            return("Upload Success");
        }
    }

    render(){
        return(
            <Col sm="4">
               <div className="card">
                    <div className="card-header">
                        Image Video Poster
                    </div>
                    <div className="card-body">
                        <img style={{width: '100%'}} src={`${config.static}/images/${this.props.courses.data.content.imagePreview}`} alt="preview-video" />

                        <FormGroup row hidden={ this.props.editContent ? true : false } >
                            <Col xs="12" md="12">
                                <div className='file-input'>
                                    <input type='file' name="file" onChange={this.handleselectedFile}/>
                                    <span className='button'>Choose</span>
                                    <span className='label' data-js-label>{this.state.selectedFile ? this.state.selectedFile.name : 'No file selected' }</span>
                                                    
                                    <Progress   
                                        style={{marginTop: 20, marginBottom: 10}} 
                                        value={Math.round(this.props.courses.poster.loaded,2) } 
                                        className="mb-3" 
                                        hidden={ this.props.courses.poster.beginUpload? false : true} 
                                    >
                                        {Math.round(this.props.courses.poster.loaded,2) }%
                                    </Progress>
                                                   
                                    <div style={{textAlign: 'center'}}> 
                                        <span style={{marginTop:12, display: 'block' }}>{ this.props.courses.poster.uploadIsSuccess ? this.uploadIsSuccess()  : "" }</span>
                                    </div>
                                </div>

                                <Col xs="12">
                                    <Button onClick={this.handleUpload} color="primary">Upload New Poster</Button>
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
    courses: state.courses
});

export default connect(mapStateToProps)(UploadContentVideoPoster);