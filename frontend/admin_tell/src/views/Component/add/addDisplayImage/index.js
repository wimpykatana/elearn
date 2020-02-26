import React, { Component } from 'react';
import { connect } from "react-redux";
import { Col,Button,FormGroup,Progress } from 'reactstrap';
import { uploadDisplayImage } from '../../../../thedux/action/courseAction';

class UploadDisplayImage extends Component{
    constructor(props){
        super(props)
        this.state = {

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
        this.props.dispatch(uploadDisplayImage(file));
        
    }

    uploadIsSuccess(){
        if(this.props.courses.display.uploadIsSuccess){
            

            return(`Upload Success ${this.props.courses.display.file}`);
        }
    }

    render(){
        return(
            <Col sm="4">
                <div className="card">
                    <div className="card-header">
                        Upload Display Image
                    </div>
                    <div className="card-body">
                        
                        <FormGroup row hidden={ this.props.editContent ? true : false } >
                            <Col xs="12" md="12">
                                <div className='file-input'>
                                    <input type='file' name="file" onChange={this.handleselectedFile}/>
                                    <span className='button'>Choose</span>
                                    <span className='label' data-js-label>{this.state.selectedFile ? this.state.selectedFile.name : 'No file selected' }</span>

                                    <Progress   
                                        style={{marginTop: 20, marginBottom: 10}} 
                                        value={Math.round(this.props.courses.display.loaded,2) } 
                                        className="mb-3" 
                                        hidden={ this.props.courses.display.beginUpload? false : true} 
                                    >
                                        {Math.round(this.props.courses.display.loaded,2) }%
                                    </Progress>

                                    <div style={{textAlign: 'center'}}> 
                                        <span style={{marginTop:12, display: 'block' }}>{ this.props.courses.display.uploadIsSuccess ? this.uploadIsSuccess()  : "" }</span>
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

export default connect(mapStateToProps)(UploadDisplayImage);