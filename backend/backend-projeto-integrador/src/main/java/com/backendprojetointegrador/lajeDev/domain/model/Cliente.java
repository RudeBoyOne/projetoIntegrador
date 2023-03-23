package com.backendprojetointegrador.lajeDev.domain.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity
@DiscriminatorValue("CLIENTE")
public class Cliente extends Usuario {
}
