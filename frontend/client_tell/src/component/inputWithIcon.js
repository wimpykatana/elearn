import React from "react";

class InputIcon extends React.Component{

    render(){
        return(
            
            <div style={{marginBottom: 20}} className="input-holder">
                <div className="input-group input-group-ls">
                    <div style={icon} className="input-group-addon input-group-addon-ls">
                        <img src={this.props.icon} alt='icon' />
                    </div>
                    <input
                        className="form-control"
                        id={this.props.name}
                        name={this.props.name}
                        type={this.props.inputype}
                        value={this.props.value}
                        onChange={this.props.handleChange}
                        placeholder={this.props.placeholder}
                        {...this.props}
                    />
                </div>
                <div className="clearfix"></div>
            </div>

            
        )
    }

}

const icon = {
    width: '48px',
}

export default InputIcon;
