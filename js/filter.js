
function Filter(effect,data,ctx) {
    // 全部图像数据
    this.allimgData=data;
    // 图像数据数组
    this.datas=data.data;
    if(typeof effect=='string'){
        return this[effect](this.datas,ctx);
    }else{
        return this[effect.type](effect,this.datas,ctx);
    }
};


/**
 * 反色 负片
 * @param datas
 * @param ctx
 */
Filter.prototype.inverse=function (datas,ctx) {
    for(var i=0;i<datas.length;i+=4){
        datas[i]=255-datas[i];
        datas[i+1]=255-datas[i+1];
        datas[i+2]=255-datas[i+2];
    }
    ctx.putImageData(this.allimgData,0,0);
};
/**
 * 灰度
 * @param datas
 * @param ctx
 */
Filter.prototype.gray = function (datas,ctx) {
    for (var i = 0; i < datas.length; i++) {
        var r = datas[i*4+0];
        var g = datas[i*4+1];
        var b = datas[i*4+2];
    var grey = r*0.3+g*0.59+b*0.11;
    datas[i*4+0] = grey;
    datas[i*4+1] = grey;
    datas[i*4+2] = grey;
    };


    ctx.putImageData(this.allimgData,0,0);

}

/**
 * 黑白
 * @param datas
 * @param ctx
 */
Filter.prototype.black= function (datas,ctx) {
    for(var i=0;i<datas.length;i+=4){
        var r = datas[i+0],
        g = datas[i+1],
        b = datas[i+2],
        pv,gray;
        grey = r*0.3+g*0.59+b*0.11;
        if(grey > 125){
            pv = 255;
        }
        else{
            pv = 0;
        }
        datas[i] = pv;
        datas[i+1] = pv;
        datas[i+2] = pv;
    }
    ctx.putImageData(this.allimgData,0,0);
}
/**
 * 带透明度
 * @param obj |num:0（透明）-255（不透明）|type:滤镜类型。
 * @param datas
 * @param ctx
 */
Filter.prototype.opacity= function (obj,datas,ctx) {
    for(var i=3;i<datas.length;i+=4){
        datas[i]=obj.num;
    }
    ctx.putImageData(this.allimgData,0,0);

}

/**
 * 带模糊
 * @param obj |num:模糊程度0~ |type:滤镜类型
 * @param datas
 * @param ctx
 */
Filter.prototype.blur= function (obj,datas,ctx) {

    var blurR = obj.num;
    var totalnum = (2*blurR + 1)*(2*blurR + 1);
    for( var i = blurR ; i < ctx.canvas.height ; i ++ ){
        for( var j = blurR ; j < ctx.canvas.width ; j ++ ){
            var totalr = 0 , totalg = 0 , totalb = 0;
            for( var dx = -blurR ; dx <= blurR ; dx ++ )
                for( var dy = -blurR ; dy <= blurR ; dy ++ ){
                    var x = i + dx;
                    var y = j + dy;
                    var p = x*ctx.canvas.width + y;
                    totalr += datas[p*4+0];
                    totalg += datas[p*4+1];
                    totalb += datas[p*4+2];
                }

            var p = i*ctx.canvas.width + j;
            datas[p*4+0] = totalr / totalnum;
            datas[p*4+1] = totalg / totalnum;
            datas[p*4+2] = totalb / totalnum;
        }
        }
    ctx.putImageData(this.allimgData,0,0);


};


/**
 * 像素化
 * @param obj |num:像素个数,这个数值必须为图片 width*height/num*num 无余数效果最好，否则有黑边 |type:滤镜类型
 * @param datas
 * @param ctx
 */

Filter.prototype.pixel= function (obj,datas,ctx) {
    var size = obj.num;
    var totalnum = size*size;
    for( var i = 0 ; i < ctx.canvas.height ; i += size )
        for( var j = 0 ; j < ctx.canvas.width ; j += size ){

            var totalr = 0 , totalg = 0 , totalb = 0;
            for( var dx = 0 ; dx < size ; dx ++ )
                for( var dy = 0 ; dy < size ; dy ++ ){

                    var x = i + dx;
                    var y = j + dy;

                    var p = x*ctx.canvas.width + y;
                    totalr += datas[p*4+0];
                    totalg += datas[p*4+1];
                    totalb += datas[p*4+2];
                }

            var p = i*ctx.canvas.width+j;
            var resr = totalr / totalnum;
            var resg = totalg / totalnum;
            var resb = totalb / totalnum;

            for( var dx = 0 ; dx < size ; dx ++ )
                for( var dy = 0 ; dy < size ; dy ++ ){

                    var x = i + dx;
                    var y = j + dy;

                    var p = x*ctx.canvas.width + y;
                    datas[p*4+0] = resr;
                    datas[p*4+1] = resg;
                    datas[p*4+2] = resb;
                }
        }
    ctx.putImageData(this.allimgData,0,0);
}










