package com.backendprojetointegrador.lajeDev.model;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class CategoriaTest {
    Categoria categoria;


    @BeforeEach
    public void iniciaCategoria(){
        categoria = new Categoria("Sedan");
    }

    @Test
    public void verificaCategoria(){
        assertEquals("Sedan", categoria.getNome());
    }
}
