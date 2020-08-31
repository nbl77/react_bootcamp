import React from 'react';
import Nav from './Nav';

function Header( props ) {
	return (
		<div>
        {props.children}
    </div>
	)
}
export {
	Nav,
	Header
}
