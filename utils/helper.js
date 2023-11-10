// date format helper
// Helper function to format a date object as a string
const dateFormat = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  
  module.exports = dateFormat;
  