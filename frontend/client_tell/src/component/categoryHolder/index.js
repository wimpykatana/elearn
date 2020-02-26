import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import {delStorage, getFromStorage, setInStorage} from "../../utilis/storage";
import {connect} from "react-redux";
import {popupRatingsClick} from "../../__thedux/action/popupAction.js";

let jgnLupaRate;

class CategoryHolder extends Component {
  constructor(props){
    super(props);
    this.state = {
      ngerate: null
    };
    this.categoryClick = this.categoryClick.bind(this);
  }

  componentWillMount() {
    delStorage("RATINGS_READY");
    delStorage("USER_WATCH_VIDEO_RATINGS_CLICK_BREADCRUMB");
    this.setState({
      ngerate: false
    });
  }

  categoryClick(e){


    jgnLupaRate = getFromStorage("RATINGS_READY");

    if(jgnLupaRate){
      this.props.dispatch(popupRatingsClick(e.currentTarget.dataset.url));
      setInStorage("USER_WATCH_VIDEO_RATINGS_CLICK_BREADCRUMB", true);

      this.setState({
        ngerate: true
      });
    }
    else{
      window.location.replace(e.currentTarget.dataset.url);
    }
  }



  render(){
    // console.log(this.props.me);
    // console.log(this.props.category);
    if(!this.props.popup.disablePOP) {
      if (this.props.me) {
        return (
          <ul aria-expanded="true" data-target="#nav-dropdown" data-toggle="modal"
              className="animated sladeInDown slow mobile-category">
            <span className="corner-up-left hidden-xs hidden-sm">&nbsp;</span>
            {
              this.props.category.data.map((item) => <li className="a" key={item._id}>
                <div onClick={this.categoryClick} id={item.name.toLowerCase().replace(/ /gi, "-") + "-holder"}
                     data-url={`/category/${item.name.replace(/ /gi, "-")}`}>{item.name}</div>
              </li>)
            }
          </ul>
        )
      }
    }
    return(
      <ul aria-expanded="true" data-target="#nav-dropdown" data-toggle="modal" className="animated sladeInDown slow mobile-category">
        <span className="corner-up-left hidden-xs hidden-sm">&nbsp;</span>
        {
          this.props.category.data.map((item) => <li className="a" key={item._id}><Link target="_self" to={{pathname:"/category/"+item.name.replace(/ /gi, "-")}}>{item.name}</Link></li>)
        }
      </ul>
    )
  }

}
const mapStateToProps = state => ({
  popup: state.popup
});
const mapDispatchToProps = {
  popupRatingsClick,
};

export default connect(mapStateToProps,mapDispatchToProps)(CategoryHolder);
