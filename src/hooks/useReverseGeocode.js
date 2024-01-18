import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export function useReverseGeocode() {
    const position = useSelector((state) => state.maps.curPosition);
    const { lat = position[0], lng = position[1] } = position;
    const [address, setAddress] = useState('');

    useEffect(() => {
        //利用 nominatim api 將經緯度轉換成地址
        async function fetchData() {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                );
                const data = await res.json();
                const formattedAddress = formatAddress(data);
                setAddress(formattedAddress);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [position]);

    return address;
}

function formatAddress(apiData) {
    let newAddress = '';
    const {
        country = apiData.address.country,
        postcode = apiData.address.postcode,
        city = apiData.address.city,
        suburb = apiData.address.suburb,
        road = apiData.address.road,
        number = apiData.address.house_number,
    } = apiData.address;

    if (country === '臺灣') {
        //依照台灣習慣排序，如果空值就不顯示在網址中
        newAddress = `${country} - ${postcode || ''}${city || ''}${suburb || ''}${road || ''}${
            number || ''
        }`;
    } else {
        //其他國家按照api提供的地址順序
        newAddress = apiData.display_name.replace(/,/g, ' ');
    }
    return newAddress;
}
