import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Pokemons.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const typeColors = {
  fire: '#FF5733', water: '#3498DB', grass: '#58D68D', electric: '#F4D03F',
  ice: '#5DADE2', fighting: '#C0392B', poison: '#8E44AD', ground: '#D4AC0D',
  flying: '#85C1E9', psychic: '#E91E63', bug: '#A3CB38', rock: '#795548',
  ghost: '#6C3483', dragon: '#FF9FF3', dark: '#2C3E50', steel: '#BDC3C7',
  fairy: '#F8C471', normal: '#D5DBDB',
};

const generations = {
  '1': 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0',
  '2': 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151',
  '3': 'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251',
  '4': 'https://pokeapi.co/api/v2/pokemon?limit=107&offset=386',
  '5': 'https://pokeapi.co/api/v2/pokemon?limit=156&offset=493',
  '6': 'https://pokeapi.co/api/v2/pokemon?limit=72&offset=649',
  '7': 'https://pokeapi.co/api/v2/pokemon?limit=88&offset=721',
  '8': 'https://pokeapi.co/api/v2/pokemon?limit=96&offset=809',
  '9': 'https://pokeapi.co/api/v2/pokemon?limit=102&offset=905',
};

export const PokemonList = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const [generation, setGeneration] = useState('1');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(generations[generation])
      .then(response => response.json())
      .then(data => {
        setAllPokemons(data.results);
        setDisplayedPokemons(data.results.slice(0, 8));
      });
  }, [generation]);

  useEffect(() => {
    const filteredPokemons = searchTerm
      ? allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm))
      : allPokemons.slice(0, visibleCount);
    setDisplayedPokemons(filteredPokemons);
  }, [searchTerm, visibleCount, allPokemons]);

  return (
    <div className="container">
      <h1 className="header">Lista de Pokémon</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          className="searchBox"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
        <select className="generationSelect" value={generation} onChange={(e) => setGeneration(e.target.value)}>
          {Object.keys(generations).map(gen => (
            <option key={gen} value={gen}>Generación {gen}</option>
          ))}
        </select>
      </div>
      <div className="pokemonContainer">
        {displayedPokemons.map((pokemon, index) => {
          const pokemonId = pokemon.url.split('/')[6];
          return (
            <div key={index} className="pokemonCard" onClick={() => navigate(`/detalle/${pokemonId}`)}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                alt={pokemon.name}
                className="pokemonImage"
              />
              <p className="pokemonName">{pokemon.name}</p>
            </div>
          );
        })}
      </div>
      {visibleCount < allPokemons.length && !searchTerm && (
        <button className="loadMore" onClick={() => setVisibleCount(visibleCount + 8)}>
          Cargar más
        </button>
      )}
    </div>
  );
};

export const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, [id]);

  const generateStatsChart = (stats) => ({
    labels: stats.map(stat => stat.stat.name.toUpperCase()),
    datasets: [
      {
        label: 'Base Stat',
        data: stats.map(stat => stat.base_stat),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  });

  if (!pokemon) return <p>Cargando...</p>;

  return (
    <div className="pokemonDetail">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Altura: {pokemon.height} cm</p>
      <p>Peso: {pokemon.weight} g</p>
      <h3>Tipos:</h3>
      <ul>
        {pokemon.types.map((type, index) => (
          <li key={index} style={{ backgroundColor: typeColors[type.type.name] || '#000' }}>
            {type.type.name.toUpperCase()}
          </li>
        ))}
      </ul>
      <h3>Estadísticas:</h3>
      <Line data={generateStatsChart(pokemon.stats)} />
      <h3>Movimientos:</h3>
      <ul>
        {pokemon.moves.map((move, index) => (
          <li key={index}>{move.move.name}</li>
        ))}
      </ul>
    </div>
  );
};