window.onload = (function () {
    //create array of each set of questions and answers
    var triviaArray = [{
            question: "Petit Gateau is French for:",
            answer: ["small dessert", "small chocolate", "small cake", "tiny cake"],
            correct: "small cake"
        },
        {
            question: "A perfectly tempered chocolate is known for its:",
            answer: ["shine", "snap", "smell", "color"],
            correct: "snap"
        },
        {
            question: "This popular dessert was originally made without filling:",
            answer: ["macaron", "oreo", "whoopie pie", "eclair"],
            correct: "macaron"
        },
        {
            question: "Which ingredient is NOT required to bake a cake?",
            answer: ["butter", "sugar", "eggs", "flour"],
            correct: "flour"
        },
        {
            question: "Which of these is America's favorite pie?",
            answer: ["pumpkin", "apple", "pizza", "cherry"],
            correct: "apple"
        },
        {
            question: "Where was ice cream first made?",
            answer: ["USA", "China", "Italy", "France"],
            correct: "China"
        },
        {
            question: "Where was the first chocolate chip cookie made?",
            answer: ["USA", "China", "Italy", "France"],
            correct: "USA"
        }
    ]

    var timer = 21; //tells timer where to start
    var timerInterval;
    var correct = 0;
    var incorrect = 0;

    //create function to start and display timer countdown
    function runTimer() {
        timer--;
        $("#timer").html(timer);
        if (timer === 0) {
            $("#timer").html("You're out of time!<br>");
            $("#question").html("The correct answer is: " + solution.correct);
            incorrect++;
            stopTimer();
        }
    }

    //create function to stop the timer
    function stopTimer() {
        clearInterval(timerInterval);
    }

    //create function to display the first question when begin button is clicked
    function firstQuestion() {
        $("#begin").on("click", function () {
            $("#begin").hide();
            timerInterval = setInterval(runTimer, 1000);
            displayQuestion();
        });
    }
    firstQuestion();

    //create function for displaying a questions/answers set
    function displayQuestion() {

        timer = 21;
        runTimer();
        //create variable for choosing random set from array
        var random = Math.floor(Math.random() * triviaArray.length);
        var solution = triviaArray[random];

        $("#question").html(solution.question);
        for (var i = 0; i < solution.answer.length; i++) {
            var answerButton = $("<button class='answerButton' id='button' data-name='" + solution.answer[i] + "'>" + solution.answer[i] + "</button><br>");
            $("#answers").append(answerButton);
        }
        $(document).on("click", "#button", function () {
            var userPick = $(this).data("name");

            if (userPick == solution.correct) {
                $("#question").html("Correct!");
                correct++;
                stopTimer();
                startQuesTimer ();
            } else {
                $("#question").html("Good Guess!<br>The correct answer is: " + solution.correct);
                incorrect++;
                stopTimer();
                startQuesTimer ();
            }
        });
    }

    //create function to count down 3 seconds between questions
    var questionTimer = 0;

    function startQuesTimer() {
        timerInterval = setInterval(startQuesTimer, 1000);
        questionTimer++;
        if (questionTimer === 5) {
            stopTimer();
            timerInterval = setInterval(runTimer, 1000);
            $("#question, #answers").empty();
            displayQuestion();
        }
    }
});