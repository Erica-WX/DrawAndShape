package com.demo.DrawAndShape.controller;

import com.demo.DrawAndShape.service.ShapeBL;
import com.demo.DrawAndShape.service.ShapeImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ShapeController {
    ShapeBL shape = new ShapeImpl();

    @PostMapping("/shape_test")
    @ResponseBody
    public String draw(@RequestParam("curls[]") int[] curls){

        String result = shape.dector(curls);

        return result;
    }

}
