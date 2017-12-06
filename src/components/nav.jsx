import React from 'react';

const debug = require('debug')('nydf:nav');

class NavRow extends React.Component {
  constructor(props) {
  super(props);
  // this.forestFields = props.fieldDefinitions.filter(d => d.type === 'forest');
  // this.financeFields = props.fieldDefinitions.filter(d => d.type === 'finance');
  // this.state = { activeId: props.items[0].id };
  }

  render() {
    return (
      <div>
        {this.props.fields.map(field => <span key={field.id}>{field.label}</span>)}
      </div>
    );
  }
}

class Component extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // debug(this.forestFields);
    return (
      <div>
        <NavRow fields={this.props.forestFields}/>
        <NavRow fields={this.props.financeFields}/>
      </div>
    );
  }
}

export default Component;
