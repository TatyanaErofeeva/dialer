import { SERVER_URL } from "./mock/server-data";
import { ALERT_SHOW_TIME } from "./const";


export const showAlert = (message: string) => {
    const alertContainer = document.createElement('div');
    alertContainer.style.zIndex = '100';
    alertContainer.style.position = 'absolute';
    alertContainer.style.left = '0';
    alertContainer.style.top = '0';
    alertContainer.style.right = '0';
    alertContainer.style.padding = '10px 3px';
    alertContainer.style.fontSize = '18px';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.backgroundColor = 'red';
  
    alertContainer.textContent = message;
  
    document.body.append(alertContainer);
  
    setTimeout(() => {
      alertContainer.remove();
    }, ALERT_SHOW_TIME);
  };

 