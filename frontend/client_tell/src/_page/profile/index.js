import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../component/header";
import Footer from "../../component/footer";
import './style.css';
import { getFirstLetter } from "../../utilis/slice";
import ReactGA from 'react-ga';
import NameInitial from "./component/nameInitial";
import ProfileBar from "./component/profileBar";
import ProfileHolder from './component/profileHolder';
import MetaTags from 'react-meta-tags';
import config from '../../config/config';

//ReactGA.initialize(config.trackerId);
//ReactGA.pageview(window.location.pathname);

let content = "null";
let percentProfile;

class User extends Component{

    constructor(props){
        super(props);
        this.state = {
           profile: true,
           account: false,
           photo: false
        }

        this.init = this.init.bind(this);
        this.profileOnClick = this.profileOnClick.bind(this);
        this.accOnclick = this.accOnclick.bind(this);
        this.profilePercent = this.profilePercent.bind(this);
 
    }

    componentWillMount(){
        percentProfile = 0;
    }

    profileOnClick(){

        this.setState({
            profile: true,
            account: false,

        })

    }

    accOnclick(){

        this.setState({
            profile: false,
            account: true,
        })
    }

    profilePercent(){
        percentProfile = 0;

        if(this.props.me){
            // console.log(this.props.me.fullname);

            if(this.props.me.fullname){
                percentProfile += 25;
            }

            if(this.props.me.headline){
                percentProfile += 25;
            }
            
            if(this.props.me.dob){
                percentProfile += 25;
            }

            if( this.props.me.facebookLink || this.props.me.linkPersonalWeb || this.props.me.linkedinLink || this.props.me.youtubeLink ){
                percentProfile += 25;
            }


        }

    }

    init(){
        this.profilePercent();
    }

    render(){
        this.init();

        if(this.props.me){

            return(
                <>
                    <MetaTags>
                        <title>Tell - Profile Page</title>
                        <meta name="og:description" content="Tell Profile page" />
                        <meta property="og:title" content="Tell - Profile" />
                        <meta property="og:image" content="http://www.tell.co.id/static/media/logo-Tell.4a9d61e8.svg" />
                    </MetaTags>
                    <Header {...this.props} />
                    <section className="section-padding body-section my-acc-holder"> 
                        <div className="container">
                            
                            <div className="col-md-2">

                                
                                    <NameInitial {...this.props} value={getFirstLetter(this.props.me.fullname)} />
                                    <div className="fullname-holder">
                                        <p className="text-center">{this.props.me.fullname}</p>
                                    </div>

                                    <div className="title-holder">
                                        <em><p className="text-center">{this.props.me.headline}</p></em>
                                    </div>
                                

                                    {percentProfile > 99 ? "" : <ProfileBar {...this.props} value={percentProfile} />}

                                <div className="nav-menu-profile">
                                    
                                    <a className={ (this.props.location.pathname === "/myprofile") ? 'brandsub active' : 'brandsub' } href="/myprofile">My Profile</a>
                                    <a className={ (this.props.location.pathname === "/myaccount") ? 'brandsub active' : 'brandsub' } href="/myaccount">My Account</a>

                                    {/* <div onClick={this.profileOnClick} className={ (this.state.profile) ? 'brandsub active' : 'brandsub' }>My Profile</div>
                                    <div onClick={this.accOnclick} className={ (this.state.account) ? 'brandsub active' : 'brandsub' }>My Account</div> */}

                                </div>

                            </div>

                            <div className="col-md-10">
                                <ProfileHolder {...this.props} />
                            </div>
                           
                        </div>
                    </section>

                    <div style={{margin: "480px 0 0 0"}}></div>
                    <Footer />
                </>
            )
        }else{
            return(
                <>
                    <Header />
                        You not Login
                        <div style={{margin: "530px 0 0 0"}}></div>
                    <Footer />
                </>
            )
        }
        
    }

}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(User);
