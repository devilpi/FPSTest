/**
 * 锁鼠标
 */

PointerLock = function (title, description) {

    var createBlocker = function () {
        let blocker = document.createElement("div");
        blocker.id = "blocker";
        blocker.style.position = "absolute";
        blocker.style.width = "100%";
        blocker.style.height = "100%";
        blocker.style.backgroundColor = "rgba(0,0,0,0.5)";
        return blocker;
    };
    var createInstructions = function (title, description) {
        let instructions = document.createElement("div");
        instructions.id = "instructions";
        instructions.style.width = "100%";
        instructions.style.height = "100%";
        instructions.style.paddingTop = "20%";
        instructions.style.color = "#ffffff";
        instructions.style.textAlign = "center";
        instructions.style.cursor = "pointer";
        let text = document.createElement("span");
        text.style.fontSize = "40px";
        text.appendChild(document.createTextNode(title));
        instructions.appendChild(text);
        instructions.appendChild(document.createElement("br"));
        instructions.appendChild(document.createTextNode(description));
        return instructions;
    };

    var blocker = createBlocker();
    var instructions = createInstructions(title, description);
    blocker.appendChild(instructions);
    document.body.appendChild(blocker);

    var controlsEnabled = false;
    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

    if ( havePointerLock ) {

        var element = document.body;

        var pointerlockchange = function ( event ) {
            if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {
                controlsEnabled = true;
                blocker.style.display = "none";
            }
            else {
                controlsEnabled = false;
                blocker.style.display = "inline";
            }
        };

        var pointerlockerror = function ( event ) {
            blocker.style.display = 'inline';
        };

        // Hook pointer lock state change events
        document.addEventListener( 'pointerlockchange', pointerlockchange, false );
        document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
        document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

        document.addEventListener( 'pointerlockerror', pointerlockerror, false );
        document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
        document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

        instructions.addEventListener( 'click', function ( event ) {
            // Ask the browser to lock the pointer
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
            element.requestPointerLock();
        }, false );

    } else {

        instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

    }

    this.locked = function () {
        return !controlsEnabled;
    }

};
