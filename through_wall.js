(function () {

    function cal(y,x) {//根据鼠标进入盒子的坐标,计算遮罩层应该从盒子的哪条边进来/出去
        var deg = Math.atan2(y,x)*180/Math.PI;
        var z = deg +180;
        var c = Math.round(z/90)%4;
        return c;
    }


    function fn(box) {
        var mask = box.getElementsByClassName('pic')[0];
        box.onmouseenter =function (e) {
            e = e || window.event;
            var x = e.pageX - box.offsetLeft - box.offsetWidth/2;
            var y = box.offsetHeight/2 +box.offsetTop - e.pageY;
            var res = cal(y,x);//当鼠标进入盒子的时候,需要把盒子的遮罩层瞬间定位到要进入的那条边长
            switch (res){
                //定位后 准备就绪
                case 0:
                    mask.style.left = -100 +'px';
                    mask.style.top = 0;
                    break;
                case 1:
                    mask.style.left =0;
                    mask.style.top=100+'px';
                    break;
                case 2:
                    mask.style.left = 100+'px';
                    mask.style.top = 0;
                    break;
                case 3:
                    mask.style.left = 0;
                    mask.style.top = -100 +'px';
                    break;

            }
            $(mask).stop().animate({left:0,top:0});//之后遮罩层进入到0,0位置(就是刚刚好遮住盒子)

        };
        box.onmouseleave = function (e) {
            e = e || window.event;
            var x = e.pageX - box.offsetLeft -box.offsetWidth/2;
            var y = box.offsetHeight/2+box.offsetTop-e.pageY;
            var res = cal(y,x); //根据鼠标离开盒子的坐标计算出遮罩层要从哪条边离开
            var target = null;
            switch (res){ //获取遮罩层要离开盒子最终停留的坐标
                case 0:
                    target={
                        left:-150,
                        top:0
                    };
                    break;
                case 1:
                    target={
                        left:0,
                        top:150
                    };
                    break;
                case 2:
                    target={
                        left:150,
                        top:0
                    };
                    break;
                case 3:
                    target={
                        left:0,
                        top:-150
                    };
                    break;
            }
            $(mask).stop().animate(target); //之后离开
        }
    }

    window.fn = fn;
})();
