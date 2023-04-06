package com.backendprojetointegrador.lajeDev.api.dtos.inputs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Login {

    @Email
    private String email;
    @NotBlank
    private String senha;
}
