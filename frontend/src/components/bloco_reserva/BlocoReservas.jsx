import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pdp_header from '../pdp_header/pdp_header';
import styles from './blocoReservas.module.css';
import Pdp_local from '../pdp_local/pdp_local';
import Pdp_gallery from '../pdp_gallery/pdp_gallery';
import Description from '../description/Description';
import ReservaSucesso from '../reserva_sucesso/ReservaSucesso';

const BlocoReservas = ({ detalheProduto }) => {
  const [reservaEfetuada, setReservaEfetuada] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!time || !dates.length) {
      alert('Por favor, selecione um tempo e um intervalo de datas.');
      return;
    }

    fetch('http://localhost:8080/', {
      method: 'POST',
      body: JSON.stringify({ time, dates }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.status === 201) {
          <ReservaSucesso />;
        } else {
          alert(
            'Infelizmente a reserva não pôde ser feita. Por favor, tente novamente mais tarde.'
          );
        }
      })
      .catch((error) => {
        alert(
          'Ocorreu um erro ao enviar a reserva. Por favor, tente novamente mais tarde.'
        );
      });
  }

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
            <Pdp_local local={detalheProduto?.cidade} />
            <div className={styles.reservaDescription}>
              <Description
                nomeCarro={detalheProduto?.nome}
                descricao={detalheProduto?.descricao}
              />
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.check}>
            <p>Retirada</p>
            <p className={styles.checkData}>25/03/2023</p>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.check}>
            <p>Devolução</p>
            <p className={styles.checkData}>25/04/2023</p>
          </div>

          <div className={styles.divider}></div>

          <button className={styles.buttonReservation} onClick={handleReserva}>
            Confirmar reserva
          </button>
          {reservaEfetuada && <ReservaSucesso />}
        </div>
      </div>
    </>
  );
};

export default BlocoReservas;