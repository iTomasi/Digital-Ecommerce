import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import config from '../config/config';
import Axios from 'axios';
import './scss/form.scss';

// Context
import NotificationContext from '../context/notification/NotificationContext';

interface IShowPassword {
	password: boolean;
	confirm_password: boolean;
}

interface IUploadPercentage {
	display: boolean;
	percentage: number;
}

const Register = () => {
	const history = useHistory();
	const { showNotification } = useContext(NotificationContext);

	const [showPassword, setShowPassword] = useState<IShowPassword>({
		password: false,
		confirm_password: false,
	});

	const [fileName, setFileName] = useState<string>('Select an IMG');

	const [uploadPercentage, setUploadPercentage] = useState<IUploadPercentage>({
		display: false,
		percentage: 0,
	});

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
			showNotification('error', 'Your profile img should be an img..');
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
		const userImg: any = formData.get("userImg");

		if (username.length < 3)
			return showNotification(
				'error',
				'Your username must contains at less 3 characters'
			);
		else if (!emailRegExp.test(email))
			return showNotification('error', 'invalid email');
		else if (!passwordRegExp.test(password))
			return showNotification(
				'error',
				'your password must contains at less 5 characters and [upper and lower case, numbers and special characters]'
			);
		else if (password !== confirm_password)
			return showNotification('error', 'password not match');

		try {
			const res = await Axios.post(
				config.HOST.BACK_END + '/auth/sign-up',
				formData,
				{
					onUploadProgress: (e) => {
						const progressPercentage = Math.round((e.loaded * 100) / e.total);

						if (!uploadPercentage.display && userImg.name) {
							setUploadPercentage((prev: any) => ({
								...prev,
								display: true,
								percentage: progressPercentage,
							}));
							return;
						}

						setUploadPercentage((prev: any) => ({
							...prev,
							percentage: progressPercentage,
						}));
					},
				}
			);

			if (res.data.message !== 'Registered')
				return showNotification('error', res.data.message);
			showNotification('success', res.data.message);

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

			<div className="formSection">
				<div className="formFile">
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
			</div>

			<div
				className="formPercentage"
				style={{ display: uploadPercentage.display ? 'block' : 'none' }}
			>
				<div className="bar">
					<div
						className="current"
						style={{ width: `${uploadPercentage.percentage}%` }}
					></div>
				</div>
			</div>

			<button type="submit">Register</button>
		</form>
	);
};

export default Register;
