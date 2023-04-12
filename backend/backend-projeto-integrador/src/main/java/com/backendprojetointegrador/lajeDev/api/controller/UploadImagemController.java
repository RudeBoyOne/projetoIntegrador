package com.backendprojetointegrador.lajeDev.api.controller;

import com.backendprojetointegrador.lajeDev.api.assembler.ImagemAssembler;
import com.backendprojetointegrador.lajeDev.api.dtos.inputs.ImagemInput;
import com.backendprojetointegrador.lajeDev.domain.service.imagem.ImagemService;
import com.backendprojetointegrador.lajeDev.domain.service.imagem.UploadImagemResult;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/upload")
public class UploadImagemController {

    private final ImagemService imagemService;
    private final ImagemAssembler imagemAssembler;

    @PostMapping("/imagens")
    public UploadImagemResult uploadImagens(@RequestBody @Valid ImagemInput imagem) {
        return this.imagemService.generateUploadUrl(imagem.toDomain());
    }
}
