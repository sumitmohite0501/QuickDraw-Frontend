window.addEventListener("load",() => {
    const canvas = document.querySelector("#mycanvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle="white";
    ctx.fillRect(0,0,
        canvas.width,canvas.height);


    let painting = false;
    function startposition(e){
        painting=true;
        draw(e);
    }
    function finishedposition(){
        painting=false;
        ctx.beginPath();
    }
    function draw(e){
        let rect=canvas.getBoundingClientRect();
        let x=e.clientX- rect.left;
        let y=e.clientY- rect.top;
        if (!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap="round";
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

    }
    canvas.addEventListener("mousedown",startposition);
    canvas.addEventListener("mouseup",finishedposition);
    canvas.addEventListener("mousemove",draw);
});