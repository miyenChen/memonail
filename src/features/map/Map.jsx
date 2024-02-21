import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { useRef, useEffect } from 'react';
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
    height: ${(props) => props.$height || ''};
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
    const mapFloatHeight = useSelector((state) => state.maps.mapFloatHeight);
    const positionList = useSelector((state) => state.maps.positionList);

    //指定 icon 的圖片，避免打包時遺漏
    const ICON = L.icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIcon2x,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
    });

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
                <StyledFloat $height={mapFloatHeight}>
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
                        {positionList &&
                            positionList.map((pos, index) => (
                                <Marker position={pos.position} key={index} icon={ICON}>
                                    <Popup>
                                        <span>{pos.name}</span>
                                    </Popup>
                                </Marker>
                            ))}
                        {curPosition && (
                            <>
                                <Marker position={curPosition} icon={ICON} />
                                <ChangeCenter position={curPosition} />
                            </>
                        )}
                        <MapBounds />
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
    const clickLimit = useSelector((state) => state.maps.clickLimit);

    useEffect(() => {
        const handleMapClick = (e) => {
            const newPosition = [e.latlng.lat, e.latlng.lng];
            dispatch(setCurPosition(newPosition));
        };

        if (clickLimit) {
            map.on('click', handleMapClick);
        } else {
            // 如果 clickLimit 變為 false，則移除事件監聽
            map.off('click', handleMapClick);
        }

        // 在組件卸載時清理事件監聽
        return () => {
            map.off('click', handleMapClick);
        };
    }, [clickLimit]);
}
