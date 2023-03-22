package com.backendprojetointegrador.lajeDev.domain.repository;

import com.backendprojetointegrador.lajeDev.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}
