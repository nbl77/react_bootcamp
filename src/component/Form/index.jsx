import React from 'react';
import Button from './button';
import Input from './input';
import Textarea from './textarea';
import Select from './selectOption';
import Radio from './radio';
import Check from './checkbox';

function Form( props ) {
	return (
		<form>
			{props.children}
		</form>
	)
}

export {
	Form,
	Button,
	Input,
	Textarea,
	Select,
	Radio,
	Check
}
