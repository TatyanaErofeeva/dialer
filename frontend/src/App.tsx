import  { ChangeEvent, useState } from "react"
import { TableLine } from "./components/table-line";
import { Spinner } from "./components/loading";
import { LinesData, LineData} from "./types/table-data";
import './App.css';
import { FaPlay, FaPause, FaStop, FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import { postData, getCampaignStatus, getData, DATABASE_CAMPAIGNSTATUS_URL} from "./mock/server-data";
import { ApiStatus, ALERT_SHOW_TIME } from "./const";
import {EditCustomer} from "./components/edit-customer";
import { AddNewLine } from "./components/add-new-line";
import  { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { toast } from "react-toastify";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialCampaignState = '';

function App() {
  const [campaignStatus, setCampaignStatus] = useState(initialCampaignState);
  const [tableLines, setTableLines] = useState<LinesData | null>(null);
  
  const [stopDisable, setStopDisable] = useState(false);
  const [startDisable, setStartDisable] = useState(false);

  // state for conditional render of edit form
  const [isEditing, setIsEditing] = useState(false);
  // state for edit form inputs
  const [editForm, setEditForm] = useState({
    id: 0, region: '', provider: '', phoneNumber: '', line: '', prefix: '', dialerStatus:''
  })

  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState({
    id: 0, region: '', provider: '', phoneNumber: '', line: '', prefix: '', dialerStatus:''
  })

  const getInfo = async () => {
    let campaignStatus = await getCampaignStatus();
    setCampaignStatus(campaignStatus);
    console.log({campaignStatus});
    let data = await getData();
    console.log({data});
    setTableLines(data);
  }

  useEffect(() => {
    getInfo();
    const timer = setInterval(getInfo, ALERT_SHOW_TIME);
    return () => {
      clearTimeout(timer)
    };
  }, []);

    if (!tableLines) {
      return <Spinner />
    }


  // update data on page after edit
  function onUpdateLine(updatedLine : LineData) {
    if (!tableLines) return;
    const updatedLines = tableLines.map(
      lineData => {
        if (lineData.id === updatedLine.id) {
          return updatedLine
        } else {return lineData}
      }
    )
    setTableLines(updatedLines)
  }

  function handleCustomerUpdate(updatedLine : LineData) {
    setIsEditing(false);
    onUpdateLine(updatedLine);
  }

  // capture user input in edit form inputs
  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    setEditForm({
    ...editForm,
    [evt.target.name]: evt.target.value
    })
  }

  // needed logic for conditional rendering of the form - shows the customer you want when you want them, and hides it when you don't
  function changeEditState(lineData : LineData ) {
    if (lineData.id === editForm.id) {
      setIsEditing(isEditing => !isEditing) // hides the form
    } else if (isEditing === false) {
      setIsEditing(isEditing => !isEditing) // shows the form
    }
  }

  // capture the customer you wish to edit, set to state
  function captureEdit(clickedCustomer: LineData) {
    if (!tableLines) return;
    let filtered = tableLines.filter(lineData => lineData.id === clickedCustomer.id)
    setEditForm(filtered[0])
  }

  function showAddComponent() {
    if (isAdding == true){
      setIsAdding(isAdding => !isAdding) // hides the form

  } else {
      setIsAdding(isAdding => !isAdding) // shows the form
    }
  }

  function handleAdd(evt: ChangeEvent<HTMLInputElement>) {
    setAddForm({
    ...addForm,
    [evt.target.name]: evt.target.value
    })
  }

    const addRowInTable = () => {
      if (!tableLines) return;
      setIsAdding(false);
      setTableLines([
        ...tableLines,
        { id: tableLines.length + 1, region: addForm.region, provider: addForm.provider, phoneNumber: addForm.phoneNumber, line: addForm.line, prefix: addForm.prefix, dialerStatus: addForm.dialerStatus  }
      ]);
      setAddForm({
        id: 0, region: '', provider: '', phoneNumber: '', line: '', prefix: '', dialerStatus:''
      })
    };
    

  // DELETE request; calls handleDelete to delete an item from the page
const handleDelete = (id: number ) => {
    fetch(`http://localhost:5000/items/${id}`, {
        method: "DELETE",
    })
    .then((response) => {
      if (response.status === 204 && tableLines) {
        setTableLines(tableLines.filter((item) => item.id !== id));
      }
        })
  };


  const handleStartClick = () => {
    postData(DATABASE_CAMPAIGNSTATUS_URL, { campaignStatus: 'start' });
    setStartDisable(true);
    setStopDisable(false);
  }

  const handlePauseClick = () => {
     postData(DATABASE_CAMPAIGNSTATUS_URL, { campaignStatus: 'pause' });
  }    

  const handleStopClick = () => {
    postData(DATABASE_CAMPAIGNSTATUS_URL, { campaignStatus: 'stop' });
    setStopDisable(true);
    setStartDisable(false);
  } 
  const isPlayDisabled = campaignStatus === ApiStatus.Running || campaignStatus === ApiStatus.Unknown;
  const isPauseStopDisabled = campaignStatus === ApiStatus.Stop || campaignStatus === ApiStatus.Unknown;

  return(
    <>
    <ToastContainer/>
    <section className = "App">
      {campaignStatus === ApiStatus.Unknown?
          (toast.error('Get запрос на DATABASE_GETCAMPAIGNSTATUS_URL. campainStatus === "unknown". Обратитесь в службу поддержки', 
          {
            position: toast.POSITION.TOP_RIGHT
          })) : ''
      }
      <span className="buttonSection">
          <button
            type="button"
            id="start-button"
            className="btn btn-outline-success"
            onClick={handleStartClick}
            disabled = {isPlayDisabled }
            style={{marginRight:"10px"}} 
          >
            <FaPlay/>
          </button>
          
        <button
          type="button"
          id="pause-button"
          className="btn btn-outline-warning"
          onClick={handlePauseClick}
          disabled = {isPauseStopDisabled}
          style={{marginRight:"10px"}} 
        >
          <FaPause/>
        </button>
        <button
          type="button"
          id="stop-button"
          className="btn btn-outline-danger"
          onClick={handleStopClick}
          disabled = {isPauseStopDisabled}
        >
          <FaStop/>
        </button>   
      </span>
      
      <ReactTooltip content="Click to start" anchorId="start-button">
      </ReactTooltip>
      <ReactTooltip content="Click to pause" anchorId="pause-button">
      </ReactTooltip>
      <ReactTooltip content="Click to stop" anchorId="stop-button">
      </ReactTooltip>
      <span>
        <button
            type="button"
            className="btn btn-outline-info"
            onClick = {showAddComponent}
            style={{position:"absolute", top: "18px", right: "200px"}} 
          >
            <FaPlus/>
          </button>
      </span>
      <div>
      {isEditing?
          (<EditCustomer
            editForm={editForm}
            handleChange={handleChange}
            handleCustomerUpdate={handleCustomerUpdate}
          />) : null}
      {isAdding?
        (<AddNewLine
        addForm={addForm}
        handleAdd={handleAdd}
        handleNewLine = {addRowInTable}

      />) : null}
    
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Регион</th>
          <th scope="col">Провайдер</th>
          <th scope="col">Номер</th>
          <th scope="col">Линия</th>
          <th scope="col">Префикс</th>
          <th scope="col">Статус звонка</th>
        </tr>
      </thead>
      <tbody>
      { tableLines.map((lineData) => (
        <TableLine
          key = {lineData.id}
          lineData = {lineData}
          captureEdit={captureEdit}
          changeEditState={changeEditState}
          handleDelete = {handleDelete}
        />
      )) }
      </tbody>
     </table>
     </div>
     </section>
     </>
  )
}

export default App;
