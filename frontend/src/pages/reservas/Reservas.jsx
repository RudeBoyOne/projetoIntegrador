import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDays } from 'date-fns';
import Modal from 'react-modal';
Modal.setAppElement('#root');

import BlocoReservas from '../../components/bloco_reserva/BlocoReservas';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import AppPolicy from '../../components/policy/Policy';
import HoraReserva from '../../components/hora_reserva/HoraReserva';
import Calendar from '../../components/calendar/calendar';
import FormularioReserva from '../../components/formulario_reserva/FormularioReserva';
import ReservaSucesso from '../../components/reserva_sucesso/ReservaSucesso';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styles from './reserva.module.css';

import api from '../../services/api';

import { ProductContext } from '../../providers/ProductContext';
import { AuthContext } from '../../providers/AuthContext';
import { CidadeContext } from '../../providers/CidadeContext';

const Reservas = () => {
  const { userData } = useContext(AuthContext);
  const { detalheProduto } = useContext(ProductContext);
  const { cidadeSelecionada } = useContext(CidadeContext);
  const [cidades, setCidades] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleDateChange(item) {
    setRange([item.selection]);
  }

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  async function getCidades() {
    try {
      const response = await api.get('/cidades');
      setCidades(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCidades();
  }, []);

  useEffect(() => {
    if (range && range[0] && range[0].startDate && range[0].endDate) {
      setDataInicial(range[0].startDate.toLocaleDateString('pt-BR'));
      setDataFinal(range[0].endDate.toLocaleDateString('pt-BR'));
    }
  }, [range]);

  async function criarReserva() {
    const headers = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      produto: detalheProduto.id,
      usuario: userData.id,
      horaDeInicioDaReserva: selectedTime,
      dataInicialDaReserva: dataInicial,
      dataFinalDaReserva: dataFinal,
    });

    try {
      setLoading(true);
      await api.post('/reservas', body, headers).then((response) => {
        // toast('Sua reserva foi criada com sucesso.', {
        //   type: 'success',
        //   autoClose: 2500,
        //   position: 'top-right',
        //   theme: 'colored',
        // });

        setTimeout(() => {
          setShowModal(true);
          setLoading(false);
        }, 2000);
      });
    } catch (error) {
      if (error.response.data !== '') {
        toast.error(error.response.data.titulo, {
          autoClose: 4500,
          position: 'top-center',
          theme: 'colored',
        });
      } else {
        toast.error('Você não tem permissão para realizar uma reserva', {
          autoClose: 4500,
          position: 'top-center',
          theme: 'colored',
        });
      }
      console.log(error);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      <Header />
      <div className={styles.titleReserva}>
        <p>Falta pouco para concluir a sua reserva</p>
      </div>
      <div className={styles.containerReserva}>
        <div className={styles.blocoReserva}>
          <BlocoReservas
            detalheProduto={detalheProduto}
            range={range}
            horario={selectedTime}
            dataInicial={dataInicial}
            dataFinal={dataFinal}
            onCriarReserva={criarReserva}
            userData={userData}
            loading={loading}
          />
        </div>

        <div className={styles.formulario}>
          <FormularioReserva cidades={cidades} getCidades={getCidades} />
        </div>

        <div className={styles.calendar}>
          <h2>Selecione o período</h2>
          <Calendar range={range} onDateChange={handleDateChange} />
        </div>

        <div className={styles.horas}>
          <HoraReserva
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
          />
        </div>
      </div>

      <AppPolicy />
      <ReservaSucesso
        showModal={showModal}
        onCloseModal={handleCloseModal}
        overLayClassName={styles['modal-overlay']}
        className={styles['modal-content']}
        style={{ overlay: { zIndex: 99 } }}
      />
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Reservas;
