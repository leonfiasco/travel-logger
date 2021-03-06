import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from './API';

import './index.css';

function EntryForm({ location, onClose }) {
	const { register, handleSubmit } = useForm();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const onSubmit = async (data) => {
		try {
			setLoading(true);
			data.latitude = location.latitude;
			data.longitude = location.longitude;
			const created = await createLogEntry(data);
			console.log(created);
			onClose();
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
			{error ? <h3 className='error'>{error}</h3> : null}
			<label htmlFor='apiKey'>API KEY</label>
			<input type='password' name='apiKey' ref={register} required />
			<label htmlFor='title'>Title</label>
			<input name='title' ref={register} required />
			<label htmlFor='comments'>Comments</label>
			<textarea name='comments' rows={3} ref={register}></textarea>
			<label htmlFor='description'>Description</label>
			<textarea name='description' rows={3} ref={register}></textarea>
			<label htmlFor='image'>Image</label>
			<input name='image' ref={register} />
			<label htmlFor='visitDate'>Visit Date</label>
			<input name='visitDate' type='date' ref={register} required />
			<button disabled={loading}>
				{loading ? 'Loading...' : 'Add Log Entry'}
			</button>
		</form>
	);
}

export default EntryForm;
