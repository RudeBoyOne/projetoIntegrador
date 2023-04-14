import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

import logo from '../../images/logo-white.png'

import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <nav className={styles.nav}>
        <img src={logo} alt='logo Carango' className={styles.logoFooter} />
        <div className={styles.socialMidias}>
          <ul className={styles.listMidias}>
            <li className={styles.linkMidias}>
              <FiFacebook className={styles.linkIcon}/>
            </li>
            <li className={styles.linkMidias}>
              <FiInstagram className={styles.linkIcon}/>
            </li>
            <li className={styles.linkMidias}>
              <FiTwitter className={styles.linkIcon}/>
            </li>
            <li className={styles.linkMidias}>
              <FiYoutube className={styles.linkIcon}/>
            </li>
          </ul>
        </div>
        
      </nav>
        <p className={styles.copy}>Copyright © 2023 - Grupo 3 Projeto Integrador</p>
    </div>
  )

}

export default Footer;