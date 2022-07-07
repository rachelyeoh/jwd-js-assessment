/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
    timerCountdown();
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, 
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
      /****** 3) Add 2 more questions to the app (each question must have 4 options). ******/
    {
      q: "What does the underscore (_) before the name of a property mean in objects?",
      o: ["Property should be altered", "I like it there", "Property should not be altered", "Property has been altered"],
      a: 2,
    },
    {
      q: "When working with objects, you can include commas between methods. Is this true?",
      o: ["Yes, it's true", "No you cannot include commas between methods", "Yes, always separate with commas inside an object", "Maybe"],
      a: 1,
    }
  ];
 

  const quizWrap = document.querySelector('#quizWrap');
  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // call the displayQuiz function
  displayQuiz();


  const disableOptions = () => {
      const allRadioElements = document.querySelectorAll(`[type="radio"]`)
      const allLiElements = document.querySelectorAll(`li`)
      allRadioElements.forEach(eachRadioElement => {
        eachRadioElement.setAttribute("disabled", "");
      });
      allLiElements.forEach(eachLiElement => {
        eachLiElement.classList.add("text-black-50")
      });
  }

  /****** 5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers ******/
  let timerInterval;
  const timerCountdown = () => {
    let min = 0;
    let sec = 11;
    timerInterval =
    setInterval(() => {
      const timeRemaining = document.querySelector("#time");
      // Reduce time by 1 sec
      sec--;
      if(sec >= 10) {
        timeRemaining.innerHTML = `${min}:${sec}`
        // If time left is less than 10, add a '0' before sec
      } else {
        timeRemaining.innerHTML = `${min}:0${sec}`
      }
      // If no time remaining
      if(sec <= 0) {
        // Stop timer
        clearInterval(timerInterval);
        calculateScore();
        displayScore();
        // Disable option elements
        disableOptions();
        // Disable submit button
        submitBtn.setAttribute("disabled", "")
        timeRemaining.insertAdjacentHTML("afterend", `<h3 class="text-danger text-center">Time is up</h3>`)
      };    
    }, 1000)
  };

  
  let score = 0;
  const calculateScore = () => {
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        // selecting each li
        const liElement = document.querySelector('#' + li);
        //Selecting each radio button
        const radioElement = document.querySelector('#' + r);
        if (quizItem.a == i) {
          //change background color of li element
          liElement.style.backgroundColor = "rgba(40,247,40,0.3)";
        };

        // If correct answer, increase score by 1
        if (radioElement.checked && quizItem.a == i) {
          score++;
        }
      }
      
    });
  };

  
  /****** 1) Calculate the score as the total of the number of correct answers ******/
  const displayScore = () => {
    let totalScore = document.querySelector("#score");
    totalScore.innerHTML = `<h2 class="text-dark mt-2 mb-5">Your total score is (correct answer/total questions): <span class="text-primary">${score}/${quizArray.length}</span></h2>`
    // quizWrap.insertAdjacentHTML("beforebegin", totalScore)
  };
  

  /****** 2) Add an Event listener for the submit button, which will display the score and highlight the correct answers when the button is clicked. ******/
  const submitBtn = document.querySelector("#btnSubmit")
  submitBtn.addEventListener("click", () => {
    calculateScore();
    displayScore();
    // Disable option elements
    disableOptions();
    submitBtn.setAttribute("disabled", "")
    // Stop timer
    clearInterval(timerInterval);
  })

  /******  4) Reload the page when the reset button is clicked ******/
  const resetBtn = document.querySelector("#btnReset")
  resetBtn.addEventListener("click", () => {
    location.reload();
  })
});
