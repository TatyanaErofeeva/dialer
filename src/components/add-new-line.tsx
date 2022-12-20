import { ChangeEventHandler, FormEvent, useEffect} from 'react'
import { LineData } from '../types/table-data';
import { FaCheck } from "react-icons/fa";
import  { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

type AddProps = {
    addForm:LineData ;
    handleAdd: ChangeEventHandler<HTMLInputElement>;
    handleNewLine: (newLine: LineData) => void;
  }

export function AddNewLine({ addForm, handleAdd, handleNewLine } : AddProps) {
    let {region, provider, phoneNumber, line, prefix} = addForm

// PATCH request; calls handleCustomerUpdate to push changes to the page
    // function handleEditForm(evt: FormEvent<HTMLFormElement>) {
    //     evt.preventDefault();
    //     fetch(`http://localhost:9292/customers/${id}`, {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type" : "application/json"
    //         },
    //         body: JSON.stringify(editForm),
    //     })
    //         .then(resp => resp.json())
    //         .then(updatedLine => {
    //             handleCustomerUpdate(updatedLine)})
    // }

    // function handleAddForm(evt: FormEvent<HTMLFormElement>) {
    //     evt.preventDefault();
    //     handleAddingCustomerUpdate(addForm)
    // }

    function handleAddForm(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        handleNewLine(addForm)
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