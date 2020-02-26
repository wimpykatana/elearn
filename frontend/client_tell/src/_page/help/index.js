import React, { Component } from 'react';

import Header from '../../component/header';
import Footer from '../../component/footer';
import MetaTags from 'react-meta-tags';
import ReactGA from 'react-ga';
import config from '../../config/config';

//ReactGA.initialize(config.trackerId);
//ReactGA.pageview(window.location.pathname);

class Help extends Component{
    constructor(props){
        super(props);

        this.setToogle = this.setToogle.bind(this);
    }

    //change icon plus min
    setToogle(e) {
        const aElement = document.getElementsByTagName("A");
      
        for (let i = 0; i < aElement.length - 1; i++) {
            if(aElement[i].getAttribute('aria-controls')) {
                if(aElement[i].getAttribute('aria-expanded') === 'true') {
                    aElement[i].querySelector("I").scrollIntoView({ behavior: 'smooth', block: 'end', inline:"start" });
                    aElement[i].querySelector("I").className = 'more-less glyphicon glyphicon-minus';
                    
                    aElement[i].querySelector("I").scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
                    <title>Tell - Help Page </title>
                    <meta name="og:description" content= "This page will give your information about TELL" />
                    <meta property="og:title" content= "Tell - Help Page" />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content="https://www.tell.co.id/" />
                    <meta property="og:image" content= "http://www.tell.co.id/static/media/logo-Tell.4a9d61e8.svg" />
                </MetaTags>
                <Header {...this.props} />
                <div className="orange-bg">
                    <div className="container"> 
                        <div className="row">
                            <h1 className="text-center section-padding" style={{margin:0}}>HELP CENTER</h1>
                        </div>
                    </div>
                </div>
                <section className="section-padding body-section">  
    	{/* <div className="call-lagi"><a href="#" className="box-callcenter">&nbsp;</a></div>  	 */}
    	<div className="container">         	 
            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">            
            	<div className="panel panel-default" onClick={this.setToogle}>
            		<div className="panel-heading" role="tab" id="headingOne">
            			<h4 className="panel-title">
            				<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            					Video & Audio Issues: Troubleshooting <i className="more-less glyphicon glyphicon-plus"></i>
            				</a>
            			</h4>
            		</div>
            		<div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
            			<div className="panel-body text-justify">
            				If you’re encountering issues while attempting to watch your courses on a browser, please try the troubleshooting tips below before contacting TELL Support. Following these steps can resolve many of the common issues related to video playback.
Please note that a broadband connection with a minimum speed of 5Mbit or 800kbps is required to watch a TELL course on your device. The rest of TELL’s system requirements are listed here.
							<div className="clearfix">&nbsp;</div>
							<ol className="left-20">
                            	<li><strong>Streaming Issues (the video keeps loading/buffering)</strong>
                                	<ul className="left-20">
                                    	<li>Refresh your browser</li>
                                        <li>Quit your browser and re-open it</li>
                                        <li>Clear your <a href="https://www.wikihow.com/Clear-Your-Browser's-Cache" target="_blank" rel="noopener noreferrer">browser's cookies and cache</a>. Be sure to restart your browser before trying again</li>
                                        <li>Try a different browser, like <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                                        <li>Take a note of your browser extensions/plugins/firewall programs. Is there anything that could be interfering with the streaming of the videos? We recommend testing with <a href="https://support.google.com/chrome/answer/95464?hl=en" target="_blank" rel="noopener noreferrer">an incognito window</a> to troubleshoot</li>
                                        <li><a href="https://www.whatsmybrowser.org/" target="_blank" rel="noopener noreferrer">Check your browser version</a> and update it if needed</li>
                                        <li>Log out TELL website and/or mobile app and re-login</li>
                                        <li>Restart your computer and network devices (modems/switches/routers)</li>
                                        <li>Try a different device or computer if possible</li>
                                        <li>Turn off hardware acceleration (in Firefox, Google Chrome, Safari or on <a href="https://www.wikihow.com/Turn-Off-Hardware-Acceleration" target="_blank" rel="noopener noreferrer" >Windows</a>)</li>
                                        <li>Try lowering the course video quality</li>
                                        <li>Test your <a href="http://www.speedtest.net/" target="_blank" rel="noopener noreferrer">internet connection speed</a></li>
                                        <li>Try watching another TELL course. If you’re only enrolled in one course, try watching videos in one of the many free courses on the website.</li>
                                	</ul>                                            
                                </li>
                                <span className="clearfix">&nbsp;</span>
                                <li><strong>Blank Screen</strong>
                                	<ul className="left-20">
                                    	<li>Refresh your browser</li>
                                        <li>Quit your browser and re-open it</li>
                                        <li>Clear your <a href="https://www.wikihow.com/Clear-Your-Browser's-Cache" target="_blank" rel="noopener noreferrer">browser's cookies and cache</a>. Be sure to restart your browser before trying again</li>
                                        <li>Try a different browser, like Google Chrome, Safari, or Firefox</li>
                                        <li>Take a note of your browser extensions/plugins/firewall programs. Is there anything that could be interfering with the streaming of the videos? We recommend testing with <a href="https://support.google.com/chrome/answer/95464?hl=en" target="_blank" rel="noopener noreferrer">an incognito window</a> to troubleshoot.</li>
                                        <li>Log out TELL website and/or mobile app and re-login</li>
                                        <li>Restart your computer and network devices (modems/switches/routers)</li>
                                        <li><a href="https://www.whatsmybrowser.org/" target="_blank" rel="noopener noreferrer">Check your browser version</a> and <a href="https://browsehappy.com/?locale=en" target="_blank" rel="noopener noreferrer">update it if needed</a></li>
                                        <li>Try a different device or computer if possible</li>
                                        <li>Turn off hardware acceleration (in <a href="https://support.mozilla.org/en-US/kb/performance-settings?as=u&utm_source=inproduct" target="_blank" rel="noopener noreferrer">Firefox</a> or on <a href="https://www.wikihow.com/Turn-Off-Hardware-Acceleration" target="_blank" rel="noopener noreferrer">Windows</a>).</li>
                                    </ul>
                                </li>
                                <span className="clearfix">&nbsp;</span>
                                <li><strong>No Sound on Video</strong>
                                	<ul className="left-20">
                                    	<li>Refresh your browser</li>
                                        <li>Quit your browser and re-open it</li>
                                        <li>Log out of TELL website and/or mobile app and re-login</li>
                                        <li><a href="http://www.wikihow.com/Clear-Your-Browser's-Cache" target="_blank" rel="noopener noreferrer">Clear your browser's cookies and cache</a>. Be sure to restart your browser before trying again</li>
                                        <li>Take a note of your browser extensions/plugins/firewall programs and adblockers. Is there anything that could be interfering with the audio? We recommend testing with <a href="https://support.google.com/chrome/answer/95464?hl=en" target="_blank" rel="noopener noreferrer">an incognito window</a> to troubleshoot</li>
                                        <li>Check to see if other lectures in the course are producing sound.</li>
                                    </ul>
                                </li>
                                <div className="clearfix">&nbsp;</div>
                                Other courses types: If you can't hear anything, it's also possible that the courses do not have sound. Course instructors can create text based courses or courses that feature PDF slides that do not include audio.
                                <div className="clearfix">&nbsp;</div>
If you're still having trouble, it's possible that there's something wrong with the video file. Please contact our support team at help@tell.co.id. When contacting support, please be mention as follow:
								<ul>
                                	<li>Your browser version (Google Chrome, Safari, Firefox, etc.)</li>
                                    <li>Your OS (Windows 10, Mac OS X, etc.)</li>
                                    <li>The course URL and lecture number</li>
                                    <li>Your internet connection speed test results</li>
                                    <li>The resolution you were watching the video course at (i.e. - 720p, 480p etc.)</li>
                                    <li>A screenshot or screencast of the problem. The more information you can provide, the faster we'll be able to resolve the issues you're encountering on our site.</li>
                                </ul>    
                        	</ol>        
            			</div>
            		</div>
            	</div>
            
            	<div className="panel panel-default" onClick={this.setToogle}>
            		<div className="panel-heading" role="tab" id="headingTwo">
            			<h4 className="panel-title">
            				<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" onClick={this.setToogle} aria-expanded="false" aria-controls="collapseTwo">
            					Creating and Editing Your Profile <i className="more-less glyphicon glyphicon-plus"></i>
            				</a>
            			</h4>
            		</div>
            		<div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
            			<div className="panel-body text-justify">
            				Every TELL account includes a profile page, where you can share information about yourself, and add links to your personal website or social media profiles.<div className="clearfix">&nbsp;</div>
                            <strong>How to Edit Your Profile</strong><br />
                            To edit your profile, including adding your profile's image, click the drop down menu in the upper right corner of your account and click on your name. You can also head to your profile page by clicking here.<br />
To edit your profile bio, simply type in your first and last name, your headline, and what you want your biography to say. Next, click <strong>save</strong> at the bottom of the page.<div className="clearfix">&nbsp;</div>

							<strong>How to Upload Your Profile Picture</strong><br />
                            To upload (or edit) your profile picture, click <strong>photo</strong> on the left hand side of your <strong>profile page</strong>. Then choose an image from your computer to upload. Once it’s uploaded, you can crop it, if necessary, and then click <strong>save</strong>.<div className="clearfix">&nbsp;</div>
                            
                            <strong>How to Add External Links to Your Profile</strong><br />
                            In your profile you can add links to your personal website, YouTube channel, and social media profiles i.e. Google+, Twitter, Facebook, and LinkedIn. These links can provide more information about your experience and credentials, and are a great way for course instructors to tell users more about them and increase their audience. 
To add external links to your profile, scroll to the bottom of your <strong>profile page</strong> and enter your information. After you’ve entered the external links, click <strong>save</strong>.<div className="clearfix">&nbsp;</div>

							<strong>How to View Your Profile</strong><br />
                            If you wish to see how your profile will appear to other users and course instructors, simply click <strong>view public profile</strong> on the left hand side of your <strong>profile</strong> page.<div className="clearfix">&nbsp;</div>
                            
                            <strong>Editing Your Privacy Settings</strong><br />
                            You can access your <strong>privacy</strong> settings, and set whether you wish to have your profile publicly visible on the privacy page. In addition, you can also set whether you wish to share what courses you’re enrolled in, on this page. By default, account profiles are publicly visible, unless the settings are changed.<br />
Your privacy settings can be accessed by clicking on <strong>privacy</strong> on the left hand side of your <strong>profile page</strong>. To make your profile or enrolled courses private, simply click on the check mark beside each option and click <strong>save</strong>.<div className="clearfix">&nbsp;</div>

							<strong>Using Your Google or Facebook Account to Access TELL</strong><br />
                            In addition to registering for TELL by entering an email address and creating a password, on TELL website and/or mobile app, you can also sign up using your Google or Facebook account.
            			</div>
            		</div>
            	</div>
            
            	{/* <div className="panel panel-default" onClick={this.setToogle}>
            		<div className="panel-heading" role="tab" id="headingThree">
            			<h4 className="panel-title">
            				<a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false"  onClick={this.setToogle} aria-controls="collapseThree">
            					How to Sign up Using Your Google or Facebook Account <i className="more-less glyphicon glyphicon-plus"></i>
            				</a>
            			</h4>
            		</div>
            		<div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
            			<div className="panel-body text-justify">
            				If you wish to sign up for TELL using your Google or Facebook account, then follow the steps outlined below on website and/or mobile app.  Please note that by following these steps, if you haven’t already created a TELL account using your Facebook or Google account email address, this process will create a new account on TELL.<div className="clearfix">&nbsp;</div>
                            
                            <ol className="left-20">
                            	<li>Open TELL website and/or mobile app on your mobile device</li>
								<li>Click either the Google or Facebook sign in icon</li>
								<li>Follow the prompts to complete the sign up process</li>
                            </ol>    
After you’ve created a new account with Facebook or Google, you can log into <a href="https://tell.co.id/" target="_blank">https://tell.co.id</a> via a browser, by clicking continue with Facebook or continue with Google.  You can also continue to login on the mobile app via the Google or Facebook sign in options.<div className="clearfix">&nbsp;</div>

							<strong>How to Connect Your Existing TELL Account to Facebook or Google</strong><br />
                            If you wish to connect your existing TELL account to your Facebook or Google account, you can quickly do so by following the steps below:
							<ol className="left-20">
                            	<li>Move your cursor to the top right of TELL's homepage, then click login</li>
								<li>Click continue with Facebook or continue with Google</li>
								<li>Enter the email address and password that’s connected to your Facebook or Google account</li>
							</ol>
                            <em>Please note that in order to establish a connection, the same email address must be registered to both your TELL account and your Facebook or Google account.  If there is not an existing account with the email address you are attempting to connect to Facebook or Google, instead of connecting the accounts, this process will create a new account.</em><div className="clearfix">&nbsp;</div>
Moving forward, you’ll be able to log into your TELL account by clicking on <strong>continue with Facebook</strong> or <strong>continue with Google</strong>, or by entering the email and password for your TELL account that you signed up with initially. Remember that your TELL account password may differ from the password registered to your Facebook or Google account.<div className="clearfix">&nbsp;</div>

							<strong>Unlinking Your Facebook or Google Account From TELL</strong><br />
                            If you registered for TELL using the Facebook or Google sign up options, and wish to unlink your Facebook or Google account from TELL, you will need to create a new password, if you have not already. Then you will be able to log into TELL using your email address, rather than the Facebook or Google sign in options.<div className="clearfix">&nbsp;</div>
							To create a new password for your TELL account, follow the steps below:
                            <ol className="left-20">
                            	<li>Log into TELL.com on a browser via either the <strong>Facebook</strong> or <strong>Google sign in</strong> option</li>
                            	<li>Move your cursor to your profile avatar at the top right, and click on your name</li>
                            	<li>Select <strong>account</strong> on the left hand side</li>
                            	<li>Enter a new password for your password, re-type the new password, and click <strong>change password</strong></li>
                           </ol>     
Once you’ve created a new password, please contact us at <a href="#" target="_blank">help@tell.co.id</a>, so we can proceed with unlinking your account. (If you forget to set a new password, you can still follow the password process to access your account). Please be sure to provide us with the e-mail address that is linked to your Facebook or Google account, which you signed up with originally, when you contact TELL Support.

            			</div>
            		</div>
            	</div>                                
             */}
            </div>
            <div className="clearfix">&nbsp;</div>               
            <div className="clearfix"  style={{height:'350px', display:'block'}}>&nbsp;</div>
                                              
        </div>        
    </section>
    <div style={{display: 'block', height: "270px"}}></div>
                <Footer/>
            </div>
        )
    }
}

export default Help;
