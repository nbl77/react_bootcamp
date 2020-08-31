import React from 'react';

export default function Button( props ) {
	return (
		<div className="form-button">
      <input type={props.type} name={props.name} value={props.value}/>
    </div>
	)
}
