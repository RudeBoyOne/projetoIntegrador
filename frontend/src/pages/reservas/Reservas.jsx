import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';

import BlocoReservas from '../../components/bloco_reserva/BlocoReservas';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import AppPolicy from '../../components/policy/Policy';
import HoraReserva from '../../components/hora_reserva/HoraReserva';
import Calendar from '../../components/calendar/calendar';
import FormularioReserva from '../../components/formulario_reserva/FormularioReserva';

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
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  console.log(userData);
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

  async function criarReserva() {
    try {
      if (userData.id) {
        const response = await api.post('/reservas', {
          produto: detalheProduto.id,
          cliente: userData.id,
          horaDeInicioDaReserva: selectedTime,
          dataIicialDaReserva: range.startDate,
        });
      } else {
        setTimeout(() => {
          navigate('/login');
        }, 2000);

        toast('Para fazer uma reserva você precisa estar logado.', {
          type: 'error',
          autoClose: 2500,
          position: 'top-right',
          theme: 'colored',
        });
      }
    } catch (error) {
      toast.error('Erro ao efetuar sua reserva, tente navamente', {
        autoClose: 2500,
        position: 'top-right',
        theme: 'colored',
      });
    }
  }

  useEffect(() => {
    criarReserva();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.containerReserva}>
        <div className={styles.blocoReserva}>
          <BlocoReservas
            detalheProduto={detalheProduto}
            range={range}
            horario={selectedTime}
            criarReserva={criarReserva}
          />
        </div>

        <div className={styles.formulario}>
          <FormularioReserva
            cidades={cidades}
            getCidades={getCidades}
            // onCidadeSelecioanda={cidadeSelecionada}
          />
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
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Reservas;
