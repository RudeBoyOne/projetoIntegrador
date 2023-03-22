import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import pt from 'date-fns/locale/pt';
import format from 'date-fns/format';
import { addDays } from 'date-fns';

import styles from './search.module.css';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { BsCalendar3 } from 'react-icons/bs';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const SearchBar = ({ cidades, filtroPorCidades }) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // const handleSelect = (ranges) => {
  //   setStartDate(ranges.selection.startDate);
  //   setEndDate(ranges.selection.endDate);
  // };

  // const selectionRange = {
  //   startDate: startDate,
  //   endDate: endDate,
  //   key: 'selection',
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.boxSearch}>
      <form className={styles.search}>
        <div className={styles.inputCidade}>
          <FiMapPin className={styles.inputIcon} />
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
        </div>

        <div className={styles.inputDataRange}>
          <BsCalendar3 className={styles.inputIcon} />
          <div className={`${styles.dateRangePicker} `}>
            <input
              value={` ${format(range[0].startDate, 'dd/MM/yyyy')} até ${format(
                range[0].endDate,
                'dd/MM/yyyy'
              )}`}
              readOnly
              className={styles.inputDate}
              onClick={() => setOpen((open) => !open)}
            />
            <div ref={refOne} >
              {open && (
                <DateRange
                  ranges={range}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  minDate={new Date()}
                  rangeColors={['#0c456e']}
                  onChange={(item) => setRange([item.selection])}
                  locale={pt}
                  months={2}
                  direction="horizontal"
                  className={styles.calendarPicker}
                />
              )}
            </div>
          </div>
        </div>

        <button title="btnSearch" type="submit" className={styles.searchBtn}>
          <FiSearch /> <span className={styles.btnText}>Buscar</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
