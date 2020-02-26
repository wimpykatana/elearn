import React, { Component } from 'react';

class Search extends Component {

    render() {
        return ( 
            <div className="input-group col-lg-12 center-block">
                <input value={this.props.searchValue} onChange={this.props.onChangeSearch} onKeyPress={this.props.enterFunc} className="form-search" type="text" />
                
                <ul className="list-group search-drop-down" >
                    {
                        this.props.search.data.map((item) => (<li key={item._id} onClick={() => this.props.onSelectSearch(item.title, item)} className="list-group-item">{item.title} | {item.contributorName}</li>))
                    }
                </ul>
            </div>
        )
    }
}

export default Search