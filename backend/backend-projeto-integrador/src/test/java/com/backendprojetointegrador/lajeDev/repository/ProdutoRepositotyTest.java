package com.backendprojetointegrador.lajeDev.repository;

import com.backendprojetointegrador.lajeDev.domain.model.Imagem;
import com.backendprojetointegrador.lajeDev.domain.model.Produto;
import com.backendprojetointegrador.lajeDev.domain.repository.IProdutoRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ProdutoRepositotyTest {

    @Autowired
    private IProdutoRepository produtoRepository;
    private Produto produto;
    private Produto produtoSave;

    @BeforeAll
    void arrangeProduto() {
        produto = new Produto();
        produto.setNome("Nivus Chevrollet");
        produto.setDescricao("carro SUV, discreto, com ae de sopfisticação e bom gosto, modesto por fora" +
                " e irresistivelmente agressivo por dentro");

        Imagem imagemOne = new Imagem();
        imagemOne.setTitulo("Nivus Azul de frente");
        imagemOne.setUrl("wfgojwshfvbiwouejvbwieubvw");
        Imagem imagemTwo = new Imagem();
        imagemTwo.setTitulo("Nivus Vermelho de lado");
        imagemTwo.setUrl("wfgojwshfvbiwouejvbwieubvw");
        List<Imagem> imagens = Arrays.asList(imagemOne, imagemTwo);
        produto.setImagens(imagens);

        produtoSave = produtoRepository.save(produto);
    }

    @Test
    @Order(1)
    void searchProdutoTest() {
        assertTrue(produtoRepository.findById(produtoSave.getId()).isPresent());
    }


    @Test
    @Order(2)
    void listProdutosTest() {
        assertEquals(1, produtoRepository.findAll().size());
    }

    @Test
    @Order(3)
    void deleteProdutoTest() {
        produtoRepository.deleteById(produtoSave.getId());
        assertFalse(produtoRepository.existsById(produtoSave.getId()));
    }

}
