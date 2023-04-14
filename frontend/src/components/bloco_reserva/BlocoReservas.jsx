import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-loader-spinner';

import { CidadeContext } from '../../providers/CidadeContext';

import Pdp_header from '../pdp_header/pdp_header';
import styles from './blocoReservas.module.css';
import Pdp_local from '../pdp_local/pdp_local';
import Pdp_gallery from '../pdp_gallery/pdp_gallery';
import Description from '../description/Description';
import ReservaSucesso from '../reserva_sucesso/ReservaSucesso';

const BlocoReservas = ({
  userData,
  detalheProduto,
  range,
  horario,
  dataInicial,
  dataFinal,
  onCriarReserva,
  mostrarModal,
  setMostrarModal,
  loading,
}) => {
  const { cidadeSelecionada } = useContext(CidadeContext);

  return (
    <>
      <h2 className={styles.titleReservaDetail}>Detalhes da reserva</h2>
      <div className={styles.bookingDetailInfo}>
        <div className={styles.imageBox}>
          <img src={detalheProduto?.imagens[0].url} className={styles.image} />
        </div>

        <div className={styles.info}>
          <div className={styles.localInfo}>
            <div className={styles.reservaDescription}>
              <Description
                nomeCarro={detalheProduto?.nome}
                descricao={detalheProduto?.descricao}
              />
            </div>
          </div>

          <div className={styles.divider}></div>
          <div className={styles.check}>
            <p>Cliente</p>
            <p className={styles.checkData}>{userData.nomeESobrenome}</p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.check}>
            <p>Cidade</p>
            <p className={styles.checkData}>{cidadeSelecionada.nome}</p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.check}>
            <p>Horário da retirada</p>
            <p className={styles.checkData}>
              {horario ? horario : 'Selecione um horário'}
            </p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.check}>
            <p>Retirada</p>
            <p className={styles.checkData}>
              {range && range[0] && range[0].startDate && range[0].endDate
                ? dataInicial
                : 'Selecione uma data'}
            </p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.check}>
            <p>Devolução</p>
            <p className={styles.checkData}>
              {range && range[0] && range[0].startDate && range[0].endDate
                ? dataFinal
                : 'Selecione uma data'}
            </p>
          </div>
          <div className={styles.divider}></div>

          <button className={styles.buttonReservation} onClick={onCriarReserva}>
            {loading ? (
              <ProgressBar
                height="50"
                width="150"
                margin="0"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor="#fff"
                barColor="#0c456e"
                className="loader"
              />
            ) : (
              'Criar Reserva'
            )}
          </button>
          {mostrarModal && <ReservaSucesso />}
        </div>
      </div>
    </>
  );
};

export default BlocoReservas;
