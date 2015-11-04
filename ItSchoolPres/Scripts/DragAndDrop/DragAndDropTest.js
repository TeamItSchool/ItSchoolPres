var goodAnswer = 0;
var scopeTimer;

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
        var scopeTimerShow = document.getElementById("scopeTimer");
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
    accept: '#yes-drop, #no-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        if (draggableElement.id == "yes-drop" && scopeTimer > 0) {
            draggableElement.textContent = 'Dragged in';
        } else if (draggableElement.id == "no-drop") {
            draggableElement.style.background = "#ff0000";
            draggableElement.textContent = 'Désole tu t\'es trompé';
        } else if (draggableElement.id = "yes-drop" && scopeTimer == 0) {
            draggableElement.style.background = "#ff0000";
            draggableElement.textContent = 'Désole c\'est trop tard';
        }
    },
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');
        event.relatedTarget.textContent = 'Dragged out';
    },
    ondrop: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;
        if (draggableElement.id == "no-drop")
            draggableElement.textContent = 'Désole tu t\'es trompé';
        else if (draggableElement.id == "yes-drop" && scopeTimer == 0)
            draggableElement.textContent = 'Désole c\'est trop tard';
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});

