import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import config from '../config/config';
import Axios from 'axios';

// Context
import NotificationContext from '../context/notification/NotificationContext';

// Components
import FormSection from "../components/form/FormSection";
import FormFile from "../components/form/FormFile";
import FormPercentage from "../components/form/FormPercentage";

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
		<form className="bg-gray-700 w-11/12 max-w-450px py-7 flex flex-col items-center text-center text-lg mx-auto" onSubmit={sendingDatas}>

			<FormSection 
				title="Username"
				type="text"
				name="username"
				isPassword={false}
			/>

			<FormSection 
				title="Email"
				type="text"
				name="email"
				isPassword={false}
			/>

			<FormSection
				title="Password"
				type={showPassword.password ? "text" : "password"}
				name="password"
				isPassword={true}
				className={showPassword.password ? config.EYE.unhidde : config.EYE.hidde}
				onClick={handlePassword}
			/>
			
			<FormSection 
				title="Confirm Password"
				type={showPassword.confirm_password ? "text" : "password"}
				name="confirm_password"
				isPassword={true}
				className={showPassword.confirm_password ? config.EYE.unhidde :config.EYE.hidde}
				onClick={handlePassword}
			/>

			<FormFile
				id="inputFile"
				title="Picture Profile"
				file="IMG"
				fileName={fileName}
				defaultName="Select an IMG"
				name="userImg"
				onChange={handleInputFile}
			/>

			<FormPercentage
				display={uploadPercentage.display}
				percentage={uploadPercentage.percentage}
			/>

			<button className="border-2 border-green-400 w-5/6 h-10 hover:bg-green-400 hover:text-black focus:outline-none" type="submit">Register</button>
		</form>
	);
};

export default Register;
