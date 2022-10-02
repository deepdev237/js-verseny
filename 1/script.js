function ShowOrNot(element) {
  element = element.id.slice(0, -6) + 'Text'
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
    document.getElementById('clock').innerHTML=dt.getHours() + ':' + dt.getMinutes();
}, 1000)
});