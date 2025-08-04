import Home from './pages/Home';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout'; 

function App() {
  return (
    <>
     <div className='bg-indigo-200'>
       <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        />
      </Routes>
     </div>
    </>
  );
}

export default App;
