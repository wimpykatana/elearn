import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { onlogin } from '../../../thedux/action/userAction';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import {getMe} from '../../../thedux/action/meAction';

let errmessage;

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      err_email: 'Username tidak boleh kosong',
      err_password: 'Password tidak boleh kosong',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const username = this.state.email;
    const password = this.state.password;

    if(username.trim() === '') {
      return this.props.dispatch({type: "LOGIN_REJECT", payload: {message: 'Username harus diisi'}});
    }

    if(password.trim() === '') {
      return this.props.dispatch({type: "LOGIN_REJECT", payload: {message: 'Password harus diisi'}});
    }
    
    this.setState({err_username:'', err_password:''});

    this.props.dispatch(onlogin(username, password));
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;

    this.setState((prevState) => prevState[name] = value);
  }

  render() {
    if(this.props.user.error) {
      errmessage =  <Alert color="danger text-center">
                      <p>{"Username atau Password salah"}</p>
                    </Alert>
    };

    if(this.props.me || (this.props.user.status && this.props.user.status == 200)) {
      window.location.reload();
    }

    return (
      <div className="app flex-row align-items-center" style={{opacity: (this.props.user.start) ? "0.5" : "1"}}>
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Admin Login</h1>
                      <p className="text-muted">Sign In to your account</p>

                      {errmessage}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" value={this.state.email} onChange={this.handleInput} name="email" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" value={this.state.password} onChange={this.handleInput} name="password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="12">
                          <Button color="primary" disabled={(this.props.user.start) ? true : false} onClick={this.handleSubmit} className="px-4">{(this.props.user.start) ? "Waiting..." : "Login"}</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Login);

