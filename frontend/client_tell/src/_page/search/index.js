import './style.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import config from '../../config/config.json';
import Header from '../../component/header';
import Footer from '../../component/footer';

import ReactGA from 'react-ga';
//ReactGA.initialize(config.trackerId);
//ReactGA.pageview(window.location.pathname);

let data = 'No Result';
let totalData = '';

class Search extends Component {
    render() {
       let key = localStorage.getItem("searchKey");

        if(this.props.search.dataSearch.length <= 0 && this.props.search.submitSearch){
            return (
                <div key={key}>
                    <Header {...this.props} />
                    <div className="orange-bg">
                        <div className="container"> 
                            <div className="row">
                                <h1 style={{margin: "0 0 10px"}} className="text-center section-padding">SEARCH</h1>
                            </div>
                        </div>
                    </div>
        
                    <section className="section-padding body-section">
                        <div className="container" style={{minHeight: "500px"}}>            
                            <div className="row">
                                <div className="col-xs-12">
                                    <ul className="breadcrumb-tell">
                                        <li><Link to="/" target="_self">Home</Link></li>
                                        <li>Search</li>
                                    </ul>
                                </div>
    
                                <div className="col-xs-12">
                                    <h4 className="pull-left"><strong>Loading...</strong></h4>
                                </div>
    
                            </div>
                        </div>        
                    </section>
                <Footer />
            </div>
            )
        }

        if(this.props.search.dataSearch && this.props.search.dataSearch.length > 0) {
            totalData = this.props.search.dataSearch.length;

            data = this.props.search.dataSearch.map((item) => {
                item.level = (item.level === 0) ? '' : item.level;
                item.level = (item.level === 1) ? 'Beginner' : item.level;
                item.level = (item.level === 2) ? 'Intermediate' : item.level;
                item.level = (item.level === 3) ? 'Expert' : item.level;

                return (
                    <div key={item._id}>
                        <div className="row">
                            
                            {/*<Link target="_self" to={{pathname:"/courses/"+item.categoryId.name.replace(/ /gi, "-")+"/"+item.title.replace(/ /gi, "-"), search:"?categoryId:"+item.categoryId._id+"&id:"+item._id}}>*/}
                            <Link target="_self" to={{pathname:"/courses/"+item.categoryId.name.replace(/ /gi, "-")+"/"+item.title.replace(/ /gi, "-")}}>


                                <div className="col-xs-12 col-sm-4 col-md-2">               
                                    <img src={`${config.static}/images/${item.imagePreview}`} alt={item.imagePreview} width="100%" />         
                                </div>

                                <div className="col-xs-12 col-sm-8 col-md-10">                	
                                
                                    <ul className="breadcrumb margin-0">
                                        <span className="bread-detail-vid">
                                            <h4>{item.title}</h4>
                                        
                                            <li className="bread-detail">
                                                <span className="rating"><span style={{width:Math.round((item.ratings/5) * 100)+"%"}}></span></span>
                                                <span style={{color:"#000"}}></span>
                                            </li>

                                            {/* <li className="bread-detail">{item.enrolled}</li>

                                            <li className="bread-detail">{item.timeVideo}</li>

                                            <li className="bread-detail">{item.bahasa}</li>

                                            <li className="bread-detail">{item.uploadDate}</li> */}
                                        
                                            <li className="bread-detail">{item.level}</li>

                                            <li className="clearfix">&nbsp;</li>

                                            <li className="bread-detail">{item.contributorName}</li>
                                        </span>
                                    </ul>

                                    <p className="text-justify text-wrap-line2">{item.description}</p>
                                </div>
                            </Link>
                        </div>

                        <div className="clearfix">&nbsp;</div>
                    </div>
                )
            });
        }
        else {
            totalData = 0;
            data = 'No Result';
        }

        
        return (
            <div key={key}>
                <Header {...this.props} />
                <div className="orange-bg">
                    <div className="container"> 
                        <div className="row">
                            <h1 style={{margin: "0 0 10px"}} className="text-center section-padding">SEARCH</h1>
                        </div>
                    </div>
                </div>
    
                <section className="section-padding body-section">
                    <div className="container" style={{minHeight: "500px"}}>            
                        <div className="row">
                            <div className="col-xs-12">
                                <ul className="breadcrumb-tell">
                                    <li><Link to="/" target="_self">Home</Link></li>
                                    <li>Search</li>
                                </ul>
                            </div>

                            <div className="col-xs-12">
                                <h4 className="pull-left">{totalData} results for <strong>"{key}"</strong></h4>
                            </div>

                            <div className="clearfix">&nbsp;</div>
                        
                            <div className="container">
                                {data}
                            </div>
                        </div>
            
                            <div className="pagination-centered">
                            <div className="pagination">
                                {/* <ul className="tell-page">
                                    <li>
                                        <a href="#"><span className="ti-angle-left"></span></a>
                                    </li>

                                    <li className="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li>
                                        <a href="#"><span className="ti-angle-right"></span></a>
                                    </li>
                                </ul>  */}
                            </div>
                        </div>                    
                    </div>        
                </section>
            <Footer />
        </div>
        )
        
    }
}

const mapStateToProps = state => ({
    search: state.search,
});

export default connect(mapStateToProps)(Search);
