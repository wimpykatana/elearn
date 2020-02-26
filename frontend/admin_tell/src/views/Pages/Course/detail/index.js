import React, { Component } from 'react';
import { connect } from "react-redux";
import { getDetailCourse } from '../../../../thedux/action/courseAction';
import { getAllCategories, fetchChildCategory } from '../../../../thedux/action/categoryAction';
import config from '../../../../config/config.json';
import { Col, Input, FormText, Button } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import UploadContentVideo from '../../../Component/uploadContentVideo';
import UploadContentVideoPoster from '../../../Component/uploadContentVideoPoster';
import UploadDisplayImage from '../../../Component/uploadDisplayImage';
import socketIOClient from 'socket.io-client';

let categories = [];
// let childCategory = [];
// let displayChildCategory;
let displayParentCategory;
let categoryId;
let idContent;

class DetailCourse extends Component{

    constructor(props){
        super(props);

        this.state = {
            onEdit: false,
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
        this.props.dispatch(getDetailCourse(idContent));
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleInputSelectParent = this.handleInputSelectParent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.init = this.init.bind(this);
        this.toggleLogUpload = this.toggleLogUpload.bind(this);
        this.handleInputSelectStatus = this.handleInputSelectStatus.bind(this);

    }

    componentWillMount() {
        this.props.dispatch(getAllCategories());
    }

    handleClickEdit(){
        this.setState({
            isDisabledOn: !this.state.isDisabledOn
        });

        if(this.state.onEdit) {
            setTimeout(() => {
               this.setState({
                    isDisabledOn: true
                });
            }, 1000);
        }
    } 

    handleInputSelectParent(e){
        let value = e.target.value;
        let name = e.target.name;

        this.setState(
            prevState => ({
                [name]: value
            })
        );

        this.props.courses.detail.categoryId = value;
        
    }

    handleInputSelectStatus(e){
        let value = e.target.value;
        let name = e.target.name;

        this.setState(
            prevState => ({
                [name]: value
            })
        );

        this.props.courses.detail.active = value;
        
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

        this.props.courses.detail[name] = value;
    }

    handleSubmit(e){
        e.preventDefault();

        this.setState({
            isDisabledOn: !this.state.isDisabledOn
        });

        fetch(config.api+"/course/",{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.props.courses.detail._id,
                title: this.props.courses.detail.title,
                categoryId: (this.state.categoryId === 0) ? this.props.courses.detail.categoryId : this.state.categoryId,
                categoryName: this.props.courses.detail.categoryName,
                contributorName: this.props.courses.detail.contributorName,
                description: this.props.courses.detail.description,
                enrolled: this.props.courses.detail.enrolled,
                level: this.props.courses.detail.level,
                objective: this.props.courses.detail.objective,
                ratings: this.props.courses.detail.ratings,
                subCategory: this.props.courses.detail.subCategory,
                subCategoryName: this.props.courses.detail.subCategoryName,
                language: this.props.courses.detail.language,
                timeVideo: this.props.courses.detail.timeVideo,
                active: this.props.courses.detail.active,
                video: this.props.courses.detail.video,
                imagePreview: this.props.courses.detail.imagePreview,
                displayImage: this.props.courses.detail.displayImage
            })
        })
    }

    toggleLogUpload() {
        this.setState((prevSate) => ({
            popupLog: !prevSate.popupLog
        }))
    }

    init(){
        categories = this.props.category.data;

        if(categories) {
            displayParentCategory = categories.map((item, index) => (
                    <option
                        data-name={item.name}
                        value={item._id} 
                        key={index} >
                            {item.name}
                    </option>
                )
            );
        }
    }
    componentDidUpdate() {
        const socket = socketIOClient(config.socket_host, {
            transports: [ 'websocket' ],
            upgrade: false
        });

        if(this.props.courses.detail) {
            socket.on('onedit'+this.props.courses.detail._id, (col) => {
                if(!this.state.onEdit) {
                    this.setState({
                        onEdit: true
                    });
                }
            });
        }
    }

    render(){
        this.init();

        if(this.props.courses.detail){
            categoryId = this.props.courses.detail.categoryId;

            return (
                <div className="animated fadeIn" style={{opacity: (this.state.onEdit) ? "0.5" : 1}}>
                    {/* EDIT ON OFF */}
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <Col xs="12" md="4" >
                                    <div className="row">
                                        <Col xs='6'>
                                            <b>Edit Course</b>
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
                        <UploadContentVideo 
                            popupLog={this.toggleLogUpload}
                            editContent={ this.state.isDisabledOn ? true : false }
                        />
                        <UploadContentVideoPoster
                            editContent={ this.state.isDisabledOn ? true : false }
                        />
                        <UploadDisplayImage
                            editContent={ this.state.isDisabledOn ? true : false }
                        />
                    </div>

                    {/* DETAIL CONTENT EDIT */}
                    <div className="card">
                        <div className="card-header">
                            Courses Detail
                        </div>
                        <div className="card-body">
                            <div className="bd-example">
                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Unique Id</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            {this.props.courses.detail._id}
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Title</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="text" id="title" name="title" value={this.props.courses.detail.title} onChange={this.handleInput} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Language</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="text" id="language" name="language" value={this.props.courses.detail.language} onChange={this.handleInput} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Video Time</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="text" id="timeVideo" name="timeVideo" value={this.props.courses.detail.timeVideo} onChange={this.handleInput} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Ratings</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="text" id="ratings" name="ratings" value={this.props.courses.detail.ratings} onChange={this.handleInput} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Status</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <div className="row">
                                                <Col xs="6">
                                                    <Input type="select" name="active" onChange={this.handleInputSelectStatus} value={this.props.courses.detail.active} disabled={ this.state.isDisabledOn ? true : false } >
                                                        <option data-name="Aktif" value={true} key={this.props.courses.detail._id + "status"} >Aktif</option>
                                                        <option data-name="Non-Aktif" value={false} key={this.props.courses.detail._id + "status2"} >Non-Aktif</option>
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
                                    <dt className="col-sm-3">Category</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <div className="row">
                                                <Col xs="6">
                                                    <Input type="select" name="categoryId" onChange={this.handleInputSelectParent} value={this.props.courses.detail.categoryId} disabled={ this.state.isDisabledOn ? true : false } >
                                                        {
                                                            displayParentCategory
                                                        }
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
                                    <dt className="col-sm-3">Author</dt>
                                    <dd className="col-sm-9" style={{textTransform: "capitalize"}}>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="contributorName" name="contributorName" onChange={this.handleInput} value={this.props.courses.detail.contributorName} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Enrolled</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="text" id="enrolled" name="enrolled" onChange={this.handleInput} value={this.props.courses.detail.enrolled} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Level</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="text" id="level" name="level" onChange={this.handleInput} value={this.props.courses.detail.level} disabled={this.state.isDisabledOn ? true : false} />
                                            <FormText className="help-block">1 = beginner, 2 = intermediate, 3 = expert</FormText>
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Course Objective</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="textarea" name="objective" id="objective" rows="9" onChange={this.handleInput}  value={this.props.courses.detail.objective} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Course Description</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="textarea" name="description" id="description" rows="9" onChange={this.handleInput} value={this.props.courses.detail.description} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <Col xs="12" md={{ size: 4, order: 2, offset: 4 }}>
                                    <div className="d-flex justify-content-center">
                                        <Button onClick={this.handleSubmit} color="primary" disabled={this.state.isDisabledOn ? true : false} hidden={this.state.isDisabledOn ? true : false}>UPDATE</Button>
                                    </div>
                                </Col>
                                
                            </div>
                        </div>
                </div>
                </div>
        )}

        return(
            <div>Loading..</div>   
        )
    }
}

const mapStateToProps = state => ({
    courses: state.courses,
    category: state.category,
    me: state.me
});


export default connect(mapStateToProps)(DetailCourse);