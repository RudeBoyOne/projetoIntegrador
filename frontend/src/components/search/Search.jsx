import { useState } from 'react';

import { cidades } from '../../utils/cidades.json';
import styles from './search.module.css';
import { FiSearch } from 'react-icons/fi';

const SearchBar = () => {
  const [searchCidade, setSearchCidade] = useState([]);

  console.log(searchCidade);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.boxSearch}>
      <form onSubmit={handleSubmit} className={styles.search}>
        <select
          name="cidades"
          id="cidades"
          value={searchCidade._id}
          onChange={(event) => {
            setSearchCidade(event.target.value);
          }}
          className={styles.searchInput}
          placeholder="Digite o local de retirada"
        >
          <option value="" disable="true" className={styles.optionHide}>
            Onde vai retirar o carro?
          </option>
          {cidades.map((cidade) => {
            return (
              <option key={cidade._id} value={cidade.cidade}>
                {cidade.cidade}
              </option>
            );
          })}
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
        <button className={styles.searchBtn}>
          <FiSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
