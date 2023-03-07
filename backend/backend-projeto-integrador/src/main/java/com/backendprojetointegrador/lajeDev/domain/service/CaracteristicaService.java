package com.backendprojetointegrador.lajeDev.domain.service;

import com.backendprojetointegrador.lajeDev.api.dtos.outputs.CaracteristicaOutput;
import com.backendprojetointegrador.lajeDev.domain.model.Caracteristica;
import com.backendprojetointegrador.lajeDev.domain.model.Produto;
import com.backendprojetointegrador.lajeDev.domain.repository.ICaracteristicasRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class CaracteristicaService {

    private final ICaracteristicasRepository caracteristicasRepository;

    public List<Caracteristica> listarDeterminandasCaracteristicas(List<Long> idCaracteristicas){
        List<Caracteristica> caracteristicas = idCaracteristicas.stream()
                .map((idCaracteristica) -> {
                    Caracteristica caracteristica = new Caracteristica();
                    BeanUtils.copyProperties(caracteristicasRepository.findById(idCaracteristica).get(), caracteristica);
                    return caracteristica;
                }).collect(Collectors.toList());

        return caracteristicas;
    }

    public Caracteristica buscarCaracteristica(Long idCaracateristica) {
        return caracteristicasRepository.findById(idCaracateristica).get();
    }

    // aqui temporariamente
    public List<CaracteristicaOutput> listarDeterminadasCaracteristicasOutput(List<Long> idCaracterisiticas) {
        List<CaracteristicaOutput> caracteristicaOutputs = listarDeterminandasCaracteristicas(idCaracterisiticas).stream()
                .map(caracteristica -> {
                    CaracteristicaOutput caracteristicaOutput = new CaracteristicaOutput();
                    BeanUtils.copyProperties(buscarCaracteristica(caracteristica.getId()),
                            caracteristicaOutput);
                    return caracteristicaOutput;
                }).collect(Collectors.toList());
        return caracteristicaOutputs;
    }
}