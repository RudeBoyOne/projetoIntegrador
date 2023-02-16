package com.backendprojetointegrador.lajeDev.repository;

import com.backendprojetointegrador.lajeDev.model.Categoria;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class CategoriaRepositoryTest {
    @Autowired
    private ICategoriaRepository categoriaRepository;

    private Categoria categoria;
    private Categoria categoriaSalvo

    @Test
    public void criarCategoria(){
        this.categoria = new Categoria("SUV");
        categoriaSalvo = categoriaRepository.save(categoria);
        Assertions.assertNotNull(this.categoriaSalvo.getIdCategoria());
        Assertions.assertEquals(this.categoria.getNome(), this.categoriaSalvo.getNome());
    }
}
