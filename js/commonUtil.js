var commonUtil={
    /**
     * 转为canvas坐标
     * @param x
     * @param y
     * @returns {{}}
     */
    toCanvasXY: function (x, y) {
        var obj = {};
        obj.x = x - canvas.getBoundingClientRect().left;
        obj.y = y - canvas.getBoundingClientRect().top;
        return obj;
    }
};