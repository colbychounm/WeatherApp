import { useCallback, useEffect, useState } from "react"
import Search from "../Search";
import React from "react";

export const Context = React.createContext('')

function Weather () {
    const [city, setCity] = useState('Tokyo');
    const [res, setRes] = useState('')
    const [fahr, setFahr] = useState('')

    const callApi = useCallback((data) => {
        setRes('')
        fetch(`https://openweathermap.org/data/2.5/weather?q=${data}&appid=439d4b804bc8187953eb36d2a8c26a02`)
        .then(res => res.json())
        .then(res => setRes(res))
    },[])

    useEffect(() => {
        if (res) {
            const newFahr = Math.floor((9/5 * res.main.temp + 32) * 100) / 100
            setFahr(newFahr)
        }
    },[res])

    useEffect(() => {
        callApi(city)
    }, [city, callApi])

    const searchCity = useCallback((input) => {
        setCity(input)
    },[])

    return (
        <div className="weather-container">
            <h1>WEATHER</h1>
            <div className="weather-body">
                {
                    res ? (
                        <>
                         <div className="left">
                        <h2>{res.name}</h2>
                        <h5>{res.weather[0].description}</h5>
                    </div>
                    <div className="right">
                        <h3>{res.main.temp} °C</h3>
                        <h4>{fahr} °F</h4>
                    </div>
                        </>
                       
                    )
                    :
                    (
                        <div className="loading">
                            <i className="fas fa-spinner"></i>
                        </div>
                    )
                }
               
            </div>
            <Context.Provider value={callApi}>
                <Search searchCity={searchCity}/>
            </Context.Provider>
        </div>
    )
}

export default Weather