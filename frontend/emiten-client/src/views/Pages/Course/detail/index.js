import React, { Component } from 'react';
import { connect } from "react-redux";
import { getDetailCourse } from '../../../../thedux/action/courseAction';
import { fetchAllParentCategory,fetchChildCategory } from '../../../../thedux/action/categoryAction';
import config from '../../../../config/config.json';
import { Col, Input, FormText,Button } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import UploadContentVideo from '../../../Component/uploadContentVideo';
import UploadContentVideoPoster from '../../../Component/uploadContentVideoPoster';
import UploadDisplayImage from '../../../Component/uploadDisplayImage';

let parentCategory = [];
let childCategory = [];
let displayChildCategory;
let displayParentCategory;
let parentCategoryId;
let idContent;

class DetailCourse extends Component{

    constructor(props){
        super(props);

        this.state = {
            isDisabledOn: true,
            selectedFile: null,
            fileName: null,
            beginUpload: false,
            uploadIsSuccess: '',
            loaded: 0
        }

        idContent = this.props.match.params.id;
        //this.props.dispatch(getDetailCourse(idContent));
        this.getCategory();

        this.getChildCategory = this.getChildCategory.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleInputSelectParent = this.handleInputSelectParent.bind(this);
        this.handleInputSelectChild = this.handleInputSelectChild.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.init = this.init.bind(this);

    }

    getCategory(){

        this.props.dispatch(fetchAllParentCategory());

        setTimeout(() => {
            this.props.dispatch(fetchChildCategory(parentCategoryId));
        }, 500)
    }

    handleClickEdit(){
        this.setState({
            isDisabledOn: !this.state.isDisabledOn
        });
    } 

    handleInputSelectParent(e){
        let value = e.target.value;
        let name = e.target.name;
        let dataName = e.target[e.target.selectedIndex].getAttribute("data-name");
        this.setState(
            prevState => ({
              user: {
                ...prevState.user,
                [name]: value
              }
            })
        );

        this.props.courses.data.content[name] = value;
        this.props.courses.data.content[name+"Name"] = dataName;
        parentCategoryId = parseInt(value);

        setTimeout(() => {
            this.props.dispatch(fetchChildCategory(parentCategoryId));
        }, 500)
        
    }
    handleInputSelectChild(e){
        let value = e.target.value;
        let name = e.target.name;
        let dataName = e.target[e.target.selectedIndex].getAttribute("data-name");
        this.setState(
            prevState => ({
              user: {
                ...prevState.user,
                [name]: value
              }
            })
        );
        this.props.courses.data.content[name] = value;
        this.props.courses.data.content[name+"Name"] = dataName;

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
        this.props.courses.data.content[name] = value;
    }

    handleSubmit(e){
        e.preventDefault();

        console.log(this.props.courses.data.content);

        this.setState({
            isDisabledOn: !this.state.isDisabledOn
        });

        fetch(config.api+"/course/",{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.props.courses.data.content._id,
                title: this.props.courses.data.content.title,
                category: this.props.courses.data.content.category,
                categoryName: this.props.courses.data.content.categoryName,
                contributorName: this.props.courses.data.content.contributorName,
                description: this.props.courses.data.content.description,
                enrolled: this.props.courses.data.content.enrolled,
                level: this.props.courses.data.content.level,
                objective: this.props.courses.data.content.objective,
                ratings: this.props.courses.data.content.ratings,
                subCategory: this.props.courses.data.content.subCategory,
                subCategoryName: this.props.courses.data.content.subCategoryName,
                language: this.props.courses.data.content.language,
                timeVideo: this.props.courses.data.content.timeVideo,

                video: this.props.courses.data.content.video,
                imagePreview: this.props.courses.data.content.imagePreview,
                displayImage: this.props.courses.data.content.displayImage
            })
        })

        //** production ehave to enabled this line comment below */
        // window.location.reload();
    }


    getChildCategory(){
       
    }

    componentDidMount(){
        
    }

    componentWillUpdate(){
        
    }

    init(){
       
        parentCategory = this.props.category.data.message;
        if(parentCategory){
            displayParentCategory = parentCategory.map(content => (
                                        <option data-name={content.categoryName} value={content.categoryId} key={content.categoryId} >{content.categoryName}</option>
                                    ));
        }

        childCategory = this.props.category.child.message;
        if(childCategory){
            displayChildCategory =  childCategory.map(content => (
                                        <option data-name={content.categoryName}  value={content.categoryId} key={content.categoryId} >{content.categoryName}</option>
                                    ));
        }

        // console.log(this.state.fileName)
    }

    render(){
        this.init();
        if(this.props.courses.data.content){
            parentCategoryId = this.props.courses.data.content.category;

            return(
                <div className="animated fadeIn">
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
                                            {this.props.courses.data.content._id}
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Title</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="text" id="title" name="title" value={this.props.courses.data.content.title} onChange={this.handleInput} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Language</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="text" id="language" name="language" value={this.props.courses.data.content.language} onChange={this.handleInput} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Video Time</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="text" id="timeVideo" name="timeVideo" value={this.props.courses.data.content.timeVideo} onChange={this.handleInput} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Ratings</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="text" id="ratings" name="ratings" value={this.props.courses.data.content.ratings} onChange={this.handleInput} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Category</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <div className="row">
                                                <Col xs="6">
                                                    <Input type="select" name="category" onChange={this.handleInputSelectParent} value={this.props.courses.data.content.category} disabled={ this.state.isDisabledOn ? true : false } >
                                                        {
                                                            displayParentCategory
                                                        }
                                                    </Input>
                                                </Col>
                                                <Col xs="6">
                                                    <Input type="select" name="subCategory" onChange={this.handleInputSelectChild}  value={this.props.courses.data.content.subCategory} disabled={ this.state.isDisabledOn ? true : false } >
                                                        {
                                                            displayChildCategory
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
                                            <Input type="text" id="contributorName" name="contributorName" onChange={this.handleInput} value={this.props.courses.data.content.contributorName} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Enrolled</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="text" id="enrolled" name="enrolled" onChange={this.handleInput} value={this.props.courses.data.content.enrolled} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Level</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="text" id="level" name="level" onChange={this.handleInput} value={this.props.courses.data.content.level} disabled={this.state.isDisabledOn ? true : false} />
                                            <FormText className="help-block">1 = beginner, 2 = intermediate, 3 = expert</FormText>
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Course Objective</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="textarea" name="objective" id="objective" rows="9" onChange={this.handleInput}  value={this.props.courses.data.content.objective} disabled={this.state.isDisabledOn ? true : false} />
                                        </Col>
                                    </dd>
                                </dl>

                                <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                    <dt className="col-sm-3">Course Description</dt>
                                    <dd className="col-sm-9">
                                        <Col xs="12" md="9">
                                            <Input type="textarea" name="description" id="description" rows="9" onChange={this.handleInput} value={this.props.courses.data.content.description} disabled={this.state.isDisabledOn ? true : false} />
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
    category: state.category
});


export default connect(mapStateToProps)(DetailCourse);