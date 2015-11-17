var scopeTimer;
var sentAnswer = "no answer here";


var dragElement1 = document.getElementById("badanswer1");
var dragElement2 = document.getElementById("goodanswer");
var dragElement3 = document.getElementById("badanswer2");
var dragElement4 = document.getElementById("badanswer3");

var idDragList = [
    dragElement1,
    dragElement2,
    dragElement3,
    dragElement4,
];

var questionImage = document.createElement("img");

var quiz1 = [
    "Quel animal est-ce  : ",
    "un éléfant",
    "un éléphant",
    "un éléphan",
    "un et les phans"
];

/*
var quiz2 = [
    "Combien font 3 x 3 ? [déplace le bon résultat]",
    "6",
    "12",
    "33",
    "9"
];*/

/*var quiz3 = [
    "\"Maître cobeau sur un arbre [déplace le mot manquant]\"",
    "perché",
    "planté",
    "asséché",
    "alléché"
];*/

var quiz2 = JSON.parse(localStorage.getItem('quiz2'));
var quiz3 = JSON.parse(localStorage.getItem('quiz3'));

var goodCount = 0;
var previousCount = goodCount;
var goodCountShow = document.querySelector('#goodCount');
if (goodCount == 0 || goodCount == 1)
    goodCountShow.innerHTML = "Bonne réponse : " + goodCount;
else if (goodCount > 1)
    goodCountShow.innerHTML = "Bonnes réponses : " + goodCount;

var question = document.getElementById("question");
var questionContinuation = document.createElement("span");

function changeIdOrder() {
    if (goodCount == 0) {
        question.textContent = quiz1[0];
        questionImage.setAttribute("src", "/Medias/Images/elephant.png");
        question.appendChild(questionImage);
        questionContinuation.textContent = "[déplace le bon orthographe]";
        question.appendChild(questionContinuation);
        for (var i = 0; i < idDragList.length; i++) {
            idDragList[i].textContent = quiz1[i + 1];
        }
    }
    else if (goodCount == 1) {
        idDragList[0].id = "badanswer1";
        idDragList[1].id = "badanswer2";
        idDragList[2].id = "badanswer3";
        idDragList[3].id = "goodanswer";
        question.textContent = quiz2.Question;

        idDragList[3].textContent = quiz2.GoodAnswer;
        idDragList[0].textContent = quiz2.BadAnswer2;
        idDragList[1].textContent = quiz2.BadAnswer1;
        idDragList[2].textContent = quiz2.BadAnswer3;
    }
    else if (goodCount == 2) {
        idDragList[0].id = "goodanswer";
        idDragList[1].id = "badanswer1";
        idDragList[3].id = "badanswer2";
        idDragList[2].id = "badanswer3";
        question.textContent = quiz3.Question;

        idDragList[3].textContent = quiz3.BadAnswer1;
        idDragList[0].textContent = quiz3.GoodAnswer;
        idDragList[1].textContent = quiz3.BadAnswer3;
        idDragList[2].textContent = quiz3.BadAnswer2;
    }
    else if (goodCount = 3) {
        alert("Bravo tu a gagné !");
        window.location = 'http://localhost:34531/Home';
    }
}

function checkElement(draggableElement, elem) {
    if (draggableElement.id == "goodanswer" && scopeTimer > 0) {
        draggableElement.textContent = 'Bonne réponse ';
        elem.setAttribute("src", "/Medias/Images/emoticon85.png");
        draggableElement.appendChild(elem);
        goodCount++;
    } else if (draggableElement.id == "badanswer1" || draggableElement.id == "badanswer2" || draggableElement.id == "badanswer3") {
        draggableElement.style.background = "#ff0000";
        draggableElement.textContent = 'Désole tu t\'es trompé';
    } else if (draggableElement.id = "goodanswer" && scopeTimer == 0) {
        draggableElement.style.background = "#ff0000";
        draggableElement.textContent = 'Bonne réponse. Trop tard ';
        elem.setAttribute("src", "/Medias/Images/sad35.png");
        draggableElement.appendChild(elem);
    }
}

changeIdOrder();

var goodAnswerOriginalText = document.getElementById("goodanswer").textContent;
var badAnswer1OriginalText = document.getElementById("badanswer1").textContent;
var badAnswer2OriginalText = document.getElementById("badanswer2").textContent;
var badAnswer3OriginalText = document.getElementById("badanswer3").textContent;

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
        }
        if (timer == 0) {
            scopeTimer = 0;
            alert("C\'est terminé, tu peux recommencer si tu le désire :)" )
            window.location = 'http://localhost:34531/Home';
        }
        else
            scopeTimer = timer;
    }, 1000);
}

// Here the teacher should have the choice
window.onload = function () {
    var chosenMinutes = 60 * 1,
        display = document.querySelector('#time');
    startTimer(chosenMinutes, display);
    setInterval(function () {
        var scopeTimerShow = document.querySelector('#scopeTimer');
        scopeTimerShow.innerHTML = scopeTimer;
    }, 1000);
};

/* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */
// target elements with the "draggable" class
interact('.draggable')
  .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      // enable autoScroll
      autoScroll: true,

      // call this function on every dragmove event
      onmove: dragMoveListener,
      // call this function on every dragend event
      onend: function (event) {
          var textEl = event.target.querySelector('p');

          textEl && (textEl.textContent =
            'moved a distance of '
            + (Math.sqrt(event.dx * event.dx +
                         event.dy * event.dy)|0) + 'px');
      }
  });

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '#goodanswer, #badanswer1, #badanswer2, #badanswer3',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
    },
    //Here we control the text inside draggable element entering in the drop zone when it's an accepted one
    ondragenter: function (event) {
        //we define here the draggable element in used & the dropzone target
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        var elem = document.createElement("img");

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');

        checkElement(draggableElement, elem);
        
        //Remove the comments below if drag divs are centered
        changeIdOrder();
        goodAnswerOriginalText = document.getElementById("goodanswer").textContent;
        badAnswer1OriginalText = document.getElementById("badanswer1").textContent;
        badAnswer2OriginalText = document.getElementById("badanswer2").textContent;
        badAnswer3OriginalText = document.getElementById("badanswer3").textContent;

        goodCountShow.innerHTML = "Bonne réponse : " + goodCount;
        
    },

    //Here we control the text inside draggable element exiting in the drop zone when it's an accepted one
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        //we define here the draggable element in used
        var draggableElement = event.relatedTarget;

        switch (draggableElement.id) {
            case "goodanswer":
                draggableElement.textContent = goodAnswerOriginalText;
                break;
            case "badanswer1":
                draggableElement.textContent = badAnswer1OriginalText;
                break;
            case "badanswer2":
                draggableElement.textContent = badAnswer2OriginalText;
                break;
            case "badanswer3":
                draggableElement.textContent = badAnswer3OriginalText;
                break;
            default:
                break;
        }
        draggableElement.style.background = "#29e";
    },

    ondrop: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        var elem = document.createElement("img");

        //Comment below will not be useful if drag divs are centered
        if (goodCount != previousCount) {
            checkElement(draggableElement, elem);
            goodCount--;
            previousCount = goodCount;
            goodCountShow.innerHTML = "Bonne réponse : " + goodCount;
            changeIdOrder();
            goodAnswerOriginalText = document.getElementById("goodanswer").textContent;
            badAnswer1OriginalText = document.getElementById("badanswer1").textContent;
            badAnswer2OriginalText = document.getElementById("badanswer2").textContent;
            badAnswer3OriginalText = document.getElementById("badanswer3").textContent;
        }

        function getPosition(element) {
            var xPosition = 0;
            var yPosition = 0;

            while (element) {
                xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
                yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                element = element.offsetParent;
            }
            return { x: xPosition, y: yPosition };
        }
        console.log(getPosition(draggableElement));
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});

