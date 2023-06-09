import { useState } from "react";
import Fa from "./fontawesome-free-5.13.1-web/css/all.css";
import Sher from "./buzzer4.mp3";
function W() 
{
//   useEffect(() => {
//     window.addEventListener("keydown",
//         (event) => {
//             // space
//             if (event.keyCode == 13) {
//                 keysPressedDown.current[event.keyCode] = true;
//             }
//         }, false);
// }, []);
 
  const [City, UserCity] = useState("Mumbai");
  const [desc, Desc] = useState({});
  function searchAPI() {
  
    const buzzerSound = document.getElementById("buzzer");
    // console.log(City)
    async function FetchApi() {
      // window.location.reload();
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=740857a220614055cc6f1db9838f7f65`;
      const data = await (await fetch(url)).json();
      console.log(data);

      if (data.cod === 200) {
        const P = {
          name: `${data.name}`,
          cloud: `${data.weather[0].description}`.toUpperCase(),
          temp: `${Math.round(`${data.main.temp}` - 273.15)}` + " C",
          humidity: `${data.main.humidity}` + " % Humidity",
          code: `${data.cod}`,
        };
        if (data.main.temp > 294) {
          buzzerSound.play();
        }
        Desc(P);
      } else {
        const P = {
          //   name: '',
          name: "Enter Valid City",
        };
        Desc(P);
      }
    }

    FetchApi();
  }

 
  return (
    <div id="weather">
      <h1>TATKAL WEATHER INFO</h1>
      <audio id="buzzer" src={Sher} />
      <li style={{ listStyle: "none" }}>
        {" "}
        <input
          type="text"
          placeholder="Write City Name"
          onChange={(e) => {
            UserCity(e.target.value);
          }}

        />
      </li>
      <button type="button" onClick={() => searchAPI()} onKeyDown={(e) => searchAPI(e)}>
        Search <i class="fas fa-search" />
      </button>

      {desc.code == 200 ? (
        <div>
          <h1>
            <i className="fas fa-city" /> {desc.name}
          </h1>
          <h1>
            <i className="fas fa-temperature-low" /> {desc.temp}{" "}
          </h1>
          <h1>
            <i className="fas fa-tint" /> {desc.humidity}
          </h1>
          <h1>
            <i className="fas fa-cloud" /> {desc.cloud}
          </h1>
        </div>
      ) : (
        <h1>{desc.name}</h1>
        
      )}
    </div>
  );
}

export default W;
//3000 port
