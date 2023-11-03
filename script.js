import FloatingWindow from './main.js'; // Path to UI Library
  
// Example usage:
const floatingWindow = new FloatingWindow('My Floating Window', 400, 500);
// Create UI Window
floatingWindow.createWindow();
floatingWindow.addLabel('This is a simple UI Library pasted from ChatGPT.')
// Add controls to the window
floatingWindow.addSection('This is a section');
floatingWindow.addLabel('This is a label')
floatingWindow.addCheckbox('This is a checkbox', 'flag1', false);
floatingWindow.addSection('Checkboxes');
floatingWindow.addCheckbox('This is a checkbox', 'flag2', false);
floatingWindow.addCheckbox('This is a checkbox', 'flag3', false);
floatingWindow.addSection('Buttons')
floatingWindow.addLabel('This is a button')
floatingWindow.addButton('Button 1', () => {
    console.log('Button 1 clicked');
});
floatingWindow.addButton('Button 2', () => {
    console.log('Button 2 clicked');
});
floatingWindow.addSection('Textboxes')
floatingWindow.addLabel('This is an input field:')
floatingWindow.addTextBox('Enter text');
floatingWindow.addSection('Dropdowns')
floatingWindow.addCustomSelect('Options:', ['Option 1', 'Option 2', 'Option 3'], (selectedOption) => {
console.log(`Selected: ${selectedOption}`);
});
floatingWindow.addSection('Settings')
floatingWindow.addCustomSelect('Accent Color:', ['Red', 'Orange', 'Yellow', 'Blue', 'Pink', 'Purple'], (selectedOption) => {
floatingWindow.container.style.setProperty('--accent-color', selectedOption);
});


  