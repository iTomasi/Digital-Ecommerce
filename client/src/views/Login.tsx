import React, { useState, useContext } from 'react';
import config from '../config/config';
import Axios from 'axios';

// Context
import NotificationContext from '../context/notification/NotificationContext';

import FormSection from '../components/form/FormSection';

const Login = () => {
	const { showNotification } = useContext(NotificationContext);
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const handlePassword = () =>
		showPassword ? setShowPassword(false) : setShowPassword(true);

	const loggin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		if (!formData.get('username'))
			return showNotification('error', 'Insert your username');
		else if (!formData.get('password'))
			return showNotification('error', 'Insert your password');

		try {
			const res = await Axios.post(
				config.HOST.BACK_END + '/auth/sign-in',
				{
					username: formData.get('username'),
					password: formData.get('password'),
				},
				{ headers: { 'Content-Type': 'application/json' } }
			);

			if (res.data.message !== 'Logged')
				return showNotification('error', res.data.message);

			showNotification('success', res.data.message);
			localStorage.setItem('token', res.data.token);
			setTimeout(() => {
				window.location.href = '/';
			}, 2000);
		} catch (e) {
			console.log(e);
			console.log('loggin() (Login.tsx) Error');
		}
	};

	return (
		<form className="bg-gray-700 w-11/12 max-w-450px py-7 flex flex-col items-center text-center text-lg mx-auto" onSubmit={loggin}>
			<FormSection
				title="Username or Email"
				type="text"
				name="username"
				isPassword={false}
			/>

			<FormSection
				title="Password"
				type={showPassword ? 'text' : 'password'}
				name="password"
				className={showPassword ? config.EYE.unhidde : config.EYE.hidde}
				onClick={handlePassword}
				isPassword={true}
			/>

			<button className="border-2 border-green-400 w-5/6 h-10 hover:bg-green-400 hover:text-black focus:outline-none" type="submit">Log In</button>
		</form>
	);
};

export default Login;
