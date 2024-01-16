import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useState, useEffect, useMemo, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import MainNav from '../../ui/MainNav';

const StyledLayout = styled.div`
    height: 100dvh;
    display: flex;
    flex-direction: column-reverse;

    @media screen and (min-width: 768px) {
        flex-direction: row;
    }
`;
const Container = styled.div`
    position: relative;
    display: flex;
    background-color: var(--color-bg);
    height: 100%;
    width: 100%;
    overflow: auto;
`;
const StyledMap = styled.div`
    flex: 1;
    height: 100%;
    background-color: var(--black-5);
    position: relative;
`;
const StyledFloat = styled.div`
    position: absolute;
    left: 50%;
    bottom: 1.2rem;
    transform: translate(-50%, 0%);
    z-index: 1000;
    background-color: #fff;
    border-radius: 0.5rem;
    width: min(30rem, 90%);
    height: 20%;
    margin: auto;
    padding: 1rem;
    transition: width 0.6s ease, bottom 0.6s ease, left 0.6s ease-out, transform 0.6s ease;

    @media screen and (min-width: 768px) {
        bottom: 2.2rem;
    }
    @media screen and (min-width: 1280px) {
        width: 30rem;
        left: 1rem;
        transform: translate(0);
    }
`;

function Map() {
    const center = [25.0646679, 121.5135884];
    const mapRef = useRef(null);

    function Check() {
        const map = useMapEvents({
            click: () => {
                map.locate();
            },
            locationfound: (location) => {
                console.log('location found:', location);
            },
        });
        return null;
    }

    //限制地圖邊界
    function MapBounds() {
        const map = useMap(); //配合 mapRef 抓取實例

        //設定世界邊界(經度, 緯度)
        const southWest = L.latLng(-88, -180);
        const northEast = L.latLng(88, 540);
        const worldBounds = L.latLngBounds(southWest, northEast);

        //當拖曳地圖事件觸發時，用panInsideBounds限制拖曳範圍
        map.on('drag', () => {
            map.panInsideBounds(worldBounds, { animate: true });
        });

        // console.log('map center:', map.getCenter());
        return null;
    }

    //拖曳座標點
    // function DraggableMarker() {
    //     const [draggable, setDraggable] = useState(false);
    //     const [position, setPosition] = useState(center);
    //     const markerRef = useRef(null);
    //     const eventHandlers = useMemo(
    //         () => ({
    //             dragend() {
    //                 const marker = markerRef.current;
    //                 if (marker != null) {
    //                     setPosition(marker.getLatLng());
    //                 }
    //             },
    //         }),
    //         []
    //     );
    //     const toggleDraggable = useCallback(() => {
    //         setDraggable((d) => !d);
    //     }, []);

    //     return (
    //         <Marker
    //             draggable={draggable}
    //             eventHandlers={eventHandlers}
    //             position={position}
    //             ref={markerRef}>
    //             <Popup minWidth={90}>
    //                 <span onClick={toggleDraggable}>
    //                     {draggable ? 'Marker is draggable' : 'Click here to make marker draggable'}
    //                 </span>
    //             </Popup>
    //         </Marker>
    //     );
    // }

    return (
        <StyledLayout>
            <MainNav />
            <Container>
                <StyledFloat>
                    <Outlet />
                </StyledFloat>
                <StyledMap>
                    <MapContainer
                        center={center}
                        zoom={13}
                        minZoom={3}
                        scrollWheelZoom={true}
                        ref={mapRef}
                        style={{ height: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                        />
                        <MapBounds />
                        {/* <DraggableMarker /> */}
                        <Check />
                    </MapContainer>
                </StyledMap>
            </Container>
        </StyledLayout>
    );
}
export default Map;
