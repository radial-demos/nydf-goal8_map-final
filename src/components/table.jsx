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
          <div className="table-title">
            {this.props.field.title}
            <span className="table-title-units"> ({this.props.field.units})</span>
            {this.props.limit && <span className="table-title-limit"> TOP {this.props.limit}</span>}
          </div>
          <table><tbody>
          {
            indexes.map(i =>
              <tr>
                <td className="cell cell--label">{this.props.data[i].country}</td>
                <td className="cell cell--number">
                  {this.props.data[i][this.props.field.id].string}
                </td>
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
