package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.assembler.ImagemAssembler;
import com.backendprojetointegrador.lajeDev.api.assembler.ProdutoAssembler;
import com.backendprojetointegrador.lajeDev.api.dtos.inputs.ProdutoInput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.ProdutoOutput;
import com.backendprojetointegrador.lajeDev.domain.model.*;
import com.backendprojetointegrador.lajeDev.domain.service.CaracteristicaService;
import com.backendprojetointegrador.lajeDev.domain.service.CategoriaService;
import com.backendprojetointegrador.lajeDev.domain.service.CidadeService;
import com.backendprojetointegrador.lajeDev.domain.service.ProdutoService;
import com.backendprojetointegrador.lajeDev.domain.service.imagem.ImagemService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    public ResponseEntity<ProdutoOutput> criar(@RequestBody @Valid ProdutoInput produtoInput) {
        Produto produtoToSave = produtoAssembler.toEntity(produtoInput);

        List<Caracteristica> caracteristicas = caracteristicaService
                .listarDeterminandasCaracteristicas(produtoInput.getCaracteristicas());
        produtoToSave.setCaracteristicas(caracteristicas);

        if(produtoInput.getImagens() != null){
            List<Imagem> imagens = imagemService.listaDeterminadasImagens(produtoInput.getImagens());
            produtoToSave.setImagens(imagens);
        }

        Categoria categoria = categoriaService.buscarCategoria(produtoInput.getCategoria());
        produtoToSave.setCategoria(categoria);

        Cidade cidade = cidadeService.buscarCidadeById(produtoInput.getCidade());
        produtoToSave.setCidade(cidade);

        ProdutoOutput produtoOutput = produtoAssembler.toOutput(produtoService.criarProduto(produtoToSave));

        return ResponseEntity.status(HttpStatus.CREATED).body(produtoOutput);
    }

    @PutMapping("{idProduto}")
    public ResponseEntity<?> atualizar(@PathVariable Long idProduto,
                                       @RequestBody @Valid ProdutoInput produtoInput) {
            Produto produtoToSave = produtoAssembler.toEntity(produtoInput);

            List<Caracteristica> caracteristicas = caracteristicaService
                    .listarDeterminandasCaracteristicas(produtoInput.getCaracteristicas());
            produtoToSave.setCaracteristicas(caracteristicas);

            List<Imagem> imagens = imagemService.listaDeterminadasImagens(produtoInput.getImagens());
            produtoToSave.setImagens(imagens);

            Categoria categoria = categoriaService.buscarCategoria(produtoInput.getCategoria());
            produtoToSave.setCategoria(categoria);

            Cidade cidade = cidadeService.buscarCidadeById(produtoInput.getCidade());
            produtoToSave.setCidade(cidade);

            ProdutoOutput produtoOutput = produtoAssembler.toOutput(produtoService.atualizaProduto(idProduto,
                    produtoToSave));

            return ResponseEntity.status(HttpStatus.OK).body(produtoOutput);
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

    @GetMapping("/listarPorCategoria")
    public ResponseEntity<List<ProdutoOutput>> listarPorCategoria(@RequestParam("categoria") Long idCategoria) {
        Categoria categoria = categoriaService.buscarCategoria(idCategoria);
        List<Produto> produtosEntitys = produtoService.listarByCategoria(categoria);
        List<ProdutoOutput> produtoOutputs = produtoAssembler.toCollectionOutput(produtosEntitys);
        return ResponseEntity.ok(produtoOutputs);
    }

    @GetMapping("/listarPorCidade")
    public List<ProdutoOutput> listarPorCidade(@RequestParam("cidade") Long idCidade) {
        Cidade cidade = cidadeService.buscarCidadeById(idCidade);
        List<Produto> produtosEntitys = produtoService.listarByCidade(cidade);
        List<ProdutoOutput> produtoOutputs = produtoAssembler.toCollectionOutput(produtosEntitys);
        return produtoOutputs;
    }

    @GetMapping("/listarPorCidadeEDatas/{idCidade}")
    public ResponseEntity<List<ProdutoOutput>> listarPorCidadeAndDatas(@PathVariable Long idCidade,
                        @RequestParam("dateStart") LocalDate dateStart, @RequestParam("dateEnd") LocalDate dateEnd) {
        List<Produto> produtosReservados = produtoService.listarByCidadeAndDates(idCidade, dateStart, dateEnd);
        List<ProdutoOutput> produtoOutputs = produtoAssembler.toCollectionOutput(produtosReservados);
        return ResponseEntity.ok(produtoOutputs);
    }

    @DeleteMapping("/{idProduto}")
    public ResponseEntity<Void> deletar(@PathVariable Long idProduto) {
        produtoService.excluirProduto(idProduto);
        return ResponseEntity.noContent().build();
    }
}
