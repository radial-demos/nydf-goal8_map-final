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
      <div className={classNames('legend-group', `legend-group--${this.props.field.type}`)}>
        <div className={classNames('row', 'legend-row', `legend-row--${this.props.field.id}`)}>
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
  render() {
    const forestField = this.props.activeFields.forest;
    const financeField = this.props.activeFields.finance;
    return (
      <div className="pnl pnl--legend">
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
