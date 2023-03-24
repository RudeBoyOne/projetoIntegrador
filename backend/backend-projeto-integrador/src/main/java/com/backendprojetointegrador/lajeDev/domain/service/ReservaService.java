package com.backendprojetointegrador.lajeDev.domain.service;

import com.backendprojetointegrador.lajeDev.domain.exception.RecursoJaExistenteException;
import com.backendprojetointegrador.lajeDev.domain.model.Produto;
import com.backendprojetointegrador.lajeDev.domain.model.Reserva;
import com.backendprojetointegrador.lajeDev.domain.repository.IReservaRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@AllArgsConstructor
@Service
public class ReservaService {

    private final IReservaRepository reservaRepository;

    public Reserva criarReserva(Reserva reserva) {
        Boolean reservaExiste = reservaRepository.findByProduto(reserva.getProduto())
                .stream().anyMatch(reserva1 -> reserva1.equals(reserva));

        if(reservaExiste) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            throw new RecursoJaExistenteException("Produto: " + reserva.getProduto().getNome().toUpperCase()
                    + " já reservado no período: Data inicial " +
                    reserva.getDataInicialDaReserva().format(formatter) +  " - Data final " +
                    reserva.getDataFinalDaReserva().format(formatter) + ". Tente novamente em outro período!");
        }

        return reservaRepository.save(reserva);
    }

    public List<Reserva> listarReservasPorProduto(Produto produto) {
        return reservaRepository.findByProduto(produto);
    }


    public List<Reserva> listarReservas() {
        return reservaRepository.findAll();
    }
}
