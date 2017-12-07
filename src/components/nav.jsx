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
  }

  handleClick(fieldType, fieldId) {
    // Each NavRow only keeps track of its own field (fieldId)
    this.setState({
      activeField: fieldId,
    });
    // Ancestors keep track of multiple fields (fieldIds)
    this.props.updateActiveFields(fieldType, fieldId);
  }

  render() {
    return (
      <div className="group group--nav">
        <div className={classNames('row', 'nav-row', `nav-row-${this.props.type}`)}>
          {this.props.fields.map(field =>
            <span
              key={field.id}
              onClick={this.handleClick.bind(this, field.type, field.id)}
              className={classNames('nav-item', `nav-item--${field.id}`, { 'nav-item--active': (field.id === this.state.activeField) })}
            >
            {field.label}
            </span>)}
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
      <div className="panel panel--nav">
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
