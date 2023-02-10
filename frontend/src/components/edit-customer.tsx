import { ChangeEventHandler, FormEvent} from 'react'
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
    let {id, region, provider, phoneNumber, line, prefix} = editForm

// PUT request; calls handleCustomerUpdate to push changes to the page
    function handleEditForm(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        fetch(`http://localhost:5000/items/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editForm),
        })
            .then((response) => response.json())
            .then((data) => {
            return handleCustomerUpdate(data)
            })
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