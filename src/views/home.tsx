// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '../App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
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
      <div id='navbar' className="bg-slate-950 w-full py-4">

        <div className="lg:container mx-auto flex justify-between items-center h-full">
          <a className="text-white hover:text-white shadow transition ease-in-out duration-300" href=""><h1 className="oswald cursor-pointer" >GamesTrackers</h1></a>

          <div className="flex align-middle gap-4 gelasio">
            <a className="no-underline text-white hover:text-slate-950 hover:bg-white rounded transition ease-in-out duration-300 px-2 py-1" href="">Registrati</a>
            <a className="no-underline text-white hover:text-slate-950 hover:bg-white rounded transition ease-in-out duration-300 px-2 py-1" href="">Accedi</a>
          </div>
        </div>

      </div>


    </>
  )
}

export default App