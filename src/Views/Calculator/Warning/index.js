import React             from 'react'
import classNames        from 'classnames'

import { withOperation } from '../Provider'

import './styles.css'

const Index = ({ Operation }) => (
    <div className="app__calculator__warning">
      <div className={classNames('app__calculator__warning__content', { 'app__calculator__warning__content--active': Operation.get('warning') })}>
        Please add another value
      </div>
    </div>
  )

export default withOperation( Index )
