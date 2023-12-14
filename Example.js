// --- Example Script written by Inori

// Import the UI Library
import InoriUILibrary from './Library.js'; //Import UI Library
  
// ----- Creating a UI Instance

// Creating an instance
// const window = new InoriUILibrary(title, width, height, autoShow)
// title is the name of the window
// width is the width of the window
// height is the height of the wndow
// autoShow is optional and decides whether the window shows when the UI is loaded. It is set to true by defualt.
const exampleWindow = new InoriUILibrary('Inori JS UI Library', 400, 500);

// ----- Creating a main window
exampleWindow.createWindow();

// ------ Add controls to the window

// Introduction
// Example content this will be all explained seperately later

// Create label
exampleWindow.addLabel('This is a simple UI Library pasted from ChatGPT.') 
// Example Section
exampleWindow.addSection('This is a section');
// Create label
exampleWindow.addLabel('This is a label') 
// Create checkbox
exampleWindow.addCheckbox('This is a checkbox', 'flag1', false, (ischecked) => { // Passed state through callback function
    // Log click event and state of the checkmark using passed state
    exampleWindow.log("Checkmark 1 set to " + ischecked)
}); 


// ------ Checkboxes

// Create section for checkboxes
exampleWindow.addSection('Checkboxes');

// These are checkboxes
// windowName.addCheckbox(text, inputName, startingState, callbackFunctionWhenClicked)
// text - string - is the text shown next to the textbox
// inputName - string - is the what the checkbox name will be set too
// startingstate (optional) - boolean - sets whether it is on of off.
// callBackFunctionWhenClick (optional) - callback function that is ran when the checkbox is clicked. It can be used to pass the state of the checkbox.
// May change to using a table for each type of controls, i.e Toggle.myToggle and Inputs.myInput

// Create an example checkbox
exampleWindow.addCheckbox('This is a checkbox', 'flag2', false, (isChecked) => {  // Passing the state of the checkmark through callback function
    // Log click event and state of the checkmark using passed state
    exampleWindow.log("Checkmark 2 set to " + isChecked)
});

// Create another example checkbox
exampleWindow.addCheckbox('This is a checkbox', 'flag3', false, (isChecked) => {
    // Log click event and state of the checkmark using passed state
    exampleWindow.log("Checkmark 3 set to " + isChecked)
});

// ----- Buttons

// Create section for buttons
exampleWindow.addSection('Buttons')
// Create label for buttons
exampleWindow.addLabel('These are buttons') 

//  These are buttons
//  window.addButton(text, callBackFunctionWhenCLicked)
//  text - string - is the text shown in the button
//  callbackFunctionWhenClicked (optional) is a callback function ran after the button is pressed.

// Create an example button
exampleWindow.addButton('Button 1', () => { 
    // Callback function used log to eventLog and that button was pressed.
    exampleWindow.log("Button 1 Clicked") 
});

// Create an example button
exampleWindow.addButton('Button 2', () => {
    // Callback function used log to eventLog and that button was pressed.
    exampleWindow.log("Button 2 Clicked")
});


// ----- Textboxes

// Create section for textboxes
exampleWindow.addSection('Textboxes')

// These are text fields
// window.addTextbox(label, hintText)
// label (optional) - string - is the label shown for the textbox
// hintText (optional) - string - is the text shown when the textbox is empty.

// Creating example input field
exampleWindow.addTextbox('This is an input field:', 'Enter text'); // Create a textbox with the label "This is an input field:" with the hint "Enter text"

// ----- Dropdowns

// Create section for dropdowns
exampleWindow.addSection('Dropdowns')

// These are dropdowns
// window.addDropdown(Label, optionsAsObjectList, startingOption, callBackFunctionOnChange)
// label (optional) - string -  is the label for the dropdown. It can be left undefined to allow it to be combined underneath other controls.
// startingOption (optional) - string - is used as the option selected when it's first loaded
// callback function (optional) is the callback function ran when an option is selected and can pass the option that was selected.

// Creating a dropdown with dummy options
exampleWindow.addDropdown('Options:', ['Option 1', 'Option 2', 'Option 3'], "Option 1",(selectedOption) => {
    // Logging chosen option to demonstrate it working using passed value through callback
    exampleWindow.log(`Selected: ${selectedOption}`);
});

// ----- Event Log Demo

// ------ Creating an Event Log Window
exampleWindow.createEventLogWindow(); 

var eventLogType = undefined // Stores event log type chosen from user

// Create section for Event Log Demo
exampleWindow.addSection('Event Log Demo');

// Create dropdown with Event Log Options for demo
exampleWindow.addDropdown('Log Type:', ['None', 'Warning', 'Error',], 'None', (selectedOption) => {
    // Store chosen event log type for use later using callback
    eventLogType = selectedOption == "None"? undefined : selectedOption; 
});

// Create text input for log message
exampleWindow.addTextbox('Log Message:', 'Enter text'); 
// Create button that sends log
exampleWindow.addButton('Send Log', sendLog); 
// Create button that clears log
exampleWindow.addButton('Clear Log', () => {
    exampleWindow.clearEventLog(); // This function clears the event log
});

// Sends a log using inputs from UI
function sendLog(){
    if (exampleWindow.controls[17][2].value != ""){ // Check log message from control isn't empty.

        // This is how to send a log
        // window.log(text, warningType)
        // text - string - is the message shown with the log
        // warningType(optional) - string - specifies the type of log. If left undefined produces a normal log.
        // supported warningTypes include Warning and Error
        exampleWindow.log(exampleWindow.controls[17][2].value, eventLogType); // Sends log with set event log type from controls
    }
    else{
        // Output error log if the message input is blank
        exampleWindow.log("Log text content missing!", 'Error')
    }
}

// ----- Fetching controls

// This is an example of how you can fetch controls after creation 
// This is not recommended as the indexes are static and inserting controls will change all index references for controls after it. 
// This will be addressed in an update that will introduce dynamic indexing which will assign each control a permanent reference. 

// Create section for Fetching Controls Demo
exampleWindow.addSection('Fetching Controls Demo')

// Create a checkbox for setting background as astolfo
exampleWindow.addCheckbox('Enable Astolfo Background', 'flag4', false);

// List array of all controls in controls object list
console.log(exampleWindow.controls);
// We do this to get the index reference of the control we are trying to reference.
// Open the console and hover through the array outputted to find the control.

// Use exampleWindow.controls[index] to reference the object you want to access
// exampleWindow.controls[index][index2] must be used for inputs
// exampleWindow.controls[index][2] is to reference the input itself
// Example of setting a onclick event after declaration.

// Add event listener to onClick of Sent Event Log by referencing it after creation
exampleWindow.controls[21][2].addEventListener('click', (event) =>{ 
    // The state of control is still passed here
    if (event.target.checked){ // State of checkmark can be true or false and works as condition
        
        const backgroundURL = "https://i.pinimg.com/originals/80/07/89/8007897740592f98baabd85f2b6b806e.jpg"
        // Set Astolfo Wallpaper
        exampleWindow.container.style.background = "url('"+ backgroundURL+"') center center / cover no-repeat"; 
        exampleWindow.controlsContainer.style.background = '#00000040';
    }
    else{
        // Remove Astolfo Wallpaper
        exampleWindow.controlsContainer.style.background = '';
        exampleWindow.container.style.background = '';
    }
    // Log to event log with checkmark state
    exampleWindow.log("Astolfo Background set to "+event.target.checked) 
});

// ----- Images

// Creating an image container and providing it with a url and using 100% width and 100px height 
exampleWindow.addImage('https://images.scrolller.com/atto/bun-on-the-bed-codyblue-731-9p6j69l8l5-901x1280.jpg', undefined, 100)

// ----- Settings

// Create section for settings
exampleWindow.addSection('Settings')

// Create a dropdown with accent color options
exampleWindow.addDropdown('Accent Color:', ['Red', 'Orange', 'Yellow', 'Blue', 'Pink', 'Purple'], "Pink", (selectedOption) => { 
    // Set accent color using dropdown state passed through callback function
    exampleWindow.setAccentColor(selectedOption) // As they are HTML color codes we can pass them directly to the setAccentColor() function
});

// Create checkbox to toggle watermark visiblity.
exampleWindow.addCheckbox('Show Event Log', 'flag5', false, (isChecked) => {
    exampleWindow.show(exampleWindow.eventLogWindow, isChecked) // We can use that passed state to toggle between showing the watermark and hiding it
});

// ----- Watermark

// Creating a watermark
// window.createWatermark(text, alignment, autoShow)
// text - string - is text shown in the watermark
// alignment (optional) - string - can be set to 'left' or 'right to control the alignment of the watermark. Default is 'right'
// autoShow (optional) - boolean - sets whether it is shown on creation. Default is false. 

// Creating a watermark
exampleWindow.createWatermark('Inori JS UI Library | v1.0'); 

// Create a checkmark to allow toggling of watermark visiblity
exampleWindow.addCheckbox('Watermark', 'flag6', false, (isChecked) => { // callback that passes the checked state of the watermark
    exampleWindow.show(exampleWindow.watermark,isChecked) // We can use that passed state to toggle between showing the watermark and hiding it
});

// Create a textbox that is part of the checkmark control above it by having no label.
exampleWindow.addTextbox(undefined,'Watermark Text'); 

// Function for auto updating watermark text with clock
setInterval(function(){
    const watermarkText = exampleWindow.controls[27][2].value != ""? exampleWindow.controls[27][2].value : exampleWindow.title;
    // set watermark to watermark input text + ' v1.0' + current time
    exampleWindow.setWatermarkText(watermarkText + " | v1.0 | " + exampleWindow.getCurrentTime());
})

// Create a dropdown to allow setting of the watermark alignemnt
exampleWindow.addDropdown("Watermark Alignment",["Left","Right"],"Right",(selectedOption) => {
    // Pass the selected option to the setWatermarkAlignment() function
    exampleWindow.setWatermarkAlignment(selectedOption.toLowerCase());
})

// ----- Destroying the UI
exampleWindow.addButton("Unload UI",() => {
    exampleWindow.destroy(); // This function must be placed in an arrow function to work
})

// ----- Github 

// Buttons for linking back to repo and documentation
exampleWindow.addSection("Info")
exampleWindow.addButton("Github Page", function() { window.location.href = "https://github.com/notInori/JS-UI-Library" })
exampleWindow.addButton("Documentation", function() { window.location.href = "https://github.com/notInori/JS-UI-Library/blob/main/Documentation.md" })

// List array of all controls in controls object list
console.log(exampleWindow.controls) 

// ----- Setup A Key To Open/Close Menu
exampleWindow.bindMenuKey('Escape')
