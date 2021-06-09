/*
VARIABLE
*/
let string = '';

document.querySelectorAll(".drop-zone-input").forEach(element => {
    const dropZoneElement = element.closest(".drop-zone");

    dropZoneElement.addEventListener("click", e => {
        element.click();
    });

    element.addEventListener("change", e => {
        let output = document.getElementById("file-content");

        if (!element.files[0].type.startsWith("text/")) {
            alert("Make sure your file format is a .txt");
            return;
        }

        // create an instance of fileReader
        var reader = new FileReader();

        // load the whole content of the .txt file 
        reader.onload = function (e) {

            // show the result in a <pre></pre> tag
            output.innerHTML = this.result;
            // convert string to an array (remove all enter symbol from a string)
            string = e.target.result.replace(/(\r\n|\n|\r)/gm, "").split("");

            // show in console the result of getSquareSize function
            console.log(getSquareSize());
        };
        reader.readAsText(element.files[0]);

    });

    dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone-over");
    });

    ["dragleave", "dragend"].forEach(type => {
        dropZoneElement.addEventListener(type, e => {
            dropZoneElement.classList.remove("drop-zone-over");
        })
    });

    dropZoneElement.addEventListener("drop", e => {
        e.preventDefault();
        console.log(e.dataTransfer.files);
        if (e.dataTransfer.files.length) {
            element.files = e.dataTransfer.files;
        }

        dropZoneElement.classList.remove("drop-zone-over");
        readFile(element.files);
    });

});

/*
*   readFile allows to read any .txt file and convert it to an array
*/
function readFile(file) {
    let output = document.getElementById("file-content");

    if (!file[0].type.startsWith("text/")) {
        alert("Make sure your file format is a .txt");
        return;
    }

    // create an instance of fileReader
    var reader = new FileReader();

    // load the whole content of the .txt file 
    reader.onload = function (e) {

        // show the result in a <pre></pre> tag
        output.innerHTML = this.result;
        // convert string to an array (remove all enter symbol from a string)
        string = e.target.result.replace(/(\r\n|\n|\r)/gm, "").split("");

        // show in console the result of getSquareSize function
        console.log(getSquareSize());
    };
    reader.readAsText(file[0]);
}

/*
*   getSquareSize return the size of the square
*/
function getSquareSize() {
    let size = string.length;
    let sqrt = Math.sqrt(size);

    // check if the sqrt is an integer
    if (sqrt % 1 == 0) {
        //return width = height
        return sqrt;
    } else {
        alert("Pattern in file must be a square !");
        return null;
    }
}