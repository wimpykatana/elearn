import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader ,Table, Col } from 'reactstrap';
import {fetchAllCourses} from '../../../../thedux/action/courseAction';
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

    componentWillMount(){
        //this.props.dispatch(fetchAllCourses());
    }
    
    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    init(){
        const dataContent = this.props.courses.data.contents;

        if(dataContent){
            displayContent = dataContent.map(content => (
                <tr key={content._id}>
                    <td style={{textTransform: "capitalize"}}>{content.contributorName}</td>
                    <td>{content.categoryName} / {content.subCategoryName} </td>
                    <td>{content.enrolled}</td>
                    <td>{content.title}</td>
                    <td>
                        <Link to={`/course/detail/${content._id}`} ><Button color="primary" className="btn-pill"  size="sm">View detail</Button></Link>
                    </td>
                </tr>
            ));
        }
    }
      
    render(){
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
                                            <Link to={`/course/add`} ><Button color="primary" className="btn-pill"  size="sm">Add new</Button></Link>
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
                        <Table responsive>
                        <thead>
                            <tr>
                                <th>Contributor Name</th>
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
})

export default connect(mapStateToProps)(ManageCourse);