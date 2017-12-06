import React from 'react';

import Nav from './components/nav.jsx';

const debug = require('debug')('nydf:map');

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.forestFields = props.fieldDefinitions.filter(d => d.type === 'forest');
    this.financeFields = props.fieldDefinitions.filter(d => d.type === 'finance');
    // this.state = { activeId: props.items[0].id };
  }

  render() {
    return (
      <div>
        <Nav
          forestFields={this.forestFields}
          financeFields={this.financeFields}
        />
      </div>
    );
  }
}

export default Component;
