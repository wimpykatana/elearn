import React, { Component } from 'react';
import { onlogin } from '../../../thedux/action/meAction';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import Header from '../Header'
import Footer from '../Footer'
import stepImg from '../../../images/img-step.png';
import emailImg from '../../../images/icn-email.png';
import passwordImg from '../../../images/icn-password.png';
import {getMe} from '../../../thedux/action/meAction'

let errmessage;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      err_username: 'Username tidak boleh kosong',
      err_password: 'Password tidak boleh kosong',
      isValid: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.enterFunction = this.enterFunction.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    if(username.trim() === '') {
      return this.props.dispatch({type: "LOGIN_REJECT", payload: {message: "Username can't be blank"}});
    }

    if(password.trim() === '') {
      return this.props.dispatch({type: "LOGIN_REJECT", payload: {message: "Password can't be blank"}});
    }
    
    this.setState({err_username:'', err_password:''});

    this.props.dispatch(onlogin(username, password));
    this.props.history.push('/');
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;

    this.setState((prevState) => prevState[name] = value);
  }

  enterFunction(event) {
    if(event.keyCode === 13) {
      this.handleSubmit(event)
    }
  }

  // componentWillMount(){console.log('com wll mo', this.props.me)
  //   if(this.props.me.isLogin){console.log('masuk sini g?', this.props.me)
  //     this.props.history.push('/');
  //   }
  // }

  componentDidMount(){
    document.addEventListener("keydown", this.enterFunction, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.enterFunction, false);
  }

  render() {
    // if(this.props.me.isLogin) {
    //   this.props.history.push('/')
    // }

    if(this.props.user.error) {
      errmessage = 
      <Alert color="danger text-center">
        <p>{this.props.user.data.message}</p>
      </Alert>
    };

    return (
    <>
    
    {/*loading kubik <div className="preloader">
      <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
      </div>
    </div> */}
    <Header />

    <div className="clearfix">&nbsp;</div>      
        <section className="section-padding body-section">                   
         	
        <div className="container">            	
          <h1>
            <strong><em>Welcome to <br />Trimegah e-Learning</em></strong>
          </h1>
          
          <p className="text-justify">We understand the brand value, strength & uniqueness.<br />
     In Trimegah, we deliver to promote your company’s brand interestingly through our e-learning platform. If you are a public company or a fund management,<br /> you might upload your video here in order to unlock your hidden value.<br />
     Please contact us at <a href="#" className="text-blue" style={{textDecoration:'underline'}}>help@tell.trimegah.com</a> to receive username & password, or login with your existing account.
          </p>
                 <div className="clearfix">&nbsp;</div> 
                 <div className="clearfix">&nbsp;</div> 
                 <div className="clearfix">&nbsp;</div>
                
                 <div className="row">
                 
                     <div className="box-ls">
              
                         <div className="modal-ls login-style">
                             <div className="modal-content-ls">
                                 <div className="modal-ls-header box-blue1" style={{border:'hidden'}}>
                                     <button type="button" className="close-ls" data-dismiss="modal" aria-hidden="true">&nbsp;</button>
                                     <h3 className="modal-title text-center">Login</h3>
                                 </div>
                                 <div className="modal-body">
                                     <div className="container-fluid">
                                         <div className="row">
                                             <div className="form-inline">
                                               <div className="popover-ls text-center">
                                                {errmessage} {/* Please fill out this field  */}
                                                 </div>
                                                 <div className="clearfix">&nbsp;</div>  
                                                 <div className="form-group form-full-ls">
                                                     <label className="sr-only" htmlFor="exampleInputAmount">Email / user name</label>
                                                     <div className="input-group input-group-ls">
                                                         <div className="input-group-addon input-group-addon-ls">
                                                             <img src={emailImg} alt="imgicn" />
                                                         </div>
                                                         <input type="email" className="form-ls" name="username" value={this.state.username} onChange={this.handleInput} autoComplete="username"  placeholder="Email / user name"/>
                                                     </div>                                                                        
                                                 </div>                                                                                                          	
                                             </div>                                
                                             <div className="clearfix"></div>
                                             <div className="form-inline">
                                                 <div className="form-group form-full-ls">
                                                     <label className="sr-only" htmlFor="exampleInputAmount">Password</label>
                                                     <div className="input-group input-group-ls">
                                                         <div className="input-group-addon input-group-addon-ls">
                                                             <img src={passwordImg} />
                                                         </div>

                                                         <input type="password" className="form-ls" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInput} autoComplete="current-password"/>
                                                     </div>
                                                 </div>                           	
                                             </div>
                                         </div>
                                         <div className="clearfix">&nbsp;</div>                                    
                                         <div className="row">
                                             <div className="form-group">
                                                 <div className="col-md-4 center-block"></div>
                                                 <div className="col-md-4">
                                                     <button name="singlebutton" onClick={this.handleSubmit} className="btn btn-blue btn-md text-uppercase btn-block">Log In</button>
                                                 </div> 
                                                 <div className="col-md-4 center-block"></div> 
                                             </div>
                                         </div>                                    
                                     </div>
                                 </div>                            
                             </div>
                         </div>
                     </div>
                 </div> 
                 <div className="clearfix">&nbsp;</div> 
                 <div className="clearfix">&nbsp;</div> 
                 <div className="clearfix">&nbsp;</div> 
                 <div className="row">
                   <div className="col-xs-12 col-md-12 col-lg-2"></div>
                     <div className="col-xs-12 col-md-12 col-lg-8">
               <img src={stepImg} className="center-block" />
                     </div>
                     <div className="col-xs-12 col-md-12 col-lg-2"></div>
                 </div>                                                     
             </div>
             
             <div className="clearfix">&nbsp;</div>                            	
         </section>
    <Footer />
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  me: state.me
})

export default connect(mapStateToProps)(Login);
