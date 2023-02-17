package com.backendprojetointegrador.lajeDev.domain.service;

import com.backendprojetointegrador.lajeDev.domain.model.Categoria;
import com.backendprojetointegrador.lajeDev.domain.repository.ICategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    ICategoriaRepository categoriasRepository;

    public Categoria criarCategoria(Categoria categoria) {
        boolean categoriaExiste = categoriasRepository.findByQualificacao(categoria.getQualificacao()).stream()
                .anyMatch(categoriaExistente -> !categoriaExistente.equals(categoria));
        if(categoriaExiste) {
            System.out.println("Existe, tente outra vez");
        }
        return categoriasRepository.save(categoria);
    }

    public Categoria buscarCategoriaById(Long idCategoria) {
        return categoriasRepository.findById(idCategoria).get();
    }

    public List<Categoria> listarCategoria() {
        return categoriasRepository.findAll();
    }

    public void excluirCategoria(Long idCategoria) {
        if (!categoriasRepository.existsById(idCategoria)){
            System.out.println("Categoria inexistente!");
        }
        categoriasRepository.deleteById(idCategoria);
    }

    public boolean existeCategoriaById(Long idCategoria) {
        return categoriasRepository.existsById(idCategoria);
    }
}
