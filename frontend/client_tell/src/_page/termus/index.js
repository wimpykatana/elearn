import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';
import Header from '../../component/header';
import Footer from '../../component/footer';
import ReactGA from 'react-ga';
import config from '../../config/config';

//ReactGA.initialize(config.trackerId);
//ReactGA.pageview(window.location.pathname);

class Termus extends Component{
    constructor(props) {
        super(props);

        this.setToogle = this.setToogle.bind(this);
    }

    //change icon plus min
    setToogle(e) {
        const aElement = document.getElementsByTagName("A");

        for (let i = 0; i < aElement.length - 1; i++) {
            if(aElement[i].getAttribute('aria-controls')) {
                if(aElement[i].getAttribute('aria-expanded') === 'true') {
                    aElement[i].querySelector("I").className = 'more-less glyphicon glyphicon-minus';
                }
                else {
                    aElement[i].querySelector("I").className = 'more-less glyphicon glyphicon-plus';
                }
            }

        }

    }

    render(){
        return(
            <div>
				        <MetaTags>
                    <title>Tell - Term of use Page</title>
                    <meta name="og:description" content="This term of use page TELL" />
                    <meta property="og:title" content="Tell - About Page" />
					          <meta property="og:type" content="article" />
                    <meta property="og:url" content="https://www.tell.co.id/" />
                    <meta property="og:image" content="http://www.tell.co.id/static/media/logo-Tell.4a9d61e8.svg" />
                </MetaTags>
                <Header {...this.props} />
				<div className="orange-bg">
					<div className="container"> 
						<div className="row">
							<h1 className="text-center section-padding" style={{textTransform: 'uppercase'}}>Terms and conditions</h1>
						</div>
					</div>
				</div>

				<section className="section-padding body-section"> 
					{/* <!--div className="call-lagi"><a href="#" className="box-callcenter">&nbsp;</a></div-->*/}
					<div className="container"> 
						<h5><strong>Thank you for using Trimegah e-Learning (“TELL”).</strong></h5>
						<p className="text-justify">Please read the following terms and conditions (”Terms and Conditions”) carefully before using this website. These Terms and Conditions explain how you may use this website. By using this website, any user is defined as a user or person who uses, watches, views, reads, and/or log-in to register on this website ("User" or "You") accepts, without limitation or qualification, the Terms and Conditions set out below and any additional Terms and Conditions set out in this website. If You do not agree to these Terms and Conditions, You should exit the website.<br /><br />
						We will notify Users of any material changes to the Terms and Conditions by publishing a notice of such changes on the home page of this website. Your continued use of this site implies that You accept to be bound by the Terms and Conditions.<br/><br/>
						</p>

						<div className="clearfix">&nbsp;</div><div className="clearfix">&nbsp;</div>
				
						<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingOne">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseTwo">
											Proprietary <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>

								<div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
									<div className="panel-body text-justify">
										TELL is owned by PT Trimegah Sekuritas Indonesia Tbk (“Trimegah”).<div className="clearfix">&nbsp;</div>
									</div>
								</div>
							</div>
						
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingTwo">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
											Registration <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
									<div className="panel-body text-justify">
										You agree that any information You provide to us about yourself at any time will be complete, true, accurate, and current. You will ensure that this information is kept accurate and up to date.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div> 
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingThree">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
											Conditions of Registration <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
									<div className="panel-body text-justify">
										If You are under 17 years old, You must inform your parents or guardians before You, or ask us through e-mail: help@tell.co.id to enroll any courses and/or watch any videos. <br /><br />
										Please note that people under 17 years old are recommended to discuss these Terms and Conditions with their parents or guardians before they complete the registration process.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingFour">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
											TELL Rights <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseFour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
									<div className="panel-body text-justify">
										All rights, title, and interest in and to TELL and/or Trimegah services, including our website, our existing or future applications, our APIs (Applications Programming Interface), databases, and the content that our employees or partners submit or provide through our services (but excluding content provided by contributors and Users) are and will remain the exclusive property of TELL and/or Trimegah. Our website, platform and services are protected by copyright, trademark under laws of Indonesia. You have no right to use TELL and/or Trimegah name or any of TELL and/or Trimegah trademarks, logos, domain names, and other distinctive brand features. Any feedback, comments, or suggestions You may provide regarding TELL or the services are entirely voluntary and we will be free to use such feedback, comments, or suggestions if we see fit and without any obligation to You.<br /><br />
										You acknowledge and agree that all content included in this website and platform, including but not limited to website design, text, graphics, audio clips, visual clips, logos, button icons and the selection and arrangement thereof shall remain at all time are our authority. You are permitted to use this material only as expressly authorized by Trimegah. Subject to the foregoing, the page headers, custom graphics and button icons are (unless indicated otherwise) service marks and/or trademarks of ours. Nothing in these Terms and Conditions grants You any legal rights in the website other than as necessary to access the site.<br /><br />
										Any use of materials on this website including but not limited to reproduction, modification, distribution, transmission,  broadcasting, republication, downloading or uploading without our prior written permission is strictly prohibited.<br /><br />All related intellectual property rights and software used on this website is the property of TELL and/or Trimegah, and we are protected by Indonesian intellectual property rights laws.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingFive">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
											Advertisement <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseFive" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
									<div className="panel-body text-justify">
										When You use our services, it is possible that You will find advertisements along with links to other websites that we do not own or control. We are not responsible for the content or any other aspects of this third-party site, including gathering information about You. It is a must for You to read their terms and conditions, and privacy policy.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingSix">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
											Help Center <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseSix" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingSix">
									<div className="panel-body text-justify">
										Help Center would tell You how to enroll courses and watch videos, also address any questions You might have about our services.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingSeven">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
											Links <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseSeven" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingSeven">
									<div className="panel-body text-justify">
										We may provide links to websites owned by us and/or other party that has been or will become part of TELL from time to time and/or websites that are owned by third parties that are not connected with us, including other websites owned by us. All links are provided for your convenience only. Access to websites that are owned by third parties is at your own risk and we do not have any responsibility or liability for such third party websites. Your use of a third party site may be governed by the terms and conditions of that third party site.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingEight">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
											Availability of Service <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseEight" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingEight">
									<div className="panel-body text-justify">
										We will endeavor to ensure that this website is fully operational at all times. However, we cannot guarantee that the website will be fault free. In particular, access to this website may be interrupted or restricted to allow emergency or routine repairs or maintenance, or to introduce new facilities or services. We may suspend or terminate operation of the website and any sub-site at any time.<br /><br />
										You acknowledge and agree that we are permitted and/or allowed not to operate in a ‘force majeure’ situation.<br /><br />
										For the purposes of these Terms and Conditions, the term 'force majeure' shall be deemed to include any cause affecting our performance of our obligations arising from or attributable to acts, events, omissions or accidents beyond our reasonable control and in particular, but not limited to strikes, lock-outs, other industrial action, actual or threatened terrorist action, civil commotion, riot, crowd disorder, war, threat or preparation for war, fire, technical or power failure, software, hardware or telecommunication or other network failures, interruptions, disruptions or malfunctions, explosions, storm, flood, earthquake, subsidence, structural damage, epidemic or other disaster.<br /><br />
										We reserve our right to restrict, suspend or terminate your use of this website or any of our services at any time if we believe, in our absolute discretion, that You have breached these Terms and Conditions.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingNine">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
											Alterations <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseNine" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingNine">
									<div className="panel-body text-justify">
										We may amend this website and our services in any way and at any time with or without notice to You.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingTen">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
											Complaints and Comments <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseTen" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTen">
									<div className="panel-body text-justify">
										If you have any complaints or comments about our website or any of the products supplied to You, please contact us through the Contact Us section on the website, or via help@tell.co.id.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingEleven">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
											Miscellaneous <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseEleven" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingEleven">
									<div className="panel-body text-justify">
										The Terms and Conditions contain the full and complete understanding between us and You. No advice or information, whether oral or written, obtained by You through or from the website, or from any conversations with our staff in connection with these terms and conditions.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingTwelve">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
											Email Service <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseTwelve" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwelve">
									<div className="panel-body text-justify">
										In situations where we give You the option to subscribe to our email service which will update You with news or information which we consider to be of interest to You, your use of the content received through the email service will be subject to these Terms and Conditions.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingThirteen">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThirteen" aria-expanded="false" aria-controls="collapseThirteen">
											Disclaimer <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseThirteen" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThirteen">
									<div className="panel-body text-justify">
										The material provided in TELL is for educational purposes only. The material in TELL program has been carefully prepared by Trimegah and Trimegah endeavor to keep the information up to date and correct. The material contained therein is not tailored to any particular circumstances.<br /><br />
										TELL may be used as a guide but it is not a substitute for the existing current/applicable guidelines/evidence and expert opinion in relation to decision making in the practice. 
										Any reliance User place on such information is therefore strictly at User’s own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of TELL.<br /><br />
										Trimegah does not make any representation or warranty of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to TELL or the information, products, services, currency or related graphics contained in TELL for any purpose.<br /><br />
										Trimegah is not liable in contract, tort (including negligence) or otherwise, for any direct, indirect, special or consequential loss or damages arising in connection with the use or reliance upon the information contained in this TELL program, or any products or services referred to herein.<br /><br />
										Any TELL material protected by copyright and use for commercial purposes shall obtain Trimegah approval.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingFourteen">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFourteen" aria-expanded="false" aria-controls="collapseFourteen">
											Governing Law <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseFourteen" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFourteen">
									<div className="panel-body text-justify">
										These Terms and Conditions are governed by and shall be governed and construed in accordance with the laws of Indonesia whose courts shall be courts of exclusive competent jurisdiction. We make no representation that materials on this site are appropriate or available for use in other locations, and accessing them from territories where their contents are illegal is prohibited. Users who access this website from outside Indonesia will be responsible for their own risk and are responsible for compliance with local laws. Nothing in these Terms shall in any way be deemed to restrict or affect your statutory rights under Indonesian law.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingFifteen">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFifteen" aria-expanded="false" aria-controls="collapseFifteen">
											Language <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseFifteen" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFifteen">
									<div className="panel-body text-justify">
										The parties fully understand and acknowledge (i) the existence of the Law of the Republic of Indonesia No. 24 of 2009 dated July 9, 2009 regarding Flag, Language, Coat of Arms and Anthem (the “Law No. 24”), and (ii) the need of a Government Regulation to implement the regulation of Law No. 24.  Therefore, This Terms and Conditions is entered in English and Bahasa Indonesia.  For the avoidance of doubt, the parties agree that the applicable interpretation in this Terms and Conditions is Bahasa Indonesia version. Each party agrees that English and Bahasa Indonesia in this Terms and Conditions having the equal and original interpretation in accordance with the terms of this Terms and Conditions. In the event of any inconsistency with respect to Bahasa Indonesia version of this Terms and Conditions between the English version of this Terms and Conditions (or any agreement resulting herefrom or relating hereto) or later shall be construed in the language version of other country other than Bahasa Indonesia, the Bahasa Indonesia version of this Terms and Conditions shall prevail and any English and/or language version/translation of other country other than Bahasa Indonesia shall be deemed to be automatically amended to conform so that the English and/or other language version text shall be consistent with the relevant Bahasa Indonesia text.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
							
							<div className="panel panel-default" onClick={this.setToogle}>
								<div className="panel-heading" role="tab" id="headingSixteen">
									<h4 className="panel-title">
										<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSixteen" aria-expanded="false" aria-controls="collapseSixteen">
											Terms and Conditions Update <i className="more-less glyphicon glyphicon-plus"></i>
										</a>
									</h4>
								</div>
								<div id="collapseSixteen" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingSixteen">
									<div className="panel-body text-justify">
										We may add, change or remove any part of these Terms and Conditions at any time. Our updated Terms and Conditions will be displayed on the website. By continuing to use and access the website following any amendments, You agree to be bound by the amendementsmade by us. It is your responsibility to check these Terms and Conditions from time to time to verify such amendments. We may add, change, discontinue, remove or suspend any other content displayed on this website, including features and specifications of products and services described or depicted on the website, temporarily or permanently, at any time, without notice and without any liability.<div className="clearfix">&nbsp;</div>                            
									</div>
								</div>
							</div>
						</div>
														
					</div>        
				</section>    
				<div className="clearfix">&nbsp;</div>
  
                <Footer />
            </div>
        )
    }
}

export default Termus;
