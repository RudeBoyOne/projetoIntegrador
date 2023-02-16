package com.backendprojetointegrador.lajeDev.service;


import com.backendprojetointegrador.lajeDev.model.Categoria;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CategoriaServiceTest {

    @Autowired
    CategoriaService categoriaService;
    Categoria categoria;
    CategoriaDTOOutput categoriaDTOOutput;

    @BeforeEach
    public void instanciaObjetoParaTestes(){
        categoria = new Categoria("Esportivo");
    }

    @Test
    public void criarCategoria(){
        categoria =categoriaService.criarCategoria(categoria);
        Assertions.assertEquals("Esportivo", categoriaDTOOutput.getNome());
    }

    @Test
    public void buscarCategoriaByIdTest(){
        categoriaService.criarCategoria(categoria);
        categoria = categoriaService.buscarCategoriaById(categoria.getIdCategoria());
        Assertions.assertNotNull(categoriaDTOOutput);
        Assertions.assertEquals("Esportivo", categoriaDTOOutput.getNome());
    }
    @Test
    public void listarTodasCategoriasTest(){
        categoriaService.criarCategoria(categoria);
        categoria = new Categoria("SUV");

        categoriaService.criarCategoria(categoria);
        categoria = new Categoria("Esportivo");

        categoriaService.criarCategoria(categoria);
        categoria = new Categoria("Sedan");

        categoriaService.criarCategoria(categoria);
        categoria = new Categoria("Popular");

        Assertions.assertEquals(4, categoriaService.listarTodasCategorias().size());
    }

    @Test
    public void deletarCategoriaByIdTest(){
        categoriaService.criarCategoria(categoria);
        categoriaService.deletarCategoriaById(categoria.getIdCategoria());
        Assertions.assertFalse(categoriaService.existeCategoriaById(categoria.getIdCategoria()));
    }
}
