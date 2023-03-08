package com.backendprojetointegrador.lajeDev.repository;

import com.backendprojetointegrador.lajeDev.domain.model.Categoria;
import com.backendprojetointegrador.lajeDev.domain.repository.ICategoriaRepository;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

//@RunWith(SpringRunner.class)
@DataJpaTest
@ActiveProfiles("test")
@TestMethodOrder(OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class CategoriaRepositoryTest {
    @Autowired
    private ICategoriaRepository categoriaRepository;
    private Categoria categoria;
    private Categoria categoriaSalvo;

    @BeforeAll
    void arrangeCategoria() {
        categoria = new Categoria();
        categoria.setQualificacao("SUV");
        categoria.setDescricao("veículo de alto padrão, por isso maior e com características mais sofisticadas em" +
                "comparação com um carro sedan");
        categoria.setUrlImagem("https://img.olhardigital.com.br/wp-content/uploads/2022/06/polestar3-1.jpg");
        categoriaSalvo = categoriaRepository.save(categoria);
    }

    @Test
    @Order(1)
    void searchCategoriaById() {
        assertTrue(categoriaRepository.findById(categoriaSalvo.getId()).isPresent());
    }

    @Test
    @Order(2)
    void updateCategoria() {
        categoria.setQualificacao("Conversivel");
        categoria.setDescricao("veículo esportivo, com estilo agressivo, tem menor espaço interno em comparação com " +
                "uma SUV, mas tem um motor mais potente e melhor desempenho em retas");
        categoria.setUrlImagem("https://blog.catarinacarros.com.br/wp-content/uploads/2020/02/bmw-zseries-z4-conversivel-1024x576.jpg");
        categoriaSalvo = categoriaRepository.saveAndFlush(categoria);
        assertNotNull(categoriaSalvo.getId());
        assertEquals(categoria.getQualificacao(), categoriaSalvo.getQualificacao());
        assertEquals(categoria.getDescricao(), categoriaSalvo.getDescricao());
        assertEquals(categoria.getUrlImagem(), categoriaSalvo.getUrlImagem());
    }

    @Test
    @Order(3)
    void deleteCategoria() {
        categoriaRepository.deleteById(categoriaSalvo.getId());
        assertFalse(categoriaRepository.existsById(categoriaSalvo.getId()));
    }
}
