document.addEventListener("DOMContentLoaded", () => {

        let triviaQuestions = [];
        let currentQuestionIndex = 0;
        let score = 0;
        let startTime;
        let endTime;


    //grab some existing dom elements
     const navDiv = document.getElementById('navSection');
     const startButtonDiv = document.getElementById("startButtonSection");
     const questionDiv = document.getElementById("questionsSection");
     const choose = document.getElementById("choosePreferences");
     const userOptionsDiv = document.getElementById("userOptions");

    //create my heading title
    let title = document.createElement("h1");
    title.innerText = "You are about to play, the ultimate Trivia Game";
    navDiv.appendChild(title);

    //create a image for the header section and append it to the image div 
    const imageBox = document.getElementById("imageSection");
    const img = document.createElement("img");
    img.src = "./assets/clipart1057186.png";
    imageBox.appendChild(img);

    //section to introduce option selection
    let statement = document.createElement("h2");
    choose.append(statement);
    statement.innerText = "Choose your Trivia Preferences below ... and start your quizz"


    //no of questions selection selection option
    let qContainer = document.createElement("div");
    qContainer.classList.add("select-container");
    const noOfQuestions = document.createElement('select');
    noOfQuestions.id = "noOfQsns";
    let qHeader = document.createElement("h3");
    qHeader.innerText = "Select No. of Questions:";
    qContainer.appendChild(qHeader);
    qContainer.appendChild(noOfQuestions);
    userOptionsDiv.appendChild(qContainer);

    const noOfQsn = [5,10,15,20,25];

    noOfQsn.forEach((num) =>{
        const opt = document.createElement('option');
        opt.value = num;
        opt.innerText = `${num} questions`;
        noOfQuestions.appendChild(opt);

    }) //end of question selecton option





    //difficulty level selection option
    let dContainer = document.createElement("div");
    dContainer.classList.add("select-container");
    const difficultyLevel = document.createElement('select');
    difficultyLevel.id = "diffLevel";
    let dHeader = document.createElement("h3");
    dHeader.innerText = "Select Difficulty Level:";
    dContainer.appendChild(dHeader);
    dContainer.appendChild(difficultyLevel);
    userOptionsDiv.appendChild(dContainer);


     const difficulL = [{"": "Any Difficulty"},{"easy": "Easy"}, {"hard": "Hard"}, {"medium":"Medium"}]
     difficulL.forEach((dif)=>{
        const [key, value] = Object.entries(dif)[0]; 
        let diffLevel = document.createElement("option");
        diffLevel.value = key;
        diffLevel.innerText = value;
        difficultyLevel.appendChild(diffLevel)

     })



     //category of questions user selection
    let cContainer = document.createElement("div");
    cContainer.classList.add("select-container");
    const category = document.createElement('select');
    category.id = "cat";
    let cHeader = document.createElement("h3");
    cHeader.innerText = "Select Category:";
    cContainer.appendChild(cHeader);
    cContainer.appendChild(category);
    userOptionsDiv.appendChild(cContainer);
     
  
    const categories = [
        {
          "": "Any Category"
        },
        { 
        18 : "Computers"},{
         10: "Books"
        },{
            22: "Geography"
        },{
            9: "General-Knowledge"
        },{
            19: "Mathematics"},{
            15: "Video Games"
        },{
            11: "Films"
        },{
            17: "Science & Nature"
        },{
            21: "Sports"
        },{
            28: "Vehicles"
        },{
            27: "Animals"
        },{
            26: "Celebrities"
        },{
            12: "Music"
        }

    ]

    categories.forEach((cat)=>
    {
        const [key, value] = Object.entries(cat)[0]; 
        let opt3 = document.createElement("option");
        opt3.value = key; 
        opt3.innerText = value; 
        category.appendChild(opt3);
    })
    


    //type of questions user selection
    let tContainer = document.createElement("div");
    tContainer.classList.add("select-container");
    let type = document.createElement("select");
    type.id = "type";
    let tHeader = document.createElement("h3");
    tHeader.innerText = "Select Type of Questions:";
    tContainer.appendChild(tHeader);
    tContainer.appendChild(type);
    userOptionsDiv.appendChild(tContainer)

    const typeOptions = [  {"": "Any Type"}  ,  {"multiple": "Multiple Choice Qsns"}, {"boolean":"True/False"}]
    typeOptions.forEach((typ)=>{
        const [key, value] = Object.entries(typ)[0]; 
        let opt4 = document.createElement("option");
        opt4.value = key;
        opt4.innerText = value;
        type.appendChild(opt4)

    })









    //create the start quizz buttton and event listener
  
        const startBtn = document.createElement('button');
        startBtn.innerText = "Start Quiz";
        startBtn.classList.add("bottonStyling")
        startBtn.id = 'startQuizzButton';
        startButtonDiv.appendChild(startBtn);
    
        startBtn.addEventListener('click', () => {

            if (!startTime) { 
                startTime = new Date();
            }
            
            questionDiv.style.display = "block";
            startBtn.style.display = 'none';
            choose.style.display = 'none';
            userOptionsDiv.style.display = 'none';
            startButtonDiv.style.display = 'none';
            imageBox.style.display = 'none';
            navDiv.style.display = 'none';
            

            loadQuiz();
        }); //end of start button click event listener
        
        





//create the load quizz function

    function loadQuiz() {
       
        questionDiv.innerHTML = ''; 
        //grab the selected user options

        const amount = document.getElementById("noOfQsns").value;
        const dLevel = document.getElementById("diffLevel").value;
        const cat = document.getElementById("cat").value;
        const typeOfQns = document.getElementById("type").value;


        fetch(`https://opentdb.com/api.php?amount=${amount}&category=${cat}&difficulty=${dLevel}&type=${typeOfQns}`)
            .then(response => response.json())
            .then(data => {
                triviaQuestions = data.results;
                currentQuestionIndex = 0; 
                renderSingleQuestion(currentQuestionIndex)
                
            });
    } //end of loadquizz function





 //function to render a single question

  function renderSingleQuestion(index){
        questionDiv.innerHTML = ''; // Clear previous questions, score, buttons
        const element = triviaQuestions[index]
    
        // Create a container for each question
        let questionContainer = document.createElement('div');
        //give the container an id for styling purposes
        questionContainer.classList.add("question-container");

        //create a timer element
        const timerDiv = document.createElement('div');
        timerDiv.id = 'timer';
        timerDiv.innerText = "Time Left: 15 seconds";
        questionDiv.appendChild(timerDiv);


        //create a timer for each question
        let timeLeft = 15;
        const timer =  setInterval(()=>{
            timeLeft--;
            timerDiv.innerText = `Time left: ${timeLeft} seconds` 

            if (timeLeft<=0){
                clearInterval(timer);
                timerDiv.innerText = "Time's up!"
                nextBtn.disabled = false;
                const allAnswers = document.querySelectorAll(`input[name="question-${index}"]`)
                                    allAnswers.forEach((answer)=>
                                    {
                                        answer.disabled = true;

                                        if (answer.value === element.correct_answer) {
                                            answer.parentElement.classList.add('correct-answer'); // Highlight the correct answer
                                        }

                                        
                                    })
            } // end of if statement for timer
        },1000); //end of setInterval function

        


        //decoding 
        function decodeHTML(html) {
         const txt = document.createElement("textarea");
         txt.innerHTML = html;
         return txt.value;
     } // end of decoding
    
        // Create, give content and append to the mother
        let quizzQsn = document.createElement('h2');
        quizzQsn.innerText = `${index + 1}. ${decodeHTML(element.question)}`; //give numbering to each question from 1
        questionContainer.appendChild(quizzQsn);
        questionDiv.appendChild(questionContainer);
    
        // Combine correct and incorrect answers for each question
        //spread operator gives us a copy for the original array and then we add the correct answer to the array
        //we need to work with all answers both wrong and right as one
        let allAnswersCombined = [...element.incorrect_answers, element.correct_answer];
    
        // array.short()sorts in alphabetical order but adding the random callback sorts in any order
        allAnswersCombined.sort(() => Math.random() - 0.5);



                // Create and append answer choices
                allAnswersCombined.forEach(answer => {
                let label = document.createElement('label');
                let input = document.createElement('input');
                input.type = 'radio'; //input type is radio
                input.name = `question-${index}`; // give the answers an unique name .. in this case the index of the question
                input.value = decodeHTML(answer);
                label.classList.add("labelS")

                label.appendChild(input);
                label.appendChild(document.createTextNode(answer));
                questionContainer.appendChild(label);
                questionContainer.appendChild(document.createElement('br')); // Line break for better formatting

                          // Add event listener to check if the answer is correct
                                input.addEventListener('change', () => {
                                    clearInterval(timer);
                                    // Remove any existing feedback for this question
                                    const existingFeedback = questionContainer.querySelector('.feedback');
                                    if (existingFeedback) {
                                        existingFeedback.remove();
                                    }
                                
                                    // Create a new feedback element
                                    const scoreforQn = document.createElement('h2');
                                   
                                    
                                
                                    if (input.value === element.correct_answer) {
                                        score++;
                                       
                                        scoreforQn.innerText = `Correct! You got it right`;
                                        scoreforQn.classList.add('correct-feedback');
                                        label.classList.add('correct-answer');
                                    } else {
                                        scoreforQn.innerText = `Wrong! You got it Wrong`;
                                        scoreforQn.classList.add('wrong-feedback');
                                        label.classList.add('wrong-answer');

                                         // Automatically highlight the correct answer
                                         const allAnswers = document.querySelectorAll(`input[name="question-${index}"]`);
                                         allAnswers.forEach(answer => {
                                             if (answer.value === element.correct_answer) {
                                                 answer.parentElement.classList.add('correct-answer'); // Highlight the correct answer
                                             }
                                         });
                                            
                                    } //end of else block



                                    scoreforQn.classList.add('feedback');
                                    questionContainer.appendChild(scoreforQn);

                                    nextBtn.disabled = false;

                                

                                    //disable all radio buttons when the user has selected thier answer for the question
                                    const allAnswers = document.querySelectorAll(`input[name="question-${index}"]`)
                                    allAnswers.forEach((answer)=>
                                    {
                                        answer.disabled = true;
                                    })

                                });  //end of change event listener
                                          
                }); //end of allanswerscombined for each





     // Add Next Button
     const nextBtn = document.createElement('button');
     nextBtn.innerText = (index === triviaQuestions.length - 1) ? "Finish Quiz" : "Next Question";
     nextBtn.disabled = true; 
     nextBtn.id = "nextBtn";
     questionContainer.appendChild(nextBtn);
 
     nextBtn.addEventListener('click', () => {
        if (index < triviaQuestions.length - 1) {
            renderSingleQuestion(++currentQuestionIndex); 
        } else {
            showFinalScore(); 
            userOptionsDiv.style.display = 'flex';
            choose.style.display = 'block'; 
            
            startBtn.style.display = 'none';
            startButtonDiv.style.display = 'none';
            // imageBox.style.display = 'block';
            // navDiv.style.display = 'block';

            

        }
    });        

  } // end of function to render one question





  //create function to show final scoreg

  function showFinalScore(){

    

    console.log(score);
    questionDiv.innerHTML = '';
    const scoreBoard = document.createElement("h2");
    const percentage = ((score/triviaQuestions.length) * 100).toFixed(2);
    scoreBoard.innerText = `Your score is: ${score} / ${triviaQuestions.length} (${percentage}%)`;
    questionDiv.appendChild(scoreBoard);

    
    if (!endTime) { 
        endTime = new Date();
    }
    

    const totalTime = Math.floor((endTime - startTime) / 1000);

    function formatTime(totalTime) {
        const hrs = Math.floor(totalTime / 3600);
        const mins = Math.floor((totalTime % 3600) / 60);
        const secs = totalTime % 60;
      
        return `${hrs}h ${mins}m ${secs}s`;
      }
      let formattedTime = formatTime(totalTime)
  

    const timeTaken = document.createElement("h2");
    timeTaken.innerText = `You completed the quiz in ${formattedTime} seconds!`;
    questionDiv.appendChild(timeTaken);


    createRestartButton();




  } //end of show final score function





    //create the restart quizz function

    function createRestartButton() {
        const restartBtn = document.createElement("button");
        restartBtn.innerText = "Restart Quiz";
        restartBtn.classList.add("bottonStyling")
        restartBtn.id = "restartQuizButton";
        questionDiv.appendChild(restartBtn);

        restartBtn.addEventListener("click", () => {
            // startBtn.style.display = 'none';
            // choose.style.display = 'none';
            // userOptionsDiv.style.display = 'none';
            // startButtonDiv.style.display = 'none';

            userOptionsDiv.style.display = 'none';
            choose.style.display = 'none';     
            startBtn.style.display = 'none';
            startButtonDiv.style.display = 'none';
            imageBox.style.display = 'none';
            navDiv.style.display = 'none';




            triviaQuestions = [];
            loadQuiz(); 
        });
    } //end of create restart button














}); //end of dom content loaded
