import { Component, OnInit,ViewChild,Input,ElementRef,AfterViewInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-createdataset',
  templateUrl: './createdataset.component.html',
  styleUrls: ['./createdataset.component.css']
})


export class CreatedatasetComponent implements AfterViewInit {
  // constructor(){}
  // ngOnInit():void{}
  classes=['Sun','Flower','Umbrella','Pencil','Spoon','Tree','Spectacles','House','Bird','Hand'];
  width: any = {};
  height: any = {};
  classname: string ="";
  image="";
  constructor(private http: HttpClient){}
  @ViewChild('mycanvas') public canvasel?:ElementRef ;
  private ctx?: any;
  ngAfterViewInit():void{
    const canvas =this.canvasel?.nativeElement;
    // const canvas=document.getElementById('mycanvas');
    const ctx = canvas.getContext("2d");
    this.ctx=ctx;
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);


    let painting = false;
    function startposition(e:any){
        painting=true;
        draw(e);
    }
    function finishedposition(){
        painting=false;
        ctx.beginPath();
    }
    function draw(e:any){
        let rect=canvas.getBoundingClientRect();
        let x=e.clientX- rect.left;
        let y=e.clientY- rect.top;
        if (!painting) return;
        ctx.lineWidth = 7;
        ctx.lineCap="round";
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

    }
    canvas.addEventListener("mousedown",startposition);
    canvas.addEventListener("mouseup",finishedposition);
    canvas.addEventListener("mousemove",draw);
    
    
  }
  getclass(classname:string){
    this.classname = classname;
    console.log(classname);
  }
  // getImg(img:string){
  //   this.image = img;
  //   console.log('image='+img);
  // }


  clearcanvas(){
    this.ctx.clearRect(0,0,384,384);  
    
  }



  saveImage(){
    if(this.classname.length == 0){
      console.log("Not Updated!");
      alert("No class selected");
      return;
    }
    var canvas: HTMLCanvasElement = this.canvasel?.nativeElement;
    var date = Date.now();
    var filename = this.classname +'_' + date + '.png';
    var image = canvas.toDataURL("image/png");
    this.http.post(
      environment.SERVER_URL + '/upload_canvas',
      {filename, image, classname: this.classname},
      {responseType:'text'}).subscribe((res:any)=>{
        console.log(res, this.classname)
        this.clearcanvas();
      })  
  }
  
  

  

  
  

  
  
  
  
  
  
  
  

}























































































































































