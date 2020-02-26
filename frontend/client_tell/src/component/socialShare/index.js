import React, { Component } from 'react';
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import './style.css';
import icnshare from './icon-share.svg';

let shareUrl;
let title;
let emailshare;

class SocialShare extends Component {
  constructor(props){
    super(props);
    this.state={
      showShare: false,
    };

    this.shareNetworkBtnClick = this.shareNetworkBtnClick.bind(this);

  }

  componentWillMount() {
    shareUrl = this.props.shareUrl;
    title = this.props.title;
    emailshare = this.props.emailshare;

  }

  shareNetworkBtnClick(){
   this.setState({
     showShare: !this.state.showShare
   })
  }

  render() {
    return(
      <div style={{
        display:"block",
        height:"50px",
        margin: "5px 0"
      }}>
        <div className="share-network-btn" onClick={this.shareNetworkBtnClick}>
          <img src={icnshare} width={'32px'} height={'32px'} />
        </div>

        <div className={ this.state.showShare ? "social-btn-holder" : "social-btn-holder hidden"}>
          <div style={{float: 'left', margin: '0 5px 0 0', padding: '5px 0 0 0'}}>
            Share to :
          </div>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="social-network-btn rotate-center">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>

          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=" "
            className="social-network-btn rotate-center">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="social-network-btn rotate-center">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>

          <EmailShareButton
            url={shareUrl}
            subject={title}
            body={emailshare}
            separator= {" \r\r"}
            className="social-network-btn rotate-center">
            <EmailIcon
              size={32}
              round />
          </EmailShareButton>

        </div>
      </div>
    )
  }

}
export default SocialShare;
