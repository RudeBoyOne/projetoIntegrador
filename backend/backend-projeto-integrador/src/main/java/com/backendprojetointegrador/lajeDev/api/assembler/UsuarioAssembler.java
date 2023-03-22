package com.backendprojetointegrador.lajeDev.api.assembler;

import com.backendprojetointegrador.lajeDev.api.dtos.inputs.UsuarioInput;
import com.backendprojetointegrador.lajeDev.domain.model.Usuario;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UsuarioAssembler {

    private final ModelMapper modelMapper;

    public Usuario toEntity(UsuarioInput usuarioInput) {
        return modelMapper.map(usuarioInput, Usuario.class);
    }
}
