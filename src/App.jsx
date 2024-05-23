import Heading from "./Component/Heading"
import { ToDoList } from "./Component/ToDoList"


function App() {
  
  return (
    <div className="App container  py-16 px-6 min-h-screen mx-auto">
      <Heading/>
      <ToDoList/>
    </div>
  )
}

export default App
