import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Pdp_header from '../pdp_header/pdp_header';
import styles from './blocoReservas.module.css';
import Pdp_local from '../pdp_local/pdp_local';
import Pdp_gallery from '../pdp_gallery/pdp_gallery';
import Description from '../description/Description';
import ReservaSucesso from '../reserva_sucesso/ReservaSucesso';

const BlocoReservas = ({ detalheProduto, range, horario, criarReserva }) => {
  const [reservaEfetuada, setReservaEfetuada] = useState(false);

  const handleReserva = () => {
    efetuarReserva()
      .then(() => {
        setReservaEfetuada(true);
        <ReservaSucesso />;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h2 className={styles.titleReservaDetail}>Detalhes da reserva</h2>
      <div className={styles.bookingDetailInfo}>
        <div className={styles.image}>
          <img src={detalheProduto?.imagens[0].url} />
        </div>

        <div className={styles.info}>
          <div className={styles.localInfo}>
            {/* <Pdp_local local={detalheProduto?.cidade} /> */}
            <div className={styles.reservaDescription}>
              <Description
                nomeCarro={detalheProduto?.nome}
                descricao={detalheProduto?.descricao}
              />
            </div>
          </div>

          <div className={styles.divider}></div>
          <div className={styles.check}>
            <p>Cidade</p>
            <p className={styles.checkData}>
              cidade
            </p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.check}>
            <p>Retirada</p>
            <p className={styles.checkData}>
              {range && range[0] && range[0].startDate && range[0].endDate
                ? `${range[0].startDate.toLocaleDateString('pt-BR')}`
                : 'Selecione uma data'}
            </p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.check}>
            <p>Horário da retirada</p>
            <p className={styles.checkData}>
              {horario ? horario : 'Selecione um horário'}
            </p>
            {/* <p>{horario}</p> */}
          </div>
          <div className={styles.divider}></div>
          <div className={styles.check}>
            <p>Devolução</p>
            <p className={styles.checkData}>
              {range && range[0] && range[0].startDate && range[0].endDate
                ? `${range[0].endDate.toLocaleDateString('pt-BR')}`
                : 'Selecione uma data'}
            </p>
          </div>
          <div className={styles.divider}></div>

          <button className={styles.buttonReservation} onClick={criarReserva}>
            Confirmar reserva
          </button>
          {reservaEfetuada && <ReservaSucesso />}
        </div>
      </div>
    </>
  );
};

export default BlocoReservas;
