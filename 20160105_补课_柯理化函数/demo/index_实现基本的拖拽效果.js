var winW = document.documentElement.clientWidth || document.body.clientWidth, winH = document.documentElement.clientHeight || document.body.clientHeight;
var oDiv1 = document.getElementById("div1");

on(oDiv1, "mousedown", down);

function down(e) {
    this["strX"] = e.clientX;
    this["strY"] = e.clientY;
    this["strT"] = this.offsetTop;
    this["strL"] = this.offsetLeft;
    if (this.setCapture) {
        this.setCapture();
        on(this, "mousemove", move);
        on(this, "mouseup", up);
        return;
    }
    this.moveFn = processThis(this, move);
    this.upFn = processThis(this, up);
    on(document, "mousemove", this.moveFn);
    on(document, "mouseup", this.upFn);
}

function move(e) {
    var curL = this["strL"] + (e.clientX - this["strX"]);
    var curT = this["strT"] + (e.clientY - this["strY"]);
    //拖拽时候的边界判断
    if (curL >= (winW - this.offsetWidth)) {
        this.style.left = winW - this.offsetWidth + "px";
    } else if (curL <= 0) {
        this.style.left = 0;
    } else {
        this.style.left = curL + "px";
    }
    if (curT >= (winH - this.offsetHeight)) {
        this.style.top = winH - this.offsetHeight + "px";
    } else if (curT <= 0) {
        this.style.top = 0;
    } else {
        this.style.top = curT + "px";
    }

}

function up(e) {
    if (this.releaseCapture) {
        this.releaseCapture();
        off(this, "mousemove", move);
        off(this, "mouseup", up);
        return;
    }
    off(document, "mousemove", this.moveFn);
    off(document, "mouseup", this.upFn);
}

// grag
function drag(obj) {

      obj.onmousedown = function(ev) {
          var ev = ev || event;

          console.log('offsetX', ev.offsetX)
          console.log('offsetY', ev.offsetY)

          console.log('offsetLeft ', this.offsetLeft)
          console.log('offsetTop', this.offsetTop)

          // var disX = ev.clientX - this.offsetLeft;
          // var disY = ev.clientY - this.offsetTop;

          var disX = ev.offsetX;
          var disY = ev.offsetY;

          var offsetWidth = this.offsetWidth

          if ( obj.setCapture ) {
              obj.setCapture();
          }

          document.onmousemove = function(ev) {
              var ev = ev || event;

              obj.style.left = ev.clientX - disX + 'px';
              obj.style.top = ev.clientY - disY + 'px';

              if (ev.clientX - disX < 0) {
                obj.style.left = 0
              }

              if (ev.clientY - disY < 0) {
                obj.style.top = 0
              }

              if (ev.clientX - disX + offsetWidth > window.innerWidth) {
                obj.style.left = window.innerWidth - offsetWidth
              }
          }

          document.onmouseup = function() {
              document.onmousemove = document.onmouseup = null;
              //释放全局捕获 releaseCapture();
              if ( obj.releaseCapture ) {
                  obj.releaseCapture();
              }
          }

          return false;

      }



