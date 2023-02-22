import { ChangeEventHandler, FormEvent} from 'react'
import { LineData } from '../types/table-data';
import { FaCheck } from "react-icons/fa";
import  { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { DATABASE_ITEMS_URL } from '../const';

type AddProps = {
    addForm:LineData ;
    handleAdd: ChangeEventHandler<HTMLInputElement>;
    handleNewLine: (newLine: LineData) => void;
}

export function AddNewLine({ addForm, handleAdd, handleNewLine } : AddProps) {
    let { region, provider, phoneNumber, line, prefix} = addForm

// POST request; calls handleNewLine to add new line to the page
function handleAddForm(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    fetch(DATABASE_ITEMS_URL, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(addForm),
    })
        .then((response) => response.json())
        .then((data) => {
        return handleNewLine(data)
        })
}

    return (
        <div>
            <form
                onSubmit={handleAddForm}
                style={{marginTop:"50px", marginLeft: '200px'}}
             >
                <input type="text" name="region" value={region} onChange={handleAdd} id="region"/>
                <input type="text" name="provider" value={provider} onChange={handleAdd} id="provider"/>
                <input type="text" name="phoneNumber" value={phoneNumber} onChange={handleAdd} id="phoneNumber"/>
                <input type="text" name="line" value={line} onChange={handleAdd} id="line"/>
                <input type="text" name="prefix" value={prefix} onChange={handleAdd} id="prefix"/>
                <button
                    className="btn btn-outline-success"
                    type="submit"
                    id="save"
                    style={{marginLeft: '10px'}}
                >
                    <FaCheck/>
                </button>
            </form>
            <ReactTooltip content="Add region" anchorId="region">
            </ReactTooltip>
            <ReactTooltip content="Add provider" anchorId="provider">
            </ReactTooltip>
            <ReactTooltip content="Add phoneNumber" anchorId="phoneNumber">
            </ReactTooltip>
            <ReactTooltip content="Add line" anchorId="line">
            </ReactTooltip>
            <ReactTooltip content="Add prefix" anchorId="prefix">
            </ReactTooltip>
            <ReactTooltip content="Save the data" anchorId="save">
            </ReactTooltip>

        </div>
    )
}