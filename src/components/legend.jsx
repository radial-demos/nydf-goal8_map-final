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
      <div className={classNames('legend-row', `legend-row--${this.props.field.type}`)}>
        {this.props.field.binPartitions.map((bin, index) =>
          <span
            key={index}
            className={classNames('legend-item', `legend-item--${index}`)}
          >
          {bin.label}
          </span>)
        }
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
      <div>
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
