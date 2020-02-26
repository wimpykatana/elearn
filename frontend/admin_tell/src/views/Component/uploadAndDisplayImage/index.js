import React, { Component } from 'react';
import { connect } from "react-redux";
import { Col,Button,FormGroup,Progress } from 'reactstrap';
import { upload } from '../../../thedux/action/uploadAction';
import config from '../../../config/config.json'

class UploadAndDisplayImage extends Component{
    constructor(props){
        super(props)
        this.state = {
            error: false
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
        const file = this.state.selectedFile;
        const arrFile = (file) ? file.type.split("/") : '';

        if(file && arrFile[0] === 'image') {
            this.props.dispatch(upload(file, this.props.url, this.props.id, this.props.name));
            this.setState({selectedFile:'', error: false})
        }
        else {
            this.setState({error: true})
        }
    }

    uploadIsSuccess(){
        return("Upload Success");
    }

    render(){
        return(
            <Col sm="4" style={{opacity: (this.props.upload.start) ? "0.5" : 1}}>
                <div className="card">
                    <div className="card-header">
                        {this.props.imgName}
                    </div>
                    <div className="card-body">
                        <img style={{width: '100%'}} src={this.props.src} alt="preview-video" />
                        
                        <FormGroup row hidden={ this.props.edit } >
                            <Col xs="12" md="12">
                                <div className={(this.state.error) ? 'file-input-error':'file-input'}>
                                    <input type='file' name="file" onChange={this.handleselectedFile}/>
                                    <span className='button'>Choose</span>
                                    <span className='label' data-js-label>{this.state.selectedFile ? this.state.selectedFile.name : 'No file selected' }</span>

                                    <Progress   
                                        style={{marginTop: 20, marginBottom: 10}} 
                                        value={Math.round(this.props.upload.loaded,2) } 
                                        className="mb-3" 
                                        hidden={!this.props.upload.start} 
                                    >
                                        {Math.round(this.props.upload.loaded, 2) }%
                                    </Progress>

                                    <div style={{textAlign: 'center'}}> 
                                        <span style={{marginTop:12, display: 'block' }}>{ this.props.upload.loaded === 100 ? "Upload success"  : "" }</span>
                                    </div>
                                </div>

                                <Col xs="12">
                                    <Button disabled={this.props.upload.start} onClick={this.handleUpload} color="primary">{this.props.btnName}</Button>
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
    upload: state.upload
});

export default connect(mapStateToProps)(UploadAndDisplayImage);