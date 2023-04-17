import React, { navigate, useState, useEffect, useContext } from 'react'
import styles from './minhasReservas.module.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { ProductContext } from '../../providers/ProductContext'
import { CidadeContext } from '../../providers/CidadeContext'
import { AuthContext } from '../../providers/AuthContext'
import Reservas from '../reservas/Reservas'
import api from '../../services/api'
import { useParams } from 'react-router-dom'

const MinhasReservas = ({ range, horario }) => {
  const { detalheProduto, fillDataProduct } = useContext(ProductContext)
  const { setCidadeSelecionada, cidadeSelecionada } = useContext(CidadeContext)
  const { userData } = useContext(AuthContext)
  const [infoReserva, setInfoReserva] = useState([])
  const {id} = useParams();

  async function getReservasById() {
    console.log(id)
    if (userData.token) {
      try {
        const response = await api.get(`/reservas/listarPorCliente/${id}`)
        setInfoReserva(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    {
    }
  }

  useEffect(() => {
    getReservasById();
  },[])

  return (
    <>
      <Header />
      <h1 className={styles.titleReservaDetail}>Detalhes da reserva</h1>
      <div className={styles.bookingDetailInfo}>
        <div className={styles.image}>
          <img src={detalheProduto?.imagens[0].url} />
        </div>

        <h2 className={styles.nomeProduto}>{detalheProduto?.nome}</h2>

        <div className={styles.reservaDescription}>
          {detalheProduto?.descricao}
        </div>
        <p>{cidadeSelecionada}</p>

        <div className={styles.divider}></div>

        <div className={styles.check}>
          <p>Retirada</p>
          <p className={styles.checkData}>20/05/2023</p>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.check}>
          <p>Devolução</p>
          <p>20/05/2023</p>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.checkHorario}>
          <p>Horario de retirada</p>
          <p>10:30</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MinhasReservas
