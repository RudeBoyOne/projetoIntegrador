package com.backendprojetointegrador.lajeDev.domain.repository;

import com.backendprojetointegrador.lajeDev.domain.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ICategoriasRepository extends JpaRepository<Categoria, Long> {

}
