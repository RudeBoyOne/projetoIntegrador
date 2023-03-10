package com.backendprojetointegrador.lajeDev.domain.service;

import com.backendprojetointegrador.lajeDev.domain.exception.RecursoJaExistenteException;
import com.backendprojetointegrador.lajeDev.domain.exception.RecursoNaoEncontrado;
import com.backendprojetointegrador.lajeDev.domain.model.Cidade;
import com.backendprojetointegrador.lajeDev.domain.repository.ICidadeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CidadeService {

    private final ICidadeRepository cidadeRepository;

    public Cidade criarCidade(Cidade cidade){
        boolean cidadeExiste = cidadeRepository.findByNome(cidade.getNome()).stream()
                .anyMatch((cidadeExistente) -> !cidadeExistente.equals(cidade));

        if (cidadeExiste) {
            throw new RecursoJaExistenteException("Cidade com de nome: " + cidade.getNome() +
                    " já existe. Tente novamente!");
        }
        return cidadeRepository.save(cidade);
    }

    public Cidade buscarCidadeById(Long idCidade) {
        return cidadeRepository.findById(idCidade)
                .orElseThrow(() -> new RecursoNaoEncontrado("Cidade de id: "+ idCidade +
                        " não encontrada ou inexistente!"));
    }

    public List<Cidade> listarCidade() {
        return cidadeRepository.findAll();
    }


    public void excluirCidadeById(Long idCidade) {
        if (!existeCidadeById(idCidade)) {
            throw new RecursoNaoEncontrado("Cidade de id: "+ idCidade + " não existe!");
        }
        cidadeRepository.deleteById(idCidade);
    }

    public boolean existeCidadeById(Long idCidade) {
        return cidadeRepository.existsById(idCidade);
    }
}
