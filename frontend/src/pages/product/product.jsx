import { useState } from 'react';
import Pdp_header from '../../components/pdp_header/pdp_header';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Pdp_local from '../../components/pdp_local/pdp_local';
import Pdp_gallery from '../../components/pdp_gallery/pdp_gallery';

// importar os componentes criados
import Description from '../../components/description/Description';
import Characteristics from '../../components/characteristics/Characteristics';
import AppPolicy from '../../components/policy/Policy';
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
                <Description />
                <Characteristics />
                <AppPolicy />

            </div> 
            <Footer />         
         
            
        </>
    );
};

export default Product;