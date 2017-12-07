import React from 'react';

import Nav from './components/nav.jsx';
import Legend from './components/legend.jsx';

const debug = require('debug')('nydf:map');

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.forestFields = props.fieldDefinitions.filter(d => d.type === 'forest');
    this.financeFields = props.fieldDefinitions.filter(d => d.type === 'finance');
    this.state = {
      activeFields: {
        forest: this.forestFields[0].id,
        finance: this.financeFields[0].id,
      },
    };
    this.updateActiveFields = this.updateActiveFields.bind(this);
    // this.state = { activeId: props.items[0].id };
  }

  updateActiveFields(fieldType, fieldId) {
    this.setState((prevState) => {
      const { activeFields } = prevState;
      activeFields[fieldType] = fieldId;
      return { activeFields };
    });
  }

  render() {
    return (
      <div>
        <Nav
          forestFields={this.forestFields}
          financeFields={this.financeFields}
          updateActiveFields={this.updateActiveFields}
        />
        <Legend
          forestFields={this.forestFields}
          financeFields={this.financeFields}
          activeFields={this.state.activeFields}
        />
      </div>
    );
  }
}

export default Component;
