package com.backendprojetointegrador.lajeDev.repository;

import com.backendprojetointegrador.lajeDev.domain.model.Imagem;
import com.backendprojetointegrador.lajeDev.domain.repository.IImagemRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ImagemRepositoryTest {

    @Autowired
    private IImagemRepository imagemRepository;
    private Imagem imagem;
    private Imagem imagemSave;

    @BeforeAll
    void arrangeImagem() {
        imagem = new Imagem();
        imagem.setTitulo("BMW luxo");
        imagem.setUrl("wslfgjkhdsfhjsdklfnoghjpwerignkwrmgiopjwjgwrjgw");
        imagemSave = imagemRepository.save(imagem);
    }

    @Test
    @Order(1)
    void searchImagemTest() {
        assertTrue(imagemRepository.findById(imagemSave.getId()).isPresent());
    }

    @Test
    @Order(2)
    void updateImagemTest() {
        imagem.setTitulo("Ferrari Vermelha");
        imagem.setUrl("snmfgklsdmfgeopsgjwiopjtwemtl;wem,l;w");
        imagem.setId(imagemSave.getId());
        imagemSave = imagemRepository.save(imagem);
        assertNotNull(imagemSave.getId());
        assertEquals(1, imagemSave.getId());
        assertEquals("Ferrari Vermelha", imagemSave.getTitulo());
        assertEquals("snmfgklsdmfgeopsgjwiopjtwemtl;wem,l;w", imagemSave.getUrl());
    }

    @Test
    @Order(3)
    void listImagemTest() {
        assertEquals(1, imagemRepository.findAll().size());
    }

    @Test
    @Order(4)
    void deleteImagemTest() {
        imagemRepository.deleteById(imagemSave.getId());
        assertFalse(imagemRepository.existsById(imagemSave.getId()));
    }
}
