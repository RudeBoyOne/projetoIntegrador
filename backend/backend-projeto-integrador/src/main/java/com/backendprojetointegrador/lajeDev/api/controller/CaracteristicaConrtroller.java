package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.assembler.CaracteristicaAssembler;
import com.backendprojetointegrador.lajeDev.api.dtos.inputs.CaracteristicaInput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.CaracteristicaOutput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.CategoriaOutput;
import com.backendprojetointegrador.lajeDev.domain.model.Caracteristica;
import com.backendprojetointegrador.lajeDev.domain.service.CaracteristicaService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicaConrtroller {

    private final CaracteristicaService caracteristicaService;
    private final CaracteristicaAssembler caracteristicaAssembler;

    @PostMapping
    public ResponseEntity<CaracteristicaOutput> criar(@RequestBody CaracteristicaInput caracteristicaInput) {
        Caracteristica caracteristicaToSave = caracteristicaAssembler.toEntity(caracteristicaInput);
        CaracteristicaOutput caracteristicaOutput = caracteristicaAssembler
                .toOutput(caracteristicaService.criarCaracteristica(caracteristicaToSave));
        return ResponseEntity.status(HttpStatus.CREATED).body(caracteristicaOutput);
    }

    @PutMapping("/{idCaracteristica}")
    public ResponseEntity<CaracteristicaOutput> atualizar(@PathVariable Long idCaracteristica,
                                                          @RequestBody CaracteristicaInput caracteristicaInput) {
        if(!caracteristicaService.existeCaracteristica(idCaracteristica)) {
            return ResponseEntity.notFound().build();
        }

        Caracteristica caracteristicaEntity = caracteristicaAssembler.toEntity(caracteristicaInput);
        caracteristicaEntity.setId(idCaracteristica);
        CaracteristicaOutput caracteristicaOutput = caracteristicaAssembler.toOutput(caracteristicaService
                .criarCaracteristica(caracteristicaEntity));

        return ResponseEntity.ok(caracteristicaOutput);
    }

    @GetMapping
    public List<CaracteristicaOutput> listar() {
        List<Caracteristica> caracteristicasEntity = caracteristicaService.listarCaracteristicas();
        List<CaracteristicaOutput> caracteristicaOutputs = caracteristicaAssembler
                .toCollectionOutput(caracteristicasEntity);
        return caracteristicaOutputs;
    }

    @GetMapping("/{idCaracteristica}")
    public ResponseEntity<CaracteristicaOutput> buscarById(@PathVariable Long idCaracteristica) {
        Caracteristica caracteristicaEntity = caracteristicaService.buscarCaracteristica(idCaracteristica);
        CaracteristicaOutput caracteristicaOutput = caracteristicaAssembler.toOutput(caracteristicaEntity);
        return ResponseEntity.ok(caracteristicaOutput);
    }

    @DeleteMapping("/{idCaracteristica}")
    public ResponseEntity<Void> deletar(@PathVariable Long idCaracteristica) {
        caracteristicaService.excluirCaracteristica(idCaracteristica);
        return ResponseEntity.noContent().build();
    }
}

