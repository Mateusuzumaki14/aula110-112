var  previsao1=''
var  previsao2=''

Webcam.set({
    width:251,
    height:251,
    imageFormat:'png',
    pngQuality:90
})
var camera=document.getElementById('camera')
Webcam.attach('#camera')
function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML='<img id="captura" src="'+data_uri+'"/>'
    })
}

console.log("ml5version",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/J2Ip11PDF/model.json',modelLoaded)
function modelLoaded(){
    console.log("modelo carregado")
}

function speak(){
    var synth=window.speechSynthesis;
    speak1='a primeira previsao e '+previsao1;
    speak2='a segunda previsao e'+previsao2;
    var UtterThis=new SpeechSynthesisUtterance(speak1+speak2)
    synth.speak(UtterThis)
}
function check() {
    img=document.getElementById('captura')
    classifier.classify(img,gotResult)
}
function gotResult(error,results){
    if (error) {
    console.error(error)        
    }
    else{
        console.log(results);
        document.getElementById('resultEmotionName').innerHTML=results[0].label
        document.getElementById('resultEmotionName2').innerHTML=results[1].label
        previsao1=results[0].label;
        previsao2=results[1].label;
        speak()
     
        if(results[0].label=='feliz'){
            document.getElementById('updateEmoji').innerHTML='🗿'
        }
        if(results[0].label=='triste'){
            document.getElementById('updateEmoji').innerHTML='&#128546;'
        }
        if(results[0].label=='irritado'){
            document.getElementById('updateEmoji').innerHTML='&#128545;'
        }

        if(results[1].label=='feliz'){
            document.getElementById('updateEmoji2').innerHTML='🗿'
        }
        if(results[1].label=='triste'){
            document.getElementById('updateEmoji2').innerHTML='&#128546;'
        }
        if(results[1].label=='irritado'){
            document.getElementById('updateEmoji2').innerHTML='&#128545;'
        }
    }
}