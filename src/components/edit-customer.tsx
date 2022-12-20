import React, { ChangeEventHandler, FormEvent} from 'react'
import { LineData } from '../types/table-data';
import { FaCheck } from "react-icons/fa";
import  { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

type EditProps = {
    editForm:LineData ;
    handleCustomerUpdate: (updatedLine: LineData) => void;
    handleChange: ChangeEventHandler<HTMLInputElement>;
  }

export function EditCustomer({ editForm, handleCustomerUpdate, handleChange } : EditProps) {
    let {region, provider, phoneNumber, line, prefix} = editForm

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

    function handleEditForm(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        handleCustomerUpdate(editForm)
    }

    return (
        <div>
            <form
             onSubmit={handleEditForm}
             style={{marginTop:"50px", marginLeft: '200px'}}
             >
                <input type="text" name="region" value={region} onChange={handleChange}/>
                <input type="text" name="provider" value={provider} onChange={handleChange}/>
                <input type="text" name="phoneNumber" value={phoneNumber} onChange={handleChange}/>
                <input type="text" name="line" value={line} onChange={handleChange}/>
                <input type="text" name="prefix" value={prefix} onChange={handleChange}/>
                <button className="btn btn-outline-success" type="submit" id="save" style={{marginLeft: '10px'}}>
                    <FaCheck/>
                </button>
            </form>
            <ReactTooltip content="Save the data" anchorId="save">
            </ReactTooltip>
        </div>
    )
}