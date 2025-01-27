import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "../Menu";
import Trains from "./Trains";

export default function Kezdolap() {

    const [trains, setTrains] = useState<Trains[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [errorServer, setErrorServer] = useState<string>("");

    const toggleStatus = (id: number, status: string) => {
        console.log(status);
        fetch(`http://localhost:3000/train/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: status,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }
                setTrains((prevTrains) =>
                prevTrains.map((train) =>
                    train.TrainID === id ? { ...train, Status : status } : train
                )
            );
           
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    
    useEffect(() => {
        fetch("http://localhost:3000/train")
            .then((response) => { 
                if (response.status === 404){
                    setErrorServer('A kért erőforrás nem található (404)!');
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                }
                return response.json() 
            })
            .then((data) => {
                setTrains(data);
                setLoading(false);
                
            })
            .catch((error) => { 
                setError(error.message);
            })
    }, [])

    if(errorServer){
        return <p>{errorServer}</p>
    }
    if(loading) { 
        return <p>Loading...</p>
    }
    if(error){
        return <p>Hiba történt: {error}.</p>
    }

    return <>
        <Menu></Menu>
        <h1>Vonatok</h1>
        <table className="table">
        <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Típus</th>
        <th scope="col">Név</th>
        <th scope="col">Cég</th>
        <th scope="col">Útirány</th>
        <th scope="col">Indulás</th>
        <th scope="col">Érkezés</th>
        <th scope="col">Státusz</th>
        <th scope="col">Férőhely</th>
        </tr>
        </thead>
        <tbody>
            {trains.map((train)=>(
                <tr>
                    <th scope="row">{train.TrainID}</th>
                    <td>{train.TrainType}</td>
                    <td>{train.TrainName}</td>
                    <td>{train.Operator}</td>
                    <td>{train.Route}</td>
                    <td>{train.DepartureTime}</td>
                    <td>{train.ArrivalTime}</td>
                    <td>
                    <input type="checkbox" onClick={() => toggleStatus(train.TrainID, train.Status=="Active"?"Inactive":"Active")} className="btn-check" id={train.TrainID.toString()} autoComplete={
                        train.Operator=="Active"?"on":"off"}></input>
                    <label className="btn btn-outline-primary" htmlFor={train.TrainID.toString()} >{train.Status}</label></td>
                    <td>{train.Capacity}</td>
                </tr>
            ))}
  </tbody>
</table>
    </>
}