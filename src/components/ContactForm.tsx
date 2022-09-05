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
			"Unsupported format (must be .doc, .docx, .pdf)",
			value => value ? value && SUPPORTED_FORMATS.includes(value.type) : true
		)
		.test(
			"fileSize",
			"File too large (must be 2mb or less)",
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
	font-size: 1.05em;
`

interface Values {
	firstName: string;
	lastName: string;
	birthday: string;
	subject: string;
	body: string;
	cv: File | undefined
}

const initialValues: Values = { firstName: '', lastName: '', birthday: '', subject: '', body: '', cv: undefined }

export const ContactForm: FC = () => {
	return (
		<FormDiv>
			<Formik
				initialValues={initialValues}
				validationSchema={schema}
				validateOnChange={false}
				validateOnBlur={false}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					// setTimeout(() => {
					// 	alert(JSON.stringify(values, null, 2));
					// 	setSubmitting(false);
					// 	resetForm({ values: initialValues });
					// }, 400);

					let data = new FormData();
					for (const [key, value] of Object.entries(values)) {
						if (value) {
							data.append(key, value);
						}
					}

					axios.post(
						process.env.REACT_APP_CONTACT_API_URL!,
						data,
						{
							headers: { "Content-Type": "multipart/form-data", },
						}
					)
						.then((response) => {
							console.log(response);
							alert('Your message was sent, thank you for contacting us!')
							setSubmitting(false);
							resetForm({ values: initialValues });
						})
						.catch((err) => {
							console.error(err)
							alert(`Oops! Your message was not sent, please try again!`);
							setSubmitting(false);
						});
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
					validateForm,
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
									}}
									value={values.body}
								/>
							</InputErrorWrapper>
						</div>
						<div style={{ marginBottom: '0.75em' }}>
							<InputFile
								id="cv"
								label={values.cv ? values.cv.name : undefined}
								handleChange={async (event) => {
									const file = event.target.files![0];
									setFieldValue("cv", file);
									try {
										await yup.reach(schema, 'cv').validate(file)
										setFieldError('cv', '')
									} catch (err: any) {
										setFieldError('cv', err.errors)
									}

									// validateForm({ ...values, cv: file });
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