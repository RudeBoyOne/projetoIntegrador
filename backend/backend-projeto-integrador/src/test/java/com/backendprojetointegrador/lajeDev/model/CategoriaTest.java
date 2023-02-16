package com.backendprojetointegrador.lajeDev.model;


import com.backendprojetointegrador.lajeDev.domain.model.Categorias;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class CategoriaTest {
    Categorias categoria;

    @BeforeEach
    public void iniciaCategoria(){
        categoria = new Categorias("Sedan");
        categoria.setDescricao("veículo utilitário com quatro portas, maior espaço interno que um carro hatch, " +
                "e bagageiro espaçoso");
        categoria.setUrlImagem("https://uploads-ssl.webflow.com/5de0424183c9d7b00dd43bca/5f9071bf9bbc9f70d25745af_carros-sedan-mais-vendidos.jpg");
    }

    @Test
    public void verificaCategoria(){
        assertEquals("Sedan", categoria.getQualificacao());
        assertEquals("veículo utilitário com quatro portas, maior espaço interno que um carro hatch, " +
                "e bagageiro espaçoso", categoria.getDescricao());
        assertEquals("https://uploads-ssl.webflow.com/5de0424183c9d7b00dd43bca/5f9071bf9bbc9f70d25745af_carros-sedan-mais-vendidos.jpg",
                categoria.getUrlImagem());
    }
}
