package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.dtos.inputs.CategoriaInput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.CategoriaOutput;
import com.backendprojetointegrador.lajeDev.domain.model.Categoria;
import com.backendprojetointegrador.lajeDev.domain.service.CategoriaService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    CategoriaService categoriaService;


    @PostMapping
    public ResponseEntity<CategoriaOutput> criar(@RequestBody CategoriaInput categoria) {
        Categoria categoriaToSave = new Categoria();
        BeanUtils.copyProperties(categoria, categoriaToSave);
        CategoriaOutput categoriaOutput = new CategoriaOutput();
        BeanUtils.copyProperties(categoriaService.criarCategoria(categoriaToSave), categoriaOutput);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaOutput);
    }

    @PutMapping("/{idCategoria}")
    public ResponseEntity<CategoriaOutput> atualizar(@PathVariable Long idCategoria, @RequestBody CategoriaInput categoria) {
        if (categoriaService.existeCategoriaById(idCategoria)) {
            Categoria categoriaToUpdate = categoriaService.buscarCategoriaById(idCategoria);
            BeanUtils.copyProperties(categoria, categoriaToUpdate, "id");
            CategoriaOutput categoriaOutput = new CategoriaOutput();
            BeanUtils.copyProperties(categoriaService.criarCategoria(categoriaToUpdate), categoriaOutput);
            return ResponseEntity.ok(categoriaOutput);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<CategoriaOutput> listar() {
        return categoriaService.listarCategoria().stream().map(categoria -> {
            CategoriaOutput categoriaOutput = new CategoriaOutput();
            BeanUtils.copyProperties(categoria, categoriaOutput);
            return categoriaOutput;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{idCategoria}")
    public ResponseEntity<CategoriaOutput> buscarById(@PathVariable Long idCategoria) {
        if (categoriaService.existeCategoriaById(idCategoria)) {
            CategoriaOutput categoriaOutput = new CategoriaOutput();
            BeanUtils.copyProperties(categoriaService.buscarCategoriaById(idCategoria), categoriaOutput);
            return ResponseEntity.ok(categoriaOutput);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{idCategoria}")
    public ResponseEntity<Void> deletar(@PathVariable Long idCategoria) {
        if (categoriaService.existeCategoriaById(idCategoria)) {
            categoriaService.excluirCategoria(idCategoria);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
