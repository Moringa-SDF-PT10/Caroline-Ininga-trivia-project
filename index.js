document.addEventListener("DOMContentLoaded", () => {

    //create a image for the header section and append it to the image div 
    const imageBox = document.getElementById("imageSection");
    const img = document.createElement("img");
    img.src = "./assets/quizztime.png";
    imageBox.appendChild(img);

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


    //define this variable here as a global variable so that it can be accessible thoughout the code
    let triviaQuestions = [];


    //section to introduce option selection
    let statement = document.createElement("h2");
    choose.append(statement);
    statement.innerText = "Choose your Trivia Preferences below ... and start your quizz"


    //create the start quizz buttton
  
        const startBtn = document.createElement('button');
        startBtn.innerText = "Start Quiz";
        startBtn.id = 'startQuizzButton';
        startButtonDiv.appendChild(startBtn);
    
        startBtn.addEventListener('click', () => {
            questionDiv.style.display = "block";
            startBtn.style.display = 'none';
            choose.style.display = 'none';
            userOptionsDiv.style.display = 'none';

            loadQuiz();
        });
        
        //no of questions selection selection option
        const noOfQuestions = document.createElement('select');
        noOfQuestions.id = "noOfQsns";
        userOptionsDiv.appendChild(noOfQuestions);
        const noOfQsn = [5,10,15,20,25];

        noOfQsn.forEach((num) =>{
            const opt = document.createElement('option');
            opt.value = num;
            opt.innerText = `${num} questions`;
            noOfQuestions.appendChild(opt);

        })

        //difficulty level selection option
        const difficultyLevel = document.createElement('select');
         userOptionsDiv.appendChild(difficultyLevel);
         difficultyLevel.id = "diffLevel";

         const difficulL = ["easy", "hard", "medium"]
         difficulL.forEach((dif)=>{
            let diffL = document.createElement("option");
            diffL.value = dif;
            diffL.innerText = `${dif}`;
            difficultyLevel.appendChild(diffL)

         })

         //category of questions user selection
         const category = document.createElement('select');
         userOptionsDiv.append(category);
         category.id = "cat";
      
        const categories = [{ 
            18 : "Computers"},
            {
             10: "Books"
            },
            {
                22: "Geography"
            },
            {
                9: "General-Knowledge"
            },
            {
                19: "Mathematics"
            },{
                15: "Video Games"
            },
            {
                11: "Films"
            },
            {
                17: "Science & Nature"
            },
            {
                21: "Sports"
            },
            {
                28: "Vehicles"
            },{
                27: "Animals"
            },
            {
                26: "Celebrities"
            },
            {
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

        let type = document.createElement("select");
        userOptionsDiv.appendChild(type);
        type.id = 'type';

        const typeOptions = ["multiple", "boolean"]
        typeOptions.forEach((typ)=>{
            let opt4 = document.createElement("option");
            opt4.value = typ;
            opt4.innerText = `${typ}`
            type.appendChild(opt4)

        })





        //create the load quizz function

    function loadQuiz() {
        questionDiv.innerHTML = ''; // Clear previous questions, score, buttons

        //grab the selected user options

        const amount = document.getElementById("noOfQsns").value;
        const dLevel = document.getElementById("diffLevel").value;
        const cat = document.getElementById("cat").value;
        const typeOfQns = document.getElementById("type").value;


        fetch(`https://opentdb.com/api.php?amount=${amount}&category=${cat}&difficulty=${dLevel}&type=${typeOfQns}`)
            .then(response => response.json())
            .then(data => {
                triviaQuestions = data.results;
                triviaQuestions.forEach((element, index) => {
                   // Create a container for each question
                   let questionContainer = document.createElement('div');
                   //give the container an id for styling purposes
                   questionContainer.classList.add("question-container");
               
                   // Create, give content and append to the mother
                   let quizzQsn = document.createElement('h2');
                   quizzQsn.innerText = element.question;
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
                           input.value = answer;

                           label.appendChild(input);
                           label.appendChild(document.createTextNode(answer));
                           questionContainer.appendChild(label);
                           questionContainer.appendChild(document.createElement('br')); // Line break for better formatting

                                     // Add event listener to check if the answer is correct
                                           input.addEventListener('change', () => {
                                               // Remove any existing feedback for this question
                                               const existingFeedback = questionContainer.querySelector('.feedback');
                                               if (existingFeedback) {
                                                   existingFeedback.remove();
                                               }
                                           
                                               // Create a new feedback element
                                               const scoreforQn = document.createElement('h2');
                                               
                                           
                                               if (input.value === element.correct_answer) {
                                                   scoreforQn.innerText = `Correct! You got it right`;
                                                   scoreforQn.classList.add('correct-feedback');
                                               } else {
                                                   scoreforQn.innerText = `Wrong! You got it Wrong`;
                                                   scoreforQn.classList.add('wrong-feedback');
                                               }
                                           
                                               // Append the new feedback to the question container
                                               questionContainer.appendChild(scoreforQn);

                                               //disable all radio buttons when the user has selected thier answer for the question
                                               const allAnswers = document.querySelectorAll(`input[name="question-${index}"]`)
                                               allAnswers.forEach((answer)=>
                                               {
                                                   answer.disabled = true;
                                               })

                                           });  //end of change event listener
                                           


                          

                          



                         


                           
                           }); //end of allanswerscombined for each


                           


                });

                createEndButton();
                createRestartButton();
            });
    } //end of loadquizz function





//create the end quizz button

    function createEndButton() {
        const endBtn = document.createElement("button");
        endBtn.innerText = "End Quiz";
        endBtn.id = "endQuizButton";
        questionDiv.appendChild(endBtn);

        endBtn.addEventListener("click", () => {
            let score = 0;

            triviaQuestions.forEach((element, index) => {
                const checkedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
                if (checkedAnswer && checkedAnswer.value === element.correct_answer) {
                    score++;
                } else {
                    const allAnswers = document.querySelectorAll(`input[name="question-${index}"]`);
                    allAnswers.forEach(input => {
                        if (input.value === element.correct_answer) {
                            input.parentElement.classList.add('correct-feedback-quizz-end');
                        }
                    });
                }
            });

            const scoreBoard = document.createElement("h2");
            const percentage = ((score/triviaQuestions.length) * 100).toFixed(2);
            scoreBoard.innerText = `Your score is: ${score} / ${triviaQuestions.length} (${percentage}%)`;
            questionDiv.appendChild(scoreBoard);

            endBtn.disabled = true;
            endBtn.style.cursor = 'not-allowed';
            endBtn.style.opacity = '0.6';
        });
    }




    //create the restart quizz function

    function createRestartButton() {
        const restartBtn = document.createElement("button");
        restartBtn.innerText = "Restart Quiz";
        restartBtn.id = "restartQuizButton";
        questionDiv.appendChild(restartBtn);

        restartBtn.addEventListener("click", () => {
            triviaQuestions = [];
            loadQuiz(); 
        });
    }







}); //end of dom content loaded
