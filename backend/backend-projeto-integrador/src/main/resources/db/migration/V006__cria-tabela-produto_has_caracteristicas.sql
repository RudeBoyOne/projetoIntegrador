CREATE TABLE `produto_has_caracteristicas` (
  `produto_id` bigint NOT NULL,
  `caracteristica_id` bigint NOT NULL,
  CONSTRAINT `fk_produto_has_caracteristicas` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`),
  CONSTRAINT `fk_caracteristica` FOREIGN KEY (`caracteristica_id`) REFERENCES `caracteristica` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci