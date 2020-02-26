import React, { Component } from 'react';
import { Row, Col, Card, Table, Progress } from 'reactstrap';

class Listuser extends Component{

    render(){
        return(
        <Row>
          <Col>
            <Card>
              
              {/* <CardBody> */}
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th className="text-center"><i className="icon-people"></i></th>
                    <th>User</th>
                    
                    <th>Profile Completed</th>
                    <th className="text-center">Course Taken</th>
                    <th>Activity</th>
                  </tr>
                  </thead>
                  <tbody>
                    {/* content */}
                  <tr>
                    <td className="text-center">
                      <div className="avatar">
                        <img src={'assets/img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                        <span className="avatar-status badge-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Yiorgos Avraamu</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>50%</strong>
                        </div>
                      </div>
                      <Progress className="progress-xs" color="success" value="50" />
                    </td>

                    <td>
                        <div className="text-center">
                            <strong>10</strong>
                        </div>
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>10 sec ago</strong>
                    </td>
                  </tr>
                  
                  </tbody>
                </Table>
              {/* </CardBody> */}
            </Card>
          </Col>
        </Row>
        )
    }

}

export default Listuser;

