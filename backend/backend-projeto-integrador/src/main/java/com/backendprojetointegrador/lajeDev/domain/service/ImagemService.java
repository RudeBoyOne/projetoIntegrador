package com.backendprojetointegrador.lajeDev.domain.service;

import com.backendprojetointegrador.lajeDev.api.dtos.inputs.ImagemInput;
import com.backendprojetointegrador.lajeDev.api.dtos.outputs.ImagemOutput;
import com.backendprojetointegrador.lajeDev.domain.model.Imagem;
import com.backendprojetointegrador.lajeDev.domain.model.Produto;
import com.backendprojetointegrador.lajeDev.domain.repository.IImagemRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ImagemService {

    private IImagemRepository imagemRepository;

    public List<ImagemOutput> criaImagens(List<ImagemInput> imagensInput, Produto produto) {
        List<ImagemOutput> imagensOutput = imagensInput.stream().map(imagemInput -> {
            Imagem imagemEntity = new Imagem();
            BeanUtils.copyProperties(imagemInput, imagemEntity);
            //imagemEntity.setProduto(produto);
            ImagemOutput imagemOutput = new ImagemOutput();
            BeanUtils.copyProperties(imagemRepository.save(imagemEntity), imagemOutput);
            //imagemOutput.setProduto(imagemEntity.getProduto().getId());
            return imagemOutput;
        }).collect(Collectors.toList());

        return imagensOutput;
    }

    public List<ImagemOutput> listarImagernsParaProdutos(List<Imagem> imagens) {
        List<ImagemOutput> imagensOutput = imagens.stream().map(imagem -> {
            ImagemOutput imagemOutput = new ImagemOutput();
            BeanUtils.copyProperties(imagemRepository.findById(imagem.getId()).get(), imagemOutput);
            //imagemOutput.setProduto(imagem.getProduto().getId());
            return imagemOutput;
        }).collect(Collectors.toList());
        return imagensOutput;
    }


}
