package com.idb.laauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LaauthApplication {

	public static void main(String[] args) {
		SpringApplication.run(LaauthApplication.class, args);
	}

}
