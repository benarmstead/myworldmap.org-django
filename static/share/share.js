var modal = document.getElementById("myModal");
var btn = document.getElementById("shareBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function copyShareUrl() {
  var copyText = document.getElementById("shareUrl");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}

function copiedMessage(message) {
  document.getElementById("copiedMessage").innerHTML = message;

  setTimeout(function () {
    document.getElementById("copiedMessage").innerHTML = "";
  }, 3000);
}
