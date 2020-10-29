import React from 'react';
import {
	Container,
	Base,
	Input,
	Submit,
	Label,
	Error,
	Indicator,
} from './styles/form';

export default function Form({ children, ...restProps }) {
	return <Container {...restProps}>{children}</Container>;
}

Form.Base = function FormBase({ children, ...restProps }) {
	return <Base {...restProps}>{children}</Base>;
};

Form.Input = function FormInput({ children, ...restProps }) {
	return <Input {...restProps}>{children}</Input>;
};

Form.Submit = function FormSubmit({ children, ...restProps }) {
	return <Submit {...restProps}>{children}</Submit>;
};

Form.Label = function FormLabel({ children, ...restProps }) {
	return <Label {...restProps}>{children}</Label>;
};

Form.Error = function FormError({ children, ...restProps }) {
	return <Error {...restProps}>{children}</Error>;
};

Form.Indicator = function FormIndicator({ children, ...restProps }) {
	return <Indicator {...restProps} />;
};
