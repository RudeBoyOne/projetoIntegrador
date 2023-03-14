package com.backendprojetointegrador.lajeDev.domain.service;

import com.backendprojetointegrador.lajeDev.domain.exception.RecursoJaExistenteException;
import com.backendprojetointegrador.lajeDev.domain.exception.RecursoNaoEncontrado;
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
            throw new RecursoJaExistenteException("Categoria com a qualificação "
                    + categoria.getQualificacao() + " já existe. Tente novamente!");
        }
        return categoriasRepository.save(categoria);
    }

    public Categoria buscarCategoria(Long idCategoria) {
        return categoriasRepository.findById(idCategoria)
                .orElseThrow(() -> new RecursoNaoEncontrado("Categoria com de id: " + idCategoria
                        + " não existe!"));
    }

    public List<Categoria> listarCategorias() {
        return categoriasRepository.findAll();
    }

    public void excluirCategoria(Long idCategoria) {
        if (!existeCategoria(idCategoria)) {
            throw new RecursoNaoEncontrado("Categoria com de id: " + idCategoria
                    + " não existe!");
        }
        categoriasRepository.deleteById(idCategoria);
    }

    public boolean existeCategoria(Long idCategoria) {
        return categoriasRepository.existsById(idCategoria);
    }
}
