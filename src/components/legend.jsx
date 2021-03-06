import React from 'react';
import classNames from 'classnames';

const debug = require('debug')('nydf:legend');

class LegendRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBin: 0,
    };
    this.handleMouseOver = this.handleHover.bind(this);
  }

  handleHover(binId) {
    this.props.updateHoveredBin(binId);
  }

  render() {
    const { fieldDef } = this.props;
    return (
      <div className={classNames('legend-group', `legend-group--${fieldDef.type}`)}>
        <div className={classNames('pseudorow', 'legend-row', `legend-row--${fieldDef.id}`)}>
          {fieldDef.binPartitions.map((bin, index) =>
            <div
              key={index}
              className={classNames('legend-item', `legend-item--${index}`)}
              onMouseEnter={this.handleHover.bind(this, `${fieldDef.id}[${index}]`)}
              onMouseLeave={this.handleHover.bind(this, '')}
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
  // constructor(props) {
  //   super(props);
  //   this.forestFieldDefs = this.props.availableFields.forest;
  //   this.financeFieldDefs = this.props.availableFields.finance;
  // }
  render() {

    return (
      <div className="pnl pnl--legend">
        <LegendRow
          fieldDef={this.props.forestFieldDef}
          updateHoveredBin={this.props.updateHoveredBin}
        />
        <LegendRow
          fieldDef={this.props.financeFieldDef}
          updateHoveredBin={this.props.updateHoveredBin}
        />
      </div>
    );
  }
}

export default Component;
