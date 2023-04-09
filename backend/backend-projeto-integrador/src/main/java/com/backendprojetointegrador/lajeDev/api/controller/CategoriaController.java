package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.assembler.CategoriaAssembler;
import com.backendprojetointegrador.lajeDev.api.dtos.inputs.CategoriaInput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.CategoriaOutput;
import com.backendprojetointegrador.lajeDev.domain.model.Categoria;
import com.backendprojetointegrador.lajeDev.domain.service.CategoriaService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    CategoriaService categoriaService;
    CategoriaAssembler categoriaAssembler;

    @PostMapping
    public ResponseEntity<CategoriaOutput> criar(@RequestBody @Valid CategoriaInput categoria) {
        Categoria categoriaToSave = categoriaAssembler.toEntity(categoria);
        CategoriaOutput categoriaOutput = categoriaAssembler.toOutput(categoriaService.criarCategoria(categoriaToSave));
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaOutput);
    }

    @PutMapping("/{idCategoria}")
    public ResponseEntity<CategoriaOutput> atualizar(@PathVariable Long idCategoria,
                                                     @RequestBody @Valid CategoriaInput categoriaInput) {
        Categoria categoriaToUpdate = categoriaAssembler.toEntity(categoriaInput);
        CategoriaOutput categoriaOutput = categoriaAssembler
                .toOutput(categoriaService.atualizarCategoria(idCategoria, categoriaToUpdate));
        return ResponseEntity.ok(categoriaOutput);
    }

    @GetMapping
    public List<CategoriaOutput> listar() {
        List<Categoria> categoriasEntity = categoriaService.listarCategorias();
        List<CategoriaOutput> categoriaOutputs = categoriaAssembler.toCollectionOutput(categoriasEntity);
        return categoriaOutputs;
    }

    @GetMapping("/{idCategoria}")
    public ResponseEntity<CategoriaOutput> buscarById(@PathVariable Long idCategoria) {
        Categoria categoriaEntity = categoriaService.buscarCategoria(idCategoria);
        CategoriaOutput categoriaOutput = categoriaAssembler.toOutput(categoriaEntity);
        return ResponseEntity.ok(categoriaOutput);
    }

    @DeleteMapping("/{idCategoria}")
    public ResponseEntity<Void> deletar(@PathVariable Long idCategoria) {
        categoriaService.excluirCategoria(idCategoria);
        return ResponseEntity.noContent().build();
    }

}
