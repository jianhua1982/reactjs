DROP TABLE IF EXISTS `tbl_qa_question`;
CREATE TABLE `tbl_bbl_mer_device` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `virtual_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `client_version` int(11) NOT NULL,
  `os_name` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `os_version` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `device_resolution` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `device_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `device_model` varchar(64) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `language` varchar(8) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `user_id` bigint(12) DEFAULT NULL,
  `last_use_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `rec_st` char(1) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '1',
  `rec_crt_ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `rec_upd_ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `remark` varchar(512) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_nibw_device_a1` (`virtual_id`),
  KEY `idx_nibw_device_i1` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11409 DEFAULT CHARSET=utf8;
