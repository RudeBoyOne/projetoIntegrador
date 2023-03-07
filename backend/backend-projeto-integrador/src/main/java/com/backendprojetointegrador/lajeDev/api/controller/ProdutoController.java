package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.dtos.inputs.ProdutoInput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.CategoriaOutput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.CidadeOutput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.ImagemOutput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.ProdutoOutput;
import com.backendprojetointegrador.lajeDev.domain.model.*;
import com.backendprojetointegrador.lajeDev.domain.repository.ICaracteristicasRepository;
import com.backendprojetointegrador.lajeDev.domain.repository.IImagemRepository;
import com.backendprojetointegrador.lajeDev.domain.service.CategoriaService;
import com.backendprojetointegrador.lajeDev.domain.service.CidadeService;
import com.backendprojetointegrador.lajeDev.domain.service.ImagemService;
import com.backendprojetointegrador.lajeDev.domain.service.ProdutoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;
    private final ICaracteristicasRepository caracteristicasRepository;
    private final ImagemService imagemService;
    private final CategoriaService categoriaService;
    private final CidadeService cidadeService;

    @PostMapping
    public ResponseEntity<ProdutoOutput> criar(@RequestBody ProdutoInput produto) {
        Produto produtoToSave = new Produto();
        BeanUtils.copyProperties(produto, produtoToSave);

/*        List<Caracteristica> caracteristicas = produto.getCaracteristicas().stream()
                .map((idCaracteristica) -> {
                    Caracteristica caracteristica = new Caracteristica();
                    BeanUtils.copyProperties(caracteristicasRepository.findById(idCaracteristica).get(), caracteristica);
                    return caracteristica;
                }).collect(Collectors.toList());
        produtoToSave.setCaracteristicas(caracteristicas);*/


        Categoria categoria = categoriaService.buscarCategoriaById(produto.getCategoria());
        produtoToSave.setCategoria(categoria);

        Cidade cidade = cidadeService.buscarCidadeById(produto.getCidade());
        produtoToSave.setCidade(cidade);

        Produto produtoJaSalvo = produtoService.criarProduto(produtoToSave);

        ProdutoOutput produtoOutput = new ProdutoOutput();
        BeanUtils.copyProperties(produtoJaSalvo, produtoOutput);

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
}
