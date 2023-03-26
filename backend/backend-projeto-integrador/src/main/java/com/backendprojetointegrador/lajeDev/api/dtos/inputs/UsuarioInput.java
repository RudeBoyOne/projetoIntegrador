package com.backendprojetointegrador.lajeDev.api.dtos.inputs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioInput {

    private String nome;
    private String sobrenome;
    private String email;
    private String senha;
}
