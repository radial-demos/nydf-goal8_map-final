import React from 'react';
import classNames from 'classnames';

const debug = require('debug')('nydf:nav');

class NavRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeField: this.props.fields[0].id,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleClick(fieldType, fieldId) {
    // Each NavRow only keeps track of its own field (fieldId)
    this.setState({
      activeField: fieldId,
    });
    // Ancestors keep track of multiple fields (fieldIds)
    this.props.updateActiveFields(fieldType, fieldId);
  }

  handleMouseOver(fieldType, fieldId) {
    // debug(fieldType, fieldId);
  }

  handleMouseOut() {
  // debug('OUT');
  }

  render() {
    return (
      <div className={classNames('nav-group', `nav-group--${this.props.type}`)}>
        <div className={classNames('pseudorow', 'nav-row')}>
          {this.props.fields.map(field =>
            <span
              key={field.id}
              onClick={this.handleClick.bind(this, field.type, field.id)}
              onMouseOver={this.handleMouseOver.bind(this, field.type, field.id)}
              onMouseOut={this.handleMouseOut}
              className={classNames('nav-item', `nav-item--${field.id}`, { 'nav-item--active': (field.id === this.state.activeField) })}
            >
              <span className='nav-label'>{field.label}</span>
              <span className='nav-indicator'></span>
            </span>)
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
    return (
      <div className="pnl pnl--nav">
        <NavRow
          fields={this.forestFields}
          type='forest'
          updateActiveFields={this.props.updateActiveFields}
        />
        <NavRow
          fields={this.financeFields}
          type='finance'
          updateActiveFields={this.props.updateActiveFields}
        />
      </div>
    );
  }
}

export default Component;
