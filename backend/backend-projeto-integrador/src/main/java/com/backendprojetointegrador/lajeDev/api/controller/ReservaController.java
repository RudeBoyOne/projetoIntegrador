package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.assembler.ReservaAssembler;
import com.backendprojetointegrador.lajeDev.api.dtos.inputs.ReservaInput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.ReservaOutput;
import com.backendprojetointegrador.lajeDev.domain.model.Cliente;
import com.backendprojetointegrador.lajeDev.domain.model.Produto;
import com.backendprojetointegrador.lajeDev.domain.model.Reserva;
import com.backendprojetointegrador.lajeDev.domain.service.ProdutoService;
import com.backendprojetointegrador.lajeDev.domain.service.ReservaService;
import com.backendprojetointegrador.lajeDev.domain.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/reservas")
public class ReservaController {

    private final ReservaService reservaService;
    private final ReservaAssembler reservaAssembler;
    private final UsuarioService usuarioService;
    private final ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<ReservaOutput> criar(@RequestBody ReservaInput reserva) {
        Reserva reservaToSave = reservaAssembler.toEntity(reserva);

        Cliente cliente = (Cliente) usuarioService.buscarUsuario(reserva.getCliente());
        reservaToSave.setCliente(cliente);

        Produto produto = produtoService.buscarProduto(reserva.getProduto());
        reservaToSave.setProduto(produto);

        ReservaOutput reservaOutput = reservaAssembler.toOutput(reservaService.criarReserva(reservaToSave));

        return ResponseEntity.status(HttpStatus.CREATED).body(reservaOutput);
    }

    @GetMapping
    public List<ReservaOutput> listar() {
        return reservaAssembler.toCollectionOutput(reservaService.listarReservas());
    }

    @GetMapping("/listarPorProduto/{idProduto}")
    public ResponseEntity<List<ReservaOutput>> listarPorProduto(@PathVariable Long idProduto) {
        Produto produto = produtoService.buscarProduto(idProduto);
        List<Reserva> reservasEntity = reservaService.listarReservasPorProduto(produto);
        List<ReservaOutput> reservasOutputs = reservaAssembler.toCollectionOutput(reservasEntity);
        return ResponseEntity.ok(reservasOutputs);
    }

    @GetMapping("/listarPorCliente/{idCliente}")
    public ResponseEntity<List<ReservaOutput>> listarPorCliente(@PathVariable Long idCliente) {
        Cliente cliente = (Cliente) usuarioService.buscarUsuario(idCliente);
        List<Reserva> reservasEntity = reservaService.listarReservasPorCliente(cliente);
        List<ReservaOutput> reservaOutputs = reservaAssembler.toCollectionOutput(reservasEntity);
        return ResponseEntity.ok(reservaOutputs);
    }
}
