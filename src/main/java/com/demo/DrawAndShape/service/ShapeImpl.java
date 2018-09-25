package com.demo.DrawAndShape.service;

import com.demo.DrawAndShape.util.IOHelper;
import org.opencv.core.*;
import org.opencv.imgproc.Imgproc;
import java.util.*;

public class ShapeImpl implements ShapeBL {

    /*public static void main(String args[]){
        ShapeImpl test = new ShapeImpl();
        int curls[] = {214,170,209,178,200,183,193,187,183,194,169,211,163,220,158,225,152,233,147,239,141,245,133,255,129,261,132,258,153,255,265,252,279,249,272,244,265,239,260,233,254,229,248,221,244,214,241,211,234,205,229,200,224,194,221,188,218,182,212,179};
        test.dector(curls);
    }*/

    @Override
    public String dector(int[] curls){
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        System.out.println("Welcome to OpenCV " + Core.VERSION);

        List<Point> points1 = new ArrayList<>();

        for(int i=0;i<curls.length/2;i++){
            Point point = new Point(curls[i*2],curls[i*2+1]);
            points1.add(point);
        }

        MatOfPoint mp = new MatOfPoint();
        mp.fromList(points1);

        //Point
        MatOfPoint2f mp2f = new MatOfPoint2f();
        mp2f.fromList(points1);

        double peri;
        peri = Imgproc.arcLength(mp2f,true);
        //对图像轮廓点进行多边形拟合
        MatOfPoint2f polyShape = new MatOfPoint2f();
        Imgproc.approxPolyDP(mp2f,polyShape,0.04*peri,true);

        Point[] points = polyShape.toArray();
        String curl = "";
        for(Point p : points) {
            System.out.print("("+p.x+","+p.y+")  ");
            curl = curl + p.x + "," + p.y + ",";
        }
        System.out.println();

        int shapeLen = polyShape.toArray().length;
        //根据轮廓凸点拟合结果，判断属于那个形状
        switch (shapeLen){
            case 2:
                System.out.println("线段");
                return curl+"CURL";
            case 3:
                System.out.println("TRIANGLE");
                return curl+"TRIANGLE";
            case 4:
                Rect rect = Imgproc.boundingRect(mp);
                float width = rect.width;
                float height = rect.height;
                float ar = width/height;
                //计算宽高比，判断是矩形还是正方形
                if (ar>=0.95 && ar <=1.05) {
                    System.out.println("SQUARE");
                    return curl+"SQUARE";
                }else {
                    System.out.println("RECTANGLE");
                    return curl+"RECTANGLE";
                }
            case 5:
                System.out.println("PENTAGON");
                return curl+"PENTAGON";
            default:
                System.out.println("CIRCLE");
                return curl+"CIRCLE";
        }
    }

}
