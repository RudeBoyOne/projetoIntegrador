package com.backendprojetointegrador.lajeDev.api.dtos.inputs;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ReservaInput {

    private LocalTime horaDeInicioDaReserva;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataInicialDaReserva;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataFinalDaReserva;
    private Long usuario;
    private Long produto;
}
