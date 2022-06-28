import Designer from 'react-designer-component';
import React,{useState,useEffect} from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import { HexColorPicker } from "react-colorful";
import ImageUploading from 'react-images-uploading';

import hexRgb from 'hex-rgb';
import shirtfront from "./shirtfront.png";
import shirtback from "./shirtback.png";
import selectedshirtfront from "./shirtfront.png";
import selectedshirtback from "./shirtback.png";
import shirtfrontred from "./shirtfrontred.png";
import shirtbackred from "./shirtbackred.png";
import shirtfrontblue from "./shirtfrontblue.png";
import shirtbackblue from "./shirtbackblue.png";
import shirtfrontpurple from "./shirtfrontpurple.png";
import shirtbackpurple from "./shirtbackpurple.png";
import shirtfrontgreen from "./shirtfrontgreen.png";
import shirtbackgreen from "./shirtbackgreen.png";
import shirtfrontyellow from "./shirtfrontyellow.png";
import shirtbackyellow from "./shirtbackyellow.png";
import shirtfrontorange from "./shirtfrontorange.png";
import shirtbackorange from "./shirtbackorange.png";

let green=false
let red=false
let blue=false
let orange=false
let yellow=false
let purple=false
let white=true

let angly=0
let addText=false
let textColor
let shirtFront=true
let shirtBack=false
let shirtfrontandorback=["front"]
let fontSize=12
let globalImages=[]
let selectedfront
let selectedback
let front
let back
let frontblue
let backblue
let frontred
let backred
let frontyellow
let backyellow
let frontgreen
let backgreen
let frontpurple
let backpurple
let frontorange
let backorange

function sketch(p5) {
  let text=[{text:"placeholder",textSize:12,textColor:"255, 204, 0",x:100,y:100,drawRect:false},
  {text:"placeholder",textSize:12,textColor:"255, 204, 0",x:100,y:300,drawRect:false}]
  let capslock=false
  let shift=false
  let clickingoffcanvas=false


  let swansea
  p5.preload = () => {
    p5.loadImage(shirtfront, imgg => {
      front = imgg;
    });
    p5.loadImage(shirtback, imgg => {
      back = imgg;
    });
    p5.loadImage(shirtfrontblue, imgg => {
      frontblue = imgg;
    });
    p5.loadImage(shirtbackblue, imgg => {
      backblue = imgg;
    });
    p5.loadImage(shirtfrontred, imgg => {
      frontred = imgg;
    });
    p5.loadImage(shirtbackred, imgg => {
      backred = imgg;
    });
    p5.loadImage(shirtfrontgreen, imgg => {
      frontgreen = imgg;
    });
    p5.loadImage(shirtbackgreen, imgg => {
      backgreen = imgg;
    });
    p5.loadImage(shirtfrontyellow, imgg => {
      frontyellow = imgg;
    });
    p5.loadImage(shirtbackyellow, imgg => {
      backyellow = imgg;
    });
    p5.loadImage(shirtfrontorange, imgg => {
      frontorange = imgg;
    });
    p5.loadImage(shirtbackorange, imgg => {
      backorange = imgg;
    });
    p5.loadImage(shirtfrontpurple, imgg => {
      frontpurple = imgg;
    });
    p5.loadImage(shirtbackpurple, imgg => {
      backpurple = imgg;
    });
    p5.loadImage(shirtfront, imgg => {
      selectedfront = imgg;
    });
    p5.loadImage(shirtback, imgg => {
      selectedback = imgg;
    });
    swansea = p5.loadFont('optima/OPTIMA.TTF');
  }

  p5.setup = () => {
    p5.createCanvas(600, 400, p5.CANVAS);
    p5.textSize(12);
    p5.textFont(swansea);
  }

  p5.updateWithProps = props => {
    console.log("props",props)
    for (let image of globalImages){
      image.width=300
      image.height=200
      image.x=150
      image.y=100
      image.image=p5.loadImage(image.data_url)
    }
    console.log(globalImages,"global images")
  };

  p5.mouseClicked= (event) => {
    console.log(event,"clicking",addText,"addtext");
    if(event.target.localName=="canvas"){
      clickingoffcanvas=false
      if(addText){
        let newText={text:"placeholder",textSize:Number(fontSize),textColor:textColor,x:event.offsetX,y:event.offsetY,drawRect:true}
        console.log(newText,"newText")
        text.push(newText)
      }
      for (let item of text){
        console.log(item)
        let boundaries = swansea.textBounds(item.text,item.x,item.y,item.textSize);
        console.log(boundaries,"boundaries")

        if((event.offsetX>item.x-boundaries.w*0.2&&event.offsetX<(item.x+boundaries.w*1.2))&&(event.offsetY>item.y-boundaries.h*0.2&&event.offsetY<(item.y+boundaries.h*1.2))){
          item.drawRect=true
        }else{
          item.drawRect=false
        }
      }
      for (let item of globalImages){
        console.log(item,"IMAGE")
        if((event.offsetX>item.x&&event.offsetX<(item.x+item.width))&&(event.offsetY>item.y&&event.offsetY<(item.y+item.height))){
          item.drawRect=true
        }else{
          item.drawRect=false
        }
      }
      if(shirtfrontandorback.length>1){
        if((event.offsetX>500&&event.offsetX<600)&&(event.offsetY>300&&event.offsetY<400)){
          shirtfrontandorback=shirtfrontandorback.reverse()
          console.log(shirtfrontandorback)
        }
      }
    }
    if(event.target.localName!=="canvas"){
      clickingoffcanvas=true
    }
  }

  p5.mouseDragged= (event) => {
    console.log(event,"dragging",clickingoffcanvas);
    if(event.target.localName!=="canvas"){
      clickingoffcanvas=true
    }
    if(event.target.localName=="canvas"){
      clickingoffcanvas=false
    }
    if(!clickingoffcanvas){
      for (let item of text){
        console.log(item)
        if(item.drawRect){
          let boundaries = swansea.textBounds(item.text,item.x,item.y,item.textSize);
          item.x=event.offsetX-boundaries.w/2
          item.y=event.offsetY-boundaries.h/2
        }
      }
      for (let item of globalImages){
        if(item.drawRect){
          console.log(item,event.offsetX,"!!!!")
          if(event.offsetX>(item.x+item.width-30)&&event.offsetX<(item.x+item.width+30)){
            item.width=event.offsetX-item.x
            console.log("yep")
          }else if(event.offsetY>(item.y+item.height-30)&&event.offsetY<(item.y+item.height+30)){
            item.height=event.offsetY-item.y
            console.log("yep")
          }else if(event.offsetX>(item.x-30)&&event.offsetX<(item.x+30)){
            item.width=(item.x-event.offsetX)+item.width
            item.x=event.offsetX
            console.log("yep")
          }else if(event.offsetY>(item.y-30)&&event.offsetY<(item.y+30)){
            item.height=(item.y-event.offsetY)+item.height
            item.y=event.offsetY
            console.log("yep")
          }else{
            item.x=event.offsetX-item.width/2
            item.y=event.offsetY-item.height/2
          }
        }
      }
    }
  }

  p5.keyPressed= (event) =>{
    console.log(event,clickingoffcanvas)
    if(!clickingoffcanvas){
      for (let item of text){
        console.log(item)
        if(item.drawRect){
          if(event.key=="Backspace"){
            item.text=item.text.slice(0,item.text.length-1)
          }else if(event.key=="CapsLock"){
            if(capslock==true){
              capslock=false
            }else{
              capslock=true
            }
          }else{
            item.text=`${item.text}${event.key}`
          }
        }
      }
    }
  }

  p5.draw = () => {
    for (let item of text){
      if(item.drawRect){
        item.angle=angly
      }
    }
    for (let item of globalImages){
      if(item.drawRect){
        item.angle=angly
      }
    }
    for (let item of text){
      if(item.drawRect){
        item.textColor=textColor
      }
    }
    if (shirtFront===true) {
      if(!shirtfrontandorback.includes("front")){
        shirtfrontandorback.push("front")
      }
    }
    if (shirtFront===false) {
      shirtfrontandorback=shirtfrontandorback.filter(word => word!=="front");
    }
    if (shirtBack===true) {
      if(!shirtfrontandorback.includes("back")){
        shirtfrontandorback.push("back")
      }
    }
    if(shirtBack===false){
      shirtfrontandorback=shirtfrontandorback.filter(word => word!=="back");
    }
    for (let item of text){
      if(item.drawRect){
        item.textSize=Number(fontSize)
      }
    }
    p5.background(250);
    p5.push();
    if(shirtfrontandorback){
      if(shirtfrontandorback[0]==="front"){
        p5.image(selectedfront, 0, 0,600,400);
      }
      if(shirtfrontandorback[0]==="back"){
        p5.image(selectedback, 0, 0,600,400);
      }
      if(shirtfrontandorback[1]==="front"){
        p5.image(selectedfront,500,300,100,100);
      }
      if(shirtfrontandorback[1]==="back"){
        p5.image(selectedback,500,300,100,100);
      }
      for (let item of text){
        let rgb=item.textColor.split(",")
        p5.fill(Number(rgb[0]),Number(rgb[1]),Number(rgb[2]));
        p5.textSize(item.textSize);
        let boundaries = swansea.textBounds(item.text,item.x,item.y,item.textSize);
        p5.push()
        p5.translate((item.x+(boundaries.w/2)), (item.y+(boundaries.h/2)))
        if(item.angle){
          p5.rotate(item.angle/4)
        }
        p5.text(item.text, -boundaries.w/2, -boundaries.h/2, boundaries.w, boundaries.h)
        if(item.drawRect){
          p5.stroke(154, 206, 235)
          p5.noFill()
          p5.strokeWeight(2)
          p5.rect(-boundaries.w/2-boundaries.w*0.2,-boundaries.h/2-boundaries.h*0.2, boundaries.w*1.4, boundaries.h*1.4);
        }
        p5.pop()
      }
      if(globalImages){
        for (let image of globalImages){
          if(image.x&&image.y&&image.width&&image.height){
            p5.push()
            p5.translate((image.x+(image.width/2)), (image.y+(image.height/2)))
            if(image.angle){
              p5.rotate(image.angle/4)
            }
            p5.image(image.image,-image.width/2,-image.height/2,image.width,image.height);
            if(image.drawRect){
              p5.stroke(154, 206, 235)
              p5.noFill()
              p5.strokeWeight(10)
              p5.rect(-image.width/2, -image.height/2, image.width, image.height);
            }
            p5.pop()
          }
        }
      }
      p5.pop();
    };
  }
}

export default function Painter() {
  const [images, setImages] = React.useState([]);
  const [updateImages, setUpdateImages] = React.useState(false);
  const [color, setColor] = useState("#aabbcc");
  const [shirt, setShirt] = useState(false);
  const [size, setSize] = useState(false);

  const maxNumber = 69;

  useEffect(()=>{
    let rgbarray=hexRgb(color, {format: 'array'});
    rgbarray=rgbarray.join()
    textColor=rgbarray
  },[color])

  useEffect(()=>{
    console.log(size)
  },[size])

  useEffect(()=>{
    setUpdateImages(!updateImages)
  },[images])

  async function onChange(imageList, addUpdateIndex){
    if(imageList){
      globalImages=imageList
      setImages(imageList);
    }
  };


  return <div>
  <input type="number" onChange={(event) => fontSize=Number(event.target.value)} />
  <select type="number" onChange={(event) => setSize(event.target.value)}>
  <option value="small">small</option>
  <option selected value="medium">medium</option>
  <option value="large">large</option>
  <option value="extra large">extra large</option>
  <option value="extra extra large">extra extra large</option>
  </select>

  <button onClick={(event) => addText=!addText}>Add Text</button>
  <HexColorPicker color={color} onChange={setColor} />
  <input type="range" min="-360" max="360" onChange={(event) => angly=Number(event.target.value)}/>
  <br/><br/><br/><br/>
  <ReactP5Wrapper updateImages={updateImages} sketch={sketch} />
  {white&&<><img src={shirtfront} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
  borderWidth:"10px",borderStyle:shirtFront?"solid":"none"}} onClick={(event)=>{
    console.log(shirtFront)
    setShirt(!shirt)
    shirtFront=!shirtFront}}/>
    <img src={shirtback} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
    borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
      console.log(shirtBack)
      setShirt(!shirt)
      shirtBack=!shirtBack}}/></>}

      {green&&<><img src={shirtfrontgreen} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
      borderWidth:"10px",borderStyle:shirtFront?"solid":"none"}} onClick={(event)=>{
        console.log(shirtFront)
        setShirt(!shirt)
        shirtFront=!shirtFront}}/>
        <img src={shirtbackgreen} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
        borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
          console.log(shirtBack)
          setShirt(!shirt)
          shirtBack=!shirtBack}}/></>}

          {red&&<><img src={shirtfrontred} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
          borderWidth:"10px",borderStyle:shirtFront?"solid":"none"}} onClick={(event)=>{
            console.log(shirtFront)
            setShirt(!shirt)
            shirtFront=!shirtFront}}/>
            <img src={shirtbackred} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
            borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
              console.log(shirtBack)
              setShirt(!shirt)
              shirtBack=!shirtBack}}/></>}

              {yellow&&<><img src={shirtfrontyellow} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
              borderWidth:"10px",borderStyle:shirtFront?"solid":"none"}} onClick={(event)=>{
                console.log(shirtFront)
                setShirt(!shirt)
                shirtFront=!shirtFront}}/>
                <img src={shirtbackyellow} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
                  console.log(shirtBack)
                  setShirt(!shirt)
                  shirtBack=!shirtBack}}/></>}

                  {purple&&<><img src={shirtfrontpurple} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                  borderWidth:"10px",borderStyle:shirtFront?"solid":"none"}} onClick={(event)=>{
                    console.log(shirtFront)
                    setShirt(!shirt)
                    shirtFront=!shirtFront}}/>
                    <img src={shirtbackpurple} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                    borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
                      console.log(shirtBack)
                      setShirt(!shirt)
                      shirtBack=!shirtBack}}/></>}

                      {orange&&<><img src={shirtfrontorange} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                      borderWidth:"10px",borderStyle:shirtFront?"solid":"none"}} onClick={(event)=>{
                        console.log(shirtFront)
                        setShirt(!shirt)
                        shirtFront=!shirtFront}}/>
                        <img src={shirtbackorange} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                        borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
                          console.log(shirtBack)
                          setShirt(!shirt)
                          shirtBack=!shirtBack}}/></>}

                          {blue&&<><img src={shirtfrontblue} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                          borderWidth:"10px",borderStyle:shirtFront?"solid":"none"}} onClick={(event)=>{
                            console.log(shirtFront)
                            setShirt(!shirt)
                            shirtFront=!shirtFront}}/>
                            <img src={shirtbackblue} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                            borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
                              console.log(shirtBack)
                              setShirt(!shirt)
                              shirtBack=!shirtBack}}/></>}

                              <img src={shirtfront} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                              borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
                                setShirt(!shirt); green=false; red=false; blue=false; orange=false; yellow=false; purple=false; white=true; selectedfront=front; selectedback=back;
                              }}/>
                              <img src={shirtfrontgreen} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                              borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
                                green=true; red=false; blue=false; orange=false; yellow=false; purple=false; white=false; selectedfront=frontgreen; selectedback=backgreen;
                                setShirt(!shirt)
                              }}/>
                              <img src={shirtfrontyellow} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                              borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
                                setShirt(!shirt); green=false; red=false; blue=false; orange=false; yellow=true; purple=false; white=false; selectedfront=frontyellow; selectedback=backyellow;
                              }}/>
                              <img src={shirtfrontblue} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                              borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
                                setShirt(!shirt); green=false; red=false; blue=true; orange=false; yellow=false; purple=false; white=false; selectedfront=frontblue; selectedback=backblue;
                              }}/>
                              <img src={shirtfrontpurple} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                              borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
                                setShirt(!shirt); green=false; red=false; blue=false; orange=false; yellow=false; purple=true; white=false; selectedfront=frontpurple; selectedback=backpurple;
                              }}/>
                              <img src={shirtfrontred} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                              borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
                                setShirt(!shirt); green=false; red=true; blue=false; orange=false; yellow=false; purple=false; white=false; selectedfront=frontred; selectedback=backred;
                              }}/>
                              <img src={shirtfrontorange} style={{width:"40vw",height:"50vh",top:"0",left:"0",borderColor:"#9ACEEB",
                              borderWidth:"10px",borderStyle:shirtBack?"solid":"none"}} onClick={(event)=>{
                                setShirt(!shirt); green=false; red=false; blue=false; orange=true; yellow=false; purple=false; white=false; selectedfront=frontorange; selectedback=backorange;
                              }}/>
                              <ImageUploading
                              multiple
                              value={images}
                              onChange={onChange}
                              maxNumber={maxNumber}
                              dataURLKey="data_url"
                              >
                              {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                              }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                <button
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                >
                                Click or Drop here
                                </button>
                                </div>
                              )}
                              </ImageUploading>
                              </div>
                            }
