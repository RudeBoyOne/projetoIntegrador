package com.backendprojetointegrador.lajeDev.api.dtos.inputs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Login {

    @Pattern(regexp = "[A-Za-z0-9_.-]+@([A-Za-z0-9_]+.)+[A-Za-z]{2,4}", message = "e-mail inválido. Tente novamente!")
    private String email;
    @NotBlank
    private String senha;
}
