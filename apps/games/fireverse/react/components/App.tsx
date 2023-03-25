import React from 'react'
import './App.css'

function App() {
  const [count, setCount] = React.useState(0);
  return (
    <React.StrictMode>
      <div>
        <h1>Test</h1>
        <textarea readOnly value={count}></textarea>
        <div>
          <button onClick={()=>setCount(count+1)}>
            +1
          </button>
          <button onClick={() => setCount(0)}>
            reset
          </button>
        </div>
      </div>
    </React.StrictMode>
  )
}

export default App
