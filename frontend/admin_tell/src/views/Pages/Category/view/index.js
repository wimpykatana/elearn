import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader ,Table, Col } from 'reactstrap';
import { getAllCategoriesAdmin } from '../../../../thedux/action/categoryAction';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

let categoryContent;
class Category extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.init = this.init.bind(this);
        this.state = {
          dropdownOpen: false
        };
    }

    componentWillMount() {
        this.props.dispatch(getAllCategoriesAdmin());
    }
    
    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    init(){
        const categeries = this.props.category.data;

        if(categeries){
           categoryContent = categeries.map((item, index) => {

                return (
                    <tr key={item._id}>
                    <td>{index + 1}</td>
                        <td style={{textTransform: "capitalize"}}>{item.name}</td>
                        <td>{item.type}</td>
                        <td>
                            <Link to={`/category/detail/${item._id}`} target="_self"><Button color="primary" className="btn-pill"  size="sm">View detail</Button></Link>
                        </td>
                    </tr>
                )
            });
        }
    }
      
    render() {
        if(!this.props.category.data || this.props.category.data.length <= 0) {
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
                                        {/* <Col xs='4'>
                                            <Link to={`/category/add`} ><Button color="primary" className="btn-pill"  size="lg">Add new</Button></Link>
                                        </Col> */}
                                    </div>
                                </Col>
                                
                            </div>
                        </div>
                    </div>
                <Card>
                    <CardHeader>
                        <strong>Category</strong>
                    </CardHeader>
                    <CardBody>
                        <Table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryContent}
                        </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    category: state.category
})

export default connect(mapStateToProps)(Category);