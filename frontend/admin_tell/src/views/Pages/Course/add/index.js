import React, { Component } from 'react';
import { connect } from "react-redux";
import { Col, Input, Button, Modal, ModalBody, ModalFooter, ModalHeader, Progress} from 'reactstrap';

import config from '../../../../config/config.json';
import { getAllCategories, fetchChildCategory } from '../../../../thedux/action/categoryAction';
import { addCourse } from '../../../../thedux/action/courseAction';
import UploadContentVideo from '../../../Component/add/addContentVideo';
import UploadContentVideoPoster from '../../../Component/add/addContentVideoPoster';
import UploadDisplayImage from '../../../Component/add/addDisplayImage';
import AddCoursePopup from './popup'

let parentCategory = [];
let displayParentCategory;
let parentCategoryId = 1;
let titleSend = true;
let authorSend = true;
let descriptionSend = true;
let objectiveSend = true;
let videoSend = true;
let imgPreSend = true;
let imgDisplaySend = true;

let msgError = '';

class AddCourse extends Component{
    constructor(props){
        super(props);

        this.state = {
            modal:false,
            clsTitle: '',
            clsAuthor: '',
            clsDescription:'',
            clsTimeVideo:'',
            clsRatings:'',
            clsObjective:'',
            clsVideo:'',
            clsimgPre:'',
            clsimgDisplay:'',
            video: '',
            imgPre:'',
            imgDisplay:'',
            data:'',
            content:{
                title: "",
                categoryId: "",
                author: "",
                description: "",
                enrolled: "",
                level: 1,
                objective: "",
                ratings: "",
                language: "",
                timeVideo: ""
            }
        }

        //this.getCategory();

        this.init = this.init.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handlePopup = this.handlePopup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.getCategory = this.getCategory.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleInputSelectParent = this.handleInputSelectParent.bind(this);
        this.handleInputSelectChild = this.handleInputSelectChild.bind(this);
        this.handleFile = this.handleFile.bind(this)
    }

    componentWillMount() {
        this.props.dispatch(getAllCategories());
    }

    handleInputSelectParent(e){
        let value = e.target.value;
        let name = e.target.name;

        this.setState(
            prevState => ({
                content: {
                ...prevState.content,
                [name]: value
              }
            })
        );

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
            content: {
              ...prevState.content,
              [name]: value
            }
          })
        );
    }

    handleFile(e){
        let name = e.target.name;
        let value = e.target.files[0];

        switch(name){
            case "video":
                const arr1 = value.type.split("/");
                if(arr1[0] !== 'video') {
                    this.setState({
                        clsVideo: 'form-control-red'
                    });
                }
                else{
                    this.setState({
                        clsVideo: 'form-control'
                    });
                }
                
                break;
            default:
                const arr2 = value.type.split("/");

                if(arr2[0] !== 'image') {
                    this.setState({
                        ['cls'+name]: 'form-control-red'
                    });
                }
                else {
                    this.setState({
                        ['cls'+name]: 'form-control'
                    });
                }
                
                break;
        }

        this.setState({
            [name]: value
        })
    }

    handlePopup(e) {
        e.preventDefault();
        
        if(this.state.content.title === '') {
            this.setState({
                clsTitle: 'form-control-red'
            });

            titleSend = false;
        }
        else {
            this.setState({
                clsTitle: 'form-control'
            });

            titleSend = true;
        }

        if(this.state.content.author === '') {
            this.setState({
                clsAuthor: 'form-control-red'
            });

            authorSend = false;
        }
        else {
            this.setState({
                clsAuthor: 'form-control'
            });

            authorSend = true;
        }

        if(this.state.content.description === '') {
            this.setState({
                clsDescription: 'form-control-red'
            });

            descriptionSend = false;
        } else if (this.state.content.description.trim().length < 30) {
            this.setState({
                clsDescription: 'form-control-red'
            });

            this.props.dispatch({type: "ADD_COURSES_FAILED", payload: { message: "Description min length 30 character" }})
            document.documentElement.scrollTop = 0;
            descriptionSend = false;
        }
        else {
            this.setState({
                clsDescription: 'form-control'
            });
            this.props.dispatch({type: "ADD_COURSES_START"})
            descriptionSend = true;
        }

        if(this.state.content.objective === '') {
            this.setState({
                clsObjective: 'form-control-red'
            });

            objectiveSend = false;
        }
        else {
            this.setState({
                clsObjective: 'form-control'
            });

            objectiveSend = true;
        }

        if(this.state.video === '' || !this.state.video) {
            this.setState({
                clsVideo: 'form-control-red'
            });

            videoSend = false;
        }
        else {
            const arrV = this.state.video.type.split("/");
            if(arrV[0] !== 'video') {
                this.setState({
                    clsVideo: 'form-control-red'
                });
    
                videoSend = false;
            }
            else {
                this.setState({
                    clsVideo: 'form-control'
                });

                videoSend = true;
            }
           
        }

        if(this.state.imgPre === '' || !this.state.imgPre) {
            this.setState({
                clsimgPre: 'form-control-red'
            });

            imgPreSend = false;
        }
        else {
            const arrImgP = this.state.imgPre.type.split("/");

            if(arrImgP[0] !== 'image') {
                this.setState({
                    clsimgPre: 'form-control-red'
                });
    
                imgPreSend = false;
            }
            else {
                this.setState({
                    clsimgPre: 'form-control'
                });
    
                imgPreSend = true;
            }
           
        }

        if(this.state.imgDisplay === '' || !this.state.imgDisplay) {
            this.setState({
                clsimgDisplay: 'form-control-red'
            });

            imgDisplaySend = false;
        }
        else {
            const arrImgD = this.state.imgDisplay.type.split("/");
            if(arrImgD[0] !== 'image') {
                this.setState({
                    clsimgDisplay: 'form-control-red'
                });
    
                imgDisplaySend = false;
            }
            else {
                imgDisplaySend = true;

                this.setState({
                    clsimgDisplay:'form-control'
                });
            }
            
        }

        if(!titleSend || !authorSend  || !descriptionSend || !objectiveSend || !videoSend || !imgPreSend || !imgDisplaySend) {
            return document.documentElement.scrollTop = 0;
        }
        
        this.toggle();
    }

    handleSubmit() {
        const arrV = this.state.video.type.split("/");
        
        let data = this.state.content;
        data.categoryId = (this.state.content.categoryId === '') ? this.props.category.data[0]._id : this.state.content.categoryId;
        data.imgPre = this.state.imgPre;
        data.imgDisplay = this.state.imgDisplay;
        data.video = this.state.video;

        this.props.dispatch(addCourse(data, this.props.me));
    }

    init() {
        parentCategory = this.props.category.data;

        if(parentCategory) {
            displayParentCategory = parentCategory.map((item) => {
                return (
                    <option data-name={item.name} value={item._id} key={item._id}>{item.name}</option>
                )
            });
        }

        // childCategory = this.props.category.child.message;
        // if(childCategory){
        //     displayChildCategory =  childCategory.map(content => (
        //                                 <option data-name={content.categoryName}  value={content.categoryId} key={content.categoryId} >{content.categoryName}</option>
        //                             ));
        // }

        // console.log(this.state.fileName)
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });

        if(this.props.courses.loaded === 100) {
            window.location.reload();
        }
    }

    render() {
        if(this.props.category.data.length <= 0) {
            return (<div>Loading...</div>)
        }

        if(this.props.courses.error && this.props.courses.data) {
            msgError = <div className="alert alert-danger text-capitalize" role="alert">
                   {this.props.courses.data.message}
                </div>
        }
        else {
            msgError = ''
        }

        this.init();

        return (
            <div className="animated fadeIn">
                {msgError}
                <AddCoursePopup submit={this.handleSubmit} toggle={this.toggle} stateValue={this.state} />

                {/* VIDEO & IMAGE CONTENT EDIT */}
                {/* <div className="row">
                    <UploadContentVideo 
                        editContent={ this.state.isDisabledOn ? true : false }
                    />
                    <UploadContentVideoPoster
                        editContent={ this.state.isDisabledOn ? true : false }
                    />
                    <UploadDisplayImage
                        editContent={ this.state.isDisabledOn ? true : false }
                    /> 
                </div> */}

                {/* DETAIL CONTENT EDIT */}
                <div className="card">
                    <div className="card-header">
                        Courses Detail
                    </div>
                    
                    <div className="card-body">
                        <div className="bd-example">
                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Title</dt>
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <Input type="text" id="title" name="title" className={this.state.clsTitle} value={this.state.content.title} onChange={this.handleInput} />
                                    </Col>
                                </dd>
                            </dl>

                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Video</dt>
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <Input type="file" name="video" className={this.state.clsVideo} onChange={this.handleFile} />
                                    </Col>
                                </dd>
                            </dl>

                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Image Preview</dt>
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <Input type="file" name="imgPre" className={this.state.clsimgPre} onChange={this.handleFile} />
                                    </Col>
                                </dd>
                            </dl>

                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Image Display</dt>
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <Input type="file" name="imgDisplay" className={this.state.clsimgDisplay}  onChange={this.handleFile} />
                                    </Col>
                                </dd>
                            </dl>

                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Language</dt>
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <Input type="text" id="language" name="language" value={this.state.content.language} onChange={this.handleInput}/>
                                    </Col>
                                </dd>
                            </dl>

                            {/* <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Video Time</dt>
                                <dd className="col-sm-2">
                                    <Col xs="12" md="9">
                                        <Input type="number" id="timeVideo" className={this.state.clsTimeVideo} name="timeVideo" value={this.state.content.timeVideo} onChange={this.handleInput}  />
                                    </Col>
                                </dd>
                            </dl> */}

                            {/* <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Ratings</dt>
                                <dd className="col-sm-2">
                                    <Col xs="12" md="9">
                                        <Input type="number" id="ratings" className={this.state.clsRatings} name="ratings" value={this.state.content.ratings} onChange={this.handleInput} />
                                    </Col>
                                </dd>
                            </dl> */}

                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Category</dt>
                                
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <div className="row">
                                            <Col xs="12">
                                                <Input type="select" id="addCategorySelect" name="categoryId" onChange={this.handleInputSelectParent} value={this.state.content.categoryId} disabled={ this.state.isDisabledOn ? true : false } >
                                                    {
                                                        displayParentCategory
                                                    }
                                                </Input>
                                            </Col>
                                            {/* <Col xs="6">
                                                <Input type="select" name="subCategory" onChange={this.handleInputSelectChild}  value={this.state.content.subCategory} disabled={ this.state.isDisabledOn ? true : false } >
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
                                        <Input type="text" id="contributorName" name="author" className={this.state.clsAuthor} onChange={this.handleInput} value={this.state.content.author} />
                                    </Col>
                                </dd>
                            </dl>

                            {/* <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Enrolled</dt>
                                <dd className="col-sm-2">
                                    <Col xs="12" md="9">
                                        <Input type="number" id="enrolled" name="enrolled" onChange={this.handleInput} value={this.state.content.enrolled}  />
                                    </Col>
                                </dd>
                            </dl> */}

                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Level</dt>
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <Input type="select" id="level" name="level" onChange={this.handleInput} value={this.state.content.level}> 
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
                                        <Input type="textarea" name="objective" className={this.state.clsObjective} id="objective" rows="9" onChange={this.handleInput}  value={this.state.content.objective}  />
                                    </Col>
                                </dd>
                            </dl>

                            <dl className="row" style={{borderBottom: "1px solid #ccc"}}>
                                <dt className="col-sm-3">Course Description</dt>
                                <dd className="col-sm-9">
                                    <Col xs="12" md="9">
                                        <Input type="textarea" name="description" className={this.state.clsDescription} rows="9" onChange={this.handleInput} value={this.state.content.description}  />
                                    </Col>
                                </dd>
                            </dl>

                            <Col xs="12">
                                <div className="d-flex justify-content-center">
                                    <Button onClick={this.handlePopup} color="primary">SUBMIT</Button>
                                </div>
                            </Col>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    me: state.me,
    courses: state.courses,
    category: state.category
});


export default connect(mapStateToProps)(AddCourse);