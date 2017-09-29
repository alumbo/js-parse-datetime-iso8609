# js-parse-datetime-iso8609
JavaScript cross-browser solution to parse a date string ISO 8609 and format a date object to string ISO 8609
```javascript
  function formatDateISO8609(date) {
    var timezone = date.toString();
    timezone = timezone.substr(timezone.indexOf('GMT') + 3, 5);
    const dateStr = date.toISOString().substr(0,19) + timezone;
    return dateStr;
  }

  function parseDateISO8609(dateStr) {
    var date = new Date(dateStr);
    // In case of browser was not able to parse timezone
    if (date.toString() === 'Invalid Date') {
      date = new Date(dateStr.substr(0, dateStr.length - 5));
    }
    // In case of browser did not impact timezone offset on date
    if (dateStr.indexOf(date.toString().substr(16, 8)) !== -1) {
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    }
    return date;
  }
```
