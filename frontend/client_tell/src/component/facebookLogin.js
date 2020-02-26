import React from 'react';
// import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { connect } from "react-redux";
import { glogin } from "../__thedux/action/userAction";

class FbLogin extends React.Component{
  constructor(props){
    super(props);

    this.responseFacebook = this.responseFacebook.bind(this);

  }
    componentClicked(){
        // console.log("component click");
    }
    responseFacebook(response){
        // console.log(response)
        // let dispatch = {this.props.dispatch};
        if(response){
          let email = response.email;
          let name = response.name;
          let token = response.accessToken;
          let provider = "google";
          let provider_id = response.id;
          let user_pic= response.picture.data.url;

          // if(email && name && token && provider && provider_id && user_pic){
            this.props.glogin(email, name, token, provider,provider_id,user_pic);
          // }



        }
    }

    render(){
        return(
            <FacebookLogin
                appId="440409813175717"
                autoLoad={false}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}


                render={
                  renderProps => (
                    <button className="btn btn-facebook" onClick={renderProps.onClick}><i className="fab fa-facebook-f"></i> <span>Facebook</span></button>
                  )
                }
            />
        )
    }
}

const mapStateToProps = state => ({
  user: state.user.message,
});

const mapDispatchToProps = { glogin }

export default connect(mapStateToProps,mapDispatchToProps)(FbLogin);
