package com.backendprojetointegrador.lajeDev.model;

import com.backendprojetointegrador.lajeDev.domain.model.Imagem;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
public class ImagemTest {

    private Imagem imagem;

    @BeforeEach
    void arrangeImagem() {
        imagem = new Imagem();
        imagem.setTitulo("Nivus Azul");
        imagem.setUrl("ldfkghjsdfklgjsdlkgjsdklgjskldjgklsjd");
    }

    @Test
    void checkImagemTest() {
        assertEquals("Nivus Azul", imagem.getTitulo());
        assertEquals("ldfkghjsdfklgjsdlkgjsdklgjskldjgklsjd", imagem.getUrl());
    }
}
