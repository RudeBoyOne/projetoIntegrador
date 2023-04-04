package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.assembler.RoleAssembler;
import com.backendprojetointegrador.lajeDev.api.dtos.inputs.Login;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.LoginOutput;
import com.backendprojetointegrador.lajeDev.domain.model.Usuario;
import com.backendprojetointegrador.lajeDev.domain.service.security.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/login")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final RoleAssembler roleAssembler;
    private final TokenService tokenService;

    @PostMapping
    public ResponseEntity<LoginOutput> login(@RequestBody Login login) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(login.getEmail(), login.getSenha());

        Authentication authentication = authenticationManager
                .authenticate(usernamePasswordAuthenticationToken);

        Usuario usuario = (Usuario) authentication.getPrincipal();

        LoginOutput loginOutput = new LoginOutput();
        loginOutput.setId(usuario.getId());
        loginOutput.setNomeESobrenome(usuario.getNome() + " " + usuario.getSobrenome());
        loginOutput.setEmail(usuario.getEmail());
        loginOutput.setRoles(roleAssembler.toCollectionOutput(usuario.getRoles()));
        loginOutput.setToken(tokenService.generateToken(usuario));

        return ResponseEntity.ok(loginOutput);
    }
}
