package com.backendprojetointegrador.lajeDev.domain.service.security;

import com.backendprojetointegrador.lajeDev.domain.repository.IUsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UsuarioDetailsServiceImpl implements UserDetailsService {

    private final IUsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(email).get();
    }
}
