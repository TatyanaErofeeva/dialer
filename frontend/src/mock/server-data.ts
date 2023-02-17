import { toast } from "react-toastify";
import { showAlert} from "../util";

export const SERVER_URL = 'http://localhost:5000';
export const DATABASE_ITEMS_URL = `${SERVER_URL}/items`;
export const DATABASE_CAMPAIGNSTATUS_URL = `${SERVER_URL}/items/campaignstatus`;
export const DATABASE_GETCAMPAIGNSTATUS_URL = `${SERVER_URL}/items/get/campaignstatus`;

export async function postData(url = '', campaignStatus = {}) {
    await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
    }, 
      body: JSON.stringify(campaignStatus) 
    });
  }

  export const getData = () => {
    return fetch(DATABASE_ITEMS_URL)
      .then((response) => response.json())
      .catch(() => {
        showAlert('Не удалось загрузить данные. Попробуйте еще раз');
      });
    };


  export const getCampaignStatus = () => {
     return fetch(DATABASE_GETCAMPAIGNSTATUS_URL)
      .then((response) => response.json())
      .catch(() => {
        (toast.error('Не удалось загрузить статус компании. Обратитесь в службу поддержки', 
          {
            position: toast.POSITION.TOP_RIGHT
          }))
      });
    };

