var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 450;
var cxt = canvas.getContext("2d");

var flag  =  false;
var x_curl  =  0; // 鼠标开始移动的位置X
var y_curl  =  0; // 鼠标开始移动的位置Y
var i  =  2;
var pointList  =  [];
var curlArray=[];
var shape_list = [];
var shape_str = "";

function draw(){

    canvas.style.cursor = "crosshair";

    //为画布增加监听事件
    canvas.addEventListener("mousedown",mouseDownCurl);
    canvas.addEventListener("mousemove",mouseMoveCurl);
    canvas.addEventListener("mouseup",mouseUpCurl);

}

function drawCurls(){
   /* console.log("in drawCurls")*/
    deleteCurl();
    curlArray = JSON.parse(localStorage.curlLocal);
    shape_list = JSON.parse(localStorage.shapeLocal);
    shape_str = localStorage.shape_str;

   /* console.log("curlArray:"+curlArray);
    console.log("length:"+curlArray.length);*/

    for(var i=0;i<curlArray.length;i++){
        cxt.moveTo(curlArray[i][0],curlArray[i][1]);
        for(var j=2;j<curlArray[i].length-1;j=j+2){
            cxt.lineTo(curlArray[i][j],curlArray[i][j+1]);
        }
        cxt.stroke();
        cxt.beginPath();

        var x = curlArray[i][0];
        var y = curlArray[i][1];
        write_shape(x,y,shape_list[i]);
    }

}

function deleteCurl(){
    cxt.clearRect(0,0,canvas.width,canvas.height);//清空
    curlArray = [];
    shape_str = "";
}

function drawPencil(e){
    if(flag){
        cxt.lineTo(e.offsetX,e.offsetY);
        /* cxt.strokeStyle=colorArray[index2];*/
        cxt.stroke(); // 调用绘制方法
        if(Math.abs(e.offsetX-pointList[i-2])>2&&Math.abs(e.offsetY-pointList[i-1])>2){
            pointList[i]  =  e.offsetX;
            pointList[i+1]  =  e.offsetY;
            i  =  i + 2;
        }
        /* console.log("pointList:"+pointList);*/
    }else{
        cxt.beginPath();
    }
}

function mouseDownCurl(e) {
    /*deleteCurl();*/
    x_curl  =  e.offsetX; // 鼠标落下时的X
    y_curl  =  e.offsetY; // 鼠标落下时的Y
    pointList[0]=x_curl;
    pointList[1]=y_curl;
    flag  =  true;
}

function mouseMoveCurl(e) {
    drawPencil(e);
}

function mouseUpCurl() {

    flag  =  false;
    test();
    //Store the curl to Array
    var tmp = pointList;
    // curlArray[index2]=tmp;
    curlArray.push(tmp);
    pointList=[];
    i=2;
    /*console.log("curlArray:"+curlArray);*/
    console.log("length:"+curlArray.length);

}

function test() {
    /*console.log("pointList:"+pointList);*/
    $.ajax({
        async:false,
        type:"POST",
        url: "http://127.0.0.1:8091/shape_test",
        data:{
            curls:pointList
        },
        dataType: "text",
        contentType: "application/x-www-form-urlencoded",
        success:function (data){
            /*alert(data);*/
            var x = pointList[0];
            var y = pointList[1];
            /*   console.log("x:"+x+"  y:"+y);*/

            write_shape(x,y,data);
            shape_str = shape_str + data +",";

        },
        error: function(){
            alert("error");
        }
    })
}

function write_shape(x,y,data) {
    cxt.font="bold 20px DejaVu Sans Mono";  //font 属性使用的语法与 CSS font 属性相同。
    cxt.strokeStyle="#ee7148";
    cxt.strokeText(data,x,y-10,100);
    cxt.strokeStyle="black";
}

function save() {
    if(curlArray.length===0){
        alert("无内容可以保存！");
    }else{
        var curlList = [];
        for(var i=0;i<curlArray.length;i++){
            var str = "";
            for(var j=0;j<curlArray[i].length;j++){
                if(j<curlArray[i].length-1){
                    str = str+curlArray[i][j]+",";
                }else{
                    str = str+curlArray[i][j];
                }
            }
            curlList.push(str);
        }// end for

        $.ajax({
            async:false,
            type:"POST",
            url: "http://127.0.0.1:8091/file_save",
            data:{
                curls:curlList,
                length:curlArray.length,
                shapeStr:shape_str
            },
            dataType: "text",
            contentType: "application/x-www-form-urlencoded",
            success:function (data){
                console.log("data in save:"+data);
            },
            error: function(){
                alert("error");
            }
        })
    }
}
