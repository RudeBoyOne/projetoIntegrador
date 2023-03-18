package com.backendprojetointegrador.lajeDev.domain.service;

import com.backendprojetointegrador.lajeDev.common.PasswordEncoder;
import com.backendprojetointegrador.lajeDev.domain.model.Usuario;
import com.backendprojetointegrador.lajeDev.domain.repository.IUsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UsuarioService {

    private final IUsuarioRepository usuarioRepository;

    private PasswordEncoder passwordEncoder;

    public Boolean criarUsuario(Usuario usuario) {
        boolean usuarioExiste = usuarioRepository.findByEmail(usuario.getEmail()).stream()
                .anyMatch((usuarioExistente) -> !usuarioExistente.equals(usuario));

        if (!usuarioExiste) {
            BCryptPasswordEncoder bCrypt = passwordEncoder.bCryptPasswordEncoder();
            usuario.setSenha(bCrypt.encode(usuario.getSenha()));
            usuarioRepository.save(usuario);
            return usuarioExiste;
        }

        return usuarioExiste;
    }
}
