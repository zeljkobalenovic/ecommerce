package com.luv2code.ecommerce.config;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        
        // zabranjene metode (dozvoljavam samo GET - tj. backend je read-only)
        HttpMethod [] unsuportHttpMethods = {HttpMethod.DELETE,HttpMethod.POST,HttpMethod.PUT};
        // za Product (za pristup pojedinacnom productu i kolekciji producata)
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata ,httpMethods)->httpMethods.disable(unsuportHttpMethods))
                .withCollectionExposure((metdata,httpMethods)->httpMethods.disable(unsuportHttpMethods));
        // za ProductCategory isto kao product
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata ,httpMethods)->httpMethods.disable(unsuportHttpMethods))
                .withCollectionExposure((metdata,httpMethods)->httpMethods.disable(unsuportHttpMethods)); 
        // za prikaz id ( po defaultu ne prikazuje )  
        // ako ima puno entityja moze automatski
        // https://www.udemy.com/course/full-stack-angular-spring-boot-tutorial/learn/lecture/17820044#overview      
        config.exposeIdsFor(Product.class,ProductCategory.class);
    }
    
}