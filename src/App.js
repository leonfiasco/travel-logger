import react from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { listLogEntries } from './API';

function App() {
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
				<Marker
					key={entry._id}
					latitude={entry.latitude}
					longitude={entry.longitude}
					offsetLeft={-20}
					offsetTop={-10}
				>
					<div>
						<svg
							className='marker'
							style={{
								width: viewport.zoom,
							}}
							viewBox='0 0 24 24'
							stroke-width='1.5'
							fill='none'
							stroke-linecap='round'
							stroke-linejoin='round'
							class='css-i6dzq1'
						>
							<path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
							<circle cx='12' cy='10' r='3'></circle>
						</svg>
					</div>
				</Marker>
			))}
		</ReactMapGL>
	);
}

export default App;
