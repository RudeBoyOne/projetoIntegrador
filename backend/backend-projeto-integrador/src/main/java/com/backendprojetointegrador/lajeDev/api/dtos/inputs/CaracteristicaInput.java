package com.backendprojetointegrador.lajeDev.api.dtos.inputs;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CaracteristicaInput {

    @NotBlank
    private String nome;
    @NotBlank
    private String icone;
}
