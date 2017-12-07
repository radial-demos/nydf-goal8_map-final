import React from 'react';
import classNames from 'classnames';

const debug = require('debug')('nydf:legend');

class LegendRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBin: 0,
    };
  }

  render() {
    return (
      <div className="group group--legend">
        <div className={classNames('row', 'legend-row', `legend-row--${this.props.field.type}`)}>
          {this.props.field.binPartitions.map((bin, index) =>
            <div
              key={index}
              className={classNames('legend-item', `legend-item--${index}`)}
            >
              <span className={classNames('legend-marker', `legend-marker--${index}`)}>
                <span className={classNames('marker-shape', `marker-shape--${index}`)}></span>
              </span>
              <span className='legend-label'>{bin.label}</span>
            </div>)
          }
        </div>
      </div>
    );
  }
}

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.forestFields = this.props.forestFields;
    this.financeFields = this.props.financeFields;
  }

  render() {
    const forestField = this.forestFields.find(d => d.id === this.props.activeFields.forest);
    const financeField = this.financeFields.find(d => d.id === this.props.activeFields.finance);
    return (
      <div className="panel panel--legend">
        <LegendRow
          field={forestField}
        />
        <LegendRow
          field={financeField}
        />
      </div>
    );
  }
}

export default Component;
