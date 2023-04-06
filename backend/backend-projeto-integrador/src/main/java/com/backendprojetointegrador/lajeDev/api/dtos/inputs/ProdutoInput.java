package com.backendprojetointegrador.lajeDev.api.dtos.inputs;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProdutoInput {

    @NotBlank
    private String nome;
    @NotBlank
    private String descricao;
    @NotBlank
    private String vin;
    @NotEmpty
    private List<Long> caracteristicas;
    @Valid
    private List<ImagemInput> imagens;
    @NotNull
    private Long categoria;
    @NotNull
    private Long cidade;
}
