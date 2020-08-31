import React from 'react';

export default function Select( props ) {
	return (
		<div className="form-input">
      <label htmlFor={props.labelId}>{props.label}</label>
      <br/>
      <select name={props.name} required>
        {props.children}
      </select>
    </div>
	)
}
