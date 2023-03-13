import { useState } from 'react';
import Pdp_header from '../../components/pdp_header/pdp_header';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Pdp_local from '../../components/pdp_local/pdp_local';
import Pdp_gallery from '../../components/pdp_gallery/pdp_gallery';

// importar os componentes criados

import styles from './product.module.css';

const Product = () => {
    return (
        <>
            <Header />
            <div className={styles.productContainer}>
                {/* Inserir os componentes criados aqui */}
                <Pdp_header />
                <Pdp_local />
                <Pdp_gallery />
            </div> 
            <Footer /> 
        </>
    );
};

export default Product;