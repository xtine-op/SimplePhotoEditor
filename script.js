// To Activate choose button
const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider= document.querySelector(".slider input"),
rotateOptions= document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-image img"),
resetFilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-image"),
saveImgBtn = document.querySelector(".save-image");


chooseImgBtn.addEventListener("click", ()=>fileInput.click());

//To show selected filter value
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipVertical= 1, flipHorizontal= 1;

// Code below applies the filters respectively.
const applyFilters = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipVertical}, ${flipHorizontal})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}


 const loadImage = () => {
    let file = fileInput.files[0]; //getting user selected file
    if(!file)return; //return if user has not selected file

    //console.log(file); activate to check whether it is working
    previewImg.src = URL.createObjectURL(file); //passing file url as preview img src
    previewImg.addEventListener("load", ()=> {
      resetFilterBtn.click(); // clicking reset btn, so the filter value reset if the user select new img
        document.querySelector(".container").classList.remove("disable"); //To remove the disable buttons set when image is loaded

    });
 }

 filterOptions.forEach(option => {
    option.addEventListener("click", () => { //adding a listener to all filter buttons
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "inversion"){
          filterSlider.max = "100";
          filterSlider.value = inversion;
          filterValue.innerText = `${inversion}%`;
         }
        else if(option.id === "brightness"){
         filterSlider.max = "200";
         filterSlider.value = brightness;
         filterValue.innerText = `${brightness}%`;
        }
        else if(option.id === "saturation"){
         filterSlider.max = "200";
         filterSlider.value = saturation;
         filterValue.innerText = `${saturation}%`;
        }
         else{
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
         }


    });
    
 });
 const updateFilter = ()=>{
    //console.log(filterSlider.value); To check in he console whether the slider is working
    //Adding filter values 
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active"); //getting selected filter button

    if (selectedFilter.id === "brightness"){
      brightness = filterSlider.value; // if selected filter is brightness, pass the slider value as brightness value
    }else if(selectedFilter.id === "saturation"){
      saturation = filterSlider.value;
    }else if(selectedFilter.id === "inversion"){
      inversion = filterSlider.value;
    }else{
      grayscale = filterSlider.value;
 }
 applyFilters();
}

rotateOptions.forEach(option => { 
  option.addEventListener("click", () => { //adding a listener to all rotate buttons
    if(option.id === "left"){
      rotate -= 90; // if cliced buton is left rotate, decrement rotate value by -90

    }
    else if(option.id === "right"){
      rotate += 90; // if cliced buton is left rotate, increment rotate value by -90
    }
    else if(option.id === "horizontal"){
      // if HORIZONTAL flip value is 1, set this value to -1 else set 1
      flipHorizontal = flipHorizontal=== 1? -1 : 1;
    }
    else {
      // if VERTICAL flip value is 1, set this value to -1 else set 1
      flipVertical = flipVertical=== 1? -1 : 1;
    }
    applyFilters();


  });
});
const resetFilter = () => {
  // reseting all variable value to its default value
   brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
   rotate = 0; flipVertical= 1; flipHorizontal= 1;
   filterOptions[0].click(); //clicking brightness btn, so the brightness is selected by default.
   applyFilters();
} 
const saveImage = () => {
 const canvas = document.createElement("canvas"); // creating canvas element
 const ctx = canvas.getContext("2d");  //canvas.getContext return a drawing context on the canvas
 canvas.width = previewImg.naturalWidth; // setting canvas width to actual image width
 canvas.height = previewImg.naturalHeight; //setting canvas height to actual image height

 //applying user selected filters to canvas filter
 ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
 ctx.translate(canvas.width / 2, canvas.height / 2); // translating canvas from center
 if(rotate !== 0){ //if rotate value isn't 0, rotate the canvas
  ctx.rotate(rotate * Math.PI / 180);

 }
 ctx.scale (flipVertical, flipHorizontal); //flip canvas, horizontally / vertically
 ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
 

  const link  = document.createElement("a"); // creating <a> element
  link.download = "image.jpg"; // passing <A> tag download value to "image.jpg"
  link.href = canvas.toDataURL(); // passing <A> tag href value to canvas data url
  link.click(); //clicking <a> tag so the image downloads
}

fileInput.addEventListener("change",loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());



//Adding light and dark mode
var mode = document.getElementById("mode");
mode.onclick = function(){
  document.body.classList.toggle("dark-theme"); //switches to dark theme when clicked.
  if(document.body.classList.contains("dark-theme")){
    mode.src = "sun.png";
  }
  else{
    mode.src = "moon.png";
  }
}