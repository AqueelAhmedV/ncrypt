
import './App.css';
import { useState } from 'react';



function App() {
  const [word, setWord] = useState('');
  const [number, setNumber] = useState(0);
  

    

  function ncrypt(word, num=1){
    var	fib = [0];
    var temp1 = 0,temp2 = 1,term = 0;
    var alfanum = [0];
    

    if(!num || !word) {
      return "";
    }
  
   

    for (var i = 1; i <= 26; i++) {
      temp1 = term;
      term = term + temp2;
      temp2 = temp1;
      fib[i] = term;
    }
  
    var lword = word.toLowerCase();
    var k;
  
    for (i = 0; i < word.length; i++) {
      k = lword.charCodeAt(i);
      for (var j = 0; j < 26; j++) {
        if(k<=122 && k>=97)
          alfanum[i] = k-71-j;
        else{
          k = -1;
          i = word.length;
          break;
        }
      }
    }
  
    if(k===-1){
      
      return "";
    }

  
    var final = "";
    for (i = 0; i < alfanum.length; i++) {
      final += (fib[alfanum[i]]*num).toString();
      if(i%2===0)
        final += lword[alfanum.length-1-i];
      else
        final += lword[alfanum.length-1-i].toUpperCase(); 
    }
  
    // final = Buffer.from(final, 'base64');
    final = btoa(final);   
    //alert(final);

    
    
    final = final.replace("=","$");
    final = final.replace("$=","$");
    final += "$"; 
    
    // return encrypted string
    return final || "";
    
  }
  

  return (
    <div className="App container container-fluid w-50 text-white" > 
  <h1 className="p-5 ">Ncrypt</h1>
  <h5 className="pb-5">The password generator and storage app for geeks.</h5>
  
  <div className="input-group mb-3">
    <span className="input-group-text">Favorite Word </span>
    <input 
    onKeyDown={(evt) => !/^[a-zA-Z]*$/.test(evt.key) && evt.preventDefault()} 
    onInput={(e) => {
      if(e.target.value.length<=10)
        setWord(e.target.value);
      else {
        e.target.value = e.target.value.slice(0,-1)
        setWord(e.target.value)
      }
      }} type="text" aria-label="Word" placeholder="5-10 Characters" className="form-control" /> 
  </div>
  <div className="input-group mb-3">
    <span className="input-group-text ">Favorite Number </span>
    <input 
    onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
    onInput={(e) => {
      var val = e.target.value;
      if(parseInt(val)>=100 ){
        e.target.value = val.slice(0,-1)
        setNumber(parseInt(e.target.value))
        
      }
      else{
        
        setNumber(parseInt(val))
      }
      }} type="number" aria-label="Number" className="form-control" placeholder="1-99"/> 
  </div>
  <div className="input-group mb-3">
  <input  id="encrypted" type="text" className="form-control" placeholder="Encrypted string" aria-label="Encrypted string" aria-describedby="button-addon2"  value={ncrypt(word, number)} disabled/>
  <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e)=>{
    navigator.clipboard.writeText(document.getElementById("encrypted").value)
    e.target.innerHTML = "Copied!"
    setTimeout(()=>e.target.innerHTML="Copy", 5000)
  }}>Copy</button>
</div>

</div>

  );
}

export default App;
