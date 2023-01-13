import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { getActualLocation } from './shared/location';
import io from 'socket.io-client';
import './App.css'

const socket = io();

type WindowSize = {
  width: number,
  height: number
}

function App() {
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    setWindowSize(getWindowSize());

    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  const location: LatLngTuple = getActualLocation()
  return (
    <div id="map">
      <MapContainer
        center={location}
        zoom={13}
        scrollWheelZoom={false}
        style={windowSize}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div >
  )
}

function getWindowSize(): WindowSize {
  const { innerWidth, innerHeight } = window;
  return { width: innerWidth, height: innerHeight };
}

// const styles = {
//   map: {
//     width: 1000,
//     height: 1000
//   },
// } as const;

export default App
