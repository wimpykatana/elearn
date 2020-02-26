import React, { Component } from 'react';
import { connect } from "react-redux";
import  { Link } from "react-router-dom";
import ListContent from '../../component/listContent';
import { fetchCategoryById , fetchCategoryByName } from '../../__thedux/action/categoryAction';
import Header from '../../component/header';
import Footer from '../../component/footer';
import Loader from  '../../component/loading';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slider1 from '../../image/slider/slider1.jpg';
import slider2 from '../../image/slider/slider2.jpg'
import icnHome from '../../image/home-black.svg';
import MetaTags from 'react-meta-tags';
import ReactGA from 'react-ga';
import config from '../../config/config';

let category;
let arrCategory;

class Catgeory extends Component {
    constructor(props){
        super(props)

        this.state ={
            
        }
    }

    componentWillMount() {
        if(this.props.location) {
            const char = this.props.location.pathname.split("/")[2].replace(/-/g," ");
            // console.log(char);

            // let arr = char.split("&");
            // arrCategory = arr[0].split(":");

            this.props.dispatch(fetchCategoryByName(char));
        }
    }

    render() {
        let img
        if(!this.props.category.detail){
          return (<div style={{paddingTop:'70px'}}>< Loader /></div>)
        }
        
        if(this.props.category.detail && this.props.category.detail.banner) {
            img = `${config.static}/images/${this.props.category.detail.banner}`;
        }
        else {
            img = slider1
        }

        return (
            <div>
                <MetaTags>
                    <title>Tell - {this.props.category.detail.name}</title>
                    <meta name="og:description" content= {this.props.category.detail.description} />
                    <meta property="og:title" content= {this.props.category.detail.name} />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content="https://www.tell.co.id/" />
                    <meta property="og:image" content="http://www.tell.co.id/static/media/logo-Tell.4a9d61e8.svg" />
                </MetaTags>
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
                        <img src={img} className="category" alt="banner"></img>
                    </div>
                    <div className="bannerHolder">
                        <img src={slider2} alt="banner"></img>
                    </div>
                </Carousel>

                <div className="container">
                    <section className="section-padding body-section">     	   	
    	                <div className="container">
                            <div>
                                <div className="col-xs-12">
                                    <ul className="breadcrumb-tell">
                                        <li><Link to="/" target="_self" ><img src={icnHome} alt="icon-home" width="25" height="25" style={{marginTop:"-8px"}} /></Link></li>
                                        <li className="active1">{this.props.category.detail.name}</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="clearfix">&nbsp;</div>

                            <div> 
                                <div className="col-xs-12">
                                    <h4 className="pull-left">{this.props.category.detail.name}</h4>
                                </div>
                            </div>
            
                            <div className="col-lg-6">
                                <div>
                                    <p className="text-justify font1">{this.props.category.detail.description}</p>
                                </div>
                            </div>

                            <div className="clearfix">&nbsp;</div>
                            <div className="clearfix">&nbsp;</div>
                            
                            <ListContent key={this.props.category.detail._id} {...this.props} categoryId={this.props.category.detail._id} />

                            <div className="clearfix">&nbsp;</div>             
                        </div>
                        
                        <div className="clearfix">&nbsp;</div>                            	
                    </section> 
                </div>
                <Footer />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    category: state.category,
    user: state.user
});

export default connect(mapStateToProps)(Catgeory);
