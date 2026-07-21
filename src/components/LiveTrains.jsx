import { useEffect, useState } from "react";
import { API } from "../services/api";

export default function LiveTrains() {

    const [trains, setTrains] = useState([]);

    useEffect(() => {

    const interval = setInterval(() => {

        API.get("/api/trains")
            .then((res) => {
                console.log(trains);
                setTrains(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, 1000);

    return () => clearInterval(interval);

}, []);

    return (
        <div>
            {trains.map((train) => (
                <div key={train.id}>
                    <h3>{train.name}</h3>

                    <p>Speed: {train.speed} km/h</p>

                    <p>Station: {train.station}</p>

                    <p>Signal: {train.signal}</p>

                    <p>Platform: {train.platform}</p>
                </div>
            ))}
        </div>
    );
}