import logo from './logo.svg';
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/home';
import New from './pages/new';
import Edit from './pages/edit';

function App() {
  return (
    <fieldset>
      <legend>App.jsx</legend>
      <h1>Favorite Authors</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} /> 
        <Route path="/edit/:author_id" element={<Edit />} />
      </Routes>
    </fieldset>
  );
}

export default App;
