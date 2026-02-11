'use client';

import {
    GoogleMap,
    Marker,
    InfoWindow,
    useJsApiLoader,
} from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AgencyInterface } from '../../interface/agency/agency.interface';
import locationIcon from '../../../asset/img/location3.png';

type Props = {
    selectedAgency: AgencyInterface | null;
};

const containerStyle = {
    width: '100%',
    height: '70vh',
};


function GoogleMapView({ selectedAgency }: Props) {
    const DEFAULT_CENTER = { lat: Number(selectedAgency?.lat), lng: Number(selectedAgency?.long) };

    const mapRef = useRef<google.maps.Map | null>(null);
    const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
    const [activeMarker, setActiveMarker] = useState<AgencyInterface | null>(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyD1ICiOLsU1OSuiEOMkjP0gvVHbu1jDsY8',
    });

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    // Xử lý khi selectedAgency thay đổi
    useEffect(() => {
        if (!selectedAgency) {
            setActiveMarker(null);
            return;
        }

        const lat = Number(selectedAgency.lat);
        const lng = Number(selectedAgency.long);

        if (isNaN(lat) || isNaN(lng) || !lat || !lng) {
            console.warn('Invalid coordinates:', selectedAgency);
            return;
        }

        const target = { lat, lng };
        setMapCenter(target);
        setActiveMarker(selectedAgency);

        if (mapRef.current) {
            mapRef.current.panTo(target);
            mapRef.current.setZoom(14);

            setTimeout(() => {
                if (!mapRef.current) return;
                const mapDiv = mapRef.current.getDiv() as HTMLElement;
                const offsetY = mapDiv.offsetHeight * 0.25;
                mapRef.current.panBy(0, -offsetY);
            }, 150);
        }
    }, [selectedAgency]);

    if (!isLoaded) {
        return <div style={containerStyle}>Loading map...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={12}
            onLoad={onLoad}
            options={{
                gestureHandling: 'greedy',
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
            }}
        >
            {activeMarker && (
                <Marker
                    icon={{
                        url: locationIcon,
                        scaledSize: new google.maps.Size(30, 45),
                        anchor: new google.maps.Point(15, 45),
                    }}
                    position={{
                        lat: Number(activeMarker.lat),
                        lng: Number(activeMarker.long)
                    }}
                >
                </Marker>
            )}
        </GoogleMap>
    );
}

export default GoogleMapView;