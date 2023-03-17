import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './search.module.css';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ cidades, filtroPorCidades }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.boxSearch}>
      <form className={styles.search}>
        <select
          title="cidades"
          name="cidades"
          onChange={(event) => {
            filtroPorCidades(event.target.value);
          }}
          className={styles.searchInput}
        >
          <option value="" disable="true" className={styles.optionHide}>
            Onde vai retirar o carro?
          </option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.id}>
              {cidade.nome}
            </option>
          ))}
        </select>

        <input
          className={styles.searchInputData}
          type="text"
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => (e.target.type = 'text')}
          placeholder="Data de Retirada"
        />
        <input
          className={styles.searchInputData}
          type="text"
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => (e.target.type = 'text')}
          placeholder="Data de Entrega"
        />
        <button title="btnSearch" type="submit" className={styles.searchBtn}>
          <FiSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
