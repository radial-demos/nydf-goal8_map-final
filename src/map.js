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
  // debug(binPartitions);
  // debug(amount);
  const bin = binPartitions.find(partition => (amount <= partition.value));
  if (bin) return bin.color || 'cornsilk';
  return 'cornsilk';
}

function updateFields(fields) {
  const areas = fields.forest.indexes.map((index) => {
    const datum = data[index];
    const amount = datum[fields.forest.id].amount;
    return { id: datum.id, color: getBinColor(fields.forest.binPartitions, amount) };
  });
  map.dataProvider.areas = areas;
  map.validateData();
}

export default { init, updateFields };
