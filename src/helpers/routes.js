import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Route, Redirect } from 'react-router-dom';
export function PrivateRoute({ component: Component, ...restProps }) {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<Route
			{...restProps}
			render={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/', state: { from: props.location } }} />
				)
			}
		/>
	);
}

export function IsUserRedirect({ ...restProps }) {
	const { isAuthenticated } = useContext(AuthContext);

	return isAuthenticated ? <Redirect to="/browse" /> : <Route {...restProps} />;
}

