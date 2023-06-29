import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar/Navhome';
import Aschome from './Components/ASC/aschome';
import DivHome from './Components/Divisions/Divhome';
import UniHome from './Components/Units/UniHome';
import Unit01 from './Components/Units/Unit01';
import NavUnits from './navbar/NavUnits';
import AllReq from './Components/Units/AllReq';
import UniAcptReq from './Components/Units/UniAcptReq';
import OpReq from './Components/Units/OpReq';
import DU1 from './Components/Divisions/DU1';
import NavDiv from './navbar/NavDiv';
import U1req from './Components/Divisions/U1req';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/aschome" element={<Navbar />} />
        <Route path="/divhome" element={<Navbar />} />
        <Route path="/unihome" element={<Navbar />} />
        <Route path="/Components/Units/Unit01" element={<NavUnits />} />
        <Route path="/Components/Divisions/DU1" element={<NavDiv/>} />
        <Route path="/Components/Units/AllReq" element = {<NavUnits/>}/>
        <Route path="/Components/Units/UniAcptReq" element = {<NavUnits/>}/>
        <Route path="/Components/Units/OpReq" element = {<NavUnits/>}/>
        <Route path = "/Components/Divisions/U1req" element = {<NavDiv/>}/>
      </Routes>
      <Routes>
        <Route path="/" element={<Aschome />} />
        <Route path="/aschome" element={<Aschome />} />
        <Route path="/divhome" element={<DivHome />} />
        <Route path="/uniHome" element={<UniHome />} />
        <Route path="/Components/Units/Unit01" element={<Unit01 />} />
        <Route path="/Components/Divisions/DU1" element={<DU1/>}/>
        <Route path="/Components/Units/AllReq" element = {<AllReq/>}/>
        <Route path="/Components/Units/UniAcptReq" element = {<UniAcptReq/>}/>
        <Route path="/Components/Units/OpReq" element = {<OpReq/>}/>
        <Route path="/Components/Divisions/U1req" element = {<U1req/>}/>
       


      </Routes>
    </Router>
  );
};


export default App;
