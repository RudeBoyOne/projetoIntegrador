CREATE TABLE `reserva` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `data_final_da_reserva` date NOT NULL,
  `data_inicial_da_reserva` date NOT NULL,
  `hora_de_inicio_da_reserva` time NOT NULL,
  `cliente_id` bigint NOT NULL,
  `produto_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `fk_produto_reserva` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`)
);