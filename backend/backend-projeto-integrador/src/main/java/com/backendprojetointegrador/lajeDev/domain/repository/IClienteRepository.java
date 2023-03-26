package com.backendprojetointegrador.lajeDev.domain.repository;

import com.backendprojetointegrador.lajeDev.domain.model.Cliente;
import com.backendprojetointegrador.lajeDev.domain.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional
public interface IClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Usuario> findByEmail(String email);
}
