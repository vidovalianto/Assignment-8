let chuckJokes = ""
let dadJokes = ""
let generalJokes = ""
let generalLines = ""

let dadCount = 0
let generalCount = 0
let chuckCount = 0
let btnWidth = 300
let btnHeight = 80
const sec = 60
const reducer = (accumulator, currentValue) => accumulator + currentValue

const hoverColor = "#4A154B"

let dadBtn = new Clickable()
//let chuckBtn = new Clickable()
let generalBtn = new Clickable()
let submitBtn = new Clickable()

let result

function setup() {
  createCanvas(windowWidth, windowHeight);
  fetchJokes()
  
  dadBtn.hoverColor = hoverColor
  submitBtn.hoverColor = hoverColor
  generalBtn.hoverColor = hoverColor
}

function draw() {
  background(220);
    
    textAlign(CENTER)
  push()
  textFont('Helvetica', height/12)
  text("Jokelytics",width/2,height/8)
  pop()
    
    if (result) {
        push()
  textFont('Helvetica', height/40)
  text(result,width/2,height/5)
        const link = dadCount > generalCount ? "https://icanhazdadjoke.com/" : "https://official-joke-api.appspot.com/random_joke"
  text("For more " + link,width/2,height*4/5)
  pop()
        const sum = dadCount + generalCount
        pieChart(300, [convertToRad(dadCount,sum),convertToRad(generalCount,sum)])
    } else {
  const obj = {
      x: width/2,
      y: height/4,
      size: min(height,width)/10
  }
  
  createJokes(obj)
  dadBtn.draw()
//  chuckBtn.draw()
  generalBtn.draw()
        
  if (dadCount + generalCount > 5) {
      submitBtn.draw()
      submitBtn.text = "Submit my selection"
  }
    
  resizeButton()
    }
}

function createJokes(obj) {
    generalBtn.locate(obj.x - (btnWidth/2),obj.y)
    generalBtn.text = generalJokes + "\n" + generalLines
    generalBtn.onPress = function(){
          generalCount += 1
        btnClicked()
    }
    
    dadBtn.locate(obj.x - (btnWidth/2),obj.y + 25*(obj.size/10))
    dadBtn.text = dadJokes
    dadBtn.onPress = function(){
          dadCount += 1
        btnClicked()
    }
    
    submitBtn.locate(obj.x - (btnWidth/2),obj.y + 50*(obj.size/10))
    submitBtn.onPress = function(){
        resultClicked()
    }
    
//    chuckBtn.locate(obj.x,obj.y + 15*(obj.size/10))
//    chuckBtn.onPress = function(){
//          chuckCount += 1
//          console.log("chuckCount");
//    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function fetchJokes() {
    const spacing = 8
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
    generalJokes = data.setup
    generalLines = data.punchline
    btnWidth = Math.max(btnWidth, Math.max(generalJokes.length, generalLines.length)*spacing)
  }).catch( e => print(e))
    
  fetch("https://icanhazdadjoke.com/", {
  method: 'GET',
  headers: { 'Accept': 'application/json',},})
    .then(res => res.json())
    .then(data => {
      dadJokes = data.joke
      btnWidth = Math.max(btnWidth, dadJokes.length*spacing)
  })
    .catch( e => print(e))
}

function resizeButton() {
    dadBtn.resize(btnWidth, btnHeight)
    dadBtn.locate(dadBtn.x - (btnWidth),dadBtn.y)
    generalBtn.resize(btnWidth, btnHeight)
    generalBtn.locate(generalBtn.x - (btnWidth),generalBtn.y)
    submitBtn.resize(btnWidth, btnHeight)
    submitBtn.locate(generalBtn.x - (btnWidth),150)
}

function btnClicked() {
    btnWidth = 500
    fetchJokes()
}

function resultClicked() {
    result = dadCount > generalCount ? "You like dad jokes!" : "You like general jokes!"
}

function pieChart(diameter, data) {
  let lastAngle = 0;
    let color = ["#CE375C", "#64C3EB", "#E3B34c"]
  for (let i = 0; i < data.length; i++) {
    let col = color[i]
    push()
    fill(col);
    arc(
      width / 2,
      height / 2,
      diameter,
      diameter,
      lastAngle,
      lastAngle + radians(data[i])
    );
    lastAngle += radians(data[i]);
      pop()
  }
}

function convertToRad(num, sum) {
    return ((num/sum)*360)
}