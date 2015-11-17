function AddContent() {
    localStorage.clear;

    var quiz2 = {
        Question: document.getElementById("question2").value,
        BadAnswer1: document.getElementById("answer1Question2").value,
        GoodAnswer: document.getElementById("answer2Question2").value,
        BadAnswer2: document.getElementById("answer3Question2").value,
        BadAnswer3: document.getElementById("answer4Question2").value
    };
    localStorage.setItem('quiz2', JSON.stringify(quiz2));

    var quiz3 = {
        Question: document.getElementById("question3").value,
        BadAnswer1: document.getElementById("answer1Question3").value,
        GoodAnswer: document.getElementById("answer2Question3").value,
        BadAnswer2: document.getElementById("answer3Question3").value,
        BadAnswer3: document.getElementById("answer4Question3").value
    };
    localStorage.setItem('quiz3', JSON.stringify(quiz3));

    alert(obj.Elements[0]);
}