package com.backendprojetointegrador.lajeDev.domain.service;

import com.backendprojetointegrador.lajeDev.common.PasswordEncoder;
import com.backendprojetointegrador.lajeDev.domain.exception.RecursoNaoEncontrado;
import com.backendprojetointegrador.lajeDev.domain.model.Cliente;
import com.backendprojetointegrador.lajeDev.domain.model.Usuario;
import com.backendprojetointegrador.lajeDev.domain.repository.IClienteRepository;
import com.backendprojetointegrador.lajeDev.domain.repository.IUsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UsuarioService {

    private final IUsuarioRepository usuarioRepository;
    private final IClienteRepository clienteRepository;

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

    public Boolean criarUsuarioCliente(Cliente cliente) {
        boolean usuarioExiste = clienteRepository.findByEmail(cliente.getEmail()).stream()
                .anyMatch((usuarioExistente) -> !usuarioExistente.equals(cliente));

        if (!usuarioExiste) {
            BCryptPasswordEncoder bCrypt = passwordEncoder.bCryptPasswordEncoder();
            cliente.setSenha(bCrypt.encode(cliente.getSenha()));
            clienteRepository.save(cliente);
            return usuarioExiste;
        }

        return usuarioExiste;
    }

    public Usuario buscarUsuario(Long idUsuario) {
        return usuarioRepository.findById(idUsuario).get();
    }

    public void excluirUsuario(Long idUsuario) {
        if (!usuarioRepository.existsById(idUsuario)) {
            throw new RecursoNaoEncontrado("Usuário com o id " + idUsuario + " não existe!");
        }

        usuarioRepository.deleteById(idUsuario);
    }
}
