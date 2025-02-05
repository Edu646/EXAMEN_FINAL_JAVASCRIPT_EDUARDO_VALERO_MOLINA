import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PokemonList, PokemonDetail } from './Poke_app';
import Register from './Login';

import './header.css';  // Asegúrate de que tu CSS esté correctamente enlazado

const Home = () => <h2>Welcome to the Home Page</h2>;
const About = () => <h2>About Us</h2>;
const Contact = () => <h2>Contact Us</h2>;

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div>
        {/* Barra de navegación */}
        <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
          <button className="navbar-toggler" onClick={toggleMenu}>
            &#9776; {/* Ícono de hamburguesa */}
          </button>
          
          <ul className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
            <li><a href="/">Home</a></li>
            <li><a href="/BuscarPokemones">Buscar Pokemones</a></li>
            <li><a href="/login">login</a></li>
          </ul>
        </nav>

        <h1>POKE_API</h1>
        {/* Agregar un GIF aquí */}
        <div>
        <img src="/Entrenador.gif" alt="Pokemon GIF" />
        </div>

        {/* Rutas */}
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/BuscarPokemones" element={<PokemonList />} />
  <Route path="/detalle/:id" element={<PokemonDetail />} />
  <Route path="/login" element={<Register />} />
</Routes>

      </div>
    </Router>

    
  );
};

export default App;
