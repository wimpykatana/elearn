import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../../config/config.json';

export default class CategoryHead extends Component{

    constructor(props){
        super(props);

        this.state = {
            rootCategory: ''
        }
    }

    componentDidMount(){
        fetch(config.api+"/category/0")
        .then(res => res.json())
        .then(json => {
            this.setState({
                rootCategory: json
            })
        })

       
    }

    render(){
        // console.log(this.state.rootCategory);
        return(
            <div className="list_categories">
                <ul>
                    <li className="dropdown">
                        <button className="dropdown-toggle text-left" type="button" id="categories" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="icon_categories">&nbsp;</span>Categories
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="categories">
                            <span className="corner-up-left"></span>
                            {/* PARENT - Capital Market */}
                                <li className="dropdown">
                                    <Link to="/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Capital Market <i className="ti-angle-right pull-right"></i>
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {/* CHILD 1 */}
                                        <li className="dropdown">
                                            <Link to="/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Fundamental
                                            </Link>
                                        </li>
                                        {  /* CHILD 2 */}
                                        <li className="dropdown">
                                            <Link to="/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Technical 
                                            </Link>
                                        </li>
                                        {  /* CHILD 3 */}
                                        <li className="dropdown">
                                            <Link to="/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Physchology 
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            {/* END OFF PARENT - Capital Market */}

                            {/* PARENT - economic */}
                            <li className="dropdown">
                                <Link to="/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Economics <i className="ti-angle-right pull-right"></i>
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {/* CHILD 1 */}
                                    <li className="dropdown">
                                        <Link to="/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Macro Economics 
                                        </Link>   
                                    </li>
                                    {  /* CHILD 2 */}
                                    <li className="dropdown">
                                        <Link to="/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Micro Economics 
                                        </Link>            
                                    </li>
                                </ul>
                            </li>
                            {/* END OFF PARENT -Economic */}

                        </ul>
                    </li>
                </ul>
            </div>
        )
    }

}
