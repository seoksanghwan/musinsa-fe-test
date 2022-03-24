import axios from 'axios'
import { domain } from './config'

const getItemData = (pageNo) => {
  return axios.get(`${domain}/goods${pageNo}.json`);
}

export {
  getItemData
}