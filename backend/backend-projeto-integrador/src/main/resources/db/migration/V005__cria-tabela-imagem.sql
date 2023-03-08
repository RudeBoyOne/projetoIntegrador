CREATE TABLE `imagem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titulo` varchar(60) NOT NULL,
  `url` varchar(255) NOT NULL,
  `produto_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_produto` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`)
);