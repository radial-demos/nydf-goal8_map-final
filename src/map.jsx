import React from 'react';

const debug = require('debug')('nydf:map');

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.forestFields = props.fieldDefinitions.filter(d => d.type === 'forest');
    this.financeFields = props.fieldDefinitions.filter(d => d.type === 'finance');
    // this.state = { activeId: props.items[0].id };
  }

  render() {
    debug(this.forestFields);
    return (
      <div>I'm going to be a cool map when I grow up</div>
    );
  }
}

export default Component;
