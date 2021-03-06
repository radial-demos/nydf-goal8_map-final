import React from 'react';
// import classNames from 'classnames';

const debug = require('debug')('nydf:figure');
const _uniq = require('lodash').uniq;
const _debounce = require('lodash').debounce;

const BACKGROUND_COLOR = '#ffffff';
const UNLISTED_AREAS_COLOR = '#eeeeee';
const OUTLINE_COLOR = '#d3d3d3';

function getBin(binPartitions, amount) {
  const index = binPartitions.findIndex(partition => (amount <= partition.value));
  return Object.assign({}, binPartitions[index], { index });
}

class Component extends React.Component {

  constructor(props) {
    super(props);
    this.updateGroups = _debounce((binId) => {
    const [fieldType] = binId.split('-');
      const groupIds = _uniq(this.map.dataProvider.images.map(image => image.groupId));
      groupIds.forEach((groupId) => {
        if (binId && (fieldType === 'finance') && (groupId !== binId)) {
          this.map.hideGroup(groupId);
        } else {
          this.map.showGroup(groupId);
        }
      });
    }, 100);
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
    this.updateMap(this.props.forestFieldDef, this.props.financeFieldDef);
  }

  updateMap(forestFieldDef, financeFieldDef) {
    const areas = [];
    const images = [];
    this.props.data.forEach((row) => {
      const { id } = row;
      const forestValue = row[forestFieldDef.id];
      const forestBin = getBin(forestFieldDef.binPartitions, forestValue.amount);
      const financeValue = row[financeFieldDef.id];
      const financeBin = getBin(financeFieldDef.binPartitions, financeValue.amount);
      // const color = getBinColor(forestFieldDef.binPartitions, forestValue.amount);
      const title = `${row.country}<br/>${forestValue.string} (${forestFieldDef.units})<br/>${financeValue.string} (${financeFieldDef.units})`;
      // const size = getBinSize(financeFieldDef.binPartitions, financeValue.amount);
      areas.push({
        id,
        binId: `${forestFieldDef.id}[${forestBin.index}]`,
        color: forestBin.color,
        title,
      });
      images.push({
        id,
        groupId: `${financeFieldDef.id}[${financeBin.index}]`,
        type: 'circle',
        theme: 'light',
        width: financeBin.size,
        height: financeBin.size,
        color: financeFieldDef.color,
        labelColor: forestBin.color,
        labelRollOverColor: forestBin.color,
        borderColor: forestBin.color,
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

  updateTransparency(binId) {
    // const [fieldType] = binId.split('-');
    // this.map.dataProvider.images.forEach((image) => {
    //   if (fieldType !== 'finance') {
    //     image.alpha = 0.5;
    //     image.outlineAlpha = 0.5;
    //     return;
    //   }
    //   if (image.binId === binId) {
    //     image.alpha = 0.8;
    //     image.outlineAlpha = 0.5;
    //   } else {
    //     image.alpha = 0.15;
    //     image.outlineAlpha = 0.15;
    //   }
    // });
    // this.map.validateNow();
  }

  componentWillUnmount() {
    // debug('UNMOUNT');
  }

  componentWillReceiveProps(nextProps) {
    const forestFieldDidChange = (nextProps.activeForestField !== this.props.activeForestField);
    const financeFieldDidChange = (nextProps.activeFinanceField !== this.props.activeFinanceField);
    const binDidChange = (nextProps.hoveredBin !== this.props.hoveredBin);
    if (forestFieldDidChange || financeFieldDidChange) {
      this.updateMap(nextProps.forestFieldDef, nextProps.financeFieldDef);
    } else if (binDidChange) {
      this.updateGroups(nextProps.hoveredBin);
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
