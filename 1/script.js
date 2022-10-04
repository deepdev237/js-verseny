function ShowOrNot(element) {
  element = element.id.replace("Button", "Text");
  element = document.getElementById(element);
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

window.addEventListener('load', (event) => {
  setInterval(() =>{
    var dt = new Date();
    document.getElementById('clock').innerHTML=dt.toLocaleTimeString();
}, 1000)
});