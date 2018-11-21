onmessage= function (event) {
  var datas=event.data.imgData.data;
    console.log(new Date().getTime());

    for(var i=0;i<datas.length;i+=4){
        datas[i]=255-datas[i];
        datas[i+1]=255-datas[i+1];
        datas[i+2]=255-datas[i+2];
    }

    /*为了看到延迟*/
    for(var j=0,sum=0;j<100;j++){
        for(var n=0;n<100000000;n++){
            sum+=n;
        }
    }
    console.log(sum);
    postMessage(event.data.imgData);
    console.log(new Date().getTime());


};


