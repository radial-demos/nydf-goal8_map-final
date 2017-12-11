import React from 'react';
import classNames from 'classnames';

const debug = require('debug')('nydf:table');

class TableColumn extends React.Component {
  render() {
    // debug(this.props.field.indexes);
    let { indexes } = this.props.fieldDef;
    if (this.props.limit) indexes = indexes.slice(0, this.props.limit);
    return (
      <div className="table-group">
        <div className={classNames('table-column', `table-column--${this.props.fieldDef.id}`)}>
          <div className="table-title">
            {this.props.fieldDef.title}
            <span className="table-title-units"> ({this.props.fieldDef.units})</span>
            {this.props.limit && <span className="table-title-limit"> TOP {this.props.limit}</span>}
          </div>
          <table><tbody>
          {
            indexes.map((ref, i) =>
              <tr key={i}>
                <td className="cell cell--index">{i + 1}</td>
                <td className="cell cell--label">{this.props.data[ref].country}</td>
                <td className="cell cell--number">
                  {this.props.data[ref][this.props.fieldDef.id].string}
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
          fieldDef={this.props.forestFieldDef}
          limit={this.props.limit}
        />
        <TableColumn
          data={this.props.data}
          fieldDef={this.props.financeFieldDef}
          limit={this.props.limit}
        />
      </div>
    );
  }
}

export default Component;
