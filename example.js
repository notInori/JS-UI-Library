import InoriUILib from './Library.js'; //Import UI Library
  
// --- Example usage

// --- Creating a window
const floatingWindow = new InoriUILib('Example UI', 400, 500); // Param 1 is the title. Param 2 is width of the window. Param 3 is height of the window. May add resizing in the future.
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
                                                                // Param 2 is the name of the variable it's state is stored to. 
                                                                // Param 3 is the sate when loaded.
                                                                // Param 4 is an optional passed function that is ran onClick.
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

floatingWindow.addCustomSelect('Options:', ['Option 1', 'Option 2', 'Option 3'], (selectedOption) => { // These are dropdowns. Param 1 is a label. Param 2 is object list for options. Param 3 is for a passed onclick function.
    console.log(`Selected: ${selectedOption}`);
});

// Settings Section
floatingWindow.addSection('Settings')
floatingWindow.addCustomSelect('Accent Color:', ['Red', 'Orange', 'Yellow', 'Blue', 'Pink', 'Purple'], (selectedOption) => {
    floatingWindow.container.style.setProperty('--accent-color', selectedOption);
});


  