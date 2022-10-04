function ShowOrNot(element) {
    element = element.id.replace("Button", "Text");
    element = document.getElementById(element);
    if (element.style.display === "block") {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
}

var images = [
    "https://www.w3schools.com/howto/img_nature_wide.jpg",
    "https://www.w3schools.com/howto/img_snow_wide.jpg",
];

window.addEventListener("load", (event) => {
    setInterval(() => {
        let dt = new Date();
        document.getElementById("clock").innerHTML = dt.toLocaleTimeString();
    }, 1000);

    let current_Image = 0;

    $("#imgButton").click(function () {
        if (current_Image != images.length) {
            $("#no_img_text").hide();
            $("#image").attr("src", images[current_Image]);
            $('#image').show();
            current_Image += 1
        } else {
            current_Image = 0;
            $("#no_img_text").show();
            $("#no_img_text").html("Vége<br>Nyomd meg a gombot!");
            $('#image').hide();
        }
    });
});