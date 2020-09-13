import React from 'react';

function InfoPoster( props ) {
	return (
		<div className={`infoPoster-${props.md}`}>
      {props.children}
    </div>
	)
}
export default InfoPoster;
