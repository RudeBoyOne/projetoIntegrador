package com.backendprojetointegrador.lajeDev.domain.service;

import com.backendprojetointegrador.lajeDev.domain.model.Categoria;
import com.backendprojetointegrador.lajeDev.domain.repository.ICategoriasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriasService {

    @Autowired
    ICategoriasRepository categoriasRepository;

    public Categoria criarCategoria(Categoria categoria) {
        boolean categoriaExiste = categoriasRepository.findByQualificacao(categoria.getQualificacao()).stream()
                .anyMatch(categoriaExistente -> !categoriaExistente.equals(categoria));
        if(categoriaExiste) {
            System.out.println("Existe, tente outra vez");
        }
        return categoriasRepository.save(categoria);
    }
}
