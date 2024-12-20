let structure = document.getElementsByClassName("structure")[0]
let map = document.getElementsByClassName("map")[0]
let select = undefined
let items = []
var selects = new Set()
var navigation = new Navigation(fileStructure)
var selectionBox = document.createElement("div")
var startX = 0
var startY = 0
var currentX = 0
var currentY = 0
var isDragging = false;
selectionBox.classList.add('selection-box')

var createMap = function() {
	map.innerHTML = ""
	map.appendChild(navigation.getPathHTML(refresh))
}

var refresh = function() {
	createMap()
	openFolder(navigation.readFolder())
}

structure.addEventListener("click", () => {
	allDeselect()
}, true)

structure.addEventListener("mousedown", (event) => {
	startX = event.clientX
	startY = event.clientY - structure.getBoundingClientRect().top
	isDragging = true;
	selectionBox.style.left = `${startX}px`;
  	selectionBox.style.top = `${startY}px`;
  	selectionBox.style.width = "0px";
  	selectionBox.style.height = "0px";
	structure.appendChild(selectionBox)
})

structure.addEventListener("mousemove", (event) => {
	if (!isDragging) return false;
	currentX = event.clientX
	currentY = event.clientY - structure.getBoundingClientRect().top
	selectionBox.style.width = `${Math.abs(currentX - startX)}px`;
  	selectionBox.style.height = `${Math.abs(currentY - startY)}px`;
	selectionBox.style.left = `${Math.min(startX, currentX)}px`;
	selectionBox.style.top = `${Math.min(startY, currentY)}px`;
	const boxRect = selectionBox.getBoundingClientRect();
	console.log(`Seleção:`, boxRect);
})

structure.addEventListener("mouseup", (event) => {
	isDragging = false;
	structure.removeChild(selectionBox)

})

document.addEventListener("contextmenu", (event) => {
  event.preventDefault(); // Impede o menu padrão de aparecer
});

var openFolder = function(folder) {
	structure.innerHTML = ""
	for (let i = 0; i < folder.length; i++) {
		itemStructure = folder[i]
		item = new Item(
			{
				index: i,
				name: itemStructure.name,
				type: (itemStructure.type === "folder") ? (itemStructure.items.length === 0) ? "emptyFolder" : "filledFolder" : `${itemStructure.name.split(".").pop(-1)}File`,
				items: itemStructure.items,
				fnAllDesselect: allDeselect,
				fnDblClick: (folderName) => {
					navigation.nextPath(folderName)
					openFolder(navigation.readFolder())
					refresh()
				},
			}
		)
		structure.appendChild(item.getElement())
		items.push(item)
	}
}
refresh()


//console.log(navigation.getPathHTML())
