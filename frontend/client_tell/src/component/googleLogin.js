import React from 'react';
// import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { connect } from "react-redux";
import { glogin } from '../__thedux/action/userAction';

class GoLogin extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }

        this.responseGoogle = this.responseGoogle.bind(this);
 
    }

    componentWillReceiveProps(){
       
    }

    componentDidUpdate(){
        // console.log(this.props.user.isLogin);
        if(this.props.user){
            // setTimeout(function(){ window.location.replace("/") }, 50);
            
            if(this.props.user.isLogin){
                window.location.replace("/");
            }
            console.log(this.props.user)
        }
    }


    responseGoogle(response){

        

        if(response){
             //name,email, provider, provider_id, token, provider_pic

            // name: res.w3.ig,
            // provider: type,
            // email: res.w3.U3,
            // provider_id: res.El,
            // token: res.Zi.access_token,
            // provider_pic: res.w3.Paa

            console.log(response);
            let email = response.profileObj.email;
            let name = response.profileObj.name;
            let token = response.accessToken;
            let provider = "google";
            let provider_id = response.profileObj.googleId;
            let user_pic= response.profileObj.imageUrl;
    
            this.props.dispatch(glogin(email, name, token, provider,provider_id,user_pic));
        }
       
    }

    render() {
        
        return(
            <GoogleLogin
                clientId="209849936645-2am4obo318d41osvjp6b1mmsom50ikd4.apps.googleusercontent.com"

                autoLoad={false}
                render={
                    renderProps => (
                        <button className="btn btn-google" onClick={renderProps.onClick}><i className="fab fa-google"></i> <span>Google</span></button>
                    )
                }
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.message,
});

export default connect(mapStateToProps)(GoLogin);
