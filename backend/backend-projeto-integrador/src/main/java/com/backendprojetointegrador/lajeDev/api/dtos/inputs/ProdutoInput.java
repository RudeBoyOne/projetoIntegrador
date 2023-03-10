package com.backendprojetointegrador.lajeDev.api.dtos.inputs;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProdutoInput {

    private String nome;
    private String descricao;
    private List<Long> caracteristicas;
    private List<ImagemInput> imagens;
    private Long categoria;
    private Long cidade;
}
