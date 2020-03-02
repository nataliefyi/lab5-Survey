function lightMode() {
    document.body.classList.toggle("lightmode");
}

function Question(title, text) {
    this.title = title;
    this.text = text;



    this.toHTML = function() {
        let elements = "";
        elements += "<h3>" + this.number + ". " + this.title + "</h3>\n";
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
            elements += "<li><input type = 'radio' name = '" + title + "' value = '" + options[counter] + "'>" + options[counter] + "</li>\n"
        }
        elements += "</ol>";
        return elements;
    };

    this.getAnswers = function() {
        let answers = {};
        let inputs = document.getElementById(title).getElementsByTagName('input');

        for (let counter = 0; counter < inputs.length; counter++) {
            answers[inputs[counter].value] = inputs[counter].checked;
        }

        return answers;
    };
}

/*OTHER*/function MultipleChoiceQuestionOther(title, text, options=[]) {


    MultipleChoiceQuestion.call(this, title, text, options);

    let mCQOToHTML = this.toHTML;
    let otherGetAnswers = this.getAnswers;


    this.toHTML = function() {
        let elements = mCQOToHTML.call(this);

        elements += "<p>Other: <input id = '"+ title + "_other' type ='text' name = 'other' value=''></p>";
        return elements;
    };

    this.getAnswers = function() {
        let answers = otherGetAnswers.call(this);
        let input = document.getElementById(title + "_other");
        answers["Other"] = input.value;

        return answers;
    };
}

function MultipleSelectQuestion(title, text, options=[]) {

    Question.call(this, title, text);

    let mSQToHTML = this.toHTML;

    this.toHTML = function() {
        let elements = mSQToHTML.call(this);

        elements += "<ol id ='" + title + "' type = a>\n";
        for (let counter = 0; counter < options.length; counter++) {
            elements += "<li><input type = 'checkbox' name = '" + title + "' value = '" + options[counter] + "'>" + options[counter] +"</li>\n"
        }
        elements += "</ol>";
        return elements;
    };

    this.getAnswers = function() {
        let answers = {};
        let inputs = document.getElementById(title).getElementsByTagName('input');

        for (let counter = 0; counter < inputs.length; counter++) {
            answers[inputs[counter].value] = inputs[counter].checked;
        }

        return answers;
    };
}

/*OTHER*/function MultipleSelectQuestionOther(title, text, options=[]) {


    MultipleSelectQuestion.call(this, title, text, options);

    let mSQOToHTML = this.toHTML;
    let otherGetAnswers = this.getAnswers;

    this.toHTML = function() {
        let elements = mSQOToHTML.call(this);

        elements += "<p>Other: <input id = '" + title + "_other' type ='text' name = 'other' value=''></p>";
        return elements;
    };

    this.getAnswers = function() {
        let answers = otherGetAnswers.call(this);
        let input = document.getElementById(title + "_other");
        answers["Other"] = input.value;

        return answers;
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

    this.getAnswers = function() {
        let answers = {};
        let input = document.getElementById(title);
        answers[title] = input.value;

        return answers;
    };
}

function QuestionSection(title, questions =[]){
    this.title = title;
  this.toHTML = function() {
    let elements = "<h2>Section " + this.number +": " + title + "</h2>";
     for (let counter = 0; counter < questions.length; counter++) {
        elements += questions[counter].toHTML();
     }
     return elements;
    };
  this.getAnswers = function() {
      let answers = {};
      for (let counter = 0; counter < questions.length; counter++){
          answers[questions[counter].title] = questions[counter].getAnswers();
      }
      return answers;
  };
}

function Survey(title, sections =[]) {
    this.toHTML = function () {
        let elements = "<h1>" + title + "</h1>";
        for (let counter = 0; counter < sections.length; counter++) {
            elements += sections[counter].toHTML();
        }
        elements += "<input id = 'submit' type = 'button' value = 'SUBMIT'>\n";
        return elements;
    };

    this.getAnswers = function() {
        let answers = {};
        for (let counter = 0; counter < sections.length; counter++){
            answers[sections[counter].title] = sections[counter].getAnswers();
        }
        return answers;
    };

}



window.addEventListener("load", function () {
    let survey = createSurveyQuestions();

    function submit() {
        let answers = survey.getAnswers();
        let form = document.createElement('form');
        form.method = 'POST';
        form.action = 'submit_survey.php';
        form.innerHTML = '<input type="hidden" name="answers" value="' + encodeURIComponent(JSON.stringify(answers)) + '">';
        document.getElementsByTagName('body')[0].appendChild(form);
        form.submit();
    }

    document.getElementById("survey").innerHTML = survey.toHTML();
    document.getElementById("submit").addEventListener("click", submit);

});



