CREATE TABLE `produto` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `categoria_id` bigint NOT NULL,
  `cidade_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_cidade` FOREIGN KEY (`cidade_id`) REFERENCES `cidade` (`id`),
  CONSTRAINT `fk_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci