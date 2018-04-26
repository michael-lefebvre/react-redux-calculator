import React from 'react'

import Button from '../Button'

import './styles.css'

const Index = () => {

  return (
    <div className="app__calculator__keyboard">
      <Button symbol={true} value="b" label="&#10508;" onClick={ e => console.log( e )} />
      <Button value="c" onClick={ e => console.log( e )} />
      <Button symbol={true} value="toggle" label="&plusmn;" onClick={ e => console.log( e )} />
      <Button operator={true} value="/" label="&divide;" onClick={ e => console.log( e )} />
      <button className="app__calculator__button app__calculator__button--integer">1</button>
      <button className="app__calculator__button app__calculator__button--integer">2</button>
      <button className="app__calculator__button app__calculator__button--integer">3</button>
      <button className="app__calculator__button app__calculator__button--operator">&times;</button>
      <button className="app__calculator__button app__calculator__button--integer">4</button>
      <button className="app__calculator__button app__calculator__button--integer">5</button>
      <button className="app__calculator__button app__calculator__button--integer">6</button>
      <button className="app__calculator__button app__calculator__button--operator">&minus;</button>
      <button className="app__calculator__button app__calculator__button--integer">7</button>
      <button className="app__calculator__button app__calculator__button--integer">8</button>
      <button className="app__calculator__button app__calculator__button--integer">9</button>
      <button className="app__calculator__button app__calculator__button--operator">&#43;</button>
      <button className="app__calculator__button app__calculator__button--large app__calculator__button--integer">0</button>
      <button className="app__calculator__button app__calculator__button--symbol">&#806;</button>
      <button className="app__calculator__button app__calculator__button--operator">&#61;</button>
    </div>
  )
}

export default Index
