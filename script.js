let album = [
  "alaska-810433_1280.jpg",
  "anime-8788959_1280.jpg",
  "atmosphere-8752835_1280.png",
  "blue-tit-8521052_1280.jpg",
  "hurricane-92968_1280.jpg",
  "lake-2896379_1280.jpg",
  "moorente-8783210_1280.jpg",
  "sea-2563389_1280.jpg",
  "snow-bunting-6781122_1280.jpg",
  "snow-leopard-cubs-8039138_1280.jpg",
  "travel-8785493_1280.jpg",
  "winter-1675197_1280.jpg",
];

let descriptions = ["snowy mountains in alska",
    "city drawn in anime style",
    "atmospheric thunderstorm cells",
    "blue tilt sitting an a branch",
    "topview of an hurricane eye",
    "picture of a blue lake",
    "moorente in a sea",
    "man standing on a rock in the middle of a sea",
    "snow bunting sitting on a rock",
    "two snowleopard cubs sitting on a rock",
    "view of a mountains summit",
    "one tree covered in snow"
]

function loadAlbum() {
  let targetContainer = document.getElementById("albumWrapper");
  for (let index = 0; index < album.length; index++) {
    targetContainer.innerHTML += getAlbumPictureTemplate(index);
  }
}

function openDialog(event) {
  const dialog = document.getElementById("pictureViewer");
  dialog.showModal();
}

function openDialogWithEnter(event, filename) {
    if (event.key === 'Enter'){
        openDialog(event);
        loadDialogElementsOnOpening(filename);
        event.stopPropagation();
    }
    
}

function loadDialogElementsOnOpening(filename) {
  updateDialogPicture(filename);
  updateDialogPictureTitle(filename);
  updateCurrentPictureCounter(filename);
}

function closeDialog() {
  const dialog = document.getElementById("pictureViewer");
  dialog.close();
}

function updateDialogPicture(filename) {
  const element = document.getElementById("singlePictureView");
  element.src = `./assets/img/${filename}`;
}

function updateDialogPictureTitle(filename) {
  const element = document.getElementById("pictureTitle");
  let filetypeIndex = filename.indexOf(".");
  element.innerText = filename.slice(0, filetypeIndex);
}

function updateCurrentPictureCounter(filename) {
  const element = document.getElementById("currentPictureIndicator");
  element.innerText = `${album.indexOf(filename) + 1} / ${album.length}`;
}

function getIndexOfNewElements(direction) {
  let currentPictureName = document.getElementById("pictureTitle").innerText;
  for (let indexOfNewElements = 0; indexOfNewElements < album.length;indexOfNewElements++) {
    if (album[indexOfNewElements].includes(currentPictureName) === true) {
      indexOfNewElements = indexOfNewElements + direction;
      if (indexOfNewElements < 0) {
        indexOfNewElements = album.length - 1;
      } else if (indexOfNewElements >= album.length) {
        indexOfNewElements = 0;
      }
      return indexOfNewElements;
    }
  }
}

function updateDialogElements(event, direction) {
  let indexOfNewElements = getIndexOfNewElements(direction);
  updateDialogPicture(album[indexOfNewElements]);
  updateDialogPictureTitle(album[indexOfNewElements]);
  updateCurrentPictureCounter(album[indexOfNewElements]);
  event.stopPropagation();
}

// Template functions

function getAlbumPictureTemplate(index) {
  return `<img aria-haspopup="dialog" aria-controls="picture-viewer" aria-label="${descriptions[index]}" onclick="openDialog(event), loadDialogElementsOnOpening('${album[index]}')" onkeydown="openDialogWithEnter(event, '${album[index]}')" tabindex="1" class='album-picture' src="./assets/img/${album[index]}" alt="${descriptions[index]}"></img>`;
}
