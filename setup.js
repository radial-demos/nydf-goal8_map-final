'use strict';

process.env.DEBUG = 'nydf:*'; /* environment variable for debug */

const debug = require('debug')('nydf:setup');
// const path = require('path');
const fs = require('fs-extra');
const d3 = require('d3');
const _ = require('lodash');


const countryNames = require('./src/config/country-names');
const countryCoordinates = require('./src/config/country-coordinates');
const fieldDefinitions = require('./src/config/field-definitions');

function parseTsv(tsvString, fieldDefs) {
  const data = [];
  const rows = tsvString.split('\n');
  // Shift off the first row (header) and split into an array of Strings
  // trimming each string in the process
  rows.shift(); // Shift off the first row (header)
  rows.forEach((rowString) => {
    if (!rowString.length) return;
    const row = rowString.split('\t').map(r => r.trim());
    // loop through each field def, using references to sourceIndex to add property values
    const dataRow = {};
    fieldDefs.forEach((fieldDef) => {
      // for numbers, include Number-type value for sorting and filtering
      // as well as D3 formatted string for display
      if (fieldDef.isNumber) {
        let amount = Number(row[fieldDef.sourceIndex]);
        // if sourceMultiplier is specified, multiply by the value specified
        if (fieldDef.sourceMultiplier) amount *= fieldDef.sourceMultiplier;
        dataRow[fieldDef.id] = {
          isNumber: true,
          amount,
          string: d3.format(fieldDef.format)(amount),
        };
      } else {
        dataRow[fieldDef.id] = row[fieldDef.sourceIndex];
      }
    });
    data.push(dataRow);
  });
  return data;
}

function CountryCodeLookup(namesByIso) {
  function encodeName(name) {
    return _.deburr(name).toLowerCase().replace(/ /g, '');
  }
  // create a reverse-lookup object to find codes keyed on (encoded) names
  const lookup = {};
  Object.keys(namesByIso).forEach((id) => { lookup[encodeName(namesByIso[id])] = id; });
  // debug(lookup);
  function find(name) {
    const id = lookup[encodeName(name)];
    if (!id) {
      debug(`NAME_NOT_FOUND: ${name}`);
    }
    return id;
  }
  return { find };
}

function lookupCoordinates(id) {
  if (!id) return undefined;
  const coordinates = countryCoordinates[id];
  if (!coordinates) {
    debug(`COORDINATES_NOT_FOUND: ${id}`);
  }
  return coordinates;
}

const countryCodeLookup = CountryCodeLookup(countryNames);

(async () => {
  const tsv = await fs.readFile('./src/config/data.csv', { encoding: 'utf8' });
  let data = parseTsv(tsv, fieldDefinitions);
  // post-process
  data = data.map((datum) => {
    const id = countryCodeLookup.find(datum.country);
    const coordinates = lookupCoordinates(id);
    // debug(coordinates);
    return Object.assign(datum, { id, coordinates });
  });
  const startLength = data.length;
  data = data.filter(datum => (datum.id && datum.coordinates));
  debug(`Removed ${startLength - data.length} countries that were missing an id or coordinates.`);
  try {
    await fs.writeJson('./src/data/data.json', data);
  } catch (err) {
    debug('Failed to save output file. Error message follows.');
    debug(err);
    process.exit(1);
  }
  debug(`SUCCESS: Saved ${data.length} records to JSON data file.`);
})();
