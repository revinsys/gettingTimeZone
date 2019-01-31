import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()
const GOOGLE_KEY = process.env.GOOGLE_KEY;

export const gettingTimeZone = async (city) => {
    try {
        const geoDataResponse = await axios.get(`https://geocode-maps.yandex.ru/1.x/`, { 
            params: { 
                geocode: city,
                format: 'json',
                results: 1
            }
        });
        const yandexCoord = geoDataResponse.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
        const coord = `${yandexCoord[1]},${yandexCoord[0]}`;
        const timestamp = 1458000000;
        const timeZoneResponse = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${coord}&timestamp=${timestamp}&key=${GOOGLE_KEY}`);
        const { timeZoneId } = timeZoneResponse.data;
        return timeZoneId;
    } catch (e) {
        if (e.response && e.response.status == 429)
            throw new Error('request rate limit');
    }
}

export default {
    gettingTimeZone,
};