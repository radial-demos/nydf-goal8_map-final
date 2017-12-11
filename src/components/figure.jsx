import React from 'react';
// import classNames from 'classnames';

const debug = require('debug')('nydf:map');

const BACKGROUND_COLOR = '#ffffff';
const UNLISTED_AREAS_COLOR = '#eeeeee';
const OUTLINE_COLOR = '#d3d3d3';

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

class Component extends React.Component {

  componentDidMount() {
    this.map = AmCharts.makeChart('nydfmap', {
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
    this.updateMap(this.props.forestFieldDef, this.props.financeFieldDef);
  }

  updateMap(forestFieldDef, financeFieldDef) {
    const areas = [];
    const images = [];
    this.props.data.forEach((row) => {
      const { id } = row;
      const forestValue = row[forestFieldDef.id];
      const financeValue = row[financeFieldDef.id];
      const color = getBinColor(forestFieldDef.binPartitions, forestValue.amount);
      const title = `${row.country}<br/>${forestValue.string} (${forestFieldDef.units})<br/>${financeValue.string} (${financeFieldDef.units})`;
      const size = getBinSize(financeFieldDef.binPartitions, financeValue.amount);
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
        color: financeFieldDef.color,
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
    this.map.dataProvider.areas = areas;
    this.map.dataProvider.images = images;
    this.map.validateData();
  }

  componentWillUnmount() {
    // debug('UNMOUNT');
  }

  componentWillReceiveProps(nextProps) {
    const forestFieldDidChange = (nextProps.activeForestField !== this.props.activeForestField);
    const financeFieldDidChange = (nextProps.activeFinanceField !== this.props.activeFinanceField);
    if (forestFieldDidChange || financeFieldDidChange) {
      this.updateMap(nextProps.forestFieldDef, nextProps.financeFieldDef);
    } else {
      // debug('SKIPPING UPDATE');
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div style={{ height: '500px', width: '100%' }} id="nydfmap"/>
    );
  }
}

export default Component;
