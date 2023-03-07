package com.backendprojetointegrador.lajeDev.domain.service;

import com.backendprojetointegrador.lajeDev.domain.exception.RecursoJaExistenteException;
import com.backendprojetointegrador.lajeDev.domain.model.Produto;
import com.backendprojetointegrador.lajeDev.domain.repository.IProdutoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ProdutoService {

    private final IProdutoRepository produtoRepository;

    public Produto criarProduto(Produto produto) {
        boolean produtoExiste = produtoRepository.findByNome(produto.getNome()).stream()
                .anyMatch((produtoExistente) -> !produtoExistente.equals(produto));

        if (produtoExiste){
            throw new RecursoJaExistenteException("Produto com nome: " + produto.getNome() +
                    " já existe. Tente novamente!");
        }
        return produtoRepository.save(produto);
    }

    public Produto buscarProdutoById(Long idProduto) {
        return produtoRepository.findById(idProduto).get();
    }

    public List<Produto> listarProduto() {
        return produtoRepository.findAll();
    }

    public void excluirProduto(Long idProduto) {
        produtoRepository.deleteById(idProduto);
    }

    public boolean existeProduto(Long idProduto) {
        return produtoRepository.existsById(idProduto);
    }
}
