import { useState } from 'react';

// importar os componentes criados
import Description from '../../components/description/Description';
import Characteristics from '../../components/characteristics/Characteristics';
import AppPolicy from '../../components/policy/Policy';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import styles from './product.module.css';

const Product = () => {
    return (
        <>
         
         <div className={styles.productContainer}>
            {/* Inserir os componentes criados aqui */}
            
            <Description />
            <Characteristics />
            <AppPolicy />
            

            </div> 
            
        </>
    );
};

export default Product;