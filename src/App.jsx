import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';

import HomePage from './pages/HomePage';
import PokemonCategoryPage from './pages/PokemonCategoryPage';
import Navbar from './components/Navbar';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<PokemonCategoryPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
