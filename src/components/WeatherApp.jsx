import React, { useEffect, useState } from 'react';
import axios from 'axios'

const WeatherApp = () => {

    const [data, setData] = useState({})
    const [temperature, setTemperature] = useState(0)
    const [isKelvin, setIsKelvin] = useState(true)

    useEffect(() => {
        const success = pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a16066540624331ed130e29bf6148bfd`)
                .then(res => {
                    setData(res.data)
                    setTemperature(res.data.main.temp)
                })
        }
        navigator.geolocation.getCurrentPosition(success);
    }, [])

    const convertTemperature = () => {
        if (isKelvin) {
            setTemperature(Math.round(temperature - 273.15))
            setIsKelvin(false)
        } else {
            setTemperature(temperature + 273.15)
            setIsKelvin(true)
        }
    }

    return (
        <div className='container-card'>
            <div className='card'>
                <h1>Weather <b> App</b></h1>
                <h2>{data.name}, {data.sys?.country}</h2>
                <div className='separator'></div>
                <h3> <b> {data.weather?.[0].description}</b></h3>
                <img src={`http://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`} style={{ width: '200px' }} alt="" />
                <h3><b>Temperature: </b>{temperature} {isKelvin ? '°K' : '°C'}</h3>
                <h3> <b>min:</b>  {isKelvin ? `${data.main?.temp_min} °K` : `${Math.round(data.main?.temp_min - 273.15)} °C`} / <b>max:</b>  {isKelvin ? `${data.main?.temp_max} °K` : `${Math.round(data.main?.temp_max - 273.15)} °C`}</h3>
                <h3><b>Wind Spped: </b> {data.wind?.speed} m/s</h3>
                <h3><b>Humidity: </b>{data.main?.humidity}%</h3>
                <div className='separator'></div>
                <button onClick={convertTemperature}><b> {isKelvin ? 'Change kelvin to celcius' : 'Change celcius to kelvin'}</b></button>
            </div>
        </div>
    );
};

export default WeatherApp;
