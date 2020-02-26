import React, { Component } from 'react';
import { connect } from "react-redux";
import { Col, Input, Button, Modal, ModalBody, ModalFooter, ModalHeader, Progress} from 'reactstrap';
import socketIOClient from 'socket.io-client';
import config from '../../../../config/config.json'
let displayParentCategory;
let msg;
class AddCoursePopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal:false
        }
    }

    render() {
        const category = this.props.category.data;

        if(category) {
            displayParentCategory = category.map((item) => {
                return (
                    <option data-name={item.name} value={item._id} key={item._id}>{item.name}</option>
                )
            });
        }

        if(this.props.me) {
            const user = this.props.me;
            const socket = socketIOClient(config.socket_host, {
                transports: [ 'websocket' ],
                upgrade: false
            });
    
            socket.on('log upload_'+this.props.stateValue.video.name+'_'+user._id, (data) => {
                document.getElementById('progressOne').style.display = 'none';
                var dom = document.getElementById("logUploadCompress");
                var progress = document.getElementById("progressTwo");
                var title = document.getElementById("titlePropgress");

                var node = document.createElement("DIV");
                node.style.cssText = 'width:1200px';
                var textnode = document.createTextNode(data.message);
                node.appendChild(textnode);

                if(parseInt(data.progress) === 100){
                    document.getElementById('uploadClose').style.display = 'block';
                }
                else {
                    document.getElementById('uploadClose').style.display = 'none';
                }

                if(dom) {
                    dom.style.display = 'block';
                    dom.insertBefore(node, dom.childNodes[0]);
                }

                if(progress) {
                    progress.style.display = 'block';
                    progress.children[0].style.width=data.progress+"%";
                    progress.children[0].textContent=data.progress+"%";
                }

                if(title){
                    title.textContent="Convert Video on Progress";

                    if(parseInt(data.progress) === 100){
                        title.textContent="Convert Video Done";
                    }
                }
            });

            socket.on('uploadCompress_'+this.props.stateValue.video.name+'_'+user._id, (col) => {
                console.log(msg, col)
                if(msg !== col) {
                    alert(col);
                    msg = col
                }
            });
        }

        return (
            <Modal isOpen={this.props.stateValue.modal} backdrop={'static'} toggle={this.toggle} className={"modal-lg "+this.props.className}>
                <ModalHeader><div id="titlePropgress">Preview Content</div></ModalHeader>
                <ModalBody>
                    <Progress
                        id="progressOne"
                        style={{marginTop: 20, marginBottom: 10}} 
                        value={this.props.courses.loaded} 
                        className="mb-3" 
                        hidden={!this.props.courses.loaded} 
                    >
                        {Math.round(this.props.courses.loaded)} %
                    </Progress>

                    <Progress   
                        style={{marginTop: 20, marginBottom: 10, display:'none'}} 
                        id="progressTwo"
                        className="mb-3" 
                        color="success"
                    >
                        {Math.round(this.props.courses.loaded)} %
                    </Progress>

                    <div className="card-body" style={{display: (this.props.courses.loaded) ? 'none' : ''}}>
                        <div className="bd-example">
                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Title</dt>
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <Input type="text" id="title" name="title" className={this.props.stateValue.clsTitle} value={this.props.stateValue.content.title} disabled={true} />
                                    </Col>
                                </dd>
                            </dl>

                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Language</dt>
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <Input type="text" id="language" name="language" value={this.props.stateValue.content.language} disabled={true}/>
                                    </Col>
                                </dd>
                            </dl>

                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Category</dt>
                                
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <div className="row">
                                            <Col xs="12">
                                                <Input type="select" id="addCategorySelect" name="categoryId" value={this.props.stateValue.content.categoryId} disabled= {true} >
                                                    {
                                                        displayParentCategory
                                                    }
                                                </Input>
                                            </Col>
                                        </div>
                                    </Col>
                                </dd>
                            </dl>
                                
                                
                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Author</dt>
                                <dd className="col-sm-9" style={{textTransform: "capitalize"}}>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="contributorName" name="author" className={this.props.stateValue.clsAuthor} value={this.props.stateValue.content.author} disabled={true}/>
                                    </Col>
                                </dd>
                            </dl>


                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Level</dt>
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <Input type="select" id="level" name="level" value={this.props.stateValue.content.level} disabled={true}> 
                                            <option value="1">Beginner</option>
                                            <option value="2">Intermediate</option>
                                            <option value="3">Expert</option>
                                        </Input>
                                    </Col>
                                </dd>
                            </dl>

                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Course Objective</dt>
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <Input type="textarea" name="objective" className={this.props.stateValue.clsObjective} id="objective" rows="9" value={this.props.stateValue.content.objective} disabled={true} />
                                    </Col>
                                </dd>
                            </dl>

                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Course Description</dt>
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <Input type="textarea" name="description" className={this.props.stateValue.clsDescription} rows="9" value={this.props.stateValue.content.description} disabled={true} />
                                    </Col>
                                </dd>
                            </dl>
                        </div>
                    </div>

                    <div id="logUploadCompress" style={{height:"450px", width:"100%", display:"none",overflow:"scroll"}}></div>
                 </ModalBody>
                <ModalFooter>
                    <Button style={{display:(this.props.courses.loaded) ? 'none' : ''}} color="primary" onClick={this.props.submit}>Submit</Button>
                    <Button id="uploadClose" style={{display:(this.props.courses.loaded && this.props.courses.loaded < 100) ? 'none' : ''}} color="secondary" onClick={this.props.toggle}>{(this.props.courses.loaded) ? 'Close' : 'Cancel'}</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    courses: state.courses,
    category: state.category,
    me: state.me
});


export default connect(mapStateToProps)(AddCoursePopup);
