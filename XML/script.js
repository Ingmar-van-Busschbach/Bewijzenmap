// bind HTML id
let loadDoc = document.getElementById("loadDoc");
// koppel eventlistener
loadDoc.addEventListener('click', ajax);
// ajax functie

function ajax() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("txt").innerHTML = this.responseText;
      }
    };
    xmlhttp.open("GET", "text.txt", true);
    xmlhttp.send();
  }
