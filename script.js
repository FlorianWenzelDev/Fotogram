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

function loadAlbum() {
  let targetContainer = document.getElementById("album-wrapper");
  for (let index = 0; index < album.length; index++) {
    targetContainer.innerHTML += getAlbumPictureTemplate(index);
  }
}

function openDialog(event) {
  const dialog = document.getElementById("picture-viewer");
  dialog.showModal();
  event.stopPropagation();
}

function loadDialogElementsOnOpening(filename) {
  updateDialogPicture(filename);
  updateDialogPictureTitle(filename);
  updateCurrentPictureCounter(filename);
}

function closeDialog() {
  const dialog = document.getElementById("picture-viewer");
  dialog.close();
}

function updateDialogPicture(filename) {
  const element = document.getElementById("single-picture-view");
  element.src = `./assets/img/${filename}`;
}

function updateDialogPictureTitle(filename) {
  const element = document.getElementById("picture-title");
  let filetypeIndex = filename.indexOf(".");
  element.innerText = filename.slice(0, filetypeIndex);
}

function updateCurrentPictureCounter(filename) {
  const element = document.getElementById("current-picture-indicator");
  element.innerText = `${album.indexOf(filename) + 1} / ${album.length}`;
}

function getIndexOfNewElements(direction) {
  let currentPictureName = document.getElementById("picture-title").innerText;
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
  return `<img onclick="openDialog(event), loadDialogElementsOnOpening('${album[index]}')" class='album-picture' src="./assets/img/${album[index]}" alt="${album[index]}"></img>`;
}
