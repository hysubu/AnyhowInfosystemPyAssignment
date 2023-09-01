import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ViewInventory from './Components/ViewInventory';
import AddInventory from './Components/AddInventory';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Header from './Components/Header';

function App() {


  return (
<HashRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route  path='addinventory/' element = {<AddInventory/>} />
 <Route  path='viewinventory/' element = {<ViewInventory/>} />
  </Routes>

</HashRouter>
  );

//     <HashRouter>
//       <Header/>
//   <Routes>
//   <Route  path='addinventory/' element = {<AddInventory/>} />
//   <Route  path='viewinventory/' element = {<ViewInventory/>} />
//   </Routes>


// </HashRouter>
  
}

export default App;
