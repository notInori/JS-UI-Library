// --- Example Script written by Inori

import InoriUILibrary from './Library.js'; //Import UI Library
  
// --- Creating a window
// const window = new InoriUILibrary(title, width, height, autoShow)
// title is the name of the window
// width is the width of the window
// height is the height of the wndow
// autoShow is optional and decides whether the window shows when the UI is loaded. It is set to true by defualt.
const exampleWindow = new InoriUILibrary('Inori JS UI Library', 400, 500);

exampleWindow.createWindow(); // Create UI Window

// --- Add controls to the window

//Introduction

exampleWindow.addLabel('This is a simple UI Library pasted from ChatGPT.') 
exampleWindow.addSection('This is a section');
exampleWindow.addLabel('This is a label') 
exampleWindow.addCheckbox('This is a checkbox', 'flag1', false, (ischecked) => {
    console.log("Checkmark 1 set to", ischecked);
    exampleWindow.log("Checkmark 1 set to " + ischecked)
}); 

exampleWindow.addSection('Checkboxes');

// These are checkboxes
// windowName.addCheckbox(text, inputName, startingState, callbackFunctionWhenClicked)
// text is the text shown next to the textbox
// inputName is the what the checkbox name will be set too
// startingstate is optional and sets whether it is on of off.
// callBackFunctionWhenClick is a callback function that is ran when the checkbox is clicked. It can be used to pass the state of the checkbox.

exampleWindow.addCheckbox('This is a checkbox', 'flag2', false, (isChecked) => {  // May change to using a table for each type of controls, i.e Toggle.myToggle and Inputs.myInput
    // Demonstrate how change in checkbox state can be handled. Here we display whether it is enabled or disabled
    console.log("Checkmark 2 set to", isChecked);
    exampleWindow.log("Checkmark 2 set to " + isChecked)

  });
exampleWindow.addCheckbox('This is a checkbox', 'flag3', false, (isChecked) => {
    console.log ("Checkmark 3 set to", isChecked);
    exampleWindow.log("Checkmark 3 set to " + isChecked)

});

exampleWindow.addSection('Buttons')
exampleWindow.addLabel('These are buttons') 

//  These are buttons
//  window.addButton(text, callBackFunctionWhenCLicked)
//  text is the text shown
//  callbackFunctionWhenClicked is option and ran when the button is clicked

exampleWindow.addButton('Button 1', () => { 
    // Callback function used to display that the button has been pressed
    console.log('Button 1 clicked'); // Log to console
    exampleWindow.log("Button 1 Clicked") // log to UI Lib Event Log
});
exampleWindow.addButton('Button 2', () => {
    console.log('Button 2 clicked');
    exampleWindow.log("Button 2 Clicked")
});

exampleWindow.addSection('Textboxes')
exampleWindow.addLabel('This is an input field:')

// These are text fields
// window.addTextBox(hintText)
// hintText is optional and shows when the textbox is empty.
// You can add a label with window.addLabel for a more traditional look which is done just before

exampleWindow.addTextBox('Enter text'); // Create a textbox with the hint "Enter text"

exampleWindow.addSection('Dropdowns')

// window.addDropdown(Label, optionsAsObjectList, startingOption, callBackFunctionOnChange)
// The label is optional(set to undefined) and can be placed under a checkbox for a combined control
// The startingOption can be used as a hint text too
// The callback function is optional and can pass the option that was selected.

// Create a dropdown with the label 'options' and three option choices. Outputs selected option when one is chosen.
exampleWindow.addDropdown('Options:', ['Option 1', 'Option 2', 'Option 3'], "Option 1",(selectedOption) => {
    console.log(`Selected: ${selectedOption}`);
    exampleWindow.log(`Selected: ${selectedOption}`);
});

// Event Log Demo

exampleWindow.createLogWindow(); // Creates an Event Log Window

var eventLogType = undefined

exampleWindow.addSection('Event Log Demo');
exampleWindow.addDropdown('Log Type:', ['None', 'Warning', 'Error',], 'None', (selectedOption) => { 
    eventLogType = selectedOption == "None"? undefined : selectedOption;
});

exampleWindow.addTextBox('Log Message:', 'Enter text');
exampleWindow.addButton('Send Log', sendLog);
exampleWindow.addButton('Clear Log', () => {
    exampleWindow.logControlsContainer.innerHTML = "";
});

function sendLog(){
    if (exampleWindow.controls[18][2].value != ""){
        // window.log(text, warningType)
        // warningType is optional and produced a normal log when undefined.
        // supported warningTypes include Warning and Error
        exampleWindow.log(exampleWindow.controls[18][2].value, eventLogType); 
    }
    else{
        exampleWindow.log("Log text content missing!", 'Error')  // Example of error thrown. We have set it to throw an eror if the user tries to print a log without a message.
    }
}

// Fetching controls

exampleWindow.addSection('Fetching Controls Demo')

exampleWindow.addCheckbox('Enable Astolfo Background', 'flag4', false);
console.log(exampleWindow.controls) // Object list of all controls in UI

// Use exampleWindow.controls[index] to reference the object you want to access

// Example of setting a onclick event after declaration.
exampleWindow.controls[22][1].addEventListener('click', (event) =>{
if (event.target.checked){
    exampleWindow.container.style.background = "url('https://i.pinimg.com/originals/80/07/89/8007897740592f98baabd85f2b6b806e.jpg') center center / cover no-repeat";
    exampleWindow.controlsContainer.style.background = '#00000040';
}
else{
    exampleWindow.controlsContainer.style.background = '';
    exampleWindow.container.style.background = '';
}
exampleWindow.log("Astolfo Background set to "+event.target.checked)
});

// Settings Section
exampleWindow.addSection('Settings')

exampleWindow.addDropdown('Accent Color:', ['Red', 'Orange', 'Yellow', 'Blue', 'Pink', 'Purple'], "Pink", (selectedOption) => {
    const elements = document.querySelectorAll('.Inori-UI-Library'); // All window instances are isolated and therefore the accent color must be changed for each window individually
    elements.forEach(function(element) {
        element.style.setProperty('--accent-color', selectedOption);
    });
});

exampleWindow.addCheckbox('Show Event Log', 'flag5', false, (isChecked) => {
    if (isChecked){
        exampleWindow.logWindow.style.display = '';
    }
    else{
        exampleWindow.logWindow.style.display = 'none';
    }
});

// Creating a watermark
// window.createWatermark(text)
// text is text shown in the watermark

exampleWindow.createWatermark('Inori JS UI Library | v1.0'); // Creates a watermark

exampleWindow.addCheckbox('Watermark', 'flag6', false, (isChecked) => {
    if (isChecked){
        exampleWindow.watermark.style.display = ''; // watermark can be referenced as window.watermark.
    }                                                // might add autoshow param and .show function
    else{
        exampleWindow.watermark.style.display = 'none';
    }
});

exampleWindow.addTextBox('Watermark Text');// Param 1 is optional hint text that is shown when the textbox is empty.

setInterval(function(){
    const watermarkText = exampleWindow.controls[27][2].value != ""? exampleWindow.controls[27][2].value : exampleWindow.title
    exampleWindow.watermark.firstChild.innerHTML = watermarkText + " | v1.0 | " + exampleWindow.getCurrentTime();
})

console.log(exampleWindow.controls) // Object list of all controls in UI

// --- Setup A Key To Open/Close Menu
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      exampleWindow.show()
    }
});