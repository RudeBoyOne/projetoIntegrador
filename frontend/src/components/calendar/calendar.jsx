import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import pt from 'date-fns/locale/pt';
import { addDays } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './calendar.module.css';

const Calendar = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  return (
    <div>
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
        className={styles.calendar}
      />
    </div>
  );
};

export default Calendar;
