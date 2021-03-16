import react from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';
import EntryForm from './EntryForm';

function App() {
	const [logEntries, setLogEntries] = useState([]);
	const [showPopup, setShowPopup] = useState({});
	const [addEntryLocation, setAddEntryLocation] = useState(null);

	const [viewport, setViewport] = useState({
		width: '100vw',
		height: '100vh',
		latitude: 40.7484,
		longitude: -73.9857,
		zoom: 3,
	});

	useEffect(() => {
		(async () => {
			const logEntry = await listLogEntries();
			setLogEntries(logEntry);
		})();
	}, []);

	const showAddMarkerPopup = (e) => {
		const [longitude, latitude] = e.lngLat;
		setAddEntryLocation({
			latitude,
			longitude,
		});
	};

	return (
		<ReactMapGL
			{...viewport}
			mapStyle='mapbox://styles/mapbox/dark-v10'
			mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
			onViewportChange={(nextViewport) => setViewport(nextViewport)}
			onDblClick={showAddMarkerPopup}
		>
			{logEntries.map((entry) => (
				<>
					<Marker
						key={entry._id}
						latitude={entry.latitude}
						longitude={entry.longitude}
						offsetLeft={-12}
						offsetTop={-24}
					>
						<div
							onClick={() =>
								setShowPopup({
									[entry._id]: true,
								})
							}
						>
							<svg
								className='marker'
								style={{
									width: '24px',
									height: '24px',
								}}
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
								<circle cx='12' cy='10' r='3'></circle>
							</svg>
						</div>
					</Marker>
					{showPopup[entry._id] ? (
						<Popup
							latitude={entry.latitude}
							longitude={entry.longitude}
							closeButton={true}
							closeOnClick={false}
							dynamicPosition={true}
							onClose={() => setShowPopup({})}
							anchor='top'
						>
							<div className='popup'>
								<h3>{entry.title}</h3>
								<p>{entry.comments}</p>
								<small>
									Visited on: {new Date(entry.visitDate).toLocaleDateString()}
								</small>
							</div>
						</Popup>
					) : null}
				</>
			))}
			{addEntryLocation ? (
				<>
					<Marker
						key={addEntryLocation._id}
						latitude={addEntryLocation.latitude}
						longitude={addEntryLocation.longitude}
						offsetLeft={-12}
						offsetTop={-24}
					>
						<div
							onClick={() =>
								setShowPopup({
									[addEntryLocation._id]: true,
								})
							}
						>
							<svg
								className='new-marker'
								style={{
									width: '24px',
									height: '24px',
								}}
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								fill='none'
								strokeLinecap='round'
								strokeLinejoin='round'
							>
								<path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
								<circle cx='12' cy='10' r='3'></circle>
							</svg>
						</div>
					</Marker>
					<Popup
						latitude={addEntryLocation.latitude}
						longitude={addEntryLocation.longitude}
						closeButton={true}
						closeOnClick={false}
						dynamicPosition={true}
						onClose={() => setAddEntryLocation(null)}
						anchor='top'
					>
						<div className='popup'>
							<EntryForm location={addEntryLocation} />
						</div>
					</Popup>
				</>
			) : null}
		</ReactMapGL>
	);
}

export default App;
