package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.assembler.UsuarioAssembler;
import com.backendprojetointegrador.lajeDev.api.dtos.inputs.UsuarioInput;
import com.backendprojetointegrador.lajeDev.domain.model.Cliente;
import com.backendprojetointegrador.lajeDev.domain.model.Usuario;
import com.backendprojetointegrador.lajeDev.domain.repository.IClienteRepository;
import com.backendprojetointegrador.lajeDev.domain.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final UsuarioAssembler usuarioAssembler;
    private final IClienteRepository clienteRepository;

    @PostMapping
    public ResponseEntity<String> cria(@RequestBody UsuarioInput usuarioInput) {
        Usuario usuarioEntity = usuarioAssembler.toEntity(usuarioInput);

        Boolean criouUsuario = usuarioService.criarUsuario(usuarioEntity);

        return criouUsuario ? ResponseEntity.badRequest().body("Usuário com e-mail "
                                           + usuarioInput.getEmail() + " já existe. Tente novamente!") :
                ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/clientes")
    public ResponseEntity<String> criaCliente(@RequestBody UsuarioInput usuarioInput) {
        Cliente usuarioEntity = usuarioAssembler.toEntityCliente(usuarioInput);

        Boolean criouUsuario = usuarioService.criarUsuarioCliente(usuarioEntity);

        return criouUsuario ? ResponseEntity.badRequest().body("Usuário com e-mail "
                                           + usuarioInput.getEmail() + " já existe. Tente novamente!") :
                ResponseEntity.status(HttpStatus.CREATED).build();
    }


}
