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
  constructor(props) {
    super(props);
  }

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
    this.updateMap(this.props.activeForestField, this.props.activeFinanceField);
  }

  updateMap(forestFieldId, financeFieldId) {
    const areas = [];
    const images = [];
    const forestField = this.props.availableFields.forest.find(field => field.id === forestFieldId);
    const financeField = this.props.availableFields.finance.find(field => field.id === financeFieldId);
    this.props.data.forEach((row) => {
      const { id } = row;
      const forestValue = row[forestField.id];
      const financeValue = row[financeField.id];
      const color = getBinColor(forestField.binPartitions, forestValue.amount);
      const title = `${row.country}<br/>${forestValue.string} (${forestField.units})<br/>${financeValue.string} (${financeField.units})`;
      const size = getBinSize(financeField.binPartitions, financeValue.amount);
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
        color: financeField.color,
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
      this.updateMap(nextProps.activeForestField, nextProps.activeFinanceField);
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
