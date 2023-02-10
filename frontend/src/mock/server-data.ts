import { showAlert} from "../util";

export const SERVER_URL = 'http://localhost:5000';
export const DATABASE_ITEMS_URL = `${SERVER_URL}/items`;

export async function postData(url = '', status = {}) {
    const response = await fetch(url, {
      method: 'POST', 
      body: JSON.stringify(status) 
    });
    return response.json();
  }

  export const getData = () => {
    return fetch(DATABASE_ITEMS_URL)
      .then((response) => response.json())
      .then((data) => {
       return data
      })
      .catch(() => {
        showAlert('Не удалось загрузить данные. Попробуйте еще раз');
      });
    };

  export function getCampaignStatus () {
    return Promise.resolve(
      {
        command: 'running'
      }
    )
  }
  
  export let anObject  = {
    command:'start'
  };



