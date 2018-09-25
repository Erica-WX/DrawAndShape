package com.demo.DrawAndShape.service;

import com.demo.DrawAndShape.util.IOHelper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FileImpl implements FileBL {
    @Override
    public boolean save(List<String> curls, int length, String shapeStr){
        if(length == 1){
            String str = "";
            for(int i=0;i<curls.size();i++){
                str = str + curls.get(i) + ",";
            }
            while(curls.size()!=0){
                curls.remove(0);
            }
            curls.add(str);
        }

        String txtName = IOHelper.createTXT();
        for(int i=0;i<curls.size();i++){
            IOHelper.writeTXT(txtName,curls.get(i));
        }
        IOHelper.writeTXT(txtName,shapeStr);

        return true;
    }

    @Override
    public ArrayList<String> get(String filename) {
        String path = "data\\"+filename;
        ArrayList<String> content = IOHelper.readTXT(path);
        return content;
    }

    @Override
    public ArrayList<String> getAllFiles() {
        ArrayList<String> fileNameList = new ArrayList<>();
        File file = new File("data");
        File[] tempList = file.listFiles();
        System.out.println("num:"+tempList.length);
        for(File f:tempList){
            String name = "";
            name = f.getName();
            fileNameList.add(name);
        }

        System.out.println("fileNameList:"+fileNameList);
        return fileNameList;
    }
}
