package com.backendprojetointegrador.lajeDev.api.dtos.inputs;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImagemInput {

    @NotBlank
    private String titulo;
    @NotBlank
    private String url;
}
