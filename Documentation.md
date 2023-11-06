# Inori JS UI Library Documentation

## Contents
- [Global Variables](#global-variables)
- [Functions](#Functions)
- [Importing the UI Library](#importing-the-ui-library)
- [Creating a UI Class Instance](#creating-a-ui-class-instance)
    - [Constructor](#constructor)
- [Creating a Window](#creating-a-window)
- [Binding Show Menu Key](#binding-show-menu-key)
- [Window Controls](#window-controls)
    - [Types of Controls](#types-of-controls)
    - [Adding Controls](#adding-controls)
    - [Removing Controls](#removing-controls)
    - [Referencing Controls](#referencing-controls)
- [Showing and Hiding Windows](#showing-and-hiding-windows)
- [Watermarks](#watermarks)
    - [Referencing the watermark](#referencing-the-watermark)
    - [Creating a watermark](#creating-a-watermark)
    - [Moving the watermark](#moving-the-watermark)
    - [Changing the watermark](#changing-the-watermark)
- [Event Log](#event-log)
    - [Creating an Event Log Window](#creating-an-event-log-window)  
    - [Creating a Log](#creating-a-log)
    - [Type of Logs](#types-of-logs)
    - [Clearing the Event Log](#clearing-the-event-log)
- [Destroying the UI](#destroying-the-ui)

## Global Variables
|                          | Type            | Functions                                             | Usage                                                                                                                       |
|--------------------------|-----------------|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| window                   | UI Class Object | .createWindow<br>.createLogWindow<br>.createWatermark | .title = window title<br>.height = height of window<br>.width = width of window<br>.autoShow = shows the window when loaded |
| window.container         | HTML Object     |                                                       | Object for UI Window                                                                                                        |
| window.controlsContainer | HTML Object     |                                                       | Object for Window Controls                                                                                                  |
| window.eventLogWindow    | HTML Object     |                                                       | Object for Event Log Window                                                                                                 |
| window.eventLogContainer | HTML Object     |                                                       | Object for Event Log Window Logs                                                                                            |
| window.controls          | Object List     |                                                       | Contains references to all controls in main window.                                                                         |
| window.watermark         | HTML Object     |                                                       | Object for watermark                                                                                                        |

## Functions
| Function                      | Purpose                                          | Usage                                     |
|-------------------------------|--------------------------------------------------|-------------------------------------------|
| window.createWindow()         | Creates the main window for the UI Library.      | window.createWindow()                     |
| window.createEventLogWindow() | Creates the event log window for the UI Library. | window.createEventLogWindow()             |
| window.createWatermark()      | Creates the watermark for the UI Library.        | window.createWatermark(text,autoShow)     |
| window.dragElement()          | Makes any HTML element draggable.                | window.dragElement(parent,dragableHandle) |
| window.show()                 | Shows/Hides the main window.                     | window.show()                             |
| window.log()                  | Creates a log entry in the Event Log.            | window.log(Message,logType)               |
| window.getCurrentTime()       | Returns the current time in the format HH:MM:SS  | window.getCurrentTime()                   |
| window.destroy                | Destroys all UI                                  | window.destroy()                          |

## Importing the UI Library
Firstly, to create a new UI Class instance you must import the UI library. It is recommended that you download a copy of [Library.js](https://github.com/notInori/JS-UI-Library/blob/main/Library.js) and host it alongside your website.

Then at the start of your script import the library like this:  
```js
 import InoriUILibrary from './Library.js';
 ```  
Replace the path at the end with the one for your copy.

## Creating A UI Class Instance

To create a new UI Library instance you use the class constuctor like this.
We will be using `window` as the name of your object for storing an instance of the UI Library class.

### Constructor
```js
const window = new InoriUILibrary(titleName, width, height, autoShow)
```
#### Arguments  
`titleName` - The title of the window that will be created.  
`width` - Sets the width of the window.  
`height` - Sets the height of the window.  
`autoShow`(optional) - Whether the watermark should be displayed when it's created. Set to `True` by default.


## Creating a Window
To create a window we simple use the `window.createWindow()` function.
This will create the main menu window. It will only show automatically if the autoShow flag is set to true. If not it is recommended to bind a show key.

## Binding Show Menu Key
To bind a key to show the menu we can use the `window.show()` function which went invoked shows or hides the menu depending on whether it is visible.
We can add a `keydown` eventListener to bind a key to this function.  

For example:
```js
document.addEventListener('keydown', function(event) {  
    if (event.key === 'Escape') {  
      window.show()  
    }
});
```

Replace `'Escape'` with the key that you want to bind the menu to.

## Window Controls

### Types of Controls

| Type of Control | Function      | Parameters                           |
|-----------------|---------------|--------------------------------------|
| Label           | addLabel()    | text                                 |
| Button          | addButton()   | text,onClick                         |
| Textbox         | addTextBox()  | label,placeholder                    |
| Checkbox        | addCheckbox() | label,checkboxName,isChecked,onClick |
| Section         | addSection()  | text                                 |
| Dropdown        | addDropDown   | text,options,firstOption,onSelect    |

#### Labels
```js
window.addLabel(text)
```
##### Arguments
`text` - Sets the text content of the the label.  

#### Buttons
```js
window.addButton(text, onClick)
```
##### Arguments
`text` - Sets the text value of the button.  
`onClick` - Callback function for the button is pressed.

#### Textbox
```js
window.addTextbox(label, placeholder)
```

##### Arguments
`label`(optional) - Sets a label for the textbox.  
`placeholder`(optional) - Sets placeholder text for the input when it is empty.

#### Checkbox
```js
window.addCheckbox(label, checkboxName, isChecked, onClick)
```

##### Arguments
`label` - Sets the label for the checkbox.  
`checkboxName` - Sets the name of the checkbox input.  
`isChecked`(optional) - Sets whether the checkbox is set to true on load. Default is `false` or unchecked.  
`onClick`(optional) - Callback function for when the checkbox has been clicked. Can pass the state of the checkbox as parameter.

#### Sections
```js
window.addSection(text)
```
`text` - Sets the text for a section divider.

#### Dropdowns
```js
window.addDropdown(text, options,firstOption, onSelect)
```
`text`(optional) - Sets the label for the dropdown.  
`options` - Object list for the options given in dropdown.  
`firstOption` - Sets first option set in dropdown on load.  
`onSelect`(optional) - Callback function for when an option is picked. Can pass the selected option as parameter.  

### Adding Controls

To add a control we do:
```js
window.addControl(param1, param2, param3)
```

We can then add parameters to the control which can include names, data, and callback functions ran when the control is interacted with.

### Removing Controls

To remove a control we can simple just remove the line that was used to create the control.  

However if removing a control while the script is running is more difficult.  
It is recommended to hide the control instead to prevent issues with code to relies on the controls object list.  

For controls that have an index in the `controls` object list  
```js
window.controls[index].style.display = 'none'
```  

For controls that have multiple elements and use a object list in the controls index we can use `[0]` after the index:  
```js
window.controls[index][0].style.display = 'none'
```

### Referencing Controls
All controls are added to a global object list called `window.controls`. To reference a control you can do `window.controls[index]`. To get the index of a control you can run `console.log(window.controls)` at the end of a script.

#### Special Controls
Some controls are made of multiple componenets. When these are referenced through controls it will provide you with another object list.  
So far this includes:
- checkboxes
- textboxes
- dropdowns

When you access these controls with an index you are given another object list.

| Index | Control         | Control Type                         | Usage                                       |
|-------|-----------------|--------------------------------------|---------------------------------------------|
| 0     | Parent HTML DIV | HTML DIV                             | Returns the HTML DIV Container for Controls |
| 1     | Label           | Text Label                           | Returns the label                           |
| 2     | Input           | checkmark/ input field/ dropdown box | Return the input of the control             |


## Showing and Hiding Windows

The `window.show()` function can be used to show/hide the main window.  
The other windows do not have this function, however the can still be hidden and shown by adding and removing the CSS class `.hidden`. 

### Hiding Windows

```js
window.classList.add('hidden')
```

### Showing Windows
```js
window.classList.remove('hidden')
```

This can be done with both the watermark and the eventlog by referencing them instead. The watermark can be referenced by `window.watermark` and the event log as `window.eventLogWindow`.

## Watermarks

### Referencing the watermark
Only one watermark is allowed per instance of the UI Class.
The HTML object containing the watermark is referenced as `window.watermark`  

### Creating a watermark
To create a watermark we use the `window.createWatermark()` function.

#### Function
```js
window.createWatermark(text,autoShow)
```  
#### Arguments  
`text`(optional) - The text that will be displayed when it is created.  
`autoShow`(optional) - Whether the watermark should be displayed when it's created. It is set to `True` by default.

### Moving The Watermark
The watermark is positioned `fixed` using `top` and `left` styles to control it's position on screen.  
To change you can change you can change `window.watermark.style.top` to move it vertically and `window.watermark.style.left` to change it horizontally.

### Changing The Watermark Text
The text inside being referenced as `window.watermark.firstChild.innerHTML`.
Therefore to change the text you can change that property.

## Event Log

### Creating an Event Log Window
To create an event log we can use use the `window.createEventLogWindow()` function.This will create the event log window.  
This is not shown by default and it is recommended that you create a checkbox in the main menu to show it.

#### Function
```js
window.createEventLogWindow(title, width, height, autoShow)
```
#### Arguments   
`title`(optional) - The title of the window that is created. If set to `undefined`will be set to the default of `Event Log`.  
`width`(optional) - Sets the width of the log window. Setting `undefined` will make it 300 px.    
`height`(optional) - Sets the height of the window. Setting `undefined` will make it 300 px.  
`autoShow`(optional) - Whether the watermark should be displayed when it's created. It is set to `True` by default.

### Creating a Log
To create a log you can use this `window.log()` function.

Log messages are displayed in the format of.
```
[Time in format HH:MM:SS] [Optional Log Type] : [Log Message]
```

#### Function
```js
window.log(text, logType)
```

#### Arguments
`text` - This is the text that will be shown with the log.  
`logType`(optional) - Sets the type of log. Will have type "None" if left `undefined`.

### Types of Logs
| Type    | Tag     | Tag Colour |
|---------|---------|------------|
| None    | N/A     | N/A        |
| Warning | Warning | Orange     |
| Error   | Error   | Red        |

### Clearing the Event Log
To clear the Event Log we can simple just set the `.innerHTML` of the `window.eventLogContainer` to null. This will remove all logs within it.  

```js
window.eventLogContainer.innerHTML = "";
```

## Destroying the UI
If you want to completely remove the UI you can use:
```js
window.destroy()
```
This will remove every window including the main menu, event log and the watermark. However, the module script that was used to load the UI will remain and has to be removed by a seperate script.
