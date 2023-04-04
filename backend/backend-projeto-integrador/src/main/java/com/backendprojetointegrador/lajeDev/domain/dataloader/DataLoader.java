package com.backendprojetointegrador.lajeDev.domain.dataloader;

import com.backendprojetointegrador.lajeDev.domain.model.Usuario;
import com.backendprojetointegrador.lajeDev.domain.repository.IRoleRepository;
import com.backendprojetointegrador.lajeDev.domain.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@AllArgsConstructor
@Component
public class DataLoader implements ApplicationRunner {

    private final IRoleRepository roleRepository;
    private final UsuarioService usuarioService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Usuario usuarioAdminToSave = new Usuario();
        usuarioAdminToSave.setSenha("vamosTentando13");
        usuarioAdminToSave.setEmail("admin@admin.com");
        usuarioAdminToSave.setNome("Juriscreudo");
        usuarioAdminToSave.setSobrenome("da Silva");
        usuarioAdminToSave.setRoles(List.of(roleRepository.findAll().get(0)));
        usuarioService.criarUsuario(usuarioAdminToSave);
    }
}

