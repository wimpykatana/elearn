import React from "react";

const Input = props => {
  //console.log(props.value);
  return (
    <div className="form-group form-full-ls">
        <input
        className="form-control"
        id={props.name}
        name={props.name}
        type={props.inputtype}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        {...props}
      />
    </div>
  )
};

export default Input;
