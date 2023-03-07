package com.backendprojetointegrador.lajeDev.api.dtos.outputs;

import com.backendprojetointegrador.lajeDev.domain.model.Imagem;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ProdutoOutput {

    private Long id;
    private String nome;
    private String descricao;
    private List<ImagemOutput> imagens;
    private CategoriaOutput categoria;
    private CidadeOutput cidade;
}
