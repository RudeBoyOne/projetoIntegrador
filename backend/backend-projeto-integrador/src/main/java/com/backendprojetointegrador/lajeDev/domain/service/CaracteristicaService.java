package com.backendprojetointegrador.lajeDev.domain.service;

import com.backendprojetointegrador.lajeDev.api.dtos.outputs.CaracteristicaOutput;
import com.backendprojetointegrador.lajeDev.domain.exception.EntidadeNaoEncontrada;
import com.backendprojetointegrador.lajeDev.domain.exception.RecursoJaExistenteException;
import com.backendprojetointegrador.lajeDev.domain.model.Caracteristica;
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

    public Caracteristica criarCaracteristica(Caracteristica caracteristica) {
        boolean caracteristicaExiste = caracteristicasRepository.findByNome(caracteristica.getNome()).stream()
                .anyMatch(caracteristicaExistente -> !caracteristicaExistente.equals(caracteristica));

        if (caracteristicaExiste) {
            throw new RecursoJaExistenteException("Característica com o nome " + caracteristica.getNome() +
                    " já existe. Tente novamente!");
        }

        return caracteristicasRepository.save(caracteristica);
    }

    public List<Caracteristica> listarCaracteristicas() {
        return caracteristicasRepository.findAll();
    }

    public Caracteristica buscarCaracteristica(Long idCaracteristica) {
        return caracteristicasRepository.findById(idCaracteristica)
                .orElseThrow(() -> new EntidadeNaoEncontrada("Caracteristica de id: " + idCaracteristica +
                        " não encontrada ou inexistente!"));
    }

    public void excluirCaracteristica(Long idCaracteristica) {
        caracteristicasRepository.deleteById(idCaracteristica);
    }

    public boolean existeCaracteristica(Long idCaracteristica) {
        return caracteristicasRepository.existsById(idCaracteristica);
    }

    public List<Caracteristica> listarDeterminandasCaracteristicasLong(List<Long> idCaracteristicas){
        List<Caracteristica> caracteristicas = idCaracteristicas.stream()
                .map((idCaracteristica) -> {
                    Caracteristica caracteristica = new Caracteristica();
                    BeanUtils.copyProperties(caracteristicasRepository.findById(idCaracteristica).get(), caracteristica);
                    return caracteristica;
                }).collect(Collectors.toList());

        return caracteristicas;
    }


    public List<Caracteristica> listarDeterminandasCaracteristicasEntity(List<Caracteristica> caracteristicas) {
        List<Caracteristica> caracteristicasReturn = caracteristicas.stream()
                .map((caracteristica) -> {
                    Caracteristica caracteristicaEntity = new Caracteristica();
                    BeanUtils.copyProperties(caracteristicasRepository.findById(caracteristica.getId()).get(), caracteristicaEntity);
                    return caracteristicaEntity;
                }).collect(Collectors.toList());
        return caracteristicasReturn;
    }

    // aqui temporariamente
    public List<CaracteristicaOutput> listarDeterminadasCaracteristicasOutputOne(List<Long> idCaracterisiticas) {
        List<CaracteristicaOutput> caracteristicaOutputs = listarDeterminandasCaracteristicasLong(idCaracterisiticas).stream()
                .map(caracteristica -> {
                    CaracteristicaOutput caracteristicaOutput = new CaracteristicaOutput();
                    BeanUtils.copyProperties(buscarCaracteristica(caracteristica.getId()),
                            caracteristicaOutput);
                    return caracteristicaOutput;
                }).collect(Collectors.toList());
        return caracteristicaOutputs;
    }

    public List<CaracteristicaOutput> listarDeterminadasCaracteristicasOutputTwo(List<Caracteristica> caracterisiticas) {
        List<CaracteristicaOutput> caracteristicaOutputs = listarDeterminandasCaracteristicasEntity(caracterisiticas).stream()
                .map(caracteristica -> {
                    CaracteristicaOutput caracteristicaOutput = new CaracteristicaOutput();
                    BeanUtils.copyProperties(buscarCaracteristica(caracteristica.getId()),
                            caracteristicaOutput);
                    return caracteristicaOutput;
                }).collect(Collectors.toList());
        return caracteristicaOutputs;
    }
}