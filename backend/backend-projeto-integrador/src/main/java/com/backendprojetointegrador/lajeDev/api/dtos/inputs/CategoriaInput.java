package com.backendprojetointegrador.lajeDev.api.dtos.inputs;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoriaInput {

    @NotBlank
    private String qualificacao;
    @NotBlank
    private String descricao;
    @NotBlank
    private String urlImagem;
}
