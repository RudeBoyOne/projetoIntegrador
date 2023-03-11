package com.backendprojetointegrador.lajeDev.domain.service;

import com.backendprojetointegrador.lajeDev.api.assembler.ImagemAssembler;
import com.backendprojetointegrador.lajeDev.api.dtos.inputs.ImagemInput;
import com.backendprojetointegrador.lajeDev.domain.model.Imagem;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ImagemService {

    public List<Imagem> criaObjetosImagens(List<ImagemInput> imagensInput, ImagemAssembler imagemAssembler) {
        List<Imagem> imagens = imagensInput.stream().map(imagemInput -> {
            Imagem imagemEntity = imagemAssembler.toEntity(imagemInput);
            return imagemEntity;
        }).collect(Collectors.toList());

        return imagens;
    }

}
