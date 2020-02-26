import React, { Component } from 'react';
import { connect } from "react-redux";
import config from '../../config/config.json';
import { fetchCoursesBypage } from '../../__thedux/action/coursesAction';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import { countRatings } from '../../utilis/ratings';
import {delStorage} from "../../utilis/storage";

let displayContent = [];
let dataContent = [];
let data;

class ListContentBaris extends Component{
    constructor(props){
        super(props);
        this.state = {
            activePage: 1,
            item: '',
        }

        this.saveToStage = this.saveToStage.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.getNewItem = this.getNewItem.bind(this);
        this.init = this.init.bind(this);
    }

    componentWillMount() {
        const categoryName = this.props.match.params.categoryName.replace(/-/g, " ");
        this.props.dispatch(fetchCoursesBypage(this.state.activePage, categoryName, this.props.contentId));
        let url = this.props.location.pathname.split("/")[4];

        if(url) {
          this.setState({
            activePage: parseInt(url),
          });
        }

        // console.log(url);
        // setTimeout(() => {this.saveToStage()}, 500);
    }

    saveToStage() {
        this.setState({
            item: this.props.courses.list.contents
        })

    }

    getNewItem(pageNumber) {
        const categoryName = this.props.match.params.categoryName.replace(/-/g, " ");
        this.props.dispatch(fetchCoursesBypage(pageNumber, categoryName, this.props.courses.data.content._id));
        setTimeout(() => {this.saveToStage()},500)
    }

    handlePageChange(pageNumber) {
      delStorage("RATINGS_READY");
      delStorage("USER_WATCH_VIDEO_RATINGS_CLICK_BREADCRUMB");
      this.setState({activePage: pageNumber});
      this.getNewItem(pageNumber);
      // console.log(pageNumber);

      let urlarr = this.props.location.pathname.split("/");
      // console.log(urlarr.length);
      if(urlarr.length < 5) {
        window.history.pushState({}, null, this.props.location.pathname + "/" + pageNumber);
      }
      else{
        window.history.pushState({}, null, "/"+urlarr[1]+"/"+urlarr[2]+"/"+urlarr[3] +"/" + pageNumber);
      }

    }

    init() {
        dataContent = this.props.courses.list.contents;
        const categoryDescription = this.props.courses.data.content.description;

        if(dataContent) {
            displayContent = dataContent.map( content => {

                let lessonLevel;
                if(content.level === 1){
                    lessonLevel = "Beginner"
                }
                if(content.level === 2){
                    lessonLevel = "Intermediate"
                }
                if(content.level === 3){
                    lessonLevel = "Expert"
                }

                return (
                    <div className="row animated fadeIn" key={content._id}>
                     <div className="col-xs-12 col-sm-4 col-md-2">
                         {/*<Link to={`/courses/${this.props.match.params.categoryName.replace(/ /gi, "-")}/${content.title.replace(/ /gi, "-")}?categoryId:${this.props.categoryId}&id:${content._id}`} target="_self">*/}
                         <Link to={`/courses/${this.props.match.params.categoryName.replace(/ /gi, "-")}/${content.title.replace(/ /gi, "-")}`} target="_self">
                             <img src={`${config.static}/images/${content.imagePreview}`} alt={content.imagePreview} />
                         </Link>
                     </div>
                         <div className="col-xs-12 col-sm-8 col-md-10">
                             <ul className="breadcrumb">
                                <span className="bread-detail-vid">
                                    {/*<Link to={`/courses/${this.props.match.params.categoryName.replace(/ /gi, "-")}/${content.title.replace(/ /gi, "-")}?categoryId:${this.props.categoryId}&id:${content._id}`} target="_self">*/}
                                    <Link to={`/courses/${this.props.match.params.categoryName.replace(/ /gi, "-")}/${content.title.replace(/ /gi, "-")}`} target="_self">
                                        <h5><strong>{content.title}</strong></h5>
                                    </Link>

                                    <li className="bread-detail">
                                        <div>
                                            <span className="rating"><span style={{width: `${countRatings(content.rate) * 20}%`}}></span></span>
                                        </div>
                                    </li>
                                    {/* <li className="bread-detail">Enrolled {content.enrolled} times</li> */}
                                    {/* <li className="bread-detail">{content.timeVideo}</li> */}
                                    {/* <li className="bread-detail">{content.language}</li> */}
                                    {/* <li className="bread-detail">{moment(content.uploadDate).format('MMM D / YYYY')}</li> */}
                                    <li className="bread-detail">
                                        { lessonLevel }
                                    </li>
                                    <li className="clearfix">&nbsp;</li>
                                    <li className="bread-detail" style={{textTransform: "capitalize"}}>{content.contributorName}</li>
                                </span>

                             </ul>
                             <p className="text-justify text-wrap-line2">
                                 {content.objective}
                             </p>
                         </div>
                     </div>
                 )

            });
        }
        else {
            displayContent = <div>Loading.....</div>
        }


    }

    render() {
        this.init();
        if(this.props.courses.list.totalContent > 0) {
            data = <div className="container">
                    {displayContent}

                    <div className="pagination-centered" >
                        <div className="pagination">
                            <Pagination
                                // hideDisabled
                                activePage={this.state.activePage}
                                itemsCountPerPage={5}
                                totalItemsCount={this.props.courses.list.totalContent}
                                pageRangeDisplayed={3}
                                onChange={this.handlePageChange}
                                innerClass={'tell-page'}
                                hideFirstLastPages={false}
                            />

                        </div>
                    </div>
                </div>
        } else {
            data = <div className="col-xs-12" style={{minHeight:200}}>No related videos</div>
        }

        return (
            <div className="row">
                <div className="col-xs-12">
                    <h4 className="pull-left">Related video from selected category</h4>
                </div>

                {data}
            </div>
        )


    }
}

const mapStateToProps = state => ({
    courses: state.courses,
    user: state.user
});

export default connect(mapStateToProps)(ListContentBaris);
