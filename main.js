quots = [
    "It is a bit of information that predicts a reward. Ourprehistoric ancestors were paying attention to cues that signaled thelocation of primary rewards like food, water, and sex",
    "Your mind is continuously analyzing your internal and externalenvironment for hints of where rewards are located. ",
    "Cravings are the second step, and they are the motivational forcebehind every habit.",
    " In theory, any piece ofinformation could trigger a craving, but in practice, people are notmotivated by the same cues.",
    "The third step is the response. The response is the actual habit youperform, which can take the form of a thought or an action. "
]
let correct;
const creatRandomQuot = Math.floor(Math.random()*quots.length);
const randomQuot = quots[creatRandomQuot];
let textArea = document.querySelector('.text');
randomQuot.split('').forEach(char=>{
    let spantag = document.createElement('span');
    spantag.innerText = char;
    textArea.appendChild (spantag)
})
let inputText = document.querySelector('textarea');
inputText.addEventListener('input', function(){
    let quotSpan = textArea.querySelectorAll('span');
    let inputSpan = inputText.value.split('');
    quotSpan.forEach((charspan , index)=>{
        let input = inputSpan[index];
        correct = true;
        if (input ==null){
            charspan.classList.remove('correct');
            charspan.classList.remove('incorrect');
            correct = false;
        }else if(input === charspan.innerText){
            charspan.classList.add('correct');
            charspan.classList.remove('incorrect');
            
            
        }else{
            charspan.classList.remove('correct');
            charspan.classList.add('incorrect');
            correct = false;
        }
    })
    if(correct){

        const creatRandomQuot = Math.floor(Math.random()*quots.length);
        const randomQuot = quots[creatRandomQuot];
        let textArea = document.querySelector('.text');
        textArea.innerHTML = '';
        randomQuot.split('').forEach(char=>{
        let spantag = document.createElement('span');
        spantag.innerText = char;
        textArea.appendChild (spantag)
    })
  
}
})
function gettime(){
    let seconds = document.querySelector('.timer')
    seconds.innerHTML = 0;
    setInterval(function(){
        seconds.innerHTML++; 
    },1000);
    

}
gettime()