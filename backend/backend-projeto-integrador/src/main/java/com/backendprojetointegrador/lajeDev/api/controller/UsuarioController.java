package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.assembler.UsuarioAssembler;
import com.backendprojetointegrador.lajeDev.api.dtos.inputs.RolesInput;
import com.backendprojetointegrador.lajeDev.api.dtos.inputs.UsuarioInput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.UsuarioOutput;
import com.backendprojetointegrador.lajeDev.domain.model.Usuario;
import com.backendprojetointegrador.lajeDev.domain.repository.IRoleRepository;
import com.backendprojetointegrador.lajeDev.domain.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final IRoleRepository roleRepository;
    private final UsuarioAssembler usuarioAssembler;

    @PostMapping
    public ResponseEntity<String> cria(@RequestBody @Valid UsuarioInput usuarioInput) {
        Usuario usuarioEntity = usuarioAssembler.toEntity(usuarioInput);

        Boolean criouUsuario = usuarioService.criarUsuario(usuarioEntity);

        return criouUsuario ?
                ResponseEntity.badRequest().body("Usuário com e-mail " + usuarioInput.getEmail() + " já existe.") :
                ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("{idUsuario}")
    public ResponseEntity<String> adicionarRolesUsuario(@PathVariable Long idUsuario,
                                                          @RequestBody @Valid RolesInput rolesInput) {
        Optional<Usuario> usuarioOptional = usuarioService.buscarUsuario(idUsuario);
        if (usuarioOptional.isPresent()) {
            Usuario usuarioEntity = usuarioOptional.get();

            usuarioEntity.setId(idUsuario);

            rolesInput.getRoles().forEach(idRole -> {
                usuarioEntity.getRoles().add(roleRepository.findById(idRole).get());
            });

            usuarioService.criarUsuario(usuarioEntity);

            return ResponseEntity.ok().build();
        }

        return ResponseEntity.badRequest().body("Usuário com id: " + idUsuario + " não existe!");
    }

    @GetMapping
    public ResponseEntity<List<UsuarioOutput>> listar() {
        List<UsuarioOutput> usuarioOutputs = usuarioAssembler
                .toCollectionOutput(usuarioService.listarTodosUsuarios());
        return ResponseEntity.ok(usuarioOutputs);
    }

    @DeleteMapping("{idUsuario}")
    public ResponseEntity<Void> deletar(@PathVariable Long idUsuario) {
        usuarioService.excluirUsuario(idUsuario);
        return ResponseEntity.noContent().build();
    }

}
