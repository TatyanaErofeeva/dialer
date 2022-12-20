import { showAlert} from "../util";

export const SERVER_URL = 'https://api.ru/campaign';
export const DATABASE_NUMBERS_URL = `${SERVER_URL}/numbers`;
export const DATABASE_STATUS_URL = `${SERVER_URL}/status`;

export async function postData(url = '', status = {}) {
    const response = await fetch(url, {
      method: 'POST', 
      body: JSON.stringify(status) 
    });
    return response.json();
  }

  // export const getData = () => {
  //   //fetch(DATABASE_STATUS_URL)
  //     .then((response) => response.json())
  //     .then((data) => {
  //      return data.status
  //     })
  //     .catch(() => {
  //       showAlert('Не удалось загрузить данные. Попробуйте еще раз');
  //     });
  //   };

  export function getCampaignStatus () {
    return Promise.resolve(
      {
        command: 'running'
      }
    )
  }


  export function getTableLines() {
    return Promise.resolve(
      [
        {
        id:1,
        region: 'Нижний Новгород',
        provider: 'Ростелеком',
        phoneNumber: '8(831)268-10-00',
        line: '711-CC_NN',
        prefix: '011',
        status:'ok',  
    },
    {
        id:2,
        region: 'Тверь',
        provider: 'Эртелеком',
        phoneNumber: '8(8332)26-10-00',
        line: '710-CC_KIR',
        prefix: '011',
        status:'issue',  
    },
    {
        id:3,
        region: 'dsjnglkdjgkdjgkd',
        provider: 'МТС',
        phoneNumber: '8(910)263-10-15',
        line: '710-CC_KK',
        prefix: '011',
        status:'ok',  
    },
    {
        id:4,
        region: 'Киров',
        provider: 'dgjfdlkjfgjf',
        phoneNumber: '8(903)241-12-25',
        line: '710-CC_PP',
        prefix: '011',
        status:'issue'
    }]
    );
  }

  export let anObject  = {
    command:'start'
  };



