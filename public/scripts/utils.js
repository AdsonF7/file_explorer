var types = {
    emptyFolder: { classes: ["folder", "empty-folder-icon"] },
    filledFolder: { classes: ["folder", "filled-folder-icon"] },
    pdfFile: { classes: ["file", "pdf-file-icon"]},
    mp3File: { classes: ["file", "mp3-file-icon"]},
    unknownFile: { classes: ["file", "unknown-file-icon"]}
}

var fnListEqual = function(l1, l2) {
    if (l1.length === l2.length) {
        if (l1.length === 0) return true
        else if (new Set(l1).difference(new Set(l2)).size == 0) return true
    }
    return false
}

var allDeselect = function() { 
    items.map(x => x.deselect())
    selects.clear()
}

var isCtrlPressed = false;
var isShiftPressed = false;

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        isCtrlPressed = true;
    }
    if (event.shiftKey) {
        isShiftPressed = true;
    }
});

document.addEventListener('keyup', function(event) {
    if (!event.ctrlKey) {
        isCtrlPressed = false;
    }
    if (event.shiftKey) {
        isShiftPressed = false;
    }
});
