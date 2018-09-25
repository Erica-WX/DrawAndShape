package com.demo.DrawAndShape;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MyWebAppConfigurer extends WebMvcConfigurerAdapter{
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        System.out.println("in addResourceHandlers");

        registry.addResourceHandler("/image/**").addResourceLocations("file:D:/image/");
        super.addResourceHandlers(registry);
    }
}
