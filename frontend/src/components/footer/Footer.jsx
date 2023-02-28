import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";


import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <nav className={styles.nav}>
        <p className={styles.copy}>Copyright © 2023 - Grupo 3 Projeto Integrador</p>
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
    </div>
  )

}

export default Footer;