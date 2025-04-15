document.addEventListener("DOMContentLoaded", ()=>{

    //create header image section
    let imageBox = document.getElementById("imageSection");
    let img = document.createElement("img");
    img.src = ("./assets/quizztime.png")
    imageBox.appendChild(img)




    //grab existing element
    let mainDiv = document.getElementById('mainSection');
    let questionDiv = document.getElementById("questionsSection");


    //create start quizz button and append to existing html tag(parent)
    const startQuizzButton = document.createElement('button');
    startQuizzButton.innerText ="Start Quiz";
    startQuizzButton.id = 'startQuizzButton';
    mainDiv.appendChild(startQuizzButton);

    //add event listener on click of the start quizz button
    startQuizzButton.addEventListener('click', ()=>

        {
          startQuizzButton.style.display = 'none';
        fetch("https://opentdb.com/api.php?amount=10&category=18")
            .then((Response) => Response.json())
            .then((data)=> {

                    //access the inner array from the outside object
                    triviaQuestions = data.results; 

                    triviaQuestions.forEach((element, index) => {
                    // Create a container for each question
                    let questionContainer = document.createElement('div');
                    //give the container an id for styling purposes
                    questionContainer.id = "question-container";
                
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


                            


   
                    }); //end of trivaquestions for each loop

                    let endQuizzButton =  document.createElement('button');
                    endQuizzButton.innerText = "End Quiz";
                    questionDiv.appendChild(endQuizzButton);
                    endQuizzButton.id = 'endQuizzbutton'

                    endQuizzButton.addEventListener('click', () => {
                        let score = 0;
                        
                        triviaQuestions.forEach((element, index) => {

                        const checkedAnswer = document.querySelector(`input[name = "question-${index}"]:checked`);
                        if(checkedAnswer && checkedAnswer.value === element.correct_answer){
                            score++;} 
                         else{
                            const allAnswers = document.querySelectorAll(`input[name="question-${index}"]`);
                            allAnswers.forEach(answerInput => {
                                if (answerInput.value === element.correct_answer) {
                                    const correctLabel = answerInput.parentElement; 
                                    correctLabel.classList.add('correct-feedback-quizz-end'); 
                                }
                            });


                         }
                     
                    
                    
                        
                        } )

                        //display the user's score on the scoreboard
                        let scoreBoard =  document.createElement("h2");
                        scoreBoard.innerText =  `Your score : ${score}`
                        questionDiv.appendChild(scoreBoard)
                        
                        //disable the end quizz button after the user has clicked in once   
                         endQuizzButton.disabled = true;
                         endQuizzButton.style.cursor = 'not-allowed';
                         endQuizzButton.style.opacity = '0.6';

                        //create restart quizz button
                         let restartQuizzButton =  document.createElement('button');
                         restartQuizzButton.innerText = "Restart Quiz";
                         questionDiv.appendChild(restartQuizzButton);
                         restartQuizzButton.id = 'restartQuizzbutton'
                        //add an event listener to the restart quizz button to clear out the html in the question div and fetch new questions
                         restartQuizzButton.addEventListener('click', ()=>{
                             questionDiv.innerHTML = '';

                             button.click();
                         }
                            


                         )



                        
                        }) //end of event listner end quizz
                            
            }) ;// end of second then data manipulation
        
       
    }); //end of click of start quizz button event listener

}); //end of content loaded event lister


    
    
    
    
    
