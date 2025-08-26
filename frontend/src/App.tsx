import { SqlInjectionDemoBlock } from './components/SqlInjectionDemoBlock'
import { XssDemoBlock } from './components/XssDemoBlock'
import { TopBar } from './components/TopBar'

function App() {
  return (
    <>
      <TopBar />
      <div>
        <SqlInjectionDemoBlock />
        <XssDemoBlock />
      </div>
    </>
  )
}

export default App
