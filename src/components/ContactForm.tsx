import React from 'react';
import { FC } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import styled from 'styled-components';
import InputLabelled from '../shared/components/InputLabelled';
import InputErrorWrapper from '../shared/components/InputErrorWrapper';
import InputFile from './InputFile';

const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = [
	"application/pdf", //.pdf
	"application/msword", //.doc
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document" //.docx
];

const schema = yup.object().shape({
	firstName: yup.string().required('Required'),
	lastName: yup.string().required('Required'),
	birthday: yup.date().required('Required'),
	subject: yup.string().required('Required'),
	body: yup.string().required('Required'),
	cv: yup.mixed()
		.test(
			"fileFormat",
			"Unsupported Format",
			value => value ? value && SUPPORTED_FORMATS.includes(value.type) : true
		)
		.test(
			"fileSize",
			"File too large",
			value => value ? value && value.size <= FILE_SIZE : true
		)
});

const FormDiv = styled.div`
	width: 650px;
	& div, & input, & textarea {
		font-weight: 500;
	}
`

const H2 = styled.h2`
	font-size: 1.75em;
	margin-bottom: 1em;
`

const Form = styled.form`
	display: flex;
	flex-direction: column;
`

const BodyInput = styled.textarea`
	margin: 0.25em 0;
	flex-grow: 1;
	border-width: 2px;
	border-color: transparent
`

const Button = styled.button`
	margin: 1em 0;
	height: 40px;
	font-family: 'Orbitron', sans-serif;
	font-weight: bold;
	font-size: 110%;
`

const initialValues = { firstName: '', lastName: '', birthday: '', subject: '', body: '', cv: undefined }

export const ContactForm: FC = () => {
	return (
		<FormDiv>
			<Formik
				initialValues={initialValues}
				validationSchema={schema}
				validateOnChange={false}
				validateOnBlur={false}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setTimeout(() => {
						console.dir(values);
						setSubmitting(false);
						resetForm({ values: initialValues });
					}, 400);
					// try {
					// 	await addDoc(collection(db, 'rsvp'), {
					// 		...values,
					// 		createdAt: serverTimestamp(),
					// 	});
					// 	setSubmitting(false);
					// } catch (err) {
					// 	console.error(err);
					// 	setSubmitting(false);
					// }
				}}
			>
				{({
					values,
					errors,
					handleChange,
					handleSubmit,
					isSubmitting,
					setFieldValue,
					setFieldError,
					validateForm
				}) => (
					<Form noValidate onSubmit={handleSubmit}>
						<H2>Contact Form</ H2>

						<InputLabelled
							id="firstName"
							label="First Name:"
							handleChange={(event) => {
								handleChange(event)
								setFieldError(event.target.name, '')
							}}
							value={values.firstName}
							error={errors.firstName}
						/>
						<InputLabelled
							id="lastName"
							label="Last Name:"
							handleChange={(event) => {
								handleChange(event)
								setFieldError(event.target.name, '')
							}}
							value={values.lastName}
							error={errors.lastName}
						/>
						<InputLabelled
							type="date"
							id="birthday"
							label="Birthday:"
							handleChange={(event) => {
								handleChange(event)
								setFieldError(event.target.name, '')
							}}
							value={values.birthday}
							error={errors.birthday}
						/>
						<InputLabelled
							id="subject"
							label="Subject:"
							handleChange={(event) => {
								handleChange(event)
								setFieldError(event.target.name, '')
							}}
							value={values.subject}
							error={errors.subject}
						/>
						<div style={{ margin: '2em 0 1em' }}>
							<InputErrorWrapper error={errors.body}>
								<BodyInput
									name="body"
									placeholder='Your message!'
									rows={18}
									onChange={(event) => {
										handleChange(event)
										setFieldError(event.target.name, '')
										console.dir(errors);
									}}
									value={values.body}
								/>
							</InputErrorWrapper>
						</div>
						<div style={{ marginBottom: '1.25em' }}>
							<InputFile
								id="cv"
								handleChange={(event) => {
									const file = event.target.files![0];
									setFieldValue("cv", file);
									validateForm({ cv: file });
								}}
								error={errors.cv}
							/>
						</div>
						<Button type="submit" disabled={isSubmitting}>
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</FormDiv>
	);
};