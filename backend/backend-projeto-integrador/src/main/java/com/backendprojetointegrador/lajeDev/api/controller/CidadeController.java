package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.assembler.CidadeAssembler;
import com.backendprojetointegrador.lajeDev.api.dtos.inputs.CidadeInput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.CidadeOutput;
import com.backendprojetointegrador.lajeDev.domain.model.Cidade;
import com.backendprojetointegrador.lajeDev.domain.service.CidadeService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/cidades")
public class CidadeController {

    private final CidadeService cidadeService;
    private final CidadeAssembler cidadeAssembler;


    @PostMapping
    public ResponseEntity<CidadeOutput> criar(@RequestBody @Valid CidadeInput cidadeInput) {
        Cidade cidadeToSave = cidadeAssembler.toEntity(cidadeInput);
        CidadeOutput cidadeOutput = cidadeAssembler.toOutput(cidadeService.criarCidade(cidadeToSave));
        return ResponseEntity.status(HttpStatus.CREATED).body(cidadeOutput);
    }

    @PutMapping("/{idCidade}")
    public ResponseEntity<CidadeOutput> atualizar(@PathVariable Long idCidade,
                                                  @RequestBody @Valid CidadeInput cidadeInput) {
        Cidade cidadeEntity = cidadeAssembler.toEntity(cidadeInput);
        CidadeOutput cidadeOutput = cidadeAssembler.toOutput(cidadeService.atualizaCidade(idCidade, cidadeEntity));
        return ResponseEntity.ok(cidadeOutput);
    }

    @GetMapping
    public List<CidadeOutput> listar() {
       List<Cidade> cidadesEntitys = cidadeService.listarCidade();
       List<CidadeOutput> cidadesOutputs = cidadeAssembler.toCollectionOutput(cidadesEntitys);
        return cidadesOutputs;
    }

    @GetMapping("/{idCidade}")
    public ResponseEntity<CidadeOutput> buscarById(@PathVariable Long idCidade) {
        Cidade cidadeEntity = cidadeService.buscarCidadeById(idCidade);
        CidadeOutput cidadeOutput = cidadeAssembler.toOutput(cidadeEntity);
        return ResponseEntity.ok(cidadeOutput);
    }

    @DeleteMapping("/{idCidade}")
    public ResponseEntity<Void> deletar(@PathVariable Long idCidade) {
        cidadeService.excluirCidadeById(idCidade);
        return ResponseEntity.noContent().build();
    }
}
