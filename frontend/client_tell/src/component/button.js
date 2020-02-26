import React from 'react';

class Button extends React.Component{
    render(){
        return(
            <div
                
                className={
                    this.props.type === "primary" ? "btn btn-primary" : "btn btn-secondary"
                }
                onClick={this.props.action}
             >
                {this.props.title}
            </div>
        )
    }
}

export default Button;