import React,{Component} from 'react';
import Navigationbar from './Components/Navbar/Navigationbar';
import Header from './Components/Navbar/Header';
import 'bootstrap/dist/css/bootstrap.css';




class App extends Component {
  render (){
  return(
    
    <React.Fragment>
      <Navigationbar />
      <Header />
     {/* <Tabs />  */}
    </React.Fragment>
  
  );
}
}

export default App;
