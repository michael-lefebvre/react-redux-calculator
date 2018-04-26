import React    from 'react'

import Screen   from './Screen'
import Keyboard from './Keyboard'

import './styles.css'

const Index = () => (
  <div className="app__calculator">
    <div className="app__calculator__content">
      <Screen />
      <Keyboard />
    </div>
  </div>
)

export default Index
