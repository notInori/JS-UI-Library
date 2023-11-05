// --- Example Script written by Inori

import InoriUILibrary from './Library.js'; //Import UI Library
  
// --- Creating a window
// const window = new InoriUILibrary(title, width, height, autoShow)
// title is the name of the window
// width is the width of the window
// height is the height of the wndow
// autoShow is optional and decides whether the window shows when the UI is loaded. It is set to true by defualt.
const floatingWindow = new InoriUILibrary('Inori JS UI Library', 400, 500);

floatingWindow.createWindow(); // Create UI Window

// --- Add controls to the window

//Introduction

floatingWindow.addLabel('This is a simple UI Library pasted from ChatGPT.') 
floatingWindow.addSection('This is a section');
floatingWindow.addLabel('This is a label') 
floatingWindow.addCheckbox('This is a checkbox', 'flag1', false, (ischecked) => {
    console.log("Checkmark 1 set to", ischecked);
    floatingWindow.log("Checkmark 1 set to " + ischecked)
}); 

floatingWindow.addSection('Checkboxes');

// These are checkboxes
// windowName.addCheckbox(text, inputName, startingState, callbackFunctionWhenClicked)
// text is the text shown next to the textbox
// inputName is the what the checkbox name will be set too
// startingstate is optional and sets whether it is on of off.
// callBackFunctionWhenClick is a callback function that is ran when the checkbox is clicked. It can be used to pass the state of the checkbox.

floatingWindow.addCheckbox('This is a checkbox', 'flag2', false, (isChecked) => {  // May change to using a table for each type of controls, i.e Toggle.myToggle and Inputs.myInput
    // Demonstrate how change in checkbox state can be handled. Here we display whether it is enabled or disabled
    console.log("Checkmark 2 set to", isChecked);
    floatingWindow.log("Checkmark 2 set to " + isChecked)

  });
floatingWindow.addCheckbox('This is a checkbox', 'flag3', false, (isChecked) => {
    console.log ("Checkmark 3 set to", isChecked);
    floatingWindow.log("Checkmark 3 set to " + isChecked)

});

floatingWindow.addSection('Buttons')
floatingWindow.addLabel('These are buttons') 

//  These are buttons
//  window.addButton(text, callBackFunctionWhenCLicked)
//  text is the text shown
//  callbackFunctionWhenClicked is option and ran when the button is clicked

floatingWindow.addButton('Button 1', () => { 
    // Callback function used to display that the button has been pressed
    console.log('Button 1 clicked'); // Log to console
    floatingWindow.log("Button 1 Clicked") // log to UI Lib Event Log
});
floatingWindow.addButton('Button 2', () => {
    console.log('Button 2 clicked');
    floatingWindow.log("Button 2 Clicked")
});

floatingWindow.addSection('Textboxes')
floatingWindow.addLabel('This is an input field:')

// These are text fields
// window.addTextBox(hintText)
// hintText is optional and shows when the textbox is empty.
// You can add a label with window.addLabel for a more traditional look which is done just before

floatingWindow.addTextBox('Enter text'); // Create a textbox with the hint "Enter text"

floatingWindow.addSection('Dropdowns')

// window.addDropdown(Label, optionsAsObjectList, startingOption, callBackFunctionOnChange)
// The label is optional(set to undefined) and can be placed under a checkbox for a combined control
// The startingOption can be used as a hint text too
// The callback function is optional and can pass the option that was selected.

// Create a dropdown with the label 'options' and three option choices. Outputs selected option when one is chosen.
floatingWindow.addDropdown('Options:', ['Option 1', 'Option 2', 'Option 3'], "Option 1",(selectedOption) => {
    console.log(`Selected: ${selectedOption}`);
    floatingWindow.log(`Selected: ${selectedOption}`);
});

// Event Log Demo

floatingWindow.createLogWindow(); // Creates an Event Log Window

var eventLogType = undefined

floatingWindow.addSection('Event Log Demo');
floatingWindow.addDropdown('Log Type:', ['None', 'Warning', 'Error',], 'None', (selectedOption) => { 
    eventLogType = selectedOption == "None"? undefined : selectedOption;
});

floatingWindow.addLabel('Log Message:');
floatingWindow.addTextBox('Enter text');
floatingWindow.addButton('Send Log', sendLog);
floatingWindow.addButton('Clear Log', () => {
    floatingWindow.logControlsContainer.innerHTML = "";
});

function sendLog(){
    if (floatingWindow.controls[22].value != ""){
        // window.log(text, warningType)
        // warningType is optional and produced a normal log when undefined.
        // supported warningTypes include Warning and Error
        floatingWindow.log(floatingWindow.controls[22].value, eventLogType); 
    }
    else{
        floatingWindow.log("Log text content missing!", 'Error')  // Example of error thrown. We have set it to throw an eror if the user tries to print a log without a message.
    }
}

// Fetching controls

floatingWindow.addSection('Fetching Controls Demo')

floatingWindow.addCheckbox('Enable Astolfo Background', 'flag4', false);
console.log(floatingWindow.controls) // Object list of all controls in UI

// Use floatingWindow.controls[index] to reference the object you want to access

// Example of setting a onclick event after declaration.
floatingWindow.controls[26].addEventListener('click', (event) =>{
if (event.target.checked){
    floatingWindow.container.style.background = "url('https://i.pinimg.com/originals/80/07/89/8007897740592f98baabd85f2b6b806e.jpg') center center / cover no-repeat";
    floatingWindow.controlsContainer.style.background = '#00000040';
}
else{
    floatingWindow.controlsContainer.style.background = '';
    floatingWindow.container.style.background = '';
}
floatingWindow.log("Astolfo Background set to "+event.target.checked)
});

// Settings Section
floatingWindow.addSection('Settings')
floatingWindow.addDropdown('Accent Color:', ['Red', 'Orange', 'Yellow', 'Blue', 'Pink', 'Purple'], "Pink", (selectedOption) => {
    const elements = document.querySelectorAll('.Inori-UI-Library'); // All window instances are isolated and therefore the accent color must be changed for each window individually
    elements.forEach(function(element) {
        element.style.setProperty('--accent-color', selectedOption);
    });
});

floatingWindow.addCheckbox('Show Event Log', 'flag5', false, (isChecked) => {
    if (isChecked){
        floatingWindow.logWindow.style.display = '';
    }
    else{
        floatingWindow.logWindow.style.display = 'none';
    }
});

// Creating a watermark
// window.createWatermark(text)
// text is text shown in the watermark

floatingWindow.createWatermark('Inori JS UI Library | v1.0'); // Creates a watermark

floatingWindow.addCheckbox('Watermark', 'flag6', false, (isChecked) => {
    if (isChecked){
        floatingWindow.watermark.style.display = ''; // watermark can be referenced as window.watermark.
    }                                                // might add autoshow param and .show function
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
