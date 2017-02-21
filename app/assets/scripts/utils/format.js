'use strict';
import numeral from 'numeral';
import { get } from 'object-path';
import { window } from 'global';

const tally = (n) => numeral(n).format('0,0');
module.exports.tally = tally;

const shortTally = (n) => {
  if (n >= 1000000) {
    return numeral(n / 1000000).format('0,0.[00]') + 'M';
  } else if (n >= 1000) {
    return numeral(n / 1000).format('0,0.[00]') + 'K';
  }
  return tally(n);
};
module.exports.shortTally = shortTally;

const shorterTally = (n) => {
  if (n >= 1000000) {
    return numeral(n / 1000000).format('0,0') + 'M';
  } else if (n >= 1000) {
    return numeral(n / 1000).format('0,0') + 'K';
  }
  return tally(n);
};
module.exports.shorterTally = shorterTally;

function pct (n) {
  if (n || typeof n === 'number') {
    return n + '%';
  }
  return n;
}
module.exports.pct = pct;

function shortText (s, length) {
  length = length || 20;
  return s.slice(0, length) + '...';
}
module.exports.shortText = shortText;

function shortParagraph (s, wordCountTarget) {
  wordCountTarget = wordCountTarget || 25;
  let result = s.split(' ');
  let suffix = '';
  if (result.length > wordCountTarget) {
    result = result.slice(0, wordCountTarget);
    suffix = '...';
  }
  return result.join(' ') + suffix;
}
module.exports.shortParagraph = shortParagraph;

function roundedNumber (n, decimalPlaces = 1) {
  let base = Math.pow(10, decimalPlaces);
  let multipled = Math.round(n * base);
  return multipled / base;
}
module.exports.roundedNumber = roundedNumber;

//function statusLanguage ('extended', this.props.lang) {

function statusLanguage (key, lang) {
  const t = get(window.t, [lang, 'project_status'], {});
  const ontimeLookup = {extended: t.status_extended, delayed: t.status_delayed, ontime: t.status_ontime};
  return ontimeLookup[key]
}

const ontimeLookup = {extended: 'Extended', delayed: 'Delayed', ontime: 'On Time'};
module.exports.ontimeLookup = ontimeLookup;

module.exports.statusLanguage = statusLanguage;

const currency = (value) => '$' + value.toString();
module.exports.currency = currency;
