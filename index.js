const express=require("express")
const app=express();
const path=require("path")
const name=require("./sample/index.js")
const dotenv=require("dotenv");
dotenv.config();
console.log(name.name)
app.use(express.static(path.join(__dirname,"sample")));
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"sample","index.html"))
})  
app.post("/",(req,res)=>{
    // console.log(req.body.firstNumber)
    const first=parseFloat(req.body.firstNumber);
    const operation=req.body.operation;
    const second=parseFloat(req.body.secondNumber);
    if(isNaN(first)||isNaN(second)){
        return res.send(`
             <h1>Invalid input. Please enter valid numbers.</h1>
      <br><button onclick="goBack()">Go back</button>
      <script>
        function goBack() {
          window.location.href = '/';
        }
      </script>
            `)
    }
    let result=0;
    switch(operation){
      case "add":
         result=first+second;
         console.log(operation+` of given number is ${result}\n`)
        break;
      case "subtract":
         result=first-second;
         console.log(operation+` of given number is ${result}\n`);
         break;
      case "multiply":
        result=first*second;
        console.log(operation+` of given number is ${result}\n`);
        break;
      case "divide":
        if(second==0){
            return res.send(`
                <h1>Cannot divide by zero. Please try again.</h1>
          <br><button onclick="goBack()">Go back</button>
          <script>
            function goBack() {
              window.location.href = '/';
            }
          </script>
                `)
        }
        result=first/second;
        console.log(operation+` of given number is ${result}\n`);
        break;
    }
res.send(`<h1>for ${operation} the result is ${result}</h1>
    <br><button onclick="fun()">goback</button>
    <script>function fun(){
   window.location.href="/";
    }</script>`)

    
})
console.log(process.env.PORT)
app.listen(process.env.PORT,"0.0.0.0",(err)=>{
     if(err)throw err;
     console.log(`port ${process.env.PORT} satrted`);
})