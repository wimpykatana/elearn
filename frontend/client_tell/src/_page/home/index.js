import React, { Component } from 'react';
import './style.css';
import MetaTags from 'react-meta-tags';
import {Link} from 'react-router-dom';
import Header from '../../component/header';
import Footer from '../../component/footer';
import Loader from '../../component/loading';
import { connect } from "react-redux";
import { Carousel } from 'react-responsive-carousel';
import Swiper from 'react-id-swiper';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {fetchAllCategory, fetchAllCategoryAndContents} from '../../__thedux/action/categoryAction';
import { countRatings } from '../../utilis/ratings';

import icnLifeTime from '../../image/icn-lifetime.png';
import icnCertified from '../../image/icn-certified.png';
import icnOver from '../../image/icn-over.png';
import PopupSignup from '../../component/popupSignup/index';
import PopupLogin from '../../component/popupLogin/index';
import PopupForget from '../../component/forgetPassword/index';
import slider1 from '../../image/slider/slider1.jpg';
import slider2 from '../../image/slider/slider2.jpg';
import config from '../../config/config.json';
import icnHome from '../../image/home-black.svg';
import icnHome2 from '../../image/home-black.svg';

// import icnPrev from '../../image/arrow-left.svg';
// import icnNext from '../../image/arrow-right.svg';
import ReactGA from 'react-ga';


// ReactGA.initialize(config.trackerId, {
//     debug: true,
//     titleCase: false,
//     gaOptions: {
//         userId: 123,
//         clientId: 'some-unique-id'
//     }
// });

let listMenu;
let landingMenu;
let lengMenu;
let menuBeforeLogin;
let menuAfterLogin;
let sgnupFooter;
// eslint-disable-next-line
let categoryId;
let content = '';
let recent = '';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            setOverCss: '',
            active:'',
            token: '',
            username: '',
            course: '',
            isLoading: true,
            popupLogin: false,
            popupSignup: false,
            popupForget: false,
            clsLeftOver: 'over',
            clsRightOver: '',
            widthItem: 200
        }

        this.init = this.init.bind(this);
        this.closeLoading = this.closeLoading.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.clickNavContent = this.clickNavContent.bind(this);
    }

    componentWillMount() {
        if(window.innerWidth <= 425){
            this.setState({
                totItemShow: 2,
                widthItem: 187.5
            })
        } else if(window.innerWidth <= 1000 && window.innerWidth > 425){
            this.setState({
                totItemShow: 4,
                widthItem: 187.5
            })
        } else if(window.innerWidth >= 1024 && window.innerWidth <= 1366){
            this.setState({
                totItemShow: 5,
                widthItem: 187.5
            })
        }else {
            this.setState({
                totItemShow: 6,
                widthItem: 200
            })
        }

        this.props.dispatch(fetchAllCategoryAndContents());
        this.props.dispatch(fetchAllCategory());
    }

    closeLoading() {
        this.setState({
            isLoading: false
        });
    }

    onMouseOver(e){
        const parent = e.currentTarget.parentNode;

        parent.classList.add("active");

    }

    onMouseLeave(e){
        const parent = e.currentTarget.parentNode;

        if(parent.getAttribute("active") !== 'true'){
            parent.classList.remove("active");
        }
    }

    onClick(e) {
       e.preventDefault();
        // start set css behavior
        const parent = e.currentTarget.parentNode;
        let sibling = parent.nextSibling;
        let prSibling = parent.previousSibling;

        parent.classList.remove("active");

        // loop for next sibling
        do {
            if(sibling) {
                sibling.removeAttribute("active");
                sibling.classList.remove("active");
                sibling = (sibling) ? sibling.nextSibling : null;
            }
        } while (sibling)

        // loop for prev sibling
        do {
            if(prSibling) {
                prSibling.removeAttribute("active");
                prSibling.classList.remove("active");
                prSibling = prSibling.previousSibling;
            }

        } while(prSibling);

        parent.className += " active";
        parent.setAttribute('active', true);
        //end set css behavior

        const id =  parent.getAttribute("data");

        categoryId = id;

        //this.props.dispatch(fetchCoursesByCategory(id, 1));
    }

    togglePopup(e) {
        //close signup popup if klik termus
        if(!e.target.attributes.getNamedItem('id') && this.state.popupSignup) {
            return this.setState({
                popupSignup: false,
            });
        }
        // di button yg onClick function ini hrs tambahkan id="popupLogin" atau id="popupSign"
        const attribute = e.target.attributes.getNamedItem('id').value;

        this.setState({
            [attribute]: !this.state[attribute],
        });

        //open sign and close all open popup
        if((!this.state.popupSignup && (this.state.popupLogin || !this.state.popupForget)) && attribute === 'popupSignup'){
            this.setState({
                popupLogin: false,
                popupForget: false
            });
        }

        //open login pop and close all popoup
        if((!this.state.popupLogin && (this.state.popupForget || this.state.popupSignup)) && attribute === 'popupLogin'){
            this.setState({
                popupSignup: false,
                popupForget: false
            });
        }

         //open forget and close all open popup
        if(((this.state.popupLogin || this.state.popupSignup) && !this.state.popupForget) && attribute === 'popupForget') {
            this.setState({
                popupSignup: false,
                popupLogin: false
            });
        }

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    clickNavContent(e) {
        return;
        // const len = parseInt(e.currentTarget.attributes["data-length"].value);
        // const left = (len * 120) - ( len * this.state.widthItem);

        // if(e.currentTarget.attributes.data.value === 'left') { //left btn nav;
        //     const data = parseInt(e.currentTarget.previousSibling.attributes.data.value);
        //     const dataLength = parseInt(e.currentTarget.previousSibling.attributes['data-length'].value);
        //     const categoryId = e.currentTarget.attributes['data-categoryid'].value;

        //     e.currentTarget.previousSibling.setAttribute("data", data + this.state.widthItem);
        //     // eslint-disable-next-line
        //     const data2 = e.currentTarget.previousSibling.attributes.data.value;
        //     e.currentTarget.previousSibling.style.transform ="translateX("+data+"px)";

        //     if(left === data) {
        //         e.currentTarget.nextSibling.className = 'btn rightLst over';
        //         e.currentTarget.className = 'btn leftLst';

        //         if(dataLength < 10) {//hidden see all
        //             document.getElementById("seeAll"+categoryId).style.display = "none"
        //         }
        //     }
        //     else if(data === 0) {
        //         document.getElementById("seeAll"+categoryId).style.display = "block";
        //         e.currentTarget.nextSibling.className = 'btn rightLst';
        //         e.currentTarget.className = 'btn leftLst over';
        //     }
        //     else {
        //         e.currentTarget.className = 'btn leftLst';
        //         e.currentTarget.nextSibling.className = 'btn rightLst';
        //         document.getElementById("seeAll"+categoryId).style.display = "block";
        //     }

        //     if(this.state.widthItem < 200) {//mobile slider
        //         if(this.state.widthItem * dataLength + data <= this.state.widthItem * dataLength) {
        //             e.currentTarget.nextSibling.className = 'btn rightLst over';
        //             e.currentTarget.className = 'btn leftLst';
        //         } else {
        //             e.currentTarget.nextSibling.className = 'btn rightLst';
        //             e.currentTarget.className = 'btn leftLst over';
        //             document.getElementById("seeAll"+categoryId).style.display = "block";
        //         }
        //     }
        // }
        // else { //right btn nav
        //     const data = parseInt(e.currentTarget.previousSibling.previousSibling.attributes.data.value);
        //     const dataLength = parseInt(e.currentTarget.previousSibling.previousSibling.attributes['data-length'].value);
        //     const categoryId = e.currentTarget.attributes['data-categoryid'].value;

        //     e.currentTarget.previousSibling.previousSibling.setAttribute("data", data - this.state.widthItem);
        //     const data2 = e.currentTarget.previousSibling.previousSibling.attributes.data.value;
        //     e.currentTarget.previousSibling.previousSibling.style.transform = "translateX("+data2+"px)";

        //     if(this.state.widthItem === 200) {//desktop slider
        //         if(this.state.widthItem * dataLength + data <= this.state.widthItem * 7) {
        //             e.currentTarget.className = 'btn rightLst over';
        //             e.currentTarget.previousSibling.className = 'btn leftLst';

        //             if(dataLength < 10) {//hidden see all
        //                document.getElementById("seeAll"+categoryId).style.display = "none"
        //             }
        //         }
        //         else {
        //             e.currentTarget.previousSibling.className = 'btn leftLst';
        //             e.currentTarget.className = 'btn rightLst';
        //         }
        //     }

        //     if(this.state.widthItem < 200) {//mobile slider
        //         if(this.state.widthItem * dataLength + data <= this.state.widthItem * 4) {
        //             e.currentTarget.className = 'btn rightLst over';
        //             e.currentTarget.previousSibling.className = 'btn leftLst';

        //             if(dataLength < 10) {//hidden see all
        //                 document.getElementById("seeAll"+categoryId).style.display = "none"
        //              }
        //         }
        //         else {
        //             e.currentTarget.previousSibling.className = 'btn leftLst';
        //             e.currentTarget.className = 'btn rightLst';
        //         }
        //     }
        // }
    }

    init() {
        lengMenu = 0;
        categoryId = this.props.category.data[0]._id;
    }

    render() {
        //config swiper
        const params = {
            slidesPerView: 'auto',//this.state.totItemShow,
            slidesPerGroup: this.state.totItemShow,
            spaceBetween: 7,
            freeMode: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            loop: false
        }

        const userDetail = this.props.me;
        // console.log(userDetail);
        recent = (userDetail && userDetail.recent.courses.length > 0) ? <div key={userDetail.recent._id} className="row">
                <div className="col-xs-12">
                    <h4 className="pull-left">{userDetail.recent.name}</h4>
                    {((userDetail.recent.courses.length <= 6 && this.state.widthItem === 200) || (userDetail.recent.courses.length <= 2 && this.state.widthItem < 200)) ? '' : <Link target="_self" id={"seeAll"+userDetail.recent._id} to={{pathname:"/category/"+userDetail.recent.name.replace(/ /gi, "-")}} className="see-all">Show More</Link>}
                </div>

                <div className="col-xs-12">
                    <Swiper {...params}>
                        {
                            userDetail.recent.courses.map((item2) => <div key={item2._id} className="item" style={{left: "0px", width: this.state.widthItem+"px"}}>
                                {/* <Link to={{pathname:"/courses/"+userDetail.recent.name.replace(/ /gi, "-")+"/"+item2.title.replace(/ /gi, "-"), search:"?categoryId:"+userDetail.recent._id+"&"+"id:"+item2._id}}> */}
                                <Link to={{pathname:"/courses/"+userDetail.recent.name.replace(/ /gi, "-")+"/"+item2.title.replace(/ /gi, "-")}}>
                                    <div className="new-update">
                                        <div className="team-photo">
                                            <img src={`${config.static}/images/${item2.imagePreview}`} alt={item2.imagePreview} />
                                        </div>

                                        <h4 className="text-nowrap"><strong>{item2.title}</strong></h4>

                                        <h6>{item2.contributorName}</h6>

                                        <div className="col-xs-12">
                                            <span className="rating"><span style={{width: `${countRatings(item2.rate) * 20}%`}}></span></span>
                                        </div>
                                    </div>
                                </Link>
                            </div>)
                        }
                    </Swiper>
                </div>
            </div>
            :
            <div>
                &nbsp;
            </div>

        if(!this.props.category.data || !this.props.category.data2) {
            return (
                <div style={{marginTop: '10%'}}>
                    <Loader />
                </div>
            )
        }

        if(this.props.category.data2.length > 0) {
            this.init();
        }



        content = this.props.category.data2.map((item) => (item.courses.length > 0) ?
            <div key={item._id} className="row">
                <div className="col-xs-12">
                    <h4 className="pull-left">{item.name}</h4>
                    {/*{((item.courses.length <= 6 && this.state.widthItem === 200) || (item.courses.length <= 2 && this.state.widthItem < 200)) ? '' : <Link target="_self" id={"seeAll"+item._id} to={{pathname:"/category/"+item.name.replace(/ /gi, "-"), search:"?_id:"+item._id}} className="see-all">Show More</Link>}*/}
                    {((item.courses.length <= 6 && this.state.widthItem === 200) || (item.courses.length <= 2 && this.state.widthItem < 200)) ? '' : <Link target="_self" id={"seeAll"+item._id} to={{pathname:"/category/"+item.name.replace(/ /gi, "-")}} className="see-all">Show More</Link>}
                </div>

                <div className="col-xs-12" data="0" data-length={item.courses.length}>
                    <Swiper  key={item._id} {...params}>
                        {
                            item.courses.map((item2) => <div key={item2._id} data-history={item2._id} className="item" style={{left: "0px", width: this.state.widthItem+"px"}}>
                                {/*<Link to={{pathname:"/courses/"+item.name.replace(/ /gi, "-")+"/"+item2.title.replace(/ /gi, "-"), search:"?categoryId:"+item._id+"&"+"id:"+item2._id}} target="_self">*/}
                                  <Link to={`/courses/${item.name.replace(/ /gi, "-")}/${item2.title.replace(/ /gi, "-")}`} target="_self">
                                    <div className="new-update">
                                        <div className="team-photo">
                                            <img src={`${config.static}/images/${item2.imagePreview}`} alt={item2.imagePreview} />
                                        </div>

                                        <h4 className="text-nowrap"><strong>{item2.title}</strong></h4>

                                        <h6>{item2.contributorName}</h6>

                                        <div className="col-xs-12">
                                            <span className="rating"><span style={{width: `${countRatings(item2.rate) * 20}%`}}></span></span>
                                        </div>
                                    </div>
                                </Link>
                            </div>)
                        }
                    </Swiper>
                </div>
            </div>

            :

            <div key={item._id} className="row">
                <div className="col-xs-12">
                    <h4 className="pull-left">{item.name}</h4>
                </div>

                            <div className="container">
                                <div className="row">
                                    <div className="MultiCarousel" data-items="1,3,5,6" data-slide="1" id="MultiCarousel"  data-interval="1000">
                                        <div className="MultiCarousel-inner" data="0" style={{width: "100px", textAlign: "center"}}>

                                            {
                                            "Available soon"
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        )


        /* LIST MENU BEFORE LOGIN */
        if(!this.props.user.isLogin) {//jika blm login
            //ReactGA.pageview("Landing-Page");

            listMenu = this.props.category.data.map((item, index) => {
                lengMenu += item.name.length * 9 + 8;

                return (
                    <li key={index} data={item._id} className="item">
                      <Link
                        target="_self"
                        // to={{pathname:"/category/"+item.name.replace(/ /gi, "-"), search:"?_id:"+item._id}}
                        to = {`/category/${item.name.replace(/ /, "-")}`}
                        onMouseLeave={this.onMouseLeave}
                        onMouseOver={this.onMouseOver}
                      >
                        {item.name}
                      </Link>
                    </li>
                )
            });

            landingMenu = <div className="box-orange">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-4">
                            <div className="inbox-orange">
                                <img src={icnOver} alt="icon-over" />
                                <h4><strong>100% Free</strong></h4>
                            </div>
                        </div>
                        <div className="col-xs-4">
                            <div className="inbox-orange">
                                <img src={icnCertified} alt="icon-cert" />
                                <h4><strong>Structured Learning</strong></h4>
                            </div>
                        </div>
                        <div className="col-xs-4">
                            <div className="inbox-orange">
                                <img src={icnLifeTime} alt="icon-life-time" />
                                <h4><strong>Better Experience</strong></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            sgnupFooter = <div className="box-orange-gradient">
                                <div className="container">
                                    <div className="row">
                                        <div className="clearfix">&nbsp;</div>
                                        <div className="clearfix">&nbsp;</div>
                                        <div className="clearfix">&nbsp;</div>
                                        <div className="col-xs-12">
                                            <h2 className="text-uppercase text-center">Start Your learning journey</h2>
                                        </div>
                                        <div className="col-xs-12">
                                            <button onClick={this.togglePopup} id="popupSignup" className="btn btn-lg btn-blue center-block text-uppercase" type="submit">Sign up Now</button>
                                        </div>
                                        <div className="clearfix">&nbsp;</div>
                                        <div className="clearfix">&nbsp;</div>
                                        <div className="clearfix">&nbsp;</div>
                                    </div>
                                </div>
                            </div>

            menuBeforeLogin = <div className="wrapper overflowMenuBiru hidden-xs hidden-sm">
                                <div className="container">
                                    <div className="row">
                                    <ul className="nav nav-blue" style={{minWidth: lengMenu+'px'}}>
                                        <li className="item"><div><img src={icnHome} alt="icon-home" width="25" height="25" style={{marginTop:"-8px"}} /></div></li>
                                        {listMenu}
                                    </ul>
                                    </div>
                                </div>
                            </div>

            menuAfterLogin = '';
        }

        /* LIST MENU BEFORE LOGIN */
        else { //else login
           // ReactGA.pageview("Home-Page");

            listMenu = this.props.category.data.map((item, index) => {
                lengMenu += item.name.length * 9;

                return (
                    <li key={index} data={item._id} className="item">
                      <Link
                        target="_self"
                        // to={{pathname:"/category/"+item.name.replace(/ /gi, "-"), search:"?id:"+item._id}}
                        to = {`/category/${item.name.replace(/ /, "-")}`}
                        onMouseLeave={this.onMouseLeave}
                        onMouseOver={this.onMouseOver}>
                        {item.name}
                      </Link>
                    </li>
                )
            });

            menuAfterLogin = <div className="container box-orange padding-0 hidden-xs hidden-sm" style={{marginBottom:20}}>
                                <div className="container padding-0">
                                    {/* <div className="scroller scroller-left">asd<i className="glyphicon glyphicon-chevron-left"></i></div>
                                     <div className="scroller scroller-right"><i className="glyphicon glyphicon-chevron-right"></i></div> */}
                                    <div className="wrapper overflowMenuOrange">
                                        <div className="container">
                                            <div className="row">
                                                <ul className="nav nav-orange list" style={{position: 'absolute',left: '36px',top: '0px',minWidth: lengMenu+'px',marginLeft: '0px',marginTop: '0px'}}>
                                                    <li className="item"><div><img src={icnHome2} width="25" height="25" alt="icn-home" /></div></li>

                                                    {listMenu}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

            landingMenu = '';
            sgnupFooter = '';
            menuBeforeLogin='';
        }

        return(
            <div>
                <MetaTags>
                    <title>Trimegah eLearning</title>
                    <meta name="og:description" content= "Trimegah eLearning is a website you can learn more about stock market" />
                    <meta property="og:title" content= "Trimegah eLearning" />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content="https://www.tell.co.id/" />
                    <meta property="og:image" content= "https://www.tell.co.id/images/logo-TeLL.png" />
                </MetaTags>
                <Header {...this.props}/>

                {
                    this.state.popupSignup ? <PopupSignup {...this.props} closePopup={this.togglePopup.bind(this)} /> : null
                }

                {
                    this.state.popupLogin ? <PopupLogin {...this.props} closePopup={this.togglePopup.bind(this)} /> : null
                }

                {
                    this.state.popupForget ? <PopupForget {...this.props} closePopup={this.togglePopup.bind(this)} /> : null
                }

                <Carousel style={{zIndex:"-1000"}}
                    autoPlay={true}
                    showArrows={false}
                    showThumbs={false}
                    showStatus={false}
                    swipeable={true}
                    infiniteLoop={true}
                    emulateTouch={true}
                    showIndicators={true}
                >
                    <div className="bannerHolder">
                        <img src={slider1} alt="banner"></img>
                    </div>
                    <div className="bannerHolder">
                        <img src={slider2} alt="banner"></img>
                    </div>
                    {/* <div className="bannerHolder">
                        <img src={`${config.domain}/images/banner.png`} alt="banner"></img>
                    </div>
                    <div className="bannerHolder">
                        <img src={`${config.domain}/images/banner.png`} alt="banner"></img>
                    </div>
                    <div className="bannerHolder">
                        <img src={`${config.domain}/images/banner.png`} alt="banner"></img>
                    </div> */}

                </Carousel>
                {/*menu sblm login*/}
                {landingMenu}

                {menuAfterLogin}

                {menuBeforeLogin}
                <div className="container margin-top-10-mobile">

                    {content}
                    {recent}
                </div>

                <div className="clearfix">&nbsp;</div>

                {sgnupFooter}

                <Footer />


            </div>
        )
    }

}

const mapStateToProps = state => ({
    category: state.category,
    user: state.user
});

// export default Home;
export default connect(mapStateToProps)(Home);
