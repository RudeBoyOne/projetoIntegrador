import styles from "./search.module.css";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  
    return(

      <div className={styles.boxSearch}>
        <form onSubmit={handleSubmit} className={styles.search}>
          <input type="search" className={styles.searchInput} placeholder="Digite o local de retirada"/>
          <input className={styles.searchInputData} type="date" placeholder="Retirada"/>
          <input className={styles.searchInputData} type="date" placeholder="Entrega"/>
          <button className={styles.searchBtn}>
          <FiSearch />
          </button>
        </form>    
      </div>
  
  )
  
}

export default SearchBar;