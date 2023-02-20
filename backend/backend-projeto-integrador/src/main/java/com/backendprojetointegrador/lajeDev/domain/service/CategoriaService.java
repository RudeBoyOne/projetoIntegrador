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
            //Implementar aqui a exception responsável!
        }
        return categoriasRepository.save(categoria);
    }

    public Categoria buscarCategoriaById(Long idCategoria) {
        return categoriasRepository.findById(idCategoria).get();
        //Implementar aqui a exception responsável!
    }

    public List<Categoria> listarCategoria() {
        return categoriasRepository.findAll();
    }

    public void excluirCategoria(Long idCategoria) {
        if (!categoriasRepository.existsById(idCategoria)){
            //Implementar aqui a exception responsável!
        }
        categoriasRepository.deleteById(idCategoria);
    }

    public boolean existeCategoriaById(Long idCategoria) {
        return categoriasRepository.existsById(idCategoria);
    }
}
