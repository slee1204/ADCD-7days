import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import styles from "@/styles/Home.module.css"
import { Icon } from '@iconify/react';
import sunRisingLoop from '@iconify/icons-line-md/sun-rising-loop';

export default function Home() {

  const apiKey = "e9072639309082a40bdab6d9f2f1d809"
  const location = "vancouver"
  const units ="metric"
  const url = `https://api.openweathermap.org/data/2.5/forecast?` + `q=${location}&units=${units}&appid=${apiKey}`
  
  const [data, setData] = useState()
  const grabWeather = useRef(false)

  const fetchWeather = async () => {
    const response = await axios.get(url);
    console.log(response);

    console.log(response.data.list);
    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather, index) => {
      console.log(parseInt(weather.dt_txt.substr(8,2),10))
      let num = parseInt(weather.dt_txt.substr(8,2),10)

      if(num !== arrayOfDays.find(element => element === num)){
        arrayOfDays.push(num);
        console.log("Here");
        console.log(response.data.list[index])

        var month = '';
        var icon = '';

        if(weather.dt_txt.substr(5,2) == 1) {
          month = 'January';
        } else if(weather.dt_txt.substr(5,2) == 2) {
          month = 'February';
        }else if(weather.dt_txt.substr(5,2) == 3) {
          month = 'March';
        }else if(weather.dt_txt.substr(5,2) == 4) {
          month = 'April';
        }else if(weather.dt_txt.substr(5,2) == 5) {
          month = 'May';
        }else if(weather.dt_txt.substr(5,2) == 6) {
          month = 'June';
        }else if(weather.dt_txt.substr(5,2) == 7) {
          month = 'July';
        }else if(weather.dt_txt.substr(5,2) == 8) {
          month = 'August';
        }else if(weather.dt_txt.substr(5,2) == 9) {
          month = 'September';
        }else if(weather.dt_txt.substr(5,2) == 10) {
          month = 'October';
        }else if(weather.dt_txt.substr(5,2) == 11) {
          month = 'November';
        }else if(weather.dt_txt.substr(5,2) == 12) {
          month = 'December';
        }

        if(weather.weather[0].main == "Clouds") {
          icon = '/icons/broken-clouds.svg';
        } else if(weather.weather[0].main == "Clear") {
          icon = '/icons/clear-sky.svg';
        }else if(weather.weather[0].main == "Rain") {
          icon = '/icons/rain.svg';
        }else if(weather.weather[0].main == "Snow") {
          icon = '/icons/snow.svg';
        }else if(weather.weather[0].main == "Thunderstorm") {
          icon = '/icons/thunderstorm.svg';
        }else if(weather.weather[0].main == "Drizzle") {
          icon = '/icons/shower-rain.svg';
        }else if(weather.weather[0].main == "Atmosphere") {
          icon = '/icons/mist.svg';
        }

        var now = new Date(weather.dt_txt);
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var day = days[now.getDay()];

        return (
          <div key={index}>
            <p style={{color: "#454F57", fontSize: "20px"}}>
              {day} <br/> {month} {weather.dt_txt.substr(8,2)}, {weather.dt_txt.substr(0,4)}
            </p>
            <Image
              src={icon}
              alt={icon}
              width={180}
              height={180}
              priority
            />
            <div style={{color: "#4AE2E3", fontFamily: "'Genos', sans-serif", fontSize: "30px", fontWeight: "600", marginBottom: "5px"}}>{weather.main.temp.toFixed(1)} °C</div>
            <div style={{color: "#454F57", fontFamily: "'Genos', sans-serif", fontSize: "23px", fontStyle: "italic"}}>{weather.weather[0].main}</div>

          </div>
        )
      }
    })
    console.log(arrayOfDays);
    setData(weatherData);
  }

  useEffect(()=>{
    if(grabWeather.current === true){
      fetchWeather()
    }

    return () => {
      grabWeather.current = true;
    }

  },[]);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`
  

  return (
    <>
      <Head>
        <title>Weather Forecast App</title>
        <meta name="description" content="Created by Sue Lee" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/weather.svg" />
      </Head>
      <div className="container">

        <div className={styles.center}>
          <Image 
            className = {styles.logo}
            src="/Logo1.svg"
            alt="Weather Forecast Logo"
            width={300}
            height={100}
            priority
          />
          <Icon 
            icon={sunRisingLoop} 
            color="#FFE98E" 
            width={50} 
            height ={50}
          />
          <Image 
            className = {styles.logo}
            src="/Logo2.svg"
            alt="Weather Forecast Logo"
            width={200}
            height={100}
            priority
          />
        </div>

        <div className={styles.info}>
          <a
            href=''
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            Sue
          </a>
        </div>

        <div className={styles.location}>
          <p className={styles.info}>Vancouver, B.C. Weather &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.update}>Last Upadated: {date}</span>
          </p>
        </div>
        
        <div className={styles.grid}>

          {data}

        </div>
      </div> 
    </>
  )
}
