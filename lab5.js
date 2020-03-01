function lightMode() {
    document.body.classList.toggle("lightmode");
}

function Question(title, text) {
    this.title = title;
    this.text = text;



    this.toHTML = function() {
        let elements = "";
        elements += "<h3>" + this.title + "</h3>\n";
        elements += "<p>" + this.text + "</p>";

        return elements;
    };

    this.getAnswers = function () {
        return {};
    };
}

function MultipleChoiceQuestion(title, text, options=[]) {

    Question.call(this, title, text);

    let mCQToHTML = this.toHTML;

    this.toHTML = function() {
        let elements = mCQToHTML.call(this);

        elements += "<ol id ='" + title + "' type = a>\n";
        for (let counter = 0; counter < options.length; counter++) {
            elements += "<li><input type = 'radio' name = ''" + title + "'>" + options[counter] +"</li>\n"
        }
        elements += "</ol>";
        return elements;
    };
}

/*OTHER*/function MultipleChoiceQuestionOther(title, text, options=[]) {


    MultipleChoiceQuestion.call(this, title, text, options);

    let mCQOToHTML = this.toHTML;
    let otherGetAnswers = this.getAnswers;

    this.toHTML = function() {
        let elements = mCQOToHTML.call(this);

        elements += "<p>Other: <input id = '"+ title + "_other' type ='text' name = 'other'></p>";
        return elements;
    };
}

function MultipleSelectQuestion(title, text, options=[]) {

    Question.call(this, title, text);

    let mSQToHTML = this.toHTML;

    this.toHTML = function() {
        let elements = mSQToHTML.call(this);

        elements += "<ol id ='" + title + "' type = a>\n";
        for (let counter = 0; counter < options.length; counter++) {
            elements += "<li><input type = 'checkbox' name = '" + title + "'>" + options[counter] +"</li>\n"
        }
        elements += "</ol>";
        return elements;
    };
}

/*OTHER*/function MultipleSelectQuestionOther(title, text, options=[]) {


    MultipleSelectQuestion.call(this, title, text, options);

    let mSQOToHTML = this.toHTML;
    let otherGetAnswers = this.getAnswers;

    this.toHTML = function() {
        let elements = mSQOToHTML.call(this);

        elements += "<p>Other: <input id = '"+ title + "_other' type ='text' name = 'other'></p>";
        return elements;
    };
}

function InputQuestion(title, text){

    Question.call(this, title, text);

    let iQToHTML = this.toHTML;

    this.toHTML = function() {
        let elements = iQToHTML.call(this);

        elements += "<p>Please type your answer here: <input id='"+ title +"' type ='text' name = '" + title + "'></p>";
        return elements;
    };
}

function QuestionSection(title, questions =[]){
  this.toHTML = function () {
    let elements = "<h2>" + title + "</h2>";
     for (let counter = 0; counter < questions.length; counter++) {
        elements += questions[counter].toHTML();
     }
     return elements;
    };

    this.getAnswers = function() {
      let answers = {};

      for (let counter = 0; counter < questions.length; counter++) {
       answers[questions[counter].title] = questions[counter].getAnswers();
      }
      return answers;
    };
}

function Survey(title, sections) {
    this.toHTML = function () {
        let elements = "<h1>" + title + "</h1>";
        for (let counter = 0; counter < sections.length; counter++) {
            elements += sections[counter].toHTML();
        }
        elements += "<input id = 'submit' type = 'button' value = 'SUBMIT'>\n";
        return elements;
    };
}

function createSurveyQuestions() {
    let q1 = new MultipleSelectQuestionOther(
        "Status", "What is your status at PCC? ( select  more than one if applicable)",
        [

            "Full time student",
            "Part time student",
            "GED student",
            "High School dual enrollment",
            "International Student",
            "Work Study",
            "Full time Faculty",
            "Part time Faculty",
            "Full time staff",
            "Part time staff",
            "Management"

        ]
    );

    let q2 = new MultipleSelectQuestion("Location", "What location do you primarily spend your time when at PCC? (IF equally split between campuses - circle both)",
        [

            "Cascade Campus",
            "Rock Creek Campus",
            "Southeast Campus",
            "Sylvania Campus",
            "Online courses only",
            "Other PCC Center/location"

        ]

    );

    let q3 = new InputQuestion("Zip Code", "What is your Zip Code?");

    let q11 = new MultipleChoiceQuestionOther("Current Housing", " What type of housing do you currently live in?",
        [

        "House",
        "Condominium/Townhouse",
        "Apartment",
        "Duplex",
        "Mobile Home",
        "Homeless (if yes skip to #16)"

        ]
    );

    let q12 = new MultipleChoiceQuestion("Rent or Own", "Is your living space rented or owned?",
        [

            "Rent",
            "Own"

        ]
    );


    let s1 = new QuestionSection("Demographics", [q1, q2, q3]);

    let s2 = new QuestionSection("Housing", [q11, q12]);

    return new Survey("PCC Housing Insecurity Survey", [s1, s2]);
}



window.onload= function onLoad(){

    let survey = createSurveyQuestions();

    function submit() {
        console.log("submitted");
    }

    document.getElementById("survey").innerHTML = survey.toHTML();
    document.getElementById("submit").addEventListener("click", submit);
};



