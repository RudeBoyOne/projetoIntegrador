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
          <input className={styles.searchInputData} type="text" onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")} placeholder="Data de Retirada"/>
          <input className={styles.searchInputData} type="text" onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")} placeholder="Data de Entrega"/>
          <button className={styles.searchBtn}>
          <FiSearch />
          </button>
        </form>    
      </div>
  
  )
  
}

export default SearchBar;