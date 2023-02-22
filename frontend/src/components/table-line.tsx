import { LineData} from "../types/table-data";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

type LineProps = {
    lineData: LineData;
    captureEdit: (clickedCustomer: LineData) => void ;
    changeEditState:(lineData : LineData) => void;
    handleDelete: (id: number) => void; 
  }

export function TableLine ({lineData, captureEdit, changeEditState, handleDelete}: LineProps){

  function confirmedDeletion (){
    const result = window.confirm("Подтвердите удаление");
    if (result) {
      handleDelete(lineData.id);
    }
  }
  
  return (
  <>
    <tr 
      key={lineData.id}
      style={{position: "relative"}}
    >
      <td>{lineData.region}</td>
      <td>{lineData.provider}</td>
      <td>{lineData.phoneNumber}</td>
      <td>{lineData.line}</td>
      <td>{lineData.prefix}</td>
      <td>{lineData.dialerStatus}</td>
      <td>
        <button
          type="button"
          className="btn btn-outline-warning"
          style={{marginLeft: "10px", marginRight:"17px", height: "30px"}} 
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
          style={{ height: "30px"}} 
          onClick={confirmedDeletion}
        >
          <FaTrashAlt style={{ marginBottom: "10px"}} />
        </button >
        </td>
    </tr>
  </>
  )
}