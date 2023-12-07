'use client';

import React from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

type Props = {
    center?: number[];
};

const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map: React.FC<Props> = ({ center }) => {
    return (
        <MapContainer
            center={(center as L.LatLngExpression) || [51, -0.09]}
            className="h-[35vh] rounded-lg"
            scrollWheelZoom={false}
            zoom={center ? 4 : 2}
        >
            <TileLayer attribution={attribution} url={url} />
            {center && <Marker position={center as L.LatLngExpression} />}
        </MapContainer>
    );
};

Map.defaultProps = {
    center: undefined,
};

export default Map;
