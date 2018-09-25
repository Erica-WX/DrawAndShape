package com.demo.DrawAndShape.service;

import java.util.ArrayList;
import java.util.List;

public interface FileBL {

    public boolean save(List<String> curls, int length, String shapeStr);

    public ArrayList<String> get(String filename);

    public ArrayList<String> getAllFiles();

}
