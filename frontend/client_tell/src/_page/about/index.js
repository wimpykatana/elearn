import React, { Component } from 'react';

import Header from '../../component/header';
import Footer from '../../component/footer';
import MetaTags from 'react-meta-tags';
import ReactGA from 'react-ga';
import config from '../../config/config';

//ReactGA.initialize(config.trackerId);
//ReactGA.pageview(window.location.pathname);


class About extends Component{
    render(){
        return(
            <div>
                <MetaTags>
                    <title>Tell - About Page</title>
                    <meta name="title" content="Tell - About Page"></meta>
                    <meta name="description" content="This page will give your information about TELL"></meta>
                    <meta property="og:description" content="This page will give your information about TELL" />
                    <meta property="og:title" content="Tell - About Page" />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content="https://www.tell.co.id/" />
                    <meta property="og:image" content="http://www.tell.co.id/static/media/logo-Tell.4a9d61e8.svg" />
                </MetaTags>
                <Header {...this.props} />

                <div className="orange-bg">
                    <div className="container"> 
                        <div className="row">
                            <h1 className="text-center section-padding" style={{margin:0}}>ABOUT TELL</h1>
                        </div>
                    </div>
                </div>

                <section className="section-padding body-section">
    	            <div className="container"> 
                        <div className="col-lg-12">
                            <div className="row">
                                <h4 className="text-ls"><span>Who we are?</span></h4>
                            </div>

                            <div className="clearfix">&nbsp;</div>
       
                            <div className="row">
                                <p className="text-justify"/>
                                    Trimegah e-Learning (TELL) is the largest e-learning platform related to investment where you can learn everything about Indonesia capital market. We provide all relevant material to become a knowledgeable investor and arm you with the right mindset and skills necessary. At TELL, we dedicate our time to simplify the learning process and ensure our users are getting the answer what they want to know & have to know about capital market industry. Whether you are a novice who don’t know the first thing about capital market, or a seasoned investor who has been involved in capital market investment for some time, TELL will strive to always provide material that will help you become a more informed.
                                    TELL – structured learning with better experience.
                                    <div className="clearfix" >&nbsp; </div>
                                    Features

                                    <ol style={{paddingLeft:'15px'}}>
                                        <li>We provide structured &amp; sustainable learning to close the gap for novice &amp; ultimate investor with our unique ways, and even better, all of it is free for you.</li>
                                        <li>We use a different approach to understand the needs of our users. Our e-learning materials are created by our team who are licensed &amp; have accumulated over 10 years of experience in the Indonesian capital market.</li>
                                        <li>At TELL, we create &amp; combine the learning material passionately, and only selected speakers with quality materials can be our course instructor, because we believe a few quality people can make big difference.</li>
                                    </ol>

                                    <div className="clearfix">&nbsp;</div>
                                

				                <div className="clearfix">&nbsp;</div>
                                <div className="clearfix">&nbsp;</div>
			                </div>
                        </div>			
                    </div>        
                </section>

                <div className="clearfix" style={{height:'200px', display:'block'}}>&nbsp;</div>

                <div style={{display: 'block', height: "220px"}}></div>

                <Footer />
            </div>
        )
    }
}

export default About;
