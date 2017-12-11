import React from 'react';
import classNames from 'classnames';

const debug = require('debug')('nydf:legend');

class LegendRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBin: 0,
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(fieldType, fieldId) {
    this.props.updateHoveredBin({ fieldType, fieldId });
  }

  handleMouseOut() {
    this.props.updateHoveredBin({});
  }

  render() {
    return (
      <div className={classNames('legend-group', `legend-group--${this.props.field.type}`)}>
        <div className={classNames('pseudorow', 'legend-row', `legend-row--${this.props.field.id}`)}>
          {this.props.field.binPartitions.map((bin, index) =>
            <div
              key={index}
              className={classNames('legend-item', `legend-item--${index}`)}
              onMouseOver={this.handleMouseOver.bind(this, this.props.field.type, index)}
              onMouseOut={this.handleMouseOut}
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
          updateHoveredBin={this.props.updateHoveredBin}
        />
        <LegendRow
          field={financeField}
          updateHoveredBin={this.props.updateHoveredBin}
        />
      </div>
    );
  }
}

export default Component;
