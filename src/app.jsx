import React from 'react';
import { orderBy } from 'lodash';

import Nav from './components/nav.jsx';
import Legend from './components/legend.jsx';
import Table from './components/table.jsx';

const debug = require('debug')('nydf:map');

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.availableFields = {
      forest: props.fieldDefinitions.filter(d => d.type === 'forest').map(d => Object.assign(d, { indexes: getIndexes(d) })),
      finance: props.fieldDefinitions.filter(d => d.type === 'finance').map(d => Object.assign(d, { indexes: getIndexes(d) })),
    };
    // state initialization
    this.state = {
      activeFields: {
        forest: this.availableFields.forest[0],
        finance: this.availableFields.finance[0],
      },
    };
    // function bindings
    this.updateActiveFields = this.updateActiveFields.bind(this);
    // constructor support functions
    function getIndexes(fieldDefinition) {
      const amounts = orderBy(props.data.map((d, i) => [d[fieldDefinition.id].amount, i]), 0, 'desc');
      return amounts.map(d => d[1]);
    }
  }

  updateActiveFields(fieldType, fieldId) {
    this.setState((prevState) => {
      const { activeFields } = prevState;
      activeFields[fieldType] = this.availableFields[fieldType].find(d => d.id === fieldId);
      return { activeFields };
    });
  }

  render() {
    return (
      <div>
        <div className="nydfcomponent nydfcomponent--narrow">
          <Nav
            forestFields={this.availableFields.forest}
            financeFields={this.availableFields.finance}
            updateActiveFields={this.updateActiveFields}
          />
        </div>
        <div id="nydfmap"/>
        <div className="nydfcomponent nydfcomponent--narrow">
          <Legend
            activeFields={this.state.activeFields}
          />
        </div>
        <div className="nydfcomponent nydfcomponent--narrow">
          <Table
            data={this.props.data}
            activeFields={this.state.activeFields}
            limit="10"
          />
        </div>
      </div>
    );
  }
}

export default Component;
