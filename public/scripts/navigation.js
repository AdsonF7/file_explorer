
function Navigation(fileStructure) {
    let _path = []

    this.getPath = function() {
        return `/${_path.join("/")}`
    }

    this.getPathHTML = function(fnRefresh) {
        let element = document.createElement("div")
        element.append("/")
        for (let i = -1; i < _path.length; i++) {
            let elementRoute = document.createElement("div")
            elementRoute.innerText = (i === -1) ? "root" : _path[i]
            element.appendChild(elementRoute)
            elementRoute.addEventListener("click", () => {
                this.setPath(this.getPath().slice(0, i + 1))
                fnRefresh()
            })
            element.append("/")
        }
        return element
    }

    this.nextPath = function(folder) {
        _path.push(folder)
    }

    this.backPath = function() {
        _path.pop(-1)
    }

    this.getPath = function() {
        return _path
    }

    this.setPath = function(folderPath) {
        _path = folderPath
    }

    this.readFolder = function() {
        current = fileStructure
        for (let i = 0; i < _path.length; i++) {
            let directory = current.find(x => x.name == _path[i] && x.type == "folder")
            if (directory.length === 0) throw "Folder not exists"
            else if (directory.length > 1) throw "Folder not unique"
            current = directory.items
        }
        return current
    }
}
