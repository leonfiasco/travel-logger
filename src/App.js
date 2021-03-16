import react from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntries } from './API';

function App() {
	const [showPopup, setShowPopup] = useState({});
	const [logEntries, setLogEntries] = useState([]);
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

	return (
		<ReactMapGL
			{...viewport}
			mapStyle='mapbox://styles/mapbox/dark-v10'
			mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
			onViewportChange={(nextViewport) => setViewport(nextViewport)}
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
									showPopup,
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
								stroke-width='1.5'
								fill='none'
								stroke-linecap='round'
								stroke-linejoin='round'
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
							onClose={() => this.setState({ showPopup: false })}
							anchor='top'
						>
							<div>you are here</div>
						</Popup>
					) : null}
				</>
			))}
		</ReactMapGL>
	);
}

export default App;
