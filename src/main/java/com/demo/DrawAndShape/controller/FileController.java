package com.demo.DrawAndShape.controller;

import com.demo.DrawAndShape.service.FileBL;
import com.demo.DrawAndShape.service.FileImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class FileController {

    FileBL fileBL = new FileImpl();

    @PostMapping("/file_save")
    @ResponseBody
    public boolean save(@RequestParam("curls[]") List<String> curls, int length, String shapeStr){
        System.out.println(curls);
        System.out.println("length:"+length);
        System.out.println(shapeStr);
        boolean result = fileBL.save(curls,length,shapeStr);
        return result;
    }

    @PostMapping("/file_getNames")
    public ArrayList<String> getAllFiles(){
        return fileBL.getAllFiles();
    }

    @PostMapping("/file_read")
    public ArrayList<String> read(String filename){
        return fileBL.get(filename);
    }
}
