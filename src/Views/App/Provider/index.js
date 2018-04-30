import React, { PureComponent } from 'react'
// import PropTypes                                from 'prop-types'
import OperationRecord          from 'Store/Operation/Record'

const CalculatorContext = React.createContext({
    Operation: new OperationRecord()
})

export function withOperation( ComponentToWrap )
{
  return function OperationComponent( props )
  {
    return (
      <CalculatorContext.Consumer>
      { Operation => <ComponentToWrap {...props} Operation={Operation} />}
      </CalculatorContext.Consumer>
    )
  }
}

export default class Index extends PureComponent
{
  constructor( props )
  {
    super( props )

    this.state = {
      Operation: props.Operation
    }
  }

  componentWillReceiveProps( nextProps )
  {
    if( !nextProps.Operation )
      return

    var { Operation } = nextProps

    if( Operation.equals( this.state.Operation ) )
      return

    this.setState({ Operation })
  }

  render()
  {
    return (
      <CalculatorContext.Provider value={this.state.Operation}>
        {this.props.children}
      </CalculatorContext.Provider>
    )
  }
}
