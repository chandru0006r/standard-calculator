package com.trustedchain.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping({"/", "/api/hello"})
    public String hello() {
        return "Hello, Trust-Ed-Chain!";
        }
}
