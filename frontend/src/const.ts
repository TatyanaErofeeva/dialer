export enum ApiStatus {
    Running= 'running',
    Start = 'start',
    Pause = 'pause',
    Stop = 'stopped',
    Unknown = 'unknown'
  }

export const ALERT_SHOW_TIME = 5000;

export const SERVER_URL = 'http://localhost:5000';
export const DATABASE_ITEMS_URL = `${SERVER_URL}/items`;
export const DATABASE_CAMPAIGNSTATUS_URL = `${SERVER_URL}/items/campaignstatus`;
export const DATABASE_GETCAMPAIGNSTATUS_URL = `${SERVER_URL}/items/get/campaignstatus`;