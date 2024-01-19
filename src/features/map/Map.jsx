import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurPosition } from './mapsSlice';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
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
    max-height: 92vh;
    width: min(30rem, 90%);
    margin: auto;
    padding: 1rem;
    transition: width 0.6s ease, bottom 0.6s ease, left 0.6s ease-out, transform 0.6s ease;

    @media screen and (min-width: 768px) {
        bottom: 2.2rem;
    }
    @media screen and (min-width: 1280px) {
        left: calc(100% - 30rem - 2.2rem);
        transform: translate(0);
        width: 30rem;
        margin: 0;
    }
`;

function Map() {
    const mapRef = useRef(null);
    const curPosition = useSelector((state) => state.maps.curPosition);

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

        return null;
    }

    return (
        <StyledLayout>
            <MainNav />
            <Container>
                <StyledFloat>
                    <Outlet />
                </StyledFloat>
                <StyledMap>
                    <MapContainer
                        center={curPosition}
                        zoom={13}
                        minZoom={3}
                        scrollWheelZoom={true}
                        ref={mapRef}
                        style={{ height: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                        />
                        <Marker position={curPosition} />
                        <MapBounds />
                        <ChangeCenter position={curPosition} />
                        <ClickMap />
                    </MapContainer>
                </StyledMap>
            </Container>
        </StyledLayout>
    );
}
export default Map;

//改變地圖畫面中心
function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);

    return null;
}

//點擊地圖更新點擊座標
function ClickMap() {
    const dispatch = useDispatch();
    const map = useMap(); //配合 mapRef 抓取實例

    map.on('click', (e) => {
        const newPosition = [e.latlng.lat, e.latlng.lng];
        dispatch(setCurPosition(newPosition));
    });
}
