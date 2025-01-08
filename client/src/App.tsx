

import './App.css'
import {UseActionStateReactHook} from "./newFeat/useActionStateReactHook/useActionStateReactHook";
import {UseOptimisticUpdateReactHook} from "./newFeat/useOptimisticUpdateReactHook/useOptimisticUpdateReactHook";
// import {UseRectHook} from "./newFeat/useReactHook/UseRectHook";

function App() {


  return (
    <>
      <div>

      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
        <UseActionStateReactHook/>
        <UseOptimisticUpdateReactHook/>
        {/*<UseRectHook/>*/}
    </>
  )
}

export default App
