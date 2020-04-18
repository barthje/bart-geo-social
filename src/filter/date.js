import moment from 'moment';

export default unixTimeStamp => {
  return moment(unixTimeStamp * 1000).format('H:mm:ss on DD-MM-Y');
};
