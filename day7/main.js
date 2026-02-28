const input = document.getElementById("file");
const img = document.getElementById("preview");

input.onchange = function () {
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    img.src = reader.result;
  };

  reader.readAsDataURL(file);
};