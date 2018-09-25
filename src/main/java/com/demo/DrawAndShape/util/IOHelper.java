package com.demo.DrawAndShape.util;

import java.io.*;
import java.util.ArrayList;

public class IOHelper {

    private static final String NEW_LINE = System.getProperty("line.separator");

    public static String createTXT(){

        File file = new File("data");
        File[] tempList = file.listFiles();
        System.out.println("num:"+tempList.length);

        int num = tempList.length;
        num += 1;
        String filename = "data\\"+num;
        File newTxt = new File(filename);
        if(!newTxt.exists()){
            try {
                newTxt.createNewFile();
                return filename;

            } catch (IOException e) {
                System.out.println("文件创建失败！"+e);
                return "";
            }
        }else {
            num -= 1;
            return "data\\"+num;
        }
    }

    public static boolean writeTXT(String filename, String content){

        try {
            FileWriter fw = new FileWriter(filename,true);
            fw.write(content+NEW_LINE);
            fw.close();
            return true;
        } catch (IOException e) {
            System.out.println("文件写入失败！"+e);
            return false;
        }
    }

    public static ArrayList<String> readTXT(String filename){
        ArrayList<String> content = new ArrayList<>();
        File file = new File(filename);
        try{
            InputStreamReader reader = new InputStreamReader(new FileInputStream(file), "UTF-8");
            BufferedReader br = new BufferedReader(reader);
            String s = "";
            while((s = br.readLine()) != null){
                content.add(s);
            }

        }catch (IOException e){
            System.out.println("文件读取失败！"+e);
        }

        return content;
    }
}
