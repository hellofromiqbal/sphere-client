import moment from 'moment';

const timeGenerator = (timestampString) => {
  const dateObject = new Date(timestampString);
  return moment(dateObject).startOf('hour').fromNow();
};

export default timeGenerator;