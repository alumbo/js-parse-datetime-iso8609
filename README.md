# js-parse-datetime-iso8609
JavaScript cross-browser solution to parse a date string ISO 8609 and format a date object to string ISO 8609.
Example: '2017-09-29T00:48:07+0400'

```javascript
  function parseDateISO8609(dateStr) {
    var date = new Date(dateStr);
    // In case of browser was not able to parse timezone
    var timezoneMinutes = 0;
    if (date.toString() === 'Invalid Date') {
      date = new Date(dateStr.substr(0, dateStr.length - 5));
      var timezoneStr = dateStr.substr(-5);
      var timezoneSign = timezoneStr.substr(0, 1);
      var timezoneHours = parseInt(timezoneStr.substr(1, 2));
      timezoneMinutes = parseInt(timezoneStr.substr(3, 2));
      timezoneMinutes += timezoneHours * 60;
      timezoneMinutes = parseInt(timezoneSign + timezoneMinutes);
    }
    // In case of browser did not impact timezone offset on date
    if (dateStr.indexOf(date.toString().substr(16, 8)) !== -1) {
      timezoneMinutes -= date.getTimezoneOffset();
    }
    date.setMinutes(date.getMinutes() + timezoneMinutes);
    return date;
  }
  
  function formatDateISO8609(date) {
    var dateStr = date.toString();
    var timezone = dateStr.substr(dateStr.indexOf('GMT') + 3, 5);
    dateStr = date.toISOString().substr(0, 19) + timezone;
    return dateStr;
  }
```
