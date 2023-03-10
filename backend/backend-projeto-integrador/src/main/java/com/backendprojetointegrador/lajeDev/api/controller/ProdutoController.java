package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.assembler.CaracteristicaAssembler;
import com.backendprojetointegrador.lajeDev.api.assembler.ImagemAssembler;
import com.backendprojetointegrador.lajeDev.api.assembler.ProdutoAssembler;
import com.backendprojetointegrador.lajeDev.api.dtos.inputs.ProdutoInput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.ProdutoOutput;
import com.backendprojetointegrador.lajeDev.domain.model.*;
import com.backendprojetointegrador.lajeDev.domain.service.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;
    private final ProdutoAssembler produtoAssembler;
    private final CaracteristicaService caracteristicaService;
    private final ImagemService imagemService;
    private final ImagemAssembler imagemAssembler;
    private final CategoriaService categoriaService;
    private final CidadeService cidadeService;

    @PostMapping
    public ResponseEntity<ProdutoOutput> criar(@RequestBody ProdutoInput produto) {
        Produto produtoToSave = produtoAssembler.toEntity(produto);

        List<Caracteristica> caracteristicas = caracteristicaService
                .listarDeterminandasCaracteristicas(produto.getCaracteristicas());
        produtoToSave.setCaracteristicas(caracteristicas);

        List<Imagem> imagens = imagemService.criaObjetosImagens(produto.getImagens(), imagemAssembler);
        produtoToSave.setImagens(imagens);

        Categoria categoria = categoriaService.buscarCategoria(produto.getCategoria());
        produtoToSave.setCategoria(categoria);

        Cidade cidade = cidadeService.buscarCidadeById(produto.getCidade());
        produtoToSave.setCidade(cidade);

        ProdutoOutput produtoOutput = produtoAssembler.toOutput(produtoService.criarProduto(produtoToSave));

        return ResponseEntity.status(HttpStatus.CREATED).body(produtoOutput);
    }

    @GetMapping
    public List<ProdutoOutput> listar() {
        List<Produto> produtosEntity = produtoService.listarProdutos();
        List<ProdutoOutput> produtoOutputs = produtoAssembler.toCollectionOutput(produtosEntity);
        return produtoOutputs;
    }

    @GetMapping("/{idProduto}")
    public ResponseEntity<ProdutoOutput> buscarById(@PathVariable Long idProduto) {
        Produto produtoEntity = produtoService.buscarProduto(idProduto);
        ProdutoOutput produtoOutput = produtoAssembler.toOutput(produtoEntity);
        return ResponseEntity.ok(produtoOutput);
    }

    @DeleteMapping("/{idProduto}")
    public ResponseEntity<Void> deletar(@PathVariable Long idProduto) {
        produtoService.excluirProduto(idProduto);
        return ResponseEntity.noContent().build();
    }
}
