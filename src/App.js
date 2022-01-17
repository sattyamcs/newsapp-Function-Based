import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {
  BrowserRouter as Router,Route,Routes
} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const App=()=>{
  const pageSize=6;
  const [progress, setProgress] = useState(0)
    return (
      <Router>
      <div>
        <Navbar />
        <LoadingBar
        height={4}
        color='#f1194pageSize'
        progress={progress}
      />
        <Routes>
          {/* Here unique key is given because to re mount the page to the given link */}
          <Route exact path="/general"><News setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general"/> </Route>
          <Route exact path="/sports"><News setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports"/> </Route>
          <Route exact path="/business"><News setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business"/> </Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/> </Route>
          <Route exact path="/health"><News setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health"/> </Route>
          <Route exact path="/science"><News setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science"/> </Route>
          <Route exact path="/technology"><News setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology"/> </Route>
        </Routes>
      </div>
      </Router>
    )
  
}

export default App



