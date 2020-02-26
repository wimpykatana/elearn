import React, { Component } from 'react';
import config from '../../config/config.json';
import PlayerVid from '../../component/player';
import { Carousel } from 'react-responsive-carousel';
import ListContentBaris from '../../component/listContentBaris';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import { getDetailCourse } from '../../__thedux/action/coursesAction';
import Header from '../../component/header';
import Footer from '../../component/footer';
import Loader from '../../component/loading';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slider1 from '../../image/slider/slider1.jpg';
import slider2 from '../../image/slider/slider2.jpg'
import { countRatings } from '../../utilis/ratings';
import icnHome from '../../image/home-black.svg';
import MetaTags from 'react-meta-tags';
import Audio from '../../component/audio';

import ReactGA from 'react-ga';
import SocialShare from '../../component/socialShare';

//ReactGA.initialize(config.trackerId);
//ReactGA.pageview(window.location.pathname);

let headContent = '';
let bodyContent = '';
let arrCategory;
let arrContent;
let idContent;
let categoryName;
let shareUrl;
let title;
let emailshare;

class DetailPodcast extends Component{
    constructor(props){
        super(props);
        this.state={
            contenID: '',
            conten: '',
            token: '',
            rplayer: new window.rPlayer(),
            currentSecond:0,
            currentMinute:0
        };

        this.init = this.init.bind(this);
    }

    componentWillMount() {
        if (this.props.location) {

        shareUrl =  window.location.href;

        let url = this.props.location.pathname.split("/")[3].replace(/-/g, " ");
        categoryName = this.props.match.params.categoryName.replace(/-/g, " ");

        //   let id = this.props.location.search.slice(1);
        //   console.log(id);

        this.props.dispatch(getDetailCourse(url));

        }
    }
  
    componentDidMount (){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    init() {

        const dataContent = (this.props.location.state && this.props.location.state.content.video) ? this.props.location.state.content :  this.props.courses.data.content;

        if(dataContent) {

            arrCategory = dataContent.categoryId;
            arrContent = dataContent._id;
            idContent = arrContent;
            title = dataContent.title;
            emailshare = dataContent.objective;
            
            let levelLeason;

            if(dataContent.level === 1){
                levelLeason = "Beginner"
            }
            if(dataContent.level === 2){
                levelLeason = "Intermediate"
            }
            if(dataContent.level === 3){
                levelLeason = "Expert"
            }

            bodyContent = 
                <div className="row">

                    <MetaTags>
                        <title>Tell - {dataContent.title} </title>
                        <meta name="og:description" content= {dataContent.objective} />
                        <meta property="og:title" content= {dataContent.title} />
                        <meta property="og:type" content="article" />
                        <meta property="og:url" content="https://www.tell.co.id/" />
                        <meta property="og:image" content={`${config.static}/images/${dataContent.imagePreview}`} />
                    </MetaTags>

                    <div className="col-xs-12 col-md-5 pull-right">
                        <Audio {...this.props} src={`${config.static}/api/v1/videos/${dataContent.video}`} />

                        <div className="clearfix">&nbsp;</div>
                    </div>

                    <div className="col-xs-12 col-md-7 pull-left">
                    <ul className="breadcrumb">  
                        <span className="bread-detail-vid">
                            <h3>{dataContent.title}</h3>
                            <div style={{display: "block"}}>

                              <SocialShare shareUrl={shareUrl} title={title} emailshare={emailshare} />

                            </div>
                            <li className="bread-detail">
                                <div className="">
                                    <span className="rating"><span style={{width: `${countRatings(dataContent.ratings) * 20}%`}}></span> </span>
                                </div>
                            </li>
                            
                            {/* <li className="bread-detail">Enrolled {dataContent.enrolled} times</li> */}
                            {/* <li className="bread-detail">{dataContent.timeVideo}</li> */}
                            {/* <li className="bread-detail">{dataContent.language}</li> */}
                            {/* <li className="bread-detail">{moment(dataContent.uploadDate).format('MMM D / YYYY')}</li> */}
                            <li className="bread-detail">{levelLeason}</li>
                            <li className="clearfix">&nbsp;</li>
                            <li className="bread-detail" style={{textTransform: "capitalize"}}>{dataContent.contributorName}</li>
                        </span>  
                    </ul>
                    <div className="mygrid-wrapper">           	
                        <h5 style={{ marginBottom:0 }}><strong>Video Objective</strong></h5>
                        <p className="text-justify">
                            {dataContent.objective}
                        </p>
                        <h5 style={{ marginBottom:0 }}><strong>Video Description</strong></h5>
                        <p className="text-justify">
                            {dataContent.description}
                        </p>
                    </div>
                    </div>
                </div>;
        }else{
          window.location.replace('/notfound');
        }
        
    }

    render() {
        if(!this.props.courses.data || this.props.courses.data.length >= 0) {
            return (
                <div style={{margin: '20px 0 0 0'}} >
                    <Loader />
                </div>
            )
        }
        
        let categoryName = this.props.match.params.categoryName.replace(/-/gi, " ");

        this.init();
        return (
            <div>
                
                <Header {...this.props} />
                <Carousel
                    showArrows={false}
                    showThumbs={false}
                    showStatus={false}
                    swipeable={false}
                    infiniteLoop={false}
                    emulateTouch={false}
                    showIndicators={false}
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
                    </div>
                    <div className="bannerHolder">
                        <img src={`${config.domain}/images/banner.png`} alt="banner"></img>
                    </div> */}
                    
                </Carousel>

                <section className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <ul className="breadcrumb-tell">
                                    <li><Link target="_self" to="/"><img src={icnHome} alt="icon-home" width="25" height="25" style={{marginTop:"-8px"}} /></Link></li>
                                    <li><Link target="_self" to={{pathname:`/category/${this.props.match.params.categoryName}`}}>{categoryName}</Link></li>
                                    <li className="active1">{this.props.courses.data.content.title}</li>
                                </ul>
                            </div>
                        </div>
                        {headContent}
                        {bodyContent}
                        <div className="clearfix"><hr /><br /><br /></div>
                        <ListContentBaris key={arrCategory} contentId={arrContent} {...this.props} />
                    </div>
                </section>
                <Footer />
            </div>
            
        )
    }

}

const mapStateToProps = state => ({
    courses: state.courses,
    dataCourses: state.courses.data,
    user: state.user
});

export default connect(mapStateToProps)(DetailPodcast);
