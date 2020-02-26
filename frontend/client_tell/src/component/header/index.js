import React, { Component } from 'react';
import Account from './account';
import { Link, withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import './header.css';
import {verivyUser} from '../../__thedux/action/userAction';
import {fetchAllCategory} from '../../__thedux/action/categoryAction';
import ReactAutocomplete from 'react-autocomplete';
import PopupForget from '../../component/forgetPassword';
import PopupLogin from '../../component/popupLogin';
import PopupSignup from '../../component/popupSignup';
import {search, searchSubmit} from '../../__thedux/action/searchAction';
import imgClose from '../../image/close.svg';
import imgSearch from '../../image/search.svg'
import ReactGA from 'react-ga';
import config from '../../config/config';
import LogoHolder from "../Logo";

import Search from '../search';
// import imgHumberger from '../../image/menu.svg';
import Glogin from '../googleLogin';
import Flogin from '../facebookLogin';
//ReactGA.initialize(config.trackerId);

let searchValueIds = [];
let all = '';
let find = 'All '

let li = (<li>Category Empty</li>);
let iconSearch = '';
let button;
const WAIT_INTERVAL = 1000;
let runEnter = false;
let runEnter2 = false;

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryIds: [],
            arrCategory: [],
            popupLogin: false,
            popupSignup: false,
            popupForget: false,
            value:'',
            valueSearch: '',
            openSearch: false,
            stl: {
                zIndex:100000,
                position:'absolute',
                marginTop:0,
                backgroundColor: "rgba(0,0,0, 0.5)"
            }
        }

        this.tooglePopup2 = this.tooglePopup2.bind(this);
        this.onclickCheckBox = this.onclickCheckBox.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onSelectSearch = this.onSelectSearch.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.enterFunctionSearch = this.enterFunctionSearch.bind(this);
        this.humbergerOnClick = this.humbergerOnClick.bind(this);
        this.triggerChange = this.triggerChange.bind(this);
        this.onKeyDownSearch = this.onKeyDownSearch.bind(this);
    }

    async componentWillMount() {
       // document.removeEventListener("keydown", this.enterFunctionSearch, false);

        const val = localStorage.getItem("searchKey")
        const val2 = JSON.parse(localStorage.getItem("searchCategoryIds"));
        const val3 = JSON.parse(localStorage.getItem("searchCourseId"));

        if(val && this.props.history.action !== 'POP') {
            let token = '';

            if(config.env === 'production') {
                this.props.dispatch({type: 'SEARCH_START_SUBMIT'});
                token = await this.props.googleReCaptchaProps.executeRecaptcha("search");
            }

           // await this.props.dispatch(searchSubmit(val, val2, val3, "on willmount", token));
            runEnter = false;
        }

        if(!this.props.category.data) {
            this.props.dispatch(fetchAllCategory());
        }
    }

    async enterFunctionSearch(e) {
        if(runEnter) {
           return console.log("loading3...")
        }

        // if(e.keyCode === 13 && window.location.pathname !== '/search') {
        //     runEnter = true
        //     let id = (e.target.attributes.getNamedItem("id")) ? e.target.attributes.getNamedItem("id").value : null;
        //     let value = (e.target && e.target.value) ? e.target.value : '';

        //     if(this.state.categoryIds.length > 0) {
        //         localStorage.setItem("searchCategoryIds", JSON.stringify(this.state.categoryIds));
        //     }
        //     else {
        //         localStorage.setItem("searchCategoryIds", "[]");
        //     }

        //     localStorage.setItem("searchKey", value);
        //     localStorage.setItem("searchCourseId", "null");

        //     ReactGA.pageview("search");

        //     this.props.history.push("/search")
        // }

        // if(e.keyCode === 13 && window.location.pathname === '/search') {
        //     runEnter = true
        //     let id = (e.target.attributes.getNamedItem("id")) ? e.target.attributes.getNamedItem("id").value : null;
        //     let value = (e.target && e.target.value) ? e.target.value : '';

        //     if(this.state.categoryIds.length > 0) {
        //         localStorage.setItem("searchCategoryIds", JSON.stringify(this.state.categoryIds));
        //     }
        //     else {
        //         localStorage.setItem("searchCategoryIds", "[]");
        //     }

        //     localStorage.setItem("searchKey", value);
        //     localStorage.setItem("searchCourseId", "null");

        //     ReactGA.pageview("search");
        //     let token = '';

        //     if(config.env === 'production') {
        //         this.props.dispatch({type: 'SEARCH_START_SUBMIT'});
        //         token = await this.props.googleReCaptchaProps.executeRecaptcha("search");
        //     }

        //     await this.props.dispatch(searchSubmit(value, this.state.categoryIds, null, "willmount mobile", token));
        //     runEnter = false;

        //     this.props.history.push("/search")
        // }
    }

    tooglePopup2 (e) {
         //close signup popup if klik termus
        const dataValu = (e.target.attributes.getNamedItem('data')) ? e.target.attributes.getNamedItem('data').value : '';

        if(dataValu === 'heder-web-desktop-login' || dataValu === 'heder-web-mobile-login') {
            ReactGA.event({
                category: "Login",
                action: "Click",
                label: 'Main login button'
            });
        }

        if(dataValu === 'heder-web-desktop-signup' || dataValu === 'heder-web-mobile-signup') {
            ReactGA.event({
                category: "Sign up",
                action: "Click",
                label: 'Main sign up button'
            });
        }
        if(!e.target.attributes.getNamedItem('id') && this.state.popupSignup) {
            return this.setState({
                popupSignup: false,
            });
        }

        if(!e.target.attributes.getNamedItem('id') && this.state.popupLogin) {
            return this.setState({
                popupLogin: false,
            });
        }

        if(!e.target.attributes.getNamedItem('id') && this.state.popupForget) {
            return this.setState({
                popupForget: false,
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
    }

    onclickCheckBox(e) {
        const id = e.target.attributes.data.value;
        const value =  e.target.parentNode.textContent;

        this.props.dispatch({type: "SEARCH_SUCCEED", payload:[]});

        this.setState({
            valueSearch:''
        });

        if(e.target.checked) {
            this.setState(prevState => ({
                arrCategory: [...prevState.arrCategory, {id:id, value:value}]
            }))

            this.setState(prevState => ({
                categoryIds: [...prevState.categoryIds, {id:id}]
            }))
        }
        else {
            this.setState({
                arrCategory: this.state.arrCategory.filter((ele) => ele.id !== id)
            });

            this.setState({
                categoryIds: this.state.categoryIds.filter((item) => item !== id)
            });
        }
    }

    onChangeSearch(e) {
        const value = e.target.value;
        this.setState({ valueSearch: value});

        clearTimeout(this.timer);

        if(value.length > 2) {
            this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
        }

        searchValueIds = [];
    }

    async triggerChange() {
        let token = '';

        if(config.env === 'production') {
            this.props.dispatch({type: 'SEARCH_START'});

            token = await this.props.googleReCaptchaProps.executeRecaptcha("search");
        }

        this.props.dispatch(search(this.state.valueSearch, this.state.arrCategory, token))
    }

    async onSelectSearch(value, item) {
        await this.setState({
            valueSearch: value
        });

        localStorage.setItem("searchKey", value);

        if(this.state.categoryIds.length > 0) {
            localStorage.setItem("searchCategoryIds", JSON.stringify(this.state.categoryIds));
        }
        else {
            localStorage.setItem("searchCategoryIds", "[]");
        }

        localStorage.setItem("searchCourseId", JSON.stringify({id:item._id}));


       // if(window.location.pathname === '/search') {
            const val = value
            const val2 = this.state.categoryIds
            const val3 = {id:item._id}

            let token = '';

            if(config.env === 'production') {
                this.props.dispatch({type: 'SEARCH_START_SUBMIT'});
                token = await this.props.googleReCaptchaProps.executeRecaptcha("search");
            }

            this.props.dispatch(searchSubmit(val, val2, val3, "on select search", token));
        // }
        // else {
            this.props.history.push("/search");
        //}
    }

    async submitSearch(value) {
        localStorage.setItem("searchKey", this.state.valueSearch);

        if(this.state.categoryIds.length > 0) {
            localStorage.setItem("searchCategoryIds", JSON.stringify(this.state.categoryIds));
        }
        else {
            localStorage.setItem("searchCategoryIds", "[]");
        }

        localStorage.setItem("searchCourseId", "null");

        ReactGA.pageview("search");
        this.props.history.push("/search");

        if(window.location.pathname === '/search') {
            const val = this.state.valueSearch
            const val2 = this.state.categoryIds
            const val3 = null
            let token = '';

            if(config.env === 'production') {
                this.props.dispatch({type: 'SEARCH_START_SUBMIT'});
                token = await this.props.googleReCaptchaProps.executeRecaptcha("search");
            }

            this.props.dispatch(searchSubmit(val, val2, val3, "on submit Search", token));
        }
    }

    toggleSearch() {
        this.setState((prevState) => ({
            openSearch: !prevState.openSearch
        }));
    }

    componentDidMount(){
       // document.addEventListener("keydown", this.enterFunctionSearch, false);
    }

    humbergerOnClick() {
        const className = document.getElementById("dropDownSearch").classList.value.trim();
        const arrClassName = className.split(" ");

        if(arrClassName.includes("in")) {
            this.setState((prevState) => ({
                openSearch: false
            }));

            document.getElementById("dropDownSearch").classList.remove("in")
        }
    }

    async onKeyDownSearch(e) {
        if(runEnter) {
            return console.log("loading3...")
        }

        if(e.key === 'Enter' && window.location.pathname !== '/search') {console.log("another serach") //page selain search consoel.log
            runEnter = true
            let id = (e.target.attributes.getNamedItem("id")) ? e.target.attributes.getNamedItem("id").value : null;
            let value = (e.target && e.target.value) ? e.target.value : '';

            if(this.state.categoryIds.length > 0) {
                localStorage.setItem("searchCategoryIds", JSON.stringify(this.state.categoryIds));
            }
            else {
                localStorage.setItem("searchCategoryIds", "[]");
            }

            localStorage.setItem("searchKey", value);
            localStorage.setItem("searchCourseId", "null");

            ReactGA.pageview("search");

            this.props.history.push("/search")
        }

        if(e.key === 'Enter' && window.location.pathname === '/search') { //page search
            runEnter = true
            let id = (e.target.attributes.getNamedItem("id")) ? e.target.attributes.getNamedItem("id").value : null;
            let value = (e.target && e.target.value) ? e.target.value : '';

            if(this.state.categoryIds.length > 0) {
                localStorage.setItem("searchCategoryIds", JSON.stringify(this.state.categoryIds));
            }
            else {
                localStorage.setItem("searchCategoryIds", "[]");
            }

            localStorage.setItem("searchKey", value);
            localStorage.setItem("searchCourseId", "null");

            ReactGA.pageview("search");
            let token = '';

            if(config.env === 'production') {
                this.props.dispatch({type: 'SEARCH_START_SUBMIT'});
                token = await this.props.googleReCaptchaProps.executeRecaptcha("search");
            }

            await this.props.dispatch(searchSubmit(value, this.state.categoryIds, null, "On enter search", token));
            runEnter = false;
        }
    }

    render() {

        if(this.state.openSearch) {
            iconSearch = <img className="img-search-x" src={imgClose} />
        }
        else {
            iconSearch = <img className="img-search" src={imgSearch}/>
        }

        find = (this.state.arrCategory.length <= 0) ? 'All ' : 'Find ';

        all = (this.state.arrCategory.length <= 0) ? 'Search all content' : this.state.arrCategory.map((item, index) => {
            if(index > 0) {
                return item.value + ' ';
            }
            else {
                return item.value + ' '
            }
        })


        button = <div className="input-group-btn navbar-btn">
                    <button type="button" disabled={(this.props.search.submitSearch) ? 'disabled' : ''} onClick={this.submitSearch} className="btn btn-silver btn-md">
                        <span className="glyphicon glyphicon-search margin-5"></span>
                    </button>
                </div>

        if(this.props.search.data.length <= 0 && this.props.search.submitSearch) {
            button = <div className="input-group-btn navbar-btn">
                        <button type="button" className="btn btn-silver btn-md">
                            <span className="glyphicon glyphicon-search margin-5"></span>
                        </button>
                    </div>
        }

        if(this.props.category.data && this.props.category.data.length > 0) {
            li = this.props.category.data.map((item, index) => <li key={index} className="checkbox check-dropdown-mobile">
                            <label><input type="checkbox" data={item._id} onClick={this.onclickCheckBox}/>{item.name}</label>
                        </li>
            )
        }

        return (
            <>
                {this.state.popupLogin ?
                    <PopupLogin {...this.props} stl={this.state.stl} closePopup={this.tooglePopup2.bind(this)} /> : null
                }

                {this.state.popupSignup ?
                    <PopupSignup {...this.props} stl={this.state.stl} closePopup={this.tooglePopup2.bind(this)} /> : null
                }

                {this.state.popupForget ?
                    <PopupForget {...this.props} stl={this.state.stl} closePopup={this.tooglePopup2.bind(this)} /> : null
                }

                <div className="mainmenu-area">
                    {/*===== Mobile Search area =====*/}
                    <ul id="dropDownSearch" className="dropdown-menu search-area hidden-lg hidden-md">
                        <li className="col-xs-12">
                            <div className="form-group" style={{marginBottom:0}}>
                                <div className="input-group">
                                    <span className="input-group-btn btn-block">
                                        <button className="btn btn-silver dropdown-toggle margin-0" type="button" data-toggle="dropdown" style={{overflowY:"scroll",overflowX:"none",height:"40px",maxWidth: "50px"}}>
                                            <span className="nav-label">{find}</span>
                                            <span className="glyphicon glyphicon-triangle-bottom"></span>
                                        </button>

                                        <ul id="search-option1" className="dropdown-menu margin-0">
                                            {
                                                li
                                            }
                                        </ul>
                                    </span>

                                    {/* <div className="input-group col-lg-12 center-block">
                                        <ReactAutocomplete
                                            items={this.props.search.data}
                                            getItemValue={item => item.title}
                                            renderMenu= {
                                                (items) => <ul className="list-group search-drop-down" children={items} />
                                            }
                                            renderItem={(item, highlighted) => (
                                                <li key={item._id} className="list-group-item">
                                                    {item.title } | {item.contributorName}
                                                </li>
                                                )

                                            }
                                            renderInput={(props) => {
                                                return <input id="search2" onKeyPress={this.onKeyDownSearch} autoFocus type="text" autoComplete="off" className="form-search" {...props} placeholder={all} />
                                            }}
                                            wrapperStyle={{width:"100%"}}
                                            value={this.state.valueSearch}
                                            onChange={this.onChangeSearch}
                                            onSelect={this.onSelectSearch}
                                        />
                                    </div> */}
                                    <Search {...this.props} onSelectSearch={this.onSelectSearch} searchValue={this.state.valueSearch} submitSearch={this.submitSearch} enterFunc={this.onKeyDownSearch} checkboxClick={this.onclickCheckBox} onChangeSearch={this.onChangeSearch} />

                                    {button}
                                    {/* <div className="input-group-btn navbar-btn">
                                        <button type="button" onClick={this.submitSearch} className="btn btn-silver btn-md">
                                            <span className="search2 margin-5"></span>
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </li>
                    </ul>
                    {/*=========== End Mobile Search area ========*/}

                    <div className="container-header-menu">
                        <div className="col-sm-12" style={{padding:0}}>
                            <div className="navbar-header col-xs-12 container-header-menu2">
                                {/*===== Humberger menu ======*/}
                                <button aria-expanded="true" onClick={this.humbergerOnClick} data-target="#nav-dropdown" data-toggle="modal" className="navbar-toggle pull-left" type="button" style={{zIndex:1, marginRight:"-15px"}}>
                                    <span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span>
                                </button>

                                {/*========== Logo ==========*/}
                                {/*<Link className="logo hidden visible-xs visible-sm absolute text-center" to="/" target="_self">*/}
                                {/*    <img className="center-block img-logo" alt="logo" src="/static/media/logo-TeLL.abc58e41.png" />*/}
                                {/*</Link>*/}
                                <div className="hidden-lg hidden-md">
                                  <LogoHolder {...this.props} />
                                </div>

                                {/*Search button for mobil*/}
                                <button onClick={this.toggleSearch} style={{position:"absolute", right:0}} className="hidden-lg hidden-md dropdown-toggle" type="button" data-toggle="collapse" data-target="#dropDownSearch">
                                    <span className="sb-icon-search img-search">
                                        {iconSearch}
                                    </span>
                                </button>

                                {/*======= Menu left =======*/}
                                <nav className="navbar-collapse collapse menu-mobile" id="nav-dropdown" aria-expanded="true">
                                    <span aria-expanded="true" data-target="#nav-dropdown" data-toggle="modal" className="hidden visible-xs visible-sm cross">
                                    </span>

                                    <ul className="nav navbar-nav col-xs-12" style={{margin:0,paddingRight:"3px"}}>
                                        <Account {...this.props} onSelectSearch={this.onSelectSearch} searchValue={this.state.valueSearch} submitSearch={this.submitSearch} enterFunc={this.onKeyDownSearch} checkboxClick={this.onclickCheckBox} onChangeSearch={this.onChangeSearch} closePopup={this.tooglePopup2} />
                                    </ul>

                                </nav>

                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}



const mapStateToProps = state => ({
    user: state.user,
    category: state.category,
    search: state.search
});

export default withRouter(connect(mapStateToProps)(Header));
