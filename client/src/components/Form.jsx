import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
function Form(props) {
	let [sent, setSent] = useState(false);
	let [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		request: "",
	});
	const handleChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		fetch("/repair", { method: "POST" });
	};
	return (
		<React.Fragment>
			<form action='/' method='POST' onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							sx='width: 80%'
							id='form-first-name'
							label='First Name'
							variant='outlined'
							name='firstName'
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							sx='width: 80%'
							id='form-last-name'
							label='Last Name'
							variant='outlined'
							name='lastName'
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							sx='width: 90%'
							id='form-email'
							label='Email'
							variant='outlined'
							name='email'
						/>{" "}
					</Grid>
					<Grid item xs={12}>
						<TextField
							sx='width: 90%'
							id='form-phone'
							label='Phone'
							variant='outlined'
							name='phone'
						/>{" "}
					</Grid>
					<Grid item xs={12}>
						<TextField
							id='outlined-multiline-static'
							multiline
							rows={4}
							placeholder='Let us know what your issue is:'
							sx='width: 90%'
							name='request'
						/>
					</Grid>
					<Grid item xs={12}>
						<Button id='submit-repair-request' type='submit' variant='contained'>
							Submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</React.Fragment>
	);
}

export default Form;
