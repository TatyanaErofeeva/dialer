import { toast } from "react-toastify";
import { DATABASE_ITEMS_URL, DATABASE_GETCAMPAIGNSTATUS_URL } from "../const";

const handleError = (url = '') => {
  return fetch(url)
  .then((response) => response.json())
  .catch((err) => {
    (toast.error(`Не удалось загрузить даанные. ${err.stack}`, 
      {
        position: toast.POSITION.TOP_RIGHT
      }))
  });
} 

export const getData = () => {
  return handleError(DATABASE_ITEMS_URL)
};

export const getCampaignStatus = () => {
  return handleError(DATABASE_GETCAMPAIGNSTATUS_URL)
 };

export function postData(url = '', campaignStatus = {}) {
  return  fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type" : "application/json"
    }, 
      body: JSON.stringify(campaignStatus) 
    })
    .then((response) => {
      response.json()
    })
    .catch((err) => {
      (toast.error(`Не удалось сохранить данные. ${err.stack}`, 
        {
          position: toast.POSITION.TOP_RIGHT
        }))
    });

}

