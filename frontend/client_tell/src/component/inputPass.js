import React from "react";

class InputPass extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            type: 'password',
            iconEye: 'far fa-eye-slash'
        }

        this.handeleEye = this.handeleEye.bind(this);
    }

    handeleEye(e){
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'password' ? 'text' : 'password'
        })
        this.setState({
            iconEye: this.state.iconEye === 'far fa-eye-slash' ? 'far fa-eye' : 'far fa-eye-slash'
        })
    }


    render(){
        return(
            <div className="input-holder">
                <div className="input-group input-group-ls">
                    <div className="input-group-addon input-group-addon-ls">
                        <img src={this.props.icon} width='38' height='38' alt='icon' />
                    </div>
                        <input
                            className="form-control"
                            id={this.props.name}
                            name={this.props.name}
                            type={this.state.type}
                            value={this.props.value}
                            onChange={this.props.handleChange}
                            placeholder={this.props.placeholder}
                            {...this.props}
                        />
                    <div className="input-group-append">
                        <span onClick={this.handeleEye} className="input-group-text"><i className={this.state.iconEye}></i></span>
                    </div>
                </div>
            </div>
        )
    }

}

export default InputPass;