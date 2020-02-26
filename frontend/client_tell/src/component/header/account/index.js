import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { getFirstLetter } from '../../../utilis/slice';
import { connect } from "react-redux";
import PopupForget from '../../../component/forgetPassword';
import PopupLogin from '../../../component/popupLogin';
import PopupSignup from '../../../component/popupSignup';
import './acc.css'
import Logo from "../../Logo";
import {logout, getUser} from '../../../__thedux/action/userAction';
import {search, searchSubmit} from '../../../__thedux/action/searchAction';
import {fetchAllCategory} from '../../../__thedux/action/categoryAction';
import ReactAutocomplete from 'react-autocomplete';
import ReactGA from 'react-ga';
import config from '../../../config/config';
import imgClose from '../../../image/icn-close.svg';
import Search from '../../../component/search';
import CategoryHolder from "../../categoryHolder";

//ReactGA.initialize(config.trackerId);

let all = '';
let find = 'All '
let searchValueIds = null;
let mCtgryMenu = '';
let mMenuNav = '';
let button;
let runEnter = false;

class Account extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: 'false',
            popupLogin: false,
            popupSignup: false,
            popupForget: false,
            arrCategory: [],
            value:'',
            valueSearch: '',
            categoryIds: [],
            mCategoryMenu: true,
            waiting: false,
            stl: {
                zIndex:100000
            }
        }

        this.init = this.init.bind(this);
        this.logout = this.logout.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.callme = this.callme.bind(this);
       // this.onChangeSearch = this.onChangeSearch.bind(this);
       // this.onclickCheckBox = this.onclickCheckBox.bind(this);
        //this.onSelectSearch = this.onSelectSearch.bind(this);
        //this.submitSearch = this.submitSearch.bind(this);
        this.toggleCategoryMobile = this.toggleCategoryMobile.bind(this);
       // this.enterFunctionSearch = this.enterFunctionSearch.bind(this);
       // this.onKeyPressSearch = this.onKeyPressSearch.bind(this);
    }

    async componentWillMount() {//console.log('masuk', window.innerWidth)
       // document.removeEventListener("keydown", this.enterFunctionSearch, false);

        // const val = localStorage.getItem("searchKey")
        // const val2 = JSON.parse(localStorage.getItem("searchCategoryIds"));
        // const val3 = JSON.parse(localStorage.getItem("searchCourseId"));

        // if(val && this.props.history.action !== 'POP') {
        //     let token = '';

        //     if(config.env === 'production') {
        //         token = await this.props.googleReCaptchaProps.executeRecaptcha("search");
        //     }

        //    // this.props.dispatch(await searchSubmit(val, val2, val3, "willmount", token));
        // }

        if(this.props.history.action !== 'POP') {
            this.props.dispatch(fetchAllCategory());
        }
    }

    togglePopup(e) {
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

        //close signup popup if klik termus
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

    callme(){
        this.props.dispatch(getUser(this.props.user.userId));
    }

    logout() {
        this.props.dispatch(logout());

        this.setState({
            isLoading: true,
        });

        setTimeout(function(){ window.location.replace("/") }, 100);
    }

    // componentDidMount(){
    //    // document.addEventListener("keydown", this.enterFunctionSearch, false);
    // }

    // async enterFunctionSearch(e) {
    //     if(this.props.search.submitSearch) {
    //         return;
    //     }

    //     let id = (e.target.attributes.getNamedItem("id")) ? e.target.attributes.getNamedItem("id").value : null;
    //     let value = (e.target) ? e.target.value : '';

    //     if(e.keyCode === 13 && (id === 'search3' || id === 'search')) {
    //         localStorage.setItem("searchKey", value);

    //         if(this.state.categoryIds.length > 0) {
    //             localStorage.setItem("searchCategoryIds", JSON.stringify(this.state.categoryIds));
    //         }
    //         else {
    //             localStorage.setItem("searchCategoryIds", "[]");
    //         }

    //         localStorage.setItem("searchCourseId", "null");

    //         ReactGA.pageview("search");

    //         this.props.history.push("/search");
    //     }

    //     //if in search page
    //     if(window.location.pathname === '/search' && e.keyCode === 13) {
    //         const val = value
    //         const val2 = this.state.categoryIds
    //         const val3 = null
    //         let token = '';

    //         if(config.env === 'production') {
    //             this.props.dispatch({type: 'SEARCH_START_SUBMIT'});
    //             token = await this.props.googleReCaptchaProps.executeRecaptcha("search");
    //         }

    //         this.props.dispatch(searchSubmit(val, val2, val3, "willmount desktop", token));
    //     }
    // }

    // async onChangeSearch(e) {
    //     const value = e.target.value;
    //     this.setState({ valueSearch: value});

    //     if(value.length > 2) {
    //         let token = '';

    //         if(config.env === 'production') {
    //             token = await this.props.googleReCaptchaProps.executeRecaptcha("search");
    //         }

    //         await this.props.dispatch( await search(value, this.state.arrCategory, token))
    //     }

    //     searchValueIds = null;
    // }

    // async onSelectSearch(value, item) {
    //     localStorage.setItem("searchKey", value);

    //     if(this.state.categoryIds.length > 0) {
    //         localStorage.setItem("searchCategoryIds", JSON.stringify(this.state.categoryIds));
    //     }
    //     else {
    //         localStorage.setItem("searchCategoryIds", "[]");
    //     }

    //     localStorage.setItem("searchCourseId", JSON.stringify({id:item._id}));

    //     this.props.history.push("/search");

    //     if(window.location.pathname === '/search') {
    //         const val = value;
    //         const val2 = [];
    //         const val3 = {id:item._id}
    //         let token = '';

    //         if(config.env === 'production') {
    //             this.props.dispatch({type: 'SEARCH_START_SUBMIT'});
    //             token = await this.props.googleReCaptchaProps.executeRecaptcha("search");
    //         }

    //         this.props.dispatch(searchSubmit(val, val2, val3, "On select saerch account", token));
    //     }
    // }

    // async submitSearch() {
    //     localStorage.setItem("searchKey", this.state.valueSearch);

    //     if(this.state.categoryIds.length > 0) {
    //         localStorage.setItem("searchCategoryIds", JSON.stringify(this.state.categoryIds));
    //     }
    //     else {
    //         localStorage.setItem("searchCategoryIds", "[]");
    //     }

    //     localStorage.setItem("searchCourseId", "null");

    //     ReactGA.pageview("search");
    //     this.props.history.push("/search");

    //     if(window.location.pathname === '/search') {
    //         const val = this.state.valueSearch;
    //         const val2 = this.state.categoryIds;
    //         const val3 = null
    //         let token = '';

    //         if(config.env === 'production') {
    //             this.props.dispatch({type: 'SEARCH_START_SUBMIT'});
    //             token = await this.props.googleReCaptchaProps.executeRecaptcha("search");
    //         }

    //         this.props.dispatch(searchSubmit(val, val2, val3, "on submit search account", token));
    //     }
    // }

    // onclickCheckBox(e) {
    //     const id = e.target.attributes.data.value;
    //     const value =  e.target.parentNode.textContent;

    //     this.props.dispatch({type: "SEARCH_SUCCEED", payload:[]});

    //     this.setState({
    //         valueSearch:''
    //     });

    //     if(e.target.checked) {
    //         this.setState(prevState => ({
    //             arrCategory: [...prevState.arrCategory, {id:id, value:value}]
    //         }))

    //         this.setState(prevState => ({
    //             categoryIds: [...prevState.categoryIds, {"id":id}]
    //         }))
    //     }
    //     else {
    //         this.setState({
    //             arrCategory: this.state.arrCategory.filter((ele) => ele.id !== id)
    //         });

    //         this.setState({
    //             categoryIds: this.state.categoryIds.filter((item) => item !== id)
    //         });
    //     }
    // }

    toggleCategoryMobile() {
        this.setState((prevState) => ({
            mCategoryMenu: !prevState.mCategoryMenu
        }))
    }

    // async onKeyPressSearch(e) {
    //     if(runEnter) {
    //         return console.log("loading3...")
    //     }

    //     if(e.key === 'Enter' && window.location.pathname !== '/search') {console.log("another page") //page selain search consoel.log
    //         runEnter = true
    //         let id = (e.target.attributes.getNamedItem("id")) ? e.target.attributes.getNamedItem("id").value : null;
    //         let value = (e.target && e.target.value) ? e.target.value : '';

    //         if(this.state.categoryIds.length > 0) {
    //             localStorage.setItem("searchCategoryIds", JSON.stringify(this.state.categoryIds));
    //         }
    //         else {
    //             localStorage.setItem("searchCategoryIds", "[]");
    //         }

    //         localStorage.setItem("searchKey", value);
    //         localStorage.setItem("searchCourseId", "null");

    //         ReactGA.pageview("search");

    //         this.props.history.push("/search")
    //     }

    //     if(e.key === 'Enter' && window.location.pathname === '/search') {console.log("search page") //page search
    //         runEnter = true
    //         let id = (e.target.attributes.getNamedItem("id")) ? e.target.attributes.getNamedItem("id").value : null;
    //         let value = (e.target && e.target.value) ? e.target.value : '';

    //         if(this.state.categoryIds.length > 0) {
    //             localStorage.setItem("searchCategoryIds", JSON.stringify(this.state.categoryIds));
    //         }
    //         else {
    //             localStorage.setItem("searchCategoryIds", "[]");
    //         }

    //         localStorage.setItem("searchKey", value);
    //         localStorage.setItem("searchCourseId", "null");

    //         ReactGA.pageview("search");
    //         let token = '';

    //         if(config.env === 'production') {
    //             this.props.dispatch({type: 'SEARCH_START_SUBMIT'});
    //             token = await this.props.googleReCaptchaProps.executeRecaptcha("search 2");
    //         }

    //         await this.props.dispatch(searchSubmit(value, this.state.categoryIds, null, "willmount mobile", token));
    //         runEnter = false;
    //     }
    // }

    init() {
        if(this.props.me){
            this.fullnameAlias = getFirstLetter(this.props.me.fullname);
        }

        find = (this.state.arrCategory.length <= 0) ? 'All ' : 'Find '

        all = (this.state.arrCategory.length <= 0) ? 'Search all content' : this.state.arrCategory.map((item, index) => {
            if(index > 0) {
                return item.value + ' ';
            }
            else {
                return item.value + ' '
            }
        })

    }

    render() {

        this.init();

        if(!this.props.category.data) {
            return (<div>Loading...</div>)
        }

        button = <div className="input-group-btn navbar-btn">
                    <button type="button" disabled={(this.props.search.submitSearch) ? 'disabled' : ''} onClick={this.props.submitSearch} className="btn btn-silver btn-md">
                        <span className="glyphicon glyphicon-search margin-5"></span>
                    </button>
                </div>

        if(this.props.search.data.length <= 0 && this.props.search.submitSearch) {
            button = <div className="input-group-btn navbar-btn">
                        <button disabaled={(this.props.search.start) ? "disabaled" : ""} type="button" className="btn btn-silver btn-md">
                            <span className="glyphicon glyphicon-search margin-5"></span>
                        </button>
                    </div>
        }

        if(this.state.mCategoryMenu) {
            mMenuNav = <span className="glyphicon glyphicon-menu-down pull-right"></span>

          mCtgryMenu = <CategoryHolder category={this.props.category} {...this.props}/>;

        } else {
            mMenuNav = <span className="glyphicon glyphicon-menu-right pull-right"></span>
            mCtgryMenu = '';
        }

        // header before login
        if(!this.props.me) {
            return(
                <div style={{width: '100%', zIndex:1,position:'relative'}}>
                    <div className="hidden-xs hidden-sm" style={{width:"100%"}}>
                        <li className="list_categories"></li>

                        <li className="pull-left col-sm-10">
                            <div style={{float:"left"}}>
                            <Logo {...this.props} />
                            </div>

                            <div  className="form-group" style={{marginTop:"8px"}}>
                                <div className="input-group col-sm-7" style={{margin:"0 auto"}}>
                                    {/*button dropdown search*/}
                                    <span className="input-group-btn btn-block">
                                        <button className="btn btn-silver dropdown-toggle" type="button" data-toggle="dropdown">
                                            <span className="nav-label" style={{maxWidth:"150px"}}>{find}</span>
                                            <span className="glyphicon glyphicon-triangle-bottom"></span>
                                        </button>
                                        <ul id="search-option" className="dropdown-menu margin-0" role="menu">
                                            {
                                                this.props.category.data.map((item, index) => {
                                                    return  <li key={index} className="checkbox" style={{display:"block"}}>
                                                                <label className="margin-5"><input type="checkbox" data={item._id} onClick={this.props.checkboxClick} style={{margin:"1px -20px"}} />{item.name}</label>
                                                            </li>
                                                })

                                            }
                                        </ul>
                                    </span>

                                    {/*input search*/}
                                    <Search {...this.props} />

                                    {/* <div className="input-group col-lg-12 center-block">
                                        <input value={this.props.searchValue} onChange={this.props.onChangeSearch} onKeyPress={this.props.enterFunc} className="form-search" type="text" />
                                        <ul className="list-group search-drop-down" >
                                            {
                                                this.props.search.data.map((item) => (<li key={item._id} onClick={() => this.props.onSelectSearch(item.title, item)} className="list-group-item">{item.title} | {item.contributorName}</li>))
                                            }
                                        </ul> */}

                                        {/* <ReactAutocomplete
                                            items={this.props.search.data}
                                            getItemValue={item => item.title}
                                            renderMenu= {
                                                (items) => <ul className="list-group search-drop-down" children={items} />
                                            }
                                            renderItem={(item, highlighted) => {
                                                    return (
                                                        <li key={item._id} className="list-group-item">
                                                            {item.title } | {item.contributorName}
                                                        </li>
                                                    )
                                                }
                                            }
                                            renderInput={(props) => {
                                                return <form autoComplete="off"><input id="search3" type="text" className="form-search" autoComplete="off" placeholder={all} {...props} /></form>
                                            }}
                                            wrapperStyle={{width:"100%"}}
                                            value={this.state.valueSearch}
                                            onChange={this.onChangeSearch}
                                            onSelect={this.onSelectSearch}
                                        /> */}
                                    {/* </div>
                                        */}
                                    {button}
                                </div>
                            </div>
                        </li>

                        <div className="pull-right" style={{marginTop:"8px"}}>
                            <li style={{marginRight: 5, float:"left"}}>
                                <button onClick={this.togglePopup} data="heder-web-desktop-login" id="popupLogin" type="button" className="btn btn-blue btn-md">LOG IN</button>
                            </li>

                            <li style={{display:"flex", float:"left"}}>
                                <button type="button" onClick={this.togglePopup} data="heder-web-desktop-signup" id="popupSignup" className="btn btn-orange btn-md" data-toggle="modal" data-target="#registration">
                                    SIGN UP
                                </button>

                            </li>
                        </div>
                    </div>

                    {/*menu for mobile web */}
                    <div className="hidden-lg hidden-md" style={{ top:"70px", position:"relative",justifyContent: "center", width:"100%"}}>
                        <li className="col-xs-1 hidden-xs hidden-sm pull-left">&nbsp;</li>
                        <li className="categories pull-left" style={{width:"99%", marginBottom:"40px"}}>
                            <div onClick={this.toggleCategoryMobile} style={{display:"block", padding:"7px 10px"}}>
                                <span style={{width:"100%",height: "40px", margin: "0px"}}>Categories</span>
                                {mMenuNav}
                            </div>

                            <hr className="margin-0" />
                            {mCtgryMenu}
                        </li>
                        <li style={{marginRight: 5}}>
                            <button data-target="#nav-dropdown" data-toggle="modal" onClick={this.props.closePopup} data="heder-web-mobile-login"  id="popupLogin" type="button" className="btn btn-blue btn-md btn-block">LOG IN</button>
                        </li>

                        <li style={{margin: "5px 5px 0 0"}}>
                            <button data-target="#nav-dropdown" data-toggle="modal" type="button" onClick={this.props.closePopup} data="heder-web-mobile-signup" id="popupSignup" className="btn btn-orange btn-md btn-block">SIGN UP</button>
                        </li>
                    </div>

                    <div style={{clear: 'both'}}></div>

                    {this.state.popupLogin ?
                         <PopupLogin {...this.props}
                            closePopup={this.togglePopup.bind(this)}
                     />
                         : null
                     }

                     {this.state.popupSignup ?
                         <PopupSignup {...this.props}
                            stl={this.state.stl} closePopup={this.togglePopup.bind(this)}
                         />
                         : null
                     }

                     {this.state.popupForget ?
                        <PopupForget {...this.props}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                    }
                </div>
            )
        }

        // header after login
        return (
            <>
                <li className="pull-left col-md-9">
                    <Logo {...this.props} />
                    {/*search*/}
                    <div  className="form-group">
                        <div className="input-group col-sm-7" style={{margin:"10px auto"}}>
                            {/*button dropdown search*/}
                            <span className="input-group-btn btn-block">
                                <button className="btn btn-silver dropdown-toggle" type="button" data-toggle="dropdown">
                                    <span className="nav-label" style={{width:"150px", overflow:"hidden"}}>{find}</span>
                                    <span className="glyphicon glyphicon-triangle-bottom"></span>
                                </button>
                                <ul id="search-option" className="dropdown-menu margin-0" role="menu">
                                    {
                                        this.props.category.data.map((item, index) => {
                                            return  <li key={index} className="checkbox" style={{display:"block"}}>
                                                        <label className="margin-5"><input type="checkbox" data={item._id} onClick={this.onclickCheckBox} style={{margin:"1px -20px"}} />{item.name}</label>
                                                    </li>
                                        })

                                    }
                                </ul>
                            </span>

                            {/*input search*/}
                            <Search {...this.props} />
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
                                        return <input onKeyPress={this.props.enterFunc} id="search" type="text" className="form-search" autoComplete="off" {...props} placeholder={all} />
                                    }}
                                    wrapperStyle={{width:"100%"}}
                                    value={this.state.valueSearch}
                                    onChange={this.onChangeSearch}
                                    onSelect={this.onSelectSearch}
                                />
                            </div> */}

                                <div className="input-group-btn navbar-btn">
                                    {/* <button type="button" onClick={this.submitSearch} className="btn btn-silver btn-md">
                                        <span className="glyphicon glyphicon-search margin-5"></span>
                                    </button> */}
                                    {button}
                                </div>
                            </div>
                        </div>
                </li>

                <li className="list_categories hidden-xs hidden-sm pull-right" style={{margin: "0px 20px"}}>
                    <ul>
                        <li className="dropdown">
                            <button className="dropdown-toggle" type="button" id="categories" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{width: "60px"}}>
                                <div className="user-avatar"><span className="fx-c">{this.fullnameAlias}</span></div>
                            </button>

                            <ul className="dropdown-menu avatar-top" aria-labelledby="categories" style={{height: "100px"}}>
                                <span className="corner-up-right"></span>

                                <li className="col-md-9">
                                    <Link className="link-user" to="/myprofile">{this.props.me.fullname}</Link>
                                </li>

                                <li className="side-help">
                                    <Link className="text-center" to="/help">
                                        <span className="ti-info-alt">&nbsp;</span>HELP
                                    </Link>
                                </li>

                                <li className="side-logout">
                                    <Link onClick={ this.logout } to="" className="text-center" href="/Landing-Page">
                                        <span className="ti-power-off">&nbsp;</span>LOGOUT
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li className="list_categories hidden-lg hidden-md" style={{width: "100%"}}>
                    <ul style={{padding:0}}>
                        <li className="dropdown" style={{backgroundColor:"#f6f6f6", borderBottom: "1px solid #c1c1c1"}}>
                            <div aria-expanded="true" data-target="#nav-dropdown" data-toggle="modal" className="col-lg-12" style={{padding:"0px 10px"}}>
                                <Link to={"/myprofile"} className="full-drop">
                                    <span className="fx-drop" style={{textTransform:"capitalize"}}>{this.fullnameAlias}</span>
                                    <h5 className="hidden visible-xs visible-sm detail-name">{this.props.me.fullname}</h5>
                                    <p className="hidden visible-xs visible-sm detail-name-p">Welcome back</p>
                                </Link>

                                <div className="pull-left user-avatar hidden-sm hidden-xs">
                                    <span className="fx-c">{this.fullnameAlias}</span>
                                </div>

                                {/* <div className="cross" style={{position:"absolute",top:0,right:0}}>
                                    <span className="glyphicon glyphicon-remove-circle fa-lg"></span>
                                </div> */}

                                {/* <div className="h5 hidden visible-xs visible-sm" style={{margin:"10px 0px 10px"}}>{his.props.me.fullname}</div> */}
                                <div className="clearfix"></div>
                            </div>

                            {/* <div className="side-help col-xs-12" style={{padding:"10px 0px"}}>
                                <a className="text-center" href="/help">HELP</a>
                            </div> */}
                        </li>
                        <li style={{marginTop:"10px", padding: "0 10px"}}>
                            <div onClick={this.toggleCategoryMobile} style={{display:"block", padding:"7px 10px"}}>
                                    <span style={{width:"100%",height: "40px", margin: "0px"}}>Categories</span>
                                    {mMenuNav}
                                </div>

                                <hr className="margin-0" />
                                {mCtgryMenu}

                                <div className="clearfix">&nbsp;</div>
                                <div className="clearfix">&nbsp;</div>

                                <div className="side-logout col-xs-12" style={{padding:"0px"}}>
                                    <Link onClick={ this.logout } to="/Landing-Page" className="btn btn-orange btn-md btn-block" style={{color:"#fff"}}>
                                    LOGOUT
                                    </Link>
                            </div>
                        </li>
                    </ul>
                </li>
            </>
        )

    }

}

const mapStateToProps = state => ({
    user: state.user,
    search: state.search,
    category: state.category
});
export default withRouter(connect(mapStateToProps)(Account));
