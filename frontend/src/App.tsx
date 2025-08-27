import { SqlInjectionDemoBlock } from './components/demo/SqlInjectionDemoBlock'
import { XssDemoBlock } from './components/demo/XssDemoBlock'
import { TopBar } from './components/shared/TopBar'

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
