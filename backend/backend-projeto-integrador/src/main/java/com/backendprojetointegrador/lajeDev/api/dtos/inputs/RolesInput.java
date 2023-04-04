package com.backendprojetointegrador.lajeDev.api.dtos.inputs;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RolesInput {

    private List<Long> roles;
}
