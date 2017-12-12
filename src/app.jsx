import React from 'react';
import { orderBy } from 'lodash';

import Nav from './components/nav.jsx';
import Legend from './components/legend.jsx';
import List from './components/list.jsx';
import Figure from './components/figure.jsx';

const debug = require('debug')('nydf:app');

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.forestFieldDefs = props.fieldDefinitions.filter(d => d.type === 'forest').map(d => Object.assign(d, { indexes: getIndexes(d) }));
    this.financeFieldDefs = props.fieldDefinitions.filter(d => d.type === 'finance').map(d => Object.assign(d, { indexes: getIndexes(d) }));
    // state initialization
    this.state = {
      activeForestField: this.forestFieldDefs[0].id,
      activeFinanceField: this.financeFieldDefs[0].id,
      hoveredBin: '',
    };
    // function bindings
    this.updateActiveFields = this.updateActiveFields.bind(this);
    this.updateHoveredBin = this.updateHoveredBin.bind(this);
    // constructor support functions
    function getIndexes(fieldDefinition) {
      const amounts = orderBy(props.data.map((d, i) => [d[fieldDefinition.id].amount, i]), 0, 'desc');
      return amounts.map(d => d[1]);
    }
  }

  updateActiveFields(fieldType, fieldId) {
    if (fieldType === 'forest') {
      this.setState({ activeForestField: fieldId });
    } else if (fieldType === 'finance') {
      this.setState({ activeFinanceField: fieldId });
    }
  }

  updateHoveredBin(binId) {
    this.setState({ hoveredBin: binId });
  }

  componentDidUpdate() {
    // Map.updateFields(this.state.activeFields);
  }

  render() {
    const forestFieldDef = this.forestFieldDefs
      .find(field => field.id === this.state.activeForestField);
    const financeFieldDef = this.financeFieldDefs
      .find(field => field.id === this.state.activeFinanceField);

    return (
      <div>
        <div className="nydfcomponent nydfcomponent--narrow">
          <Nav
            forestFieldDefs={this.forestFieldDefs}
            financeFieldDefs={this.financeFieldDefs}
            updateActiveFields={this.updateActiveFields}
          />
          <div className="nydfcomponent">
            <Figure
              data={this.props.data}
              forestFieldDef={forestFieldDef}
              financeFieldDef={financeFieldDef}
              activeForestField={this.state.activeForestField}
              activeFinanceField={this.state.activeFinanceField}
              hoveredBin={this.state.hoveredBin}
            />
          </div>
          <div className="nydfcomponent nydfcomponent--narrow">
            <Legend
              forestFieldDef={forestFieldDef}
              financeFieldDef={financeFieldDef}
              updateHoveredBin={this.updateHoveredBin}
            />
          </div>
          <div className="nydfcomponent nydfcomponent--narrow">
            <List
              data={this.props.data}
              forestFieldDef={forestFieldDef}
              financeFieldDef={financeFieldDef}
              limit="10"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Component;
