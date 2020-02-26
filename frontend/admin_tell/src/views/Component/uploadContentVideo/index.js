import React, { Component } from 'react';
import { connect } from "react-redux";
import { Col,Button, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Progress} from 'reactstrap';
import { uploadVideo } from '../../../thedux/action/courseAction';
import config from '../../../config/config.json';
import Player from '../video';

import socketIOClient from 'socket.io-client';
let msg;

class UploadContentVideo extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedFile: null,
            fileName: null,
            beginUpload: false,
            loaded: 0,
            open: false,
            finish: false
        }

        this.handleselectedFile = this.handleselectedFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.uploadIsSuccess = this.uploadIsSuccess.bind(this);
        this.closePopup = this.closePopup.bind(this)
        
    }

    handleselectedFile(event){
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    handleUpload(){
       
        const file = this.state.selectedFile;
        this.props.dispatch(uploadVideo(file, this.props.courses.detail));
        
    }

    uploadIsSuccess(){
        if(this.props.courses.upload.uploadIsSuccess) {
            this.props.courses.detail.video = this.props.courses.upload.file;

            return("Upload Success");
        }
    }

    closePopup() {
        this.setState({
            open: false
        });

        if(this.state.finish) {
            window.location.reload();
        }
    }

    componentDidUpdate() {
        // for listent event socket
        if(this.props.me) {
            const user = this.props.me;
            const socket = socketIOClient(config.socket_host, {
                transports: [ 'websocket' ],
                upgrade: false
            });
    
            socket.on('uploadCompress_'+this.props.courses.detail._id+'_'+user._id, (col) => {
                if(msg !== col) {
                    alert(col);
                    msg = col
                }
            });

            socket.on('log_'+this.props.courses.detail._id+'_'+user._id, (data) => {
                if(!this.state.open) {
                    this.setState({
                        open: true
                    });
                }
                
                var node = document.createElement("DIV");
                node.style.cssText = 'width:1200px';
                var textnode = document.createTextNode(data.message);
                node.appendChild(textnode);

                if(parseInt(data.progress) === 100){
                    this.setState({
                        finish:true,
                    });
                    document.getElementById('closeLog').style.display = 'block';
                }
                else {
                    document.getElementById('closeLog').style.display = 'none';
                }

                var dom = document.getElementById("logCompress");
                var progress = document.getElementById("convertProgress");

                if(dom) {
                    dom.insertBefore(node, dom.childNodes[0]);
                }

                if(progress) {
                    progress.children[0].style.width=data.progress+"%";
                    progress.children[0].textContent=data.progress+"%";
                }
            })
        }
    }

    render() {
        return(
            <Col sm="4" >
                <Modal isOpen={this.state.open} backdrop={'static'} size="lg" className={"modal-lg "}>
                    <ModalHeader>Video Progress</ModalHeader>
                    <ModalBody>
                    <Progress id="convertProgress"
                        style={{marginTop: 20, marginBottom: 10}} 
                        value={this.props.courses.loaded} 
                        className="mb-3"
                        color="success"
                    >
                        0%
                    </Progress>
                    <div id="logCompress" style={{height:"450px", width:"100%", overflow:"scroll"}}></div>
                    </ModalBody>

                    <ModalFooter>
                        <Button style={{display:"none"}} color="secondary" id="closeLog" onClick={this.closePopup}>Close</Button>
                    </ModalFooter>
                </Modal>
                <div className="card">
                    <div className="card-header">
                        Upload Video
                    </div>
                    <div className="card-body">
                        <Player poster={`${config.static}/images/${this.props.courses.detail.imagePreview}`} source={`${config.api}/videos/${this.props.courses.detail.video}`}  />
                            <FormGroup row hidden={ this.props.editContent ? true : false } >
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
                                            <Button onClick={this.handleUpload} color="primary">Upload New Video</Button>
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