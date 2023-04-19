package com.cryptex.cryptexspringtrader.controllers;

import jakarta.annotation.Resource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

public class PicturesController {
    @GetMapping("/images/{imageName}")
    @ResponseBody
    public Resource getImage(@PathVariable String imageName) {
        return (Resource) new ClassPathResource("static/images/" + imageName);
    }
}


