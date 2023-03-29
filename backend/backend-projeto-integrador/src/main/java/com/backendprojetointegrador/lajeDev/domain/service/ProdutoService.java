package com.backendprojetointegrador.lajeDev.domain.service;

import com.backendprojetointegrador.lajeDev.domain.exception.RecursoJaExistenteException;
import com.backendprojetointegrador.lajeDev.domain.exception.RecursoNaoEncontrado;
import com.backendprojetointegrador.lajeDev.domain.model.Categoria;
import com.backendprojetointegrador.lajeDev.domain.model.Cidade;
import com.backendprojetointegrador.lajeDev.domain.model.Produto;
import com.backendprojetointegrador.lajeDev.domain.repository.IProdutoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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

    public Produto buscarProduto(Long idProduto) {
        return produtoRepository.findById(idProduto)
                .orElseThrow(() -> new RecursoNaoEncontrado("Produto com o id: "+ idProduto +
                        " não existe!"));
    }

    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    public List<Produto> listarByCategoria(Categoria categoria) {
        return produtoRepository.findByCategoria(categoria);
    }

    public List<Produto> listarByCidade(Cidade cidade) {
        return produtoRepository.findByCidade(cidade);
    }

    public List<Produto> listarByCidadeAndDates(Long idCidade, LocalDate dateStar, LocalDate dateEnd) {
        return produtoRepository.findByProdutosNotReservados(idCidade, dateStar, dateEnd);
    }

    public void excluirProduto(Long idProduto) {
        if (!existeProduto(idProduto)) {
            throw new RecursoNaoEncontrado("Produto com o id: "+ idProduto +" não existe!");
        }
        produtoRepository.deleteById(idProduto);
    }

    public boolean existeProduto(Long idProduto) {
        return produtoRepository.existsById(idProduto);
    }

}
