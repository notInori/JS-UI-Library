import InoriUILibrary from './Library.js'; //Import UI Library
  
// --- Example usage

// --- Creating a window
const floatingWindow = new InoriUILibrary('Inori JS UI Library', 400, 500); // Param 1 is the title. 
                                                                     //Param 2 is width of the window. 
                                                                    // Param 3 is height of the window. May add resizing in the future.
                                                                    // Param 4 sets whether the window should be shown on creation. Is true by default
floatingWindow.createWindow(); // Create UI Window

// --- Add controls to the window

//Introduction
floatingWindow.addLabel('This is a simple UI Library pasted from ChatGPT.')
floatingWindow.addSection('This is a section');
floatingWindow.addLabel('This is a label') 
floatingWindow.addCheckbox('This is a checkbox', 'flag1', false); 

floatingWindow.addSection('Checkboxes');

// These are checkboxes
floatingWindow.addCheckbox('This is a checkbox', 'flag2', false, (isChecked) => {
    console.log("Checkmark 1 is set to", isChecked);
  });
                                                                // Param 1 is the text displayed. 
                                                                // Param 2 is the name of the checkbox. 
                                                                // Param 3 is the sate when loaded.
                                                                // Param 4 is an optional passed function that is ran onClick.
                                                                // It also has a callback to retreive it's value but it's recommended to seperate UI and logic.
                                                                // i.e Create a onclick function later using it's 'controls' index to reference the control.
floatingWindow.addCheckbox('This is a checkbox', 'flag3', false);

floatingWindow.addSection('Buttons')
floatingWindow.addLabel('This is a button') 

//These are buttons
floatingWindow.addButton('Button 1', () => { // Param 1 is the value displayed in the button. Param 2 is an optional passed function that is ran onClick.
    console.log('Button 1 clicked'); 
});
floatingWindow.addButton('Button 2', () => {
    console.log('Button 2 clicked');
});

floatingWindow.addSection('Textboxes')
floatingWindow.addLabel('This is an input field:')

// These are text fields
floatingWindow.addTextBox('Enter text');// Param 1 is optional hint text that is shown when the textbox is empty.

floatingWindow.addSection('Dropdowns')

floatingWindow.addCustomSelect('Options:', ['Option 1', 'Option 2', 'Option 3'], "Option 1",(selectedOption) => { // These are dropdowns. Param 1 is a label. Param 2 is object list for options. Param 3 is for a passed onclick function.
    console.log(`Selected: ${selectedOption}`);
});

// Fetching controls

var eventLogType = undefined

floatingWindow.addSection('Event Log Demo');
floatingWindow.addCustomSelect('Log Type:', ['None', 'Warn', 'Error',], 'None', (selectedOption) => { 
    eventLogType = selectedOption == "None"? undefined : selectedOption;
});

floatingWindow.addLabel('Log Message:');
floatingWindow.addTextBox('Enter text');// Param 1 is optional hint text that is shown when the textbox is empty.
floatingWindow.addButton('Send Log', sendLog);
floatingWindow.addButton('Clear Log', () => {
    floatingWindow.logControlsContainer.innerHTML = "";
});

function sendLog(){
    if (floatingWindow.controls[22].value != ""){
            floatingWindow.log(floatingWindow.controls[22].value, eventLogType);
    }
    else{
        floatingWindow.log("Log text content missing!", 'Error')
    }
}

// Fetching controls

floatingWindow.addSection('Fetching Controls Demo')

floatingWindow.addCheckbox('Set background blue', 'flag4', false);
console.log(floatingWindow.controls) // Object list of all controls in UI
// Use floatingWindow.controls[index] to reference the object you want to access
// Setting a onclick event after declaration.
floatingWindow.controls[26].addEventListener('click', (event) =>{
if (event.target.checked){
    document.documentElement.style.background = 'blue';
}
else{
    document.documentElement.style.background = '';
}
});

// Settings Section
floatingWindow.addSection('Settings')
floatingWindow.addCustomSelect('Accent Color:', ['Red', 'Orange', 'Yellow', 'Blue', 'Pink', 'Purple'], "Pink", (selectedOption) => {
    // floatingWindow.container.style.setProperty('--accent-color', selectedOption);
    const elements = document.querySelectorAll('.floating-window'); // Select all elements with the class "myClass"
    elements.forEach(function(element) {
    element.style.setProperty('--accent-color', selectedOption);
    });
});

floatingWindow.createLogWindow();

floatingWindow.addCheckbox('Show Event Log', 'flag5', false, (isChecked) => {
    if (isChecked){
        floatingWindow.logWindow.style.display = '';
    }
    else{
        floatingWindow.logWindow.style.display = 'none';
    }
});

floatingWindow.createWatermark('Inori JS UI Library | v1.0');

floatingWindow.addCheckbox('Watermark', 'flag6', false, (isChecked) => {
    if (isChecked){
        floatingWindow.watermark.style.display = '';
    }
    else{
        floatingWindow.watermark.style.display = 'none';
    }
});

floatingWindow.addTextBox('Watermark Text');// Param 1 is optional hint text that is shown when the textbox is empty.

setInterval(function(){
    const watermarkText = floatingWindow.controls[34].value != ""? floatingWindow.controls[34].value : floatingWindow.title
    floatingWindow.watermark.firstChild.innerHTML = watermarkText + " | v1.0 | " + floatingWindow.getCurrentTime();
})

console.log(floatingWindow.controls) // Object list of all controls in UI


// --- Setup A Key To Open/Close Menu
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      floatingWindow.show()
    }
  });
