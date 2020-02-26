import React, { Component } from 'react';
import { connect } from "react-redux";
import {fetchCoursesByCategory} from '../../__thedux/action/coursesAction';
import config from '../../config/config.json';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import Loader from '../../component/loading';
import {countRatings} from '../../utilis/ratings';

let displayContent = "No Data Found";
let loading;
let currentPage = 1;

class ListContent extends Component{
    constructor(props){
        super(props);

        this.state = {
            item: null
        }

        this.handlePageChange = this.handlePageChange.bind(this);
        this.getNewItem = this.getNewItem.bind(this);
    }

    componentWillMount() {
        const categoryId = this.props.categoryId;
        this.props.dispatch(fetchCoursesByCategory(categoryId, currentPage));
    }

    getNewItem(pageNumber) {
        this.props.dispatch(fetchCoursesByCategory(this.props.categoryId, pageNumber));
    }

    handlePageChange(pageNumber) {
        // console.log('page ke ? ', pageNumber)
        currentPage = pageNumber
        this.getNewItem(pageNumber);
    }

    componentDidMount () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    init() {
        const dataContent = this.props.courses.data;
        // eslint-disable-next-line
        const categoryId = this.props.categoryId;
        const category = {};
        const categoryName = this.props.match.params.name;

        if(dataContent && dataContent.length > 0) {
            displayContent = dataContent.map((content, item) => {
                return (
                    <div className="col-xs-12 col-sm-4 col-md-2" key={content._id}>
                        {/*<Link to={{pathname:"/courses/"+categoryName+"/"+content.title.replace(/ /gi, "-"), search:"?categoryId:"+categoryId+"&id:"+ content._id}}>*/}
                        {/*<Link to={{pathname:"/courses/"+categoryName+"/"+content.title.replace(/ /gi, "-"), search:"?"+ content.shorturl}} target="_self">*/}
                        <Link to={`/courses/${categoryName}/${content.title.replace(/ /gi, "-")}`} target="_self">
                            <div className="new-update">
                                <div className="team-photo">
                                    {/* <img src={`${config.static}/images/${content.displayImage}`} alt="" /> */}
                                    <img src={`${config.static}/images/${content.imagePreview}`} alt="" />
                                </div>
                                <h4 style={{overflow: 'hidden'}}><strong>{content.title}</strong></h4>
                                <h6 style={{textTransform: 'capitalize'}}>{content.contributorName}</h6>
                                <div className="col-xs-12">
                                    <span className="rating"><span style={{width: `${countRatings(content.rate) * 20}%`}}></span> </span>
                                </div>
                                <div></div>
                            </div>
                        </Link>
                    </div>
                )
            });

            const localId =  window.localStorage.getItem('localId');

            if(!localId) {
                 window.localStorage.setItem('localId', dataContent[0].categoryId);
            }

            if(localId) {
                currentPage = (localId === dataContent[0].categoryId) ? currentPage : 1;
                window.localStorage.setItem('localId', dataContent[0].categoryId);
            }

        } else {

            displayContent = 'No Data Found';
        }
    }

    render() {
        if(!this.props.courses.data) {
            return (
                <div style={{marginTop: 20}} className="container min-height-450">
                    <div className="col-lg-12">
                        <Loader />
                    </div>
                </div>
            )
        }

        if(this.props.courses.data.length <= 0) {
            return (
                <div style={{marginTop: 20}} className="container min-height-450">
                    <div className="col-lg-12">
                        Available soon
                    </div>
                </div>
            )
        }


        if(this.props.courses.data.length > 0) {

            this.init();

            return (
                <div className="min-height-450">
                    {loading}
                    <div className="col-lg-12">
                        <div>{displayContent}</div>
                    </div>

                    <div className="clearfix">&nbsp;</div>
                    <div className="pagination-centered" >
                        <div className="pagination">

                            <Pagination
                                // hideDisabled
                                activePage={currentPage}
                                itemsCountPerPage={24}
                                totalItemsCount={this.props.courses.totalContent}
                                pageRangeDisplayed={3}
                                onChange={this.handlePageChange}
                                innerClass={'tell-page'}
                                hideFirstLastPages={false}
                            />
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div style={{marginTop: 20}} className="container min-height-450">Available soon</div>
        )

    }

}

const mapStateToProps = state => ({
    courses: state.courses,
    user: state.user,
    category: state.category,
});

export default connect(mapStateToProps)(ListContent);
