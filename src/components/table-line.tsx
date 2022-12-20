import React, { ChangeEvent } from "react";
import { LineData} from "../types/table-data";
import { useState } from "react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

type LineProps = {
    lineData: LineData;
    captureEdit: (clickedCustomer: LineData) => void ;
    changeEditState:(lineData : LineData) => void;
    handleDelete: (id: number) => void; 
  }

export function TableLine ({lineData, captureEdit, changeEditState, handleDelete}: LineProps){
  const [isHovered, setHovered] = useState(false);
  
  return (
  <>
    <tr 
      onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => setHovered(false)}
          key={lineData.id}
          style={{position: "relative"}}
          >
      <td>{lineData.region}</td>
      <td>{lineData.provider}</td>
      <td>{lineData.phoneNumber}</td>
      <td>{lineData.line}</td>
      <td>{lineData.prefix}</td>
      <td>{lineData.status}</td>
      {isHovered &&
      <section style={{position: "absolute", display: "flex"}}>
        <button
          type="button"
          className="btn btn-outline-warning"
          style={{marginRight:"17px", marginTop: "7px", height: "30px"}} 
          onClick={() => {
            captureEdit(lineData);
            changeEditState(lineData)
          }}
        >
          <FaRegEdit style={{ marginBottom: "10px"}} />
        </button >
        <button
          type="button"
          className="btn btn-outline-danger"
          style={{marginTop: "7px", height: "30px"}} 
          onClick={(evt) => handleDelete(lineData.id)}
        >
          <FaTrashAlt style={{ marginBottom: "10px"}} />
        </button >
        </section> }
      
    </tr>
  </>
  )
}