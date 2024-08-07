import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ReloadData, SetPortfolioData, ShowLoading } from './redux/rootSlice'
import Loader from './components/Loader'
import Admin from './pages/Admin'
import Login from './pages/Admin/Login'


function App() {
  const { loading, portfolioData, reloadData } = useSelector((state) => state.root)
  const dispatch = useDispatch()
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  console.log('Backend URL:', backendUrl);  // Añadir esta línea para verificar la URL
  
  const getPortfolioData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(`${backendUrl}/api/portfolio/get-portfolio-data`);
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData()
    }
  }, [portfolioData])

  useEffect(() => {
    if (reloadData) {
      getPortfolioData()
    }
  }, [reloadData])

  return (
    <BrowserRouter>
      {loading ? <Loader /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
