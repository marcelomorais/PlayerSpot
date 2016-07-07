import _ from 'lodash';
import moment from 'moment';

var StreamMixin = {
  cleanStreamName(name) {
    if(!name)
      return '';
    if (name.length > 70)
      name = name.substring(0, 70) + " ...";
    if (name)
      return name.replace('[BR]', '').replace('[PT-BR]', '').replace('[PT]', '');
  },

  getDuration(start) {
    var now = moment(moment(Date.now()).toDate());
    start = moment(start, "DD/MM/YYYY HH:mm:ss");

    var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(start);
    var minutes = Math.floor((ms / (60 * 1000)) % 60);
    minutes = minutes.toString().length == 1 ? "0" + minutes : minutes;
    var hours = Math.floor((ms / (60 * 60 * 1000)) % 60);
    hours = hours.toString().length == 1 ? "0" + hours : hours;

    return hours + ":" + minutes;
  },

  romanToNumber(roman){
    if(roman == 'I')
      return 1;
    if(roman == 'II')
      return 2;
    if(roman == 'III')
      return 3;
    if(roman == 'IV')
      return 4;
    if(roman == 'V')
      return 5;
  }
};

module.exports = StreamMixin;
