function Item({index, name, type, items, fnAllDesselect, fnDblClick}) {

    
    let _index = index
    let _name = name
    let _items = items
    let _element = undefined
    let _fnAllDeselect = fnAllDesselect
    let _fnDblClick = fnDblClick
    let _hasselect = false
    let _type = type
    let _parent = undefined

    let _render = function() {
        let elementDiv = document.createElement("div")
        let elementP = document.createElement("p")
        let classes = types[_type] || types.unknownFile
        if (classes !== undefined) {
            for (let i = 0; i < classes.classes.length; i++) {
                elementDiv.classList.add(classes.classes[i])
            }
        }
        elementP.innerText = name
        elementDiv.appendChild(elementP)
        return elementDiv
    }

    _element = _render()

    _element.addEventListener("click", () => {
        if (!isCtrlPressed && !fnListEqual(selects, [_index])) {
            _fnAllDeselect()
            this.select()
            selects.add(_index)
            console.log(selects)
        }
        else if (isCtrlPressed) {
            if (_hasselect) {
                this.deselect()
                selects.delete(_index)
            }
            else {
                this.select()
                selects.add(_index)
            }
            
        }
    })

    _element.addEventListener("dblclick", () => {
        if (_type === "emptyFolder" || _type === "filledFolder") {
            _fnDblClick(_name)
        }
    })

    this.getName = function() {
        return _name;
    };

    this.getItems = function() {
        return _items;
    }

    this.getElement = function() {
        return _element;
    }

    
    this.select = function() {
        _hasselect = true
        _element.classList.add("select")
    }

    this.deselect = function() {
        _hasselect = false
        _element.classList.remove("select")
    }
}