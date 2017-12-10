const debug = require('debug')('nydf:map');

const BACKGROUND_COLOR = '#ffffff';
const UNLISTED_AREAS_COLOR = '#eeeeee';
const OUTLINE_COLOR = '#d3d3d3';

let map;
let data = [];

function init(dataArg) {
  data = dataArg;
  // debug(data);
  map = AmCharts.makeChart('nydfmap', {
    type: 'map',
    projection: 'eckert3',
    addClassNames: true,
    panEventsEnabled: true,
    backgroundColor: BACKGROUND_COLOR,
    backgroundAlpha: 1,
    fontFamily: '"Helvetica Neue"',
    areasSettings: {
      unlistedAreasColor: UNLISTED_AREAS_COLOR,
      unlistedAreasOutlineColor: OUTLINE_COLOR,
      outlineColor: OUTLINE_COLOR,
      outlineAlpha: 1,
      rollOverColor: undefined,
      rollOverOutlineColor: undefined,
      // 'unlistedAreasAlpha': 0.1
    },
    dataProvider: {
      map: 'worldLow',
      // images.
    },
    listeners: [{
      event: 'init',
      method: () => {
        // debug('init');
      },
    }],
  });
}

function getBinColor(binPartitions, amount) {
  const bin = binPartitions.find(partition => (amount <= partition.value));
  if (bin) return bin.color || 'cornsilk';
  return 'cornsilk';
}

function getBinSize(binPartitions, amount) {
  const bin = binPartitions.find(partition => (amount <= partition.value));
  if (bin) return bin.size || '10';
  return '10';
}

function updateFields(fields) {
  const areas = [];
  const images = [];
  data.forEach((row) => {
    const { id } = row;
    const forestValue = row[fields.forest.id];
    const financeValue = row[fields.finance.id];
    const color = getBinColor(fields.forest.binPartitions, forestValue.amount);
    const title = `${row.country}<br/>${forestValue.string} (${fields.forest.units})<br/>${financeValue.string} (${fields.finance.units})`;
    const size = getBinSize(fields.finance.binPartitions, financeValue.amount);
    areas.push({
      id,
      color,
      title,
    });
    images.push({
      id,
      type: 'circle',
      theme: 'light',
      width: size,
      height: size,
      color: fields.finance.color,
      labelColor: color,
      labelRollOverColor: color,
      borderColor: color,
      outlineColor: '#ffffff',
      outlineAlpha: 0.5,
      outlineThickness: 2,
      alpha: 0.5,
      latitude: row.coordinates.latitude,
      longitude: row.coordinates.longitude,
      title,
    });
  });
  map.dataProvider.areas = areas;
  map.dataProvider.images = images;
  map.validateData();
}

export default { init, updateFields };
