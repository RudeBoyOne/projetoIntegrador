package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.dtos.inputs.CidadeInput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.CidadeOutput;
import com.backendprojetointegrador.lajeDev.domain.model.Cidade;
import com.backendprojetointegrador.lajeDev.domain.service.CidadeService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("/cidades")
public class CidadeController {

    private final CidadeService cidadeService;


    @PostMapping
    public ResponseEntity<CidadeOutput> criar(@RequestBody CidadeInput cidade) {
        Cidade cidadeToSave = new Cidade();
        BeanUtils.copyProperties(cidade, cidadeToSave);
        CidadeOutput cidadeOutput = new CidadeOutput();
        BeanUtils.copyProperties(cidadeService.criarCidade(cidadeToSave), cidadeOutput);
        return ResponseEntity.status(HttpStatus.CREATED).body(cidadeOutput);
    }

    @PutMapping("/{idCidade}")
    public ResponseEntity<CidadeOutput> atualizar(@PathVariable Long idCidade, @RequestBody CidadeInput cidade) {
        if(cidadeService.existeCidadeById(idCidade)){
            Cidade cidadeToUpdate = new Cidade();
            BeanUtils.copyProperties(cidade, cidadeToUpdate);
            cidadeToUpdate.setId(idCidade);
            CidadeOutput cidadeOutput = new CidadeOutput();
            BeanUtils.copyProperties(cidadeService.criarCidade(cidadeToUpdate), cidadeOutput);
            return ResponseEntity.ok(cidadeOutput);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<CidadeOutput> listar() {
        return cidadeService.listarCidade().stream().map(cidade -> {
            CidadeOutput cidadeOutput = new CidadeOutput();
            BeanUtils.copyProperties(cidade, cidadeOutput);
            return cidadeOutput;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{idCidade}")
    public ResponseEntity<CidadeOutput> buscarById(@PathVariable Long idCidade) {
        if (cidadeService.existeCidadeById(idCidade)){
            CidadeOutput cidadeOutput = new CidadeOutput();
            BeanUtils.copyProperties(cidadeService.buscarCidadeById(idCidade), cidadeOutput);
            return ResponseEntity.ok(cidadeOutput);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{idCidade}")
    public ResponseEntity<Void> deletar(@PathVariable Long idCidade) {
        if (cidadeService.existeCidadeById(idCidade)) {
            cidadeService.excluirCidadeById(idCidade);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
