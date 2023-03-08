CREATE TABLE `categoria` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL,
  `qualificacao` varchar(60) NOT NULL,
  `url_imagem` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);