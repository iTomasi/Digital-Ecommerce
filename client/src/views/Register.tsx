import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import config from '../config/config';
import Axios from 'axios';
import './scss/form.scss';

interface IShowPassword {
	password: boolean;
	confirm_password: boolean;
}

const Register = () => {
	const history = useHistory();

	const [showPassword, setShowPassword] = useState<IShowPassword>({
		password: false,
		confirm_password: false,
	});

	const [fileName, setFileName] = useState<string>('Select an IMG');

	const handlePassword = (e: any) => {
		const getInputName = e.currentTarget.previousElementSibling.name;

		setShowPassword((prev: any) => ({
			...prev,
			[getInputName]: prev[getInputName] ? false : true,
		}));
	};

	const handleInputFile = (e: any) => {
		try {
			const getFileName = e.currentTarget.files[0];

			if (
				getFileName.type === 'image/jpeg' ||
				getFileName.type === 'image/png' ||
				getFileName.type === 'image/gif' ||
				getFileName.type === 'image/svg+xml'
			) {
				setFileName(getFileName.name);
				return;
			}

			e.currentTarget.value = null;
			setFileName('Select an IMG');
			console.log('Your profile img should be an img..');
		} catch (e) {
			setFileName('Select an IMG');
		}
	};

	const sendingDatas = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const emailRegExp = new RegExp(/^[A-Za-z0-9_]+@[A-Za-z]+\.[A-Za-z]{2,3}$/g);
		const passwordRegExp = new RegExp(
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W])[A-Za-z0-9\W]{5,}$/g
		);

		const formData = new FormData(e.currentTarget);

		const username: any = formData.get('username');
		const email: any = formData.get('email');
		const password: any = formData.get('password');
		const confirm_password: any = formData.get('confirm_password');

		if (username.length < 3)
			return console.log('Your username must contains at less 3 characters');
		else if (!emailRegExp.test(email)) return console.log('invalid email');
		else if (!passwordRegExp.test(password))
			return console.log(
				'your password must contains at less 5 characters and [upper and lower case, numbers and special characters]'
			);
		else if (password !== confirm_password)
			return console.log('password not match');

		try {
			const res = await Axios.post(
				config.HOST.BACK_END + '/auth/sign-up',
				formData
			);

			if (res.data.message !== 'Registered') return console.log(res.data);

			history.push('/sign-in');
		} catch (e) {
			console.log(e);
			console.log('sendingDatas() (Register.tsx) Error');
		}
	};

	return (
		<form className="iw_form" onSubmit={sendingDatas}>
			<div className="formSection">
				<label>Username</label>
				<input type="text" placeholder="Username..." name="username" />
			</div>

			<div className="formSection">
				<label>Email</label>
				<input type="text" placeholder="Email..." name="email" />
			</div>

			<div className="formSection">
				<label>Password</label>

				<div className="inputPassword">
					<input
						type={showPassword.password ? 'text' : 'password'}
						placeholder="Password..."
						name="password"
					/>
					<i
						className={
							showPassword.password ? config.EYE.unhidde : config.EYE.hidde
						}
						onClick={handlePassword}
					></i>
				</div>
			</div>

			<div className="formSection">
				<label>Confirm Password</label>

				<div className="inputPassword">
					<input
						type={showPassword.confirm_password ? 'text' : 'password'}
						placeholder="Confirm Password..."
						name="confirm_password"
					/>
					<i
						className={
							showPassword.confirm_password
								? config.EYE.unhidde
								: config.EYE.hidde
						}
						onClick={handlePassword}
					></i>
				</div>
			</div>

			<div className="formSection formFile">
				<label htmlFor="inputFile">IMG</label>
				<span>
					{fileName.length >= 13 && fileName !== 'Select an IMG'
						? fileName.substring(0, 13) + '...'
						: fileName}
				</span>
				<input
					id="inputFile"
					type="file"
					name="userImg"
					onChange={handleInputFile}
					style={{ display: 'none' }}
				/>
			</div>

			<button type="submit">Register</button>
		</form>
	);
};

export default Register;
