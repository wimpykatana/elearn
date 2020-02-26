import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader ,Table, Col } from 'reactstrap';
import {fetchAllCourses} from '../../../../thedux/action/courseAction';
import { getAllCategories } from '../../../../thedux/action/categoryAction';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

let displayContent;
class ManageCourse extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.init = this.init.bind(this);
        this.state = {
          dropdownOpen: false
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchAllCourses());
        this.props.dispatch(getAllCategories());
    }
    
    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    init(){
        const dataContent = this.props.courses.data;
        const categeries = this.props.category.data;

        if(dataContent && categeries.length > 0){
            displayContent = dataContent.map((content, index) => {
                const category = categeries.find(function(item) {
                    return item._id === content.categoryId;
                });

                return (
                    <tr key={content._id}>
                    <td>{index + 1}</td>
                        <td style={{textTransform: "capitalize"}}>{content.contributorName}</td>
                        <td>{(content.active) ? "Aktif" : "Non-Aktif"}</td>
                        <td>{(category) ? category.name : "null"}</td>
                        <td>{content.enrolled}</td>
                        <td>{content.title}</td>
                        <td>
                            <Link to={`/course/detail/${content._id}`} target="_self"><Button color="primary" className="btn-pill"  size="sm">View detail</Button></Link>
                        </td>
                    </tr>
                )
            });
        }
    }
      
    render() {
        if(!this.props.courses.data || !this.props.category.data || this.props.category.data.length <= 0 || this.props.courses.data.length <= 0) {
            return (<div>Loading...</div>)
        }

        this.init();
        return(
            <div className="animated fadeIn">
                <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <Col xs="12" md={{size:4, offset:8}}>
                                    <div className="row">
                                        <Col xs='8'>
                                           
                                        </Col>
                                        <Col xs='4'>
                                            <Link to={`/course/add`} ><Button color="primary" className="btn-pill"  size="lg">Add new</Button></Link>
                                        </Col>
                                    </div>
                                </Col>
                                
                            </div>
                        </div>
                    </div>
                <Card>
                    <CardHeader>
                        <strong>Manage Course</strong>
                    </CardHeader>
                    <CardBody>
                        <Table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Contributor Name</th>
                                <th>Status</th>
                                <th>Category</th>
                                <th>Enrolled</th>
                                <th>Title</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayContent}
                        </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    courses: state.courses,
    category: state.category
})

export default connect(mapStateToProps)(ManageCourse);