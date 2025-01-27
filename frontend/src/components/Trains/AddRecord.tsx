import { useForm } from "@tanstack/react-form"
import 'bootstrap/dist/css/bootstrap.css'
import Trains from "./Trains";
import Menu from "../Menu";

interface TrainsBool {
    TrainID: boolean;
    TrainType: boolean;
    TrainName: boolean;
    Operator: boolean;
    Route: boolean;
    DepartureTime: boolean;
    ArrivalTime: boolean;
    Status: boolean;
    Capacity: boolean;
}





export default function AddRecord({path, trainsToModify, trainsBool}:{path?:string , trainsToModify?: Trains, trainsBool?: TrainsBool}) {


    let tmp: Trains = {
        TrainID: 1,
        TrainType: "InterCity",
        TrainName: "IC 101",
        Operator: "MÁV",
        Route: "Budapest - Szeged",
        DepartureTime: "2024-11-26 08:00:00",
        ArrivalTime: "2024-11-26 10:00:00",
        Status: "Active",
        Capacity: 350
    };
    if (trainsToModify != null) {
        tmp = trainsToModify;
    }


    const form = useForm({
        defaultValues: {
            ...tmp
        },
        validators: {
            onSubmit: ({ value }) => {
                return {
                    fields: {
                        TrainType: value.TrainType == "" ? 'Nem lehet a mező üres' : undefined,
                        TrainName: value.TrainName == "" ? 'Nem lehet a mező üres' : undefined,
                        Operator: value.TrainName == "" ? 'Nem lehet a mező üres' : undefined,
                        Route: value.Route == "" ? 'Nem lehet a mező üres' : undefined,
                        DepartureTime: value.DepartureTime == "" ? 'Nem lehet a mező' : undefined,
                        ArrivalTime: value.ArrivalTime == "" ? 'Nem lehet a mező' : undefined,
                        Status: value.Status == "" ? 'Nem lehet a mező üres' : undefined,
                        Capacity: value.Capacity < 0 ? 'Nem lehet a mező üres' : undefined,
                    },
                }
            },
        }
    })
    
    return (
        <><Menu></Menu>
            <div>
                <form
                    action={path}
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        void form.handleSubmit()
                    }}
                    method={trainsBool?.ArrivalTime==undefined ? "POST" : "PATCH"}
                >

                    <div className="form-group">
                        <form.Field name="TrainID">
                            {(field) => (
                                <>
                                    <label htmlFor={field.name}>TrainId:</label>
                                    <input
                                        disabled={trainsBool == undefined ? true : false}
                                        id={field.name}
                                        name={field.name}
                                        className="form-control"
                                        value={field.state.value}
                                        type="number"
                                        placeholder="0"
                                        onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                    />
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            )}
                        </form.Field><br />
                    </div>


                    <div className="form-group">
                        <form.Field name="TrainType">
                            {(field) => (
                                <>
                                    <label htmlFor={field.name}>TrainType:</label>
                                    <input
                                        disabled={trainsBool == undefined ? false : true}
                                        id={field.name}
                                        name={field.name}
                                        className="form-control"
                                        value={field.state.value}
                                        type="text"
                                        placeholder="InterCity"
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            )}
                        </form.Field><br />
                    </div>

                    <div className="form-group">
                        <form.Field name="TrainName">
                            {(field) => (
                                <>
                                    <label htmlFor={field.name}>TrainName:</label>
                                    <input
                                        disabled={trainsBool == undefined ? false : true}
                                        id={field.name}
                                        name={field.name}
                                        className="form-control"
                                        value={field.state.value}
                                        type="text"
                                        placeholder="IC 101"
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            )}
                        </form.Field><br />
                    </div>

                    <div className="form-group">
                        <form.Field name="Operator">
                            {(field) => (
                                <>
                                    <label htmlFor={field.name}>Operator:</label>
                                    <input
                                        disabled={trainsBool == undefined ? false : true}
                                        id={field.name}
                                        name={field.name}
                                        className="form-control"
                                        value={field.state.value}
                                        type="text"
                                        placeholder="MÁV"
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            )}
                        </form.Field><br />
                    </div>

                    <div className="form-group">
                        <form.Field name="Route">
                            {(field) => (
                                <>
                                    <label htmlFor={field.name}>Route:</label>
                                    <input
                                        disabled={trainsBool == undefined ? false : true}
                                        id={field.name}
                                        name={field.name}
                                        className="form-control"
                                        value={field.state.value}
                                        type="text"
                                        placeholder="Budapest - Szeged"
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            )}
                        </form.Field><br />
                    </div>

                    <div className="form-group">
                        <form.Field name="DepartureTime">
                            {(field) => (
                                <>
                                    <label htmlFor={field.name}>DepartureTime:</label>
                                    <input
                                        disabled={trainsBool == undefined ? false : true}
                                        id={field.name}
                                        name={field.name}
                                        className="form-control"
                                        value={field.state.value}
                                        type="text"
                                        placeholder="2024-11-26 08:00:00"
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            )}
                        </form.Field><br />
                    </div>

                    <div className="form-group">
                        <form.Field name="ArrivalTime">
                            {(field) => (
                                <>
                                    <label htmlFor={field.name}>ArrivalTime:</label>
                                    <input
                                        disabled={trainsBool == undefined ? false : true}
                                        id={field.name}
                                        name={field.name}
                                        className="form-control"
                                        value={field.state.value}
                                        type="text"
                                        placeholder="2024-11-26 08:00:00"
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            )}
                        </form.Field><br />
                    </div>



                    <div className="form-group">
                        <form.Field name="Status">
                            {(field) => (
                                <>
                                    <label htmlFor={field.name}>Status:</label>
                                    <input
                                        disabled={trainsBool == undefined ? false : true }
                                        id={field.name}
                                        name={field.name}
                                        className="form-control"
                                        value={field.state.value}
                                        type="bool"
                                        placeholder="Active"
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            )}
                        </form.Field><br />
                    </div>

                    <div className="form-group">
                        <form.Field name="Capacity">
                            {(field) => (
                                <>
                                    <label htmlFor={field.name}>Capacity:</label>
                                    <input
                                        disabled={trainsBool == undefined ? false : true}
                                        id={field.name}
                                        name={field.name}
                                        className="form-control"
                                        value={field.state.value}
                                        type="number"
                                        placeholder="300"
                                        onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                    />
                                    {field.state.meta.errors ? (
                                        <em role="alert">{field.state.meta.errors.join(', ')}</em>
                                    ) : null}
                                </>
                            )}
                        </form.Field><br />
                    </div>

                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
                                {isSubmitting ? '...' : 'Submit'}
                            </button>
                        )}
                    />
                </form>
            </div>
        </>
    )
}