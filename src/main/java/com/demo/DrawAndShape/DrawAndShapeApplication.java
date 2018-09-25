package com.demo.DrawAndShape;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class DrawAndShapeApplication {
    public static void main(String[] args) {
        SpringApplication.run(DrawAndShapeApplication.class, args);
    }
}
