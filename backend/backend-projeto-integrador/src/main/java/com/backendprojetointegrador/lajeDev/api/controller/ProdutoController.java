package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.dtos.inputs.ProdutoInput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.*;
import com.backendprojetointegrador.lajeDev.domain.model.Categoria;
import com.backendprojetointegrador.lajeDev.domain.model.Cidade;
import com.backendprojetointegrador.lajeDev.domain.model.Produto;
import com.backendprojetointegrador.lajeDev.domain.service.*;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;
    private final CaracteristicaService caracteristicaService;
    private final ImagemService imagemService;
    private final CategoriaService categoriaService;
    private final CidadeService cidadeService;

    @PostMapping
    public ResponseEntity<ProdutoOutput> criar(@RequestBody ProdutoInput produto) {
        Produto produtoToSave = new Produto();
        BeanUtils.copyProperties(produto, produtoToSave);

        produtoToSave.setCaracteristicas(caracteristicaService.
                listarDeterminandasCaracteristicasLong(produto.getCaracteristicas()));

        Categoria categoria = categoriaService.buscarCategoria(produto.getCategoria());
        produtoToSave.setCategoria(categoria);

        Cidade cidade = cidadeService.buscarCidadeById(produto.getCidade());
        produtoToSave.setCidade(cidade);

        Produto produtoJaSalvo = produtoService.criarProduto(produtoToSave);

        ProdutoOutput produtoOutput = new ProdutoOutput();
        BeanUtils.copyProperties(produtoJaSalvo, produtoOutput);

        List<CaracteristicaOutput> caracteristicaOutputs = caracteristicaService
                .listarDeterminadasCaracteristicasOutputOne(produto.getCaracteristicas());
        produtoOutput.setCaracteristicas(caracteristicaOutputs);

        List<ImagemOutput> imagens = imagemService.criaImagens(produto.getImagens(), produtoJaSalvo);
        produtoOutput.setImagens(imagens);

        CategoriaOutput categoriaOutput = new CategoriaOutput();
        BeanUtils.copyProperties(categoria, categoriaOutput);
        produtoOutput.setCategoria(categoriaOutput);

        CidadeOutput cidadeOutput = new CidadeOutput();
        BeanUtils.copyProperties(cidade, cidadeOutput);
        produtoOutput.setCidade(cidadeOutput);

        return ResponseEntity.status(HttpStatus.CREATED).body(produtoOutput);
    }

    @GetMapping
    public List<ProdutoOutput> listar() {
        return produtoService.listarProduto().stream()
                .map(produto -> {
                    ProdutoOutput produtoOutput = new ProdutoOutput();
                    BeanUtils.copyProperties(produto, produtoOutput);
                    List<CaracteristicaOutput> caracteristicaOutputs = caracteristicaService
                            .listarDeterminadasCaracteristicasOutputTwo(produto.getCaracteristicas());
                    produtoOutput.setCaracteristicas(caracteristicaOutputs);

                    List<ImagemOutput> imagens = imagemService.listarImagernsParaProdutos(produto.getImagens());
                    produtoOutput.setImagens(imagens);

                    Categoria categoria = categoriaService.buscarCategoria(produto.getCategoria().getId());

                    Cidade cidade = cidadeService.buscarCidadeById(produto.getCidade().getId());

                    CategoriaOutput categoriaOutput = new CategoriaOutput();
                    BeanUtils.copyProperties(categoria, categoriaOutput);
                    produtoOutput.setCategoria(categoriaOutput);

                    CidadeOutput cidadeOutput = new CidadeOutput();
                    BeanUtils.copyProperties(cidade, cidadeOutput);
                    produtoOutput.setCidade(cidadeOutput);
                    return produtoOutput;
                }).collect(Collectors.toList());
    }

    @GetMapping("/{idProduto}")
    public ProdutoOutput buscar(@PathVariable Long idProduto) {
        ProdutoOutput produtoOutput = new ProdutoOutput();
        Produto produto = produtoService.buscarProdutoById(idProduto);
        BeanUtils.copyProperties(produto, produtoOutput);

        List<CaracteristicaOutput> caracteristicaOutputs = caracteristicaService
                .listarDeterminadasCaracteristicasOutputTwo(produto.getCaracteristicas());
        produtoOutput.setCaracteristicas(caracteristicaOutputs);

        List<ImagemOutput> imagens = imagemService.listarImagernsParaProdutos(produto.getImagens());
        produtoOutput.setImagens(imagens);

        Categoria categoria = categoriaService.buscarCategoria(produto.getCategoria().getId());

        Cidade cidade = cidadeService.buscarCidadeById(produto.getCidade().getId());

        CategoriaOutput categoriaOutput = new CategoriaOutput();
        BeanUtils.copyProperties(categoria, categoriaOutput);
        produtoOutput.setCategoria(categoriaOutput);

        CidadeOutput cidadeOutput = new CidadeOutput();
        BeanUtils.copyProperties(cidade, cidadeOutput);
        produtoOutput.setCidade(cidadeOutput);

        return produtoOutput;
    }
}
