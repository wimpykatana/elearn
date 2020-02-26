import React from 'react';

class CheckBox extends React.Component{

    render(){
        return(
            <div style={{marginTop: 20}} className="col-xs-12">
            <label className="customcheck">{this.props.desc}
                <input 
                    type="checkbox" 
                    checked={this.props.value}
                    name={this.props.name} 
                    id={this.props.name} 
                    onChange={this.props.action}
                />
                <span className="checkmark"></span>
            </label>
            </div>
        )
    }

}

export default CheckBox;