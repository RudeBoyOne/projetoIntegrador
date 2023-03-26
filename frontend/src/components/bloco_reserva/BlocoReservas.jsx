
import Pdp_header from '../pdp_header/pdp_header';
import styles from './blocoReservas.module.css'
import Pdp_local from '../pdp_local/pdp_local';
import Pdp_gallery from '../pdp_gallery/pdp_gallery';
import Description from '../description/Description';





const BlocoReservas = ({produtoSelecionado}) => {
console.log(produtoSelecionado)
 
  return (
    
      
      
      <div className={styles.bookingDetailInfo}>
      <h1>Detalhes da reserva</h1>
        

        <div className={styles.image}>
          <Pdp_gallery imagens={ produtoSelecionado?.imagens }/>
        </div>

        <div className={styles.info}>

        <div className={styles.carName}>
        <Pdp_header
          titulo={ produtoSelecionado?.nome } />
        </div>

        <div className={styles.localInfo}>
          <Pdp_local local={ produtoSelecionado?.cidade } />
          <Description  nomeCarro={ produtoSelecionado?.nome }
                      descricao={ produtoSelecionado?.descricao } />
        </div>

        <div className={styles.divider}></div>

        <div className={styles.check}>
          <p>Check in</p>
          <p className={styles.checkData}>25/03/2023</p>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.check}>
          <p>Check out</p>
          <p>25/04/2023</p>
        </div>

        <div className={styles.divider}></div>

        <button className={styles.buttonReservation}>Confirmar reserva</button>
      </div>
        </div>
  )
}

export default BlocoReservas;