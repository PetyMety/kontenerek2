import { useEffect, useState } from "react";
import Menu from "../Menu";
import Trains from "./Trains";
import ResponsivePagination from 'react-responsive-pagination';
import "../css/kereses.css"

export default function TrainSortSearch() {
    const [trains, setTrains] = useState<Trains[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [errorServer, setErrorServer] = useState<string>("");

    const [sortConfig, setSortConfig] = useState<{ key: keyof Trains; direction: 'asc' | 'desc' } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTrains, setFilteredTrains] = useState<Trains[]>([]);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    

    useEffect(() => {
        fetch(`http://localhost:3000/train?page=${currentPage}&limit=${itemsPerPage}`)
            .then((response) => {
                if (response.status === 404) {
                    setErrorServer('A kért erőforrás nem található (404)!');
                }
                if (!response.ok) {
                    setErrorServer(`Server responded with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setTrains(data);
                setFilteredTrains(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            });
    }, [currentPage]);


    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const totalPages = Math.ceil(filteredTrains.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentTrains = filteredTrains.slice(startIndex, startIndex + itemsPerPage);
    

    const sortTrains = (key: keyof Trains, direction: 'asc' | 'desc') => {
        const sortedTrains = [...filteredTrains].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredTrains(sortedTrains);
        setSortConfig({ key, direction });
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = trains.filter(
            (train) =>
                train.TrainType.toLowerCase().includes(term) ||
                train.TrainName.toLowerCase().includes(term) ||
                train.Operator.toLowerCase().includes(term) ||
                train.Route.toLowerCase().includes(term) ||
                train.DepartureTime.toLowerCase().includes(term) ||
                train.ArrivalTime.toLowerCase().includes(term) ||
                train.Status.toLowerCase().includes(term) ||
                train.Capacity.toString().includes(term)
        );
        setFilteredTrains(filtered);
    };


    if (errorServer) {
        return <p>{errorServer}</p>;
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Hiba történt: {error}.</p>;
    }

    return (
        <>
            <h1>Vonatok</h1>
            <h2>Menü</h2>
            <Menu></Menu>
            
            <h2>Vonatok keresése és rendezése</h2>

            <form>
                <label>
                    Keresés:
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Keresés a vonat adatai alapján..."
                    />
                </label>
            </form>

            <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID<button
                                onClick={() => sortTrains('TrainID', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTrains('TrainID', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>

                            <th>Vonat Típusa<button
                                onClick={() => sortTrains('TrainType', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTrains('TrainType', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>

                            <th>Vonat Neve<button
                                onClick={() => sortTrains('TrainName', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTrains('TrainName', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>

                            <th>Cég<button
                                onClick={() => sortTrains('Operator', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTrains('Operator', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>

                            <th>Útvonal<button
                                onClick={() => sortTrains('Route', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTrains('Route', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>

                            <th>Indulási Idő<button
                                onClick={() => sortTrains('DepartureTime', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTrains('DepartureTime', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>

                            <th>Érkezési Idő<button
                                onClick={() => sortTrains('ArrivalTime', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTrains('ArrivalTime', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>

                            <th>Státusz<button
                                onClick={() => sortTrains('Status', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTrains('Status', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>

                            <th>Befogadóképesség<button
                                onClick={() => sortTrains('Capacity', 'asc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8593;
                            </button>
                            <button
                                onClick={() => sortTrains('Capacity', 'desc')}
                                style={{ textDecoration: 'none', border: 'none', background: 'none' }}
                            >
                                &#8595;
                            </button></th>
                    </tr>
                </thead>
                <tbody>
                    {currentTrains.map((train) => (
                        <tr key={train.TrainID}>
                            <td>{train.TrainID}</td>
                            <td>{train.TrainType}</td>
                            <td>{train.TrainName}</td>
                            <td>{train.Operator}</td>
                            <td>{train.Route}</td>
                            <td>{train.DepartureTime}</td>
                            <td>{train.ArrivalTime}</td>
                            <td>{train.Status}</td>
                            <td>{train.Capacity} fő</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div>
                <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={handlePageChange}
                />
                <span>
                    Oldal {currentPage} / {totalPages}
                </span>
            </div>
        
        
        </>
    );

}