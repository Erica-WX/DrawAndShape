var canvas = document.getElementById("canvas");
canvas.width = 850;
canvas.height = 400;
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
    cxt.strokeStyle="black";
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
    cxt.strokeStyle="black";
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
            console.log(data)
            var x = pointList[0];
            var y = pointList[1];
            /*   console.log("x:"+x+"  y:"+y);*/
            var result = data.split(",");
            var len = result.length;
            var shape = result[len-1];
            write_shape(x,y,shape);
            shape_str = shape_str + shape +",";

            result.pop();
            var curls = [];
            for(var i=0;i<result.length;i++){
                var num = parseFloat(result[i]);
                curls.push(num);
            }

            console.log("shape:"+shape);
            if(shape==="CIRCLE"){
                drawCircle(curls);
            }else{
                drawShape(curls);
            }

        },
        error: function(){
            alert("error");
        }
    })
}

function drawShape(curls) {
    console.log("curls:"+curls);

    cxt.moveTo(curls[0],curls[1]);
    for(var j=1;j<curls.length/2;j++){
        cxt.lineTo(curls[j*2],curls[j*2+1]);
    }
    cxt.lineTo(curls[0],curls[1]);
    cxt.strokeStyle="#45a0ee";
    cxt.stroke();
    cxt.beginPath();

}

function drawCircle(curls){

    console.log("draw circle");

    var x1 = curls[0];
    var y1 = curls[1];
    var x2 = curls[4];
    var y2 = curls[5];
    var x3 = curls[8];
    var y3 = curls[9];

    var e = 2 * (x2 - x1);
    var f = 2 * (y2 - y1);
    var g = x2*x2 - x1*x1 + y2*y2 - y1*y1;
    var a = 2 * (x3 - x2);
    var b = 2 * (y3 - y2);
    var c = x3*x3 - x2*x2 + y3*y3 - y2*y2;
    var X = (g*b - c*f) / (e*b - a*f);
    var Y = (a*g - c*e) / (a*f - b*e);
    var R = Math.sqrt((X-x1)*(X-x1)+(Y-y1)*(Y-y1));

    console.log("x:"+X+"   y:"+Y +"   R:"+R);
    cxt.beginPath();
    cxt.strokeStyle="#45a0ee";
    cxt.arc(X,Y,R,0,2*Math.PI,true);
    /*cxt.closePath();*/
    cxt.stroke();
    cxt.beginPath();
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
                if(data==="true"){
                    var txt=  "保存成功！";
                    window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.success);
                }
            },
            error: function(){
                alert("error");
            }
        })
    }
}
