package com.backendprojetointegrador.lajeDev.api.dtos.outputs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImagemOutput {

    private Long id;
    private String titulo;
    private String url;
    private Long produto;
}
