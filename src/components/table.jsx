import React from 'react';
import classNames from 'classnames';

const debug = require('debug')('nydf:table');

class TableColumn extends React.Component {
  render() {
    // debug(this.props.field.indexes);
    let { indexes } = this.props.field;
    if (this.props.limit) indexes = indexes.slice(0, this.props.limit);
    return (
      <div className="table-group">
        <div className={classNames('table-column', `table-column--${this.props.field.id}`)}>
          <table><tbody>
          {
            indexes.map(i =>
              <tr>
                <td>{this.props.data[i].country}</td>
                <td>{this.props.data[i][this.props.field.id].string}</td>
              </tr>)
          }
          </tbody></table>
        </div>
      </div>
    );
  }
}

class Component extends React.Component {
  constructor(props) {
    super(props);
    // this.forestData = this.props.forestData;
    // this.financeData = this.props.financeData;
  }

  render() {
    // debug(this.props.data);
    return (
      <div className="pnl pnl--table">
        <TableColumn
          data={this.props.data}
          field={this.props.activeFields.forest}
          limit={this.props.limit}
        />
        <TableColumn
          data={this.props.data}
          field={this.props.activeFields.finance}
          limit={this.props.limit}
        />
      </div>
    );
  }
}

export default Component;
