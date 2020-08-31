import React from 'react';

export default function Input( props ) {
	return (
		<div className="form-input">
      <label htmlFor={props.labelId} value="">{props.label}</label>
      <br/>
      <input type={props.type} name={props.name} placeholder={props.placeholder} required/>
    </div>
	)
}
