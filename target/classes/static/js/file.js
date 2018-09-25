function getAllFiles(){
    $.ajax({
        async:false,
        type:"POST",
        url: "http://127.0.0.1:8091/file_getNames",
        dataType: "text",
        contentType: "application/x-www-form-urlencoded",
        success:function (data){
            /*console.log("data in getAllFileNames:"+data);*/
            var nameList = JSON.parse(data)
            $("#getAll").empty();
            var p1 = "<li onclick='read(";
            var p2 = ")'><a>";
            var p3 = "</a></li>"
            for(var i=0;i<nameList.length;i++){
                $("#getAll").append(p1+nameList[i]+p2+nameList[i]+p3);
            }
            console.log("complete")
        },
        error: function(){
            alert("error");
        }
    })
}

function read(filename) {
    console.log("filename:"+filename);
    var content = [];
    var shape = [];
    var curlArray = [];
    $.ajax({
        async:false,
        type:"POST",
        url: "http://127.0.0.1:8091/file_read",
        data:{
            filename:filename
        },
        dataType: "text",
        contentType: "application/x-www-form-urlencoded",
        success:function (data){
           /* console.log("data in read:"+data);*/
            content = JSON.parse(data);
            var len = content.length;
            var shape_str = content[len-1];
            localStorage.shape_str = shape_str;
            shape = shape_str.split(",");
            for(var i=0;i<len-1;i++){
                var temp = content[i].split(",");
                curlArray.push(temp);
            }
            localStorage.shapeLocal = JSON.stringify(shape);
            localStorage.curlLocal = JSON.stringify(curlArray);
            drawCurls();
        },
        error: function(){
            alert("error");
        }
    })
}