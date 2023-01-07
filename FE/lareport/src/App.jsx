// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Suspense, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NotFound from './screen/NotFound/index';
import BaoCaoCuocGoi from './screen/BaoCaoCuocGoi/BaoCaoCuocGoi';
import BaoCaoCuocGoiKhuVuc from './screen/BaoCaoCuocGoiKhuVuc/BaoCaoCuocGoiKhuVuc';
import BaoCaoTop10AgentsMaxNOCalls from './screen/BaoCaoTop10AgentsMaxNOCalls/BaoCaoTop10AgentsMaxNOCalls';
import BaoCaoTop10AgentsMaxTimeCall from './screen/BaoCaoTop10AgentsMaxTimeCall/BaoCaoTop10AgentsMaxTimeCall';
import TongCallKhuVuc from './screen/TongCallKhuVuc/TongCallKhuVuc';
import { BASE_ROOT_PATH_OF_TOMCAT } from './constants/global';
import Header from './components/Header';
import LoginPage from './screen/Auth/LoginPage';
import ScreenUserList from './screen/Admin/UserManagement/List';

function App() {

  const [reloadToggle, setReloadToggle] = useState(false);

  const receiveReloadToggle = () => {
    setReloadToggle(!reloadToggle);
  };

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Header />
          
          <Routes>
          {localStorage.getItem("username") !== null ? <>
            <Route path={BASE_ROOT_PATH_OF_TOMCAT + "/bao-cao-cuoc-goi"} element={<BaoCaoCuocGoi />} />
            <Route path={BASE_ROOT_PATH_OF_TOMCAT + "/"} element={<Navigate replace to={BASE_ROOT_PATH_OF_TOMCAT + "/bao-cao-cuoc-goi"} />} />
            <Route path={BASE_ROOT_PATH_OF_TOMCAT + "/bao-cao-cuoc-goi-khu-vuc"} element={<BaoCaoCuocGoiKhuVuc />} />
            <Route path={BASE_ROOT_PATH_OF_TOMCAT + "/top-10-agents-so-calls-nhieu-nhat"} element={<BaoCaoTop10AgentsMaxNOCalls />} />
            <Route path={BASE_ROOT_PATH_OF_TOMCAT + "/top-10-agents-time-calls-nhieu-nhat"} element={<BaoCaoTop10AgentsMaxTimeCall />} />
            <Route path={BASE_ROOT_PATH_OF_TOMCAT + "/tong-call-khu-vuc"} element={<TongCallKhuVuc />} />
            </> : <Route path={BASE_ROOT_PATH_OF_TOMCAT + "/"} element={<Navigate replace to={BASE_ROOT_PATH_OF_TOMCAT + "/sign-in"} />} />
          }

          {localStorage.getItem("role") === "admin" ?
            <Route path={BASE_ROOT_PATH_OF_TOMCAT + "/admin"} element={<ScreenUserList />} />
          : ""}

            <Route path={BASE_ROOT_PATH_OF_TOMCAT + "/sign-in"} element={<LoginPage onHandleChange={receiveReloadToggle} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* <Contact />
          <Footer /> */}
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
