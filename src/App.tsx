// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home'; // Importa i tuoi componenti
// import About from './views/about';

import './App.css'
import './components/Navbar'
import './components/Main'
import Navbar from './components/Navbar'
import Main from './components/Main'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>

      <Main></Main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </Router>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      {/* Body */}
      <div className='lg:container mx-auto'>
        <h1>GamesTracker</h1>
      </div>

    </>
  )
}

export default App
