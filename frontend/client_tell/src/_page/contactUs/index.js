import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from '../../component/header';
import Footer from '../../component/footer';
import config from '../../config/config';
import {Link} from "react-router-dom";
import icnHome from '../../image/home-black.svg';
import {search, list} from '../../__thedux/action/emitenAction';
import {contact} from '../../__thedux/action/contactAction';
import {regexEmail} from '../../utilis/regexEmail';
let li = '';
let hideBtn = false;

class ContactUs extends Component{
    constructor(props) {
        super(props)

        this.state = {
            type: 0,
            type2: 0,
            ulShow: false,
            arrType: ["Select Option", "Emiten", "Others"],
            arrMsg: ["Select Option", "Company visit video","Company profile video", "Others"],
            contact: {
                type: '0',
                type2: '0',
                emiten: '',
                emiten2: '',
                fullname: '',
                hp:'',
                email: '',
                drline: '',
                sMessage: '0',
                sMessage2:'',
                message: ''
            }
        }

        this.clickSelect1 = this.clickSelect1.bind(this);
        this.clickSelect2 = this.clickSelect2.bind(this);
        this.onChangeEmiten = this.onChangeEmiten.bind(this);
        this.submit = this.submit.bind(this);
        this.onSelectEmiten = this.onSelectEmiten.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.clickEmiten = this.clickEmiten.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.setCssReuired = this.setCssReuired.bind(this);
    }

    async componentWillMount() {
        await this.props.dispatch(list())
    }

    clickSelect1(e) {
        const value = e.target.value
        this.setState({
            type: value
        });

        this.setState(
            prevState => ({
                contact: {
                    ...prevState.contact,
                    type: value,
                    type2: this.state.arrType[value]
                }
            })
        );
    }

    clickSelect2(e) {        
        const value = e.target.value

        this.setState({
            type2: value
        });

        this.setState(
            prevState => ({
                contact: {
                    ...prevState.contact,
                    sMessage: value,
                    sMessage2: this.state.arrMsg[value]
                }
            })
        );

        document.getElementById("messageSelect").style.border = "1px solid #e0e0e0";

        if(this.state.contact.message.length < 10) {
            document.getElementById("areMsg").style.border = "1px solid red";
        } else {
            document.getElementById("areMsg").style.border = "1px solid #e0e0e0";
        }
    }

    onChangeEmiten(e) {
        const value = e.target.value
        this.setState(
            prevState => ({
                ulShow:true,
                contact: {
                    ...prevState.contact,
                    emiten: value,
                    emiten2: ''
                }
            })
        );

        if(e.target.value === '') {
            this.props.dispatch(list())
        }
        else {
            this.props.dispatch(search(e.target.value));
        }
    }

    onSelectEmiten(value) {
        this.setState(
            prevState => ({
                ulShow: false,
                contact: {
                    ...prevState.contact,
                    emiten2: value,
                    emiten:value
                }
            })
        );

        document.getElementById("EmitenSelect").style.border = "1px solid #e0e0e0";
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;

        this.setState(
          prevState => ({
            contact: {
              ...prevState.contact,
              [name]: value
            }
          })
        );

        this.setCssReuired(name, e);
    }

    async submit() {
        if(hideBtn) {
            return;
        }

        let token = '';

        if(config.env === 'production') {
            this.props.dispatch({type: 'CONTACT_SUBMIT_START'});

            token = await this.props.googleReCaptchaProps.executeRecaptcha("homepage");
        }

        await this.props.dispatch(contact(this.state.contact, token));
        
        this.setState({
            type: 0,
            type2: 0,
            contact: {
                type: '0',
                type2: '0',
                emiten: '',
                emiten2: '',
                fullname: '',
                hp:'',
                email: '',
                drline: '',
                sMessage: '0',
                sMessage2:'',
                message: ''
            }
        });

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    setCssReuired(name, e) {
        switch(name) {
            case "emiten":
                if(this.state.contact.emiten2 === '') {
                    e.target.style.border = "1px solid red"
                }
                else {
                    e.target.style.border = "1px solid #e0e0e0"
                }
            
              break;
            case "fullname":
                if(this.state.contact.fullname.length < 3) {
                  e.target.style.border = "1px solid red"
                }
                else{
                    e.target.style.border = "1px solid #e0e0e0"
                }

                break;
            case "hp":
                if(this.state.contact.hp.length < 8 || this.state.contact.hp.length > 13) {
                  e.target.style.border = "1px solid red"
                }
                else{
                    e.target.style.border = "1px solid #e0e0e0"
                }

                break;
            case "email":
                if(!regexEmail(this.state.contact.email.trim())) {
                  e.target.style.border = "1px solid red"
                }
                else{
                    e.target.style.border = "1px solid #e0e0e0"
                }

                break;
            case "drline":
                if(this.state.contact.drline.length < 9 || this.state.contact.drline.length > 17) {
                  e.target.style.border = "1px solid red"
                }
                else{
                    e.target.style.border = "1px solid #e0e0e0"
                }

                if(this.state.contact.sMessage2 === '') {
                    document.getElementById("messageSelect").style.border = "1px solid red"
                }
                
                break;
            case "message":
                if(this.state.contact.message.length < 10) {
                  e.target.style.border = "1px solid red"
                }
                else{
                    e.target.style.border = "1px solid #e0e0e0"
                }
                 
                break;
        }
    }

    onMouseOut(e){
        let name = e.target.name;

        this.setCssReuired(name, e)
    }

    clickEmiten() {
        this.setState({
            ulShow: !this.state.ulShow,
        });
    }

    render() {
        if(this.state.type === '1') {
            if(!regexEmail(this.state.contact.email.trim()) || this.state.contact.sMessage === '0' || (this.state.contact.drline.length < 8 || this.state.contact.drline.length > 17) || (this.state.contact.hp.length < 10 || this.state.contact.hp.length > 13) || this.state.contact.type === '0' || this.state.contact.emiten2.length < 3 || this.state.contact.fullname.length < 3) {
                hideBtn = true;
            }
            else if(this.state.contact.sMessage2 === 'Others' && this.state.contact.message.length < 10){
                hideBtn = true;
            }
            else {
                hideBtn = false;
            }
            
        }

        if(this.state.type === '2') {
            if(!regexEmail(this.state.contact.email.trim()) || (this.state.contact.hp.length < 10 || this.state.contact.hp.length > 13) || this.state.contact.fullname.length < 3 || this.state.contact.message.length < 10) {
                hideBtn = true;
            }
            else {
                hideBtn = false;
            }
            
        }

        if(this.props.emiten.start) {
            li = <li className="list-group-item">loading...</li>
        }

        if(this.props.emiten.data) {
            li = this.props.emiten.data.data.map((item) => (<li key={item._id} onClick={() => this.onSelectEmiten(item.name+" - "+item.code+"")} className="list-group-item">{item.name} - {item.code}</li>))
        }

        return (
            <>
                <Header {...this.props} />

                <div className="orange-bg">
                    <div className="container"> 
                        <div className="row">
                            <h1 className="text-center section-padding" style={{margin:0}}>CONTACT US</h1>
                        </div>
                    </div>
                </div>

                <section className="section-padding">
	                <div className="container" style={{minHeight:"500px"}}>
                        <div className="row"> 
                            <div className="col-xs-12">

                                <ul className="breadcrumb-tell">
                                    <li><Link target="_self" to="/"><img src={icnHome} alt="icon-home" width="25" height="25" style={{marginTop:"-8px"}} /></Link></li>
                                    <li>Contact Us</li>
                                </ul>
                            </div>
                        </div>

		                <div className="col-lg-12">
                            {
                                (this.props.contact.data && !this.props.contact.data.error)  ? <div className="col-md-12">
                                <div className="col-md-6 col-md-offset-3 animated fadeInDown delay-5s text-center alert alert-success" role="alert"><p>Thank you for trusting us, we will get back to you.</p></div>
                                </div> : ''
                            }

                            {
                                (this.props.contact.data && this.props.contact.data.error)  ? <div className="col-md-12"><div className={"col-md-6 col-md-offset-3 animated fadeInDown delay-5s text-center alert alert-danger"} role="alert"><p>Server error</p></div></div> : ''
                            }
                            
                            <div className="row">
                                <h4 className="text-ls"><span>Do you have any enqueries ?</span></h4>
                            </div>

                            <div className="clearfix">&nbsp;</div>
                            <div className="clearfix">&nbsp;</div>

			                <div className="row" style={{opacity:(this.props.contact && this.props.contact.start) ? '0.3' : 1}}>
				                <div className="col-sm-7 col-sm-offset-2">
					                <div className="row">
                                        <div className="col-md-3">
                                            <label><strong>Who you are</strong></label>
                                        </div>

						                <div className="col-md-1 text-right hidden-xs hidden-sm">:</div>

                                        <div className="col-md-8 contact-us">
                                            <select value={this.state.contact.type} onChange={this.clickSelect1} className="form-control padding-5-10">
                                                {
                                                    this.state.arrType.map((item, index) => (<option key={index} value={index}>{item}</option>))
                                                }
                                            </select>
                                        </div>
					                </div>

                                    <div className="row" style={{display:(this.state.type === '1') ? "block":"none"}}>
                                        <div className="col-md-3">
                                            <label><strong>Public listed company <span className="text-danger">*</span></strong></label>
                                        </div>
                                        <div className="col-md-1 text-right hidden-xs hidden-sm">:</div>
                                        <div className="col-md-8">
                                            <input id="EmitenSelect" disbaled={(this.props.contact && this.props.contact.start) ? 'disabled' : ''} onMouseOut={this.onMouseOut} value={this.state.contact.emiten} name="emiten" type="text" onChange={this.onChangeEmiten} className="form-control is-valid padding-5-10" placeholder="Type your company name" />
                                            <span style={{position:"absolute", top:"12px", right:"10px", display:(!this.state.ulShow) ? "block" : "none"}} onClick={this.clickEmiten} class="glyphicon glyphicon-triangle-bottom"></span>
                                            <span style={{position:"absolute", top:"10px", right:"10px", display:(this.state.ulShow) ? "block" : "none"}} onClick={this.clickEmiten} class="glyphicon glyphicon-triangle-top"></span>
                                            
                                            {(this.state.ulShow)  ? 
                                                <ul className="list-group search-drop-down" style={{maxHeight:"100px", overflow: "none", overflowY:"scroll"}} >
                                                    {
                                                        li
                                                    }
                                                </ul> : <ul className="list-group search-drop-down"></ul>
                                            }
                                        </div>
                                    </div>

					                <div className="row" style={{display:(this.state.type === '1' || this.state.type === '2') ? "block":"none"}}>

                                    <div className="col-md-3">
                                        <label><strong>Full Name <span className="text-danger">*</span></strong></label>
                                    </div>

						            <div className="col-md-1 text-right hidden-xs hidden-sm">:</div>
                                    <div className="col-md-8 contact-us">
                                        <input disbaled={(this.props.contact && this.props.contact.start) ? 'disabled' : ''} onMouseOut={this.onMouseOut} value={this.state.contact.fullname} name="fullname" onChange={this.handleInput} type="text" className="form-control padding-5-10" id="1" placeholder="Please input" />
                                    </div>
					            </div>

					            <div className="row" style={{display:(this.state.type === '1' || this.state.type === '2') ? "block":"none"}}>
                                    <div className="col-md-3">
                                        <label><strong>Mobile <span className="text-danger">*</span></strong></label>
                                    </div>

						            <div className="col-md-1 text-right hidden-xs hidden-sm">:</div>

                                    <div className="col-md-8 contact-us">
                                        <input disbaled={(this.props.contact && this.props.contact.start) ? 'disabled' : ''} onMouseOut={this.onMouseOut} value={this.state.contact.hp} name="hp" onChange={this.handleInput} type="number" className="form-control padding-5-10" id="1" placeholder="Please input" />
                                    </div>
					            </div>

					            <div className="row" style={{display:(this.state.type === '1' || this.state.type === '2') ? "block":"none"}}>
                                    <div className="col-md-3">
                                        <label><strong>Email <span className="text-danger">*</span></strong></label>
                                    </div>

						            <div className="col-md-1 text-right hidden-xs hidden-sm">:</div>
                                    <div className="col-md-8 contact-us">
                                        <input disbaled={(this.props.contact && this.props.contact.start) ? 'disabled' : ''} onMouseOut={this.onMouseOut} value={this.state.contact.email} name="email" onChange={this.handleInput} type="email" className="form-control padding-5-10" id="1" placeholder="Please input" />
                                    </div>
					            </div>

                                <div className="row" style={{display:(this.state.type === '1') ? "block":"none"}}>
                                    <div className="col-md-3">
                                        <label><strong>Direct Line (Ext) <span className="text-danger">*</span></strong></label>
                                    </div>
                                    <div className="col-md-1 text-right hidden-xs hidden-sm">:</div>
                                    <div className="col-md-8">
                                        <input disbaled={(this.props.contact && this.props.contact.start) ? 'disabled' : ''} onMouseOut={this.onMouseOut} value={this.state.contact.drline} name="drline" onChange={this.handleInput} type="text" className="form-control padding-5-10" id="1" placeholder="Please input" />
                                        <em className="small text-muted">(example: 021-29289427-123)</em>
                                    </div>
                                </div>

                                <div className="row" style={{marginTop:"10px",display:(this.state.type === '1') ? "block":"none"}}>
                                    <div className="col-md-3">
                                        <label><strong>Objective <span className="text-danger">*</span></strong></label>
                                    </div>
                                    <div className="col-md-1 text-right hidden-xs hidden-sm">:</div>
                                    <div className="col-md-8 contact-us">
                                        <select id="messageSelect" value={this.state.contact.sMessage} onChange={this.clickSelect2} className="form-control padding-5-10">
                                            {
                                                this.state.arrMsg.map((item, index) => (<option key={index} value={index}>{item}</option>))
                                            }
                                        </select>
                                    </div>
                                </div>
                                {(this.state.type === '0') ? '' : 
                                    <div className="row" style={{display:(this.state.type === '2' || this.state.type2 === '3') ? "block":"none"}}>
                                        <div className="col-md-3">
                                            <label><strong>Message </strong></label>
                                        </div>
                                        <div className="col-md-1 text-right hidden-xs hidden-sm">:</div>
                                        <div className="col-md-8 contact-us">
                                            <textarea id="areMsg" disbaled={(this.props.contact && this.props.contact.start) ? 'disabled' : ''} onChange={this.handleInput} name="message" value={this.state.contact.message} className="form-control" rows="3"></textarea>
                                        </div>
                                    </div>
                                }
                                
                                <div className="row" style={{display:(this.state.type > 0) ? "block" : "none"}}>
                                    <div className="col-md-3">&nbsp;</div>
                                    <div className="col-md-1 text-right hidden-xs hidden-sm">&nbsp;</div>
                                    <div className="col-md-3">
                                        <button onClick={this.submit} disabled={(hideBtn) ? "disabled" : ""} type="button" className="btn btn-blue btn-md btn-block">{(this.props.contact && this.props.contact.start) ? "Waiting..." : 'SEND'}</button>	
                                    </div>
                                </div>

                                <div className="row" style={{display: (this.state.type === 0 || this.state.type === '0') ? 'none': 'block'}}>
                                    <div className="col-md-3">
                                        <strong><span className="text-danger">*</span></strong> <em className="small">Required</em>
                                    </div>
                                </div> 
				            </div>
			            </div>                                                            
		            </div>
                </div>  
            </section>
            <div className="clearfix">&nbsp;</div>
             <Footer />
        </>
        )
    }
}
const mapStateToProps = state => ({
    emiten: state.emiten,
    contact: state.contact
});

export default connect(mapStateToProps)(ContactUs);
