import React, { Component } from 'react';
import { connect } from "react-redux";
import { getDetailCourse} from '../../../../thedux/action/courseAction';
import { categoryById , editCategory} from '../../../../thedux/action/categoryAction';
import config from '../../../../config/config.json';
import { Col, Input, Button, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import UploadAndDisplayImage from '../../../Component/uploadAndDisplayImage';

let idContent

class DetailCategory extends Component {
    constructor(props){
        super(props);

        this.state = {
            isDisabledOn: true,
            selectedFile: null,
            fileName: null,
            beginUpload: false,
            uploadIsSuccess: '',
            loaded: 0,
            categoryId:0,
            active:true,
            popupLog: false,
        }

        idContent = this.props.match.params.id;
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleLogUpload = this.toggleLogUpload.bind(this);
        this.handleInputSelectStatus = this.handleInputSelectStatus.bind(this);

    }

    componentWillMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(categoryById(id));
    }

    handleClickEdit(){
        this.setState({
            isDisabledOn: !this.state.isDisabledOn
        });
    } 

    handleInputSelectStatus(e){
        let value = e.target.value;
        let name = e.target.name;

        this.setState(
            prevState => ({
                [name]: value
            })
        );

        this.props.category.detail.type = value;
        
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
          prevState => ({
            user: {
              ...prevState.user,
              [name]: value
            }
          })
        );

        this.props.category.detail[name] = value;
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            isDisabledOn: !this.state.isDisabledOn
        });
        
        this.props.dispatch(editCategory(this.props.category.detail))
    }

    toggleLogUpload() {
        this.setState((prevSate) => ({
            popupLog: !prevSate.popupLog
        }))
    }

    render() {
        if(this.props.category.detailStart)   {
           return (<div>Loading..</div>)
        }

        if(this.props.category.detail) {

            return (
                <div className="animated fadeIn">
                    <Modal isOpen={this.state.popupLog} backdrop={'static'} size="lg" className={"modal-lg "}>
                        <ModalHeader>Video Progress</ModalHeader>
                        <ModalBody>
                        <Progress id="convertProgress"
                            style={{marginTop: 20, marginBottom: 10}} 
                            value={(this.props.upload.data) ? this.props.upload.loaded : ""} 
                            className="mb-3"
                            color="success"
                        >
                            0%
                        </Progress>
                           <div id="logCompress" style={{height:"450px", width:"100%", overflow:"scroll"}}></div>
                        </ModalBody>

                        <ModalFooter>
                            <Button style={{display:"none"}} color="secondary" id="closeLog" onClick={this.toggleLogUpload}>Close</Button>
                        </ModalFooter>
                    </Modal>
                    {/* EDIT ON OFF */}
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <Col xs="12" md="4" >
                                    <div className="row">
                                        <Col xs='6'>
                                            <b>Edit Category</b>
                                        </Col>
                                        <Col xs='6'>
                                            <AppSwitch onClick={this.handleClickEdit} className={'mx-1'} color={'primary'} outline={'alt'} label checked={this.state.isDisabledOn ? false : true} />
                                        </Col>
                                    </div>
                                </Col>
                                
                            </div>
                        </div>
                    </div>

                    {/* VIDEO & IMAGE CONTENT EDIT */}
                    <div className="row">
                        <UploadAndDisplayImage 
                            url={"category/upload"}
                            id={this.props.category.detail._id}
                            edit={this.state.isDisabledOn} 
                            btnName={"Upload Banner"} imgName={"Image Banner"} 
                            src={`${config.static}/images/${this.props.category.detail.banner}`}/>
                    </div>

                    {/* DETAIL CONTENT EDIT */}
                    <div className="card">
                        <div className="card-header">
                            category Detail
                        </div>
                        <div className="card-body">
                            <div className="bd-example">
                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Unique Id</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            {this.props.category.detail._id}
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Name</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="text" id="title" name="name" value={this.props.category.detail.name} onChange={this.handleInput} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Type</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <div className="row">
                                                <Col xs="6">
                                                    <Input type="select" name="type" onChange={this.handleInputSelectStatus} value={this.props.category.detail.type} disabled={ this.state.isDisabledOn ? true : false } >
                                                        <option data-name="Aktif" value={"main"} key={this.props.category.detail._id + "status"} >Main</option>
                                                        <option data-name="Non-Aktif" value={"non-main"} key={this.props.category.detail._id + "status2"} >Non-Main</option>
                                                    </Input>
                                                </Col>
                                                {/* <Col xs="6">
                                                    <Input type="select" name="subCategory" onChange={this.handleInputSelectChild}  value={this.props.courses.detail.subCategory} disabled={ this.state.isDisabledOn ? true : false } >
                                                        {
                                                            displayChildCategory
                                                        }
                                                    </Input>
                                                </Col> */}
                                            </div>
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Description</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="textarea" name="description" id="description" rows="9" onChange={this.handleInput} value={this.props.category.detail.description} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <Col xs="12" md={{ size: 4, order: 2, offset: 4 }}>
                                    <div className="d-flex justify-content-center">
                                        <Button onClick={this.handleSubmit} color="primary" disabled={this.state.isDisabledOn} hidden={this.state.isDisabledOn}>UPDATE</Button>
                                    </div>
                                </Col>
                                
                            </div>
                        </div>
                </div>
                </div>
        )}
    }
}

const mapStateToProps = state => ({
    category: state.category,
    upload: state.upload,
    me: state.me
});


export default connect(mapStateToProps)(DetailCategory);