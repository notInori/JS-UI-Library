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
    - [Retreiving Values](#retreiving-input-values)
        - [Value Properties of Controls](#value-properties-of-controls)
        - [Dropdown Limiations](#dropdown-limitations)
- [Showing and Hiding Windows](#showing-and-hiding-windows)
- [Extra Library Functions](#extra-library-functions)
    - [setAccentColor()](#setaccentcolor)
    - [dragElement()](#dragelement)
    - [getCurrentTime()](#getcurrenttime)
    - [startResize()](#startresize)
- [Watermark](#watermark)
    - [Referencing the watermark](#referencing-the-watermark)
    - [Creating a watermark](#creating-a-watermark)
    - [Moving the watermark](#moving-the-watermark)
    - [Changing the watermark Text](#changing-the-watermark-text)
    - [Changing Watermark Alignment After Creation](#changing-watermark-alignment-after-creation)
- [Event Log](#event-log)
    - [Creating an Event Log Window](#creating-an-event-log-window)  
    - [Creating a Log](#creating-a-log)
    - [Type of Logs](#types-of-logs)
    - [Clearing the Event Log](#clearing-the-event-log)
- [Customising the UI](#customizing-the-ui)
    - [Changing the Colors](#changing-the-colors)
    - [UI Library CSS Vars](#ui-library-css-vars)
- [Destroying the UI](#destroying-the-ui)


## Global Variables
|                          | Type            | Functions                                             | Usage                                                                                                                       |
|--------------------------|-----------------|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| window                   | UI Class Object | .createWindow<br>.createLogWindow<br>.createWatermark | .title = window title<br>.height = height of window<br>.width = width of window<br>.autoShow = shows the window when loaded |
| window.shadowDOMContainer | HTML Object    |                                                       | HTML Object that contains the shadow DOM.
| window.shadowRoot        | HTML Shadow DOM |                                                       | HTML Shadow Root for UI Library
| window.container         | HTML Object     |                                                       | Object for UI Window                                                                                                        |
| window.controlsContainer | HTML Object     |                                                       | Object for Window Controls                                                                                                  |
| window.controls          | Object List     |                                                       | Contains references to all controls in main window                                                                         |
| window.eventLogWindow    | HTML Object     |                                                       | Object for Event Log Window                                                                                                 |
| window.eventLogContainer | HTML Object     |                                                       | Object for Event Log Window Logs                                                                                            |
| window.watermark         | HTML Object     |                                                       | Object for watermark                                                                                                        |  
|window.watermarkAlignment | String          |                                                       | Sets alignment of text in the watermark.
|window.dragHandle         | HTML Object     |                                                       | Visual Handle for resizing UI Window.

## Functions
| Function                                                                          | Purpose                                          | Usage                                      |
|-----------------------------------------------------------------------------------|--------------------------------------------------|--------------------------------------------|
| [window.createWindow()](#creating-a-window)                                       | Creates the main window for the UI Library.      | window.createWindow()                      |
| [window.createEventLogWindow()](#creating-an-event-log-window)                    | Creates the event log window for the UI Library. | window.createEventLogWindow()              |
| [window.clearEventLog()](#clearing-the-event-log)                                 | Clears all messages in the Event Log             | window.clearEventLog()                     |
| [window.createWatermark()](#creating-a-watermark)                                 | Creates the watermark for the UI Library.        | window.createWatermark(text,autoShow)      |  
| [window.setWatermarkText()](#changing-the-watermark-text)                         | Changes the text of the watermark                | window.setWatermarkText(text)              |
| [window.setWatermarkAlignment()](#changing-watermark-alignment-after-creation)    | Changes the watermark alignment.                 | window.setWatermarkAlignment(alignment)    |
| [window.dragElement()](#dragelement)                                              | Makes any HTML element draggable.                | window.dragElement(parent,dragableHandle)  |
| [window.startResize()](#startresize)                                              | Makes UI Window element resizable by user.       | window.startResize(parent, titlebar, minWidth, maxWidth, minHeight, maxHeight)  |
| [window.show()](#showing-and-hiding-windows)                                      | Shows/Hides UI Windows                           | window.show(targetWindow,visible)          |
| [window.log()](#creating-a-log)                                                   | Creates a log entry in the Event Log.            | window.log(Message,logType)                |
| [window.setAccentColor](#setaccentcolor)                                          | Changes the accent color for the UI              | window.changeAccentColor(newColor)         |
| [window.getCurrentTime()](#getcurrenttime)                                        | Returns the current time in the format HH:MM:SS  | window.getCurrentTime()                    |
| [window.bindMenuKey()](#binding-show-menu-key)                                    | Binds a key for showing/hiding the menu          | window.bindMenuKey(key)                    |
| [window.destroy()](#destroying-the-ui)                                            | Destroys all UI                                  | window.destroy()                           |

## Importing the UI Library
Firstly, to create a new UI Class instance you must import the UI library. It is recommended that you download a copy of [Library.js](https://github.com/notInori/JS-UI-Library/blob/main/Library.js) and [UILibraryStyles.css](https://github.com/notInori/JS-UI-Library/blob/main/UILibraryStyles.css) and host them both alongside your website.

Then at the start of your script import the library using an import statement like this:

#### Function
```js
 import InoriUILibrary from './Library.js';
 ```  
Replace the path at the end with the one for your copy.

## Creating A UI Class Instance

Before you can create a GUI you must create an instance of the UI Library class. You can do this with the class constructor.  
We will be using `window` as the name of your object for storing an instance of the UI Library class.

### Constructor
```js
const window = new InoriUILibrary(titleName, width, height, autoShow, minWidth, maxWidth, minHeight, maxHeight)
```
#### Arguments  
`titleName` - The title of the window that will be created.  
`width` - Sets the width of the window. Set to `auto` by default. It is recommneded to set an initial width as using auto disables window resizing.  
`height` - Sets the height of the window. It is recommneded to set an initial height as using auto disables window resizing.  
`autoShow`(optional) - Whether the watermark should be displayed when it's created. Set to `True` by default.  
`minWidth`(optional) - This defines the minmum width of the UI window. This can be set in the window UI constructor. By default it's the same as the inital ui window size. This can't be larger than the initial width.    
`maxWidth`(optional) - This defines the maxmimum width of the UI window. This can be set in the window UI constructor. By default it's unlocked. This can't be smaller than the initial width.  
`minHeight`(optional) - This defines the minmum height of the UI window. This can be set in the window UI constructor. By default it's the same as the inital ui window size. This can't be larger than the initial height. 
`maxHeight`(optional) - This defines the maxmimum width of the UI window. This can be set in the window UI constructor. By default it's unlocked.  This can't be smaller than the initial width.

This also creates a shadow DOM which is used to isolate the CSS for the UI Library from any website you want to use the UI Library inside of. The object reference for the root of this shadow DOM is `window.shadowRoot`. The object reference for the shadow DOM container div is `window.shadowDOMContainer`.  

These will rarely be used as the UI library provides methods of accessing all controls in the UI.

## Creating a Window
To create a window we simple use the `window.createWindow()` function.
This will create the main menu window. It will only show automatically if the autoShow flag is set to true. If not it is recommended to bind a show key.

#### Function
```js
window.createWindow()
```

## Binding Show Menu Key
We can bind a key to show/hide the menu with the `window.bindMenuKey()` function. This is recommnded if you have set the `window.autoShow` property to `false` as it is needed to be able to be able open the menu.

#### Function

```js
window.bindMenuKey(key)
```

#### Arguments
`key` - this is the key that you want to bind thet menu show/hide function to.  

If you need to find the proper key value for a key. They are all listed [here](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values).

## Window Controls

### Types of Controls

| Type of Control       | Usage                                          | Function      | Parameters                              |
|-----------------------|------------------------------------------------|---------------|-----------------------------------------|
| [Label](#label)       | Displays text                                  | addLabel()    | text                                    |
| [Button](#button)     | Creates a button that runs a function onClick. | addButton()   | text, onClick                           |
| [Textbox](#textbox)   | Allow the user to input text                   | addTextBox()  | label, placeholder                      |
| [Checkbox](#checkbox) | A control that has a true and false state      | addCheckbox() | label, checkboxName, isChecked, onClick |
| [Section](#section)   | Creates a divider for seperating sections      | addSection()  | text                                    |
| [Dropdown](#dropdown) | Allow the user to pick from a list of options  | addDropDown() | text, options, firstOption, onSelect    |
| [Image](#images)      | Displays an image                              | addImage()    | URL, width, height                      |

### Adding Controls

To add a control we do:
```js
window.addControl(param1, param2, param3...)
```

We can then add parameters to the control which can include names, data, and callback functions ran when the control is interacted with.

#### Label
##### Function
```js
window.addLabel(text)
```
##### Arguments
`text` - Sets the text content of the the label.  

#### Button
##### Function
```js
window.addButton(text, onClick)
```
##### Arguments
`text` - Sets the text value of the button.  
`onClick` - Callback function for the button is pressed.

#### Textbox
##### Function
```js
window.addTextbox(label, placeholder)
```

##### Arguments
`label`(optional) - Sets a label for the textbox.  
`placeholder`(optional) - Sets placeholder text for the input when it is empty.

#### Checkbox
##### Function
```js
window.addCheckbox(label, checkboxName, isChecked, onClick)
```

##### Arguments
`label` - Sets the label for the checkbox.  
`checkboxName` - Sets the name of the checkbox input.  
`isChecked`(optional) - Sets whether the checkbox is set to true on load. Default is `false` or unchecked.  
`onClick`(optional) - Callback function for when the checkbox has been clicked. Can pass the state of the checkbox as parameter.

#### Section
##### Function
```js
window.addSection(text)
```
`text` - Sets the text for a section divider.

#### Dropdown
##### Function
```js
window.addDropdown(text, options,firstOption, onSelect)
```
`text`(optional) - Sets the label for the dropdown.  
`options` - Object list for the options given in dropdown.  
`firstOption` - Sets first option set in dropdown on load.  
`onSelect`(optional) - Callback function for when an option is picked. Can pass the selected option as parameter.  

#### Image
##### Function
```js
window.addImage(URL, width, height, imageCover)
```
`URL` - Sets the URL that image is fetched from.  
`width`(optional) - Sets the width of the image container. Default is `'fill'` which fills the width of the UI window.  
`height`(optional) - Sets the height of the image container . Default is `'auto'` which maintains the aspect ratio of the image.  
`imageCover` - Sets how the image covers the container. Default is `'contain'` which fill the container as much without stretching. There is also `'cover'` and `'stretch'`.  

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
All controls are added to a global object list called `window.controls`.  
To reference a control you can do `window.controls[index]`.  
To get the index of a control you can run `console.log(window.controls)` at the end of a script.

#### Special Controls
Most input controls are made of multiple componenets. When these are referenced through the `controls` list, it will provide you with another object list.  
So far this includes:
- checkboxes
- textboxes
- dropdowns

When you access these controls with an index you are given another object list.

| Index | Control         | Control Type                           | Usage                                       |
|-------|-----------------|----------------------------------------|---------------------------------------------|
| 0     | Parent HTML DIV | HTML DIV                               | Returns the HTML DIV Container for Controls |
| 1     | Label           | Text Label                             |  Returns the label                          |
| 2     | Input           | checkmark / input field / dropdown box | Return the input of the control             |

They can be accessed like this:
```js
window.controls[index][innerIndex]
```

#### Limitations
Not all controls can properly be referenced. 
These include:
- Section

When these are referenced using the `controls` list it will return the parent DIV of the control. For example to access the label of the section control you must use the property `.lastChildElement`.  

```js
window.controls[index].lastChildElement
```
This can be combined with `.innerHTML` to allow you to change text value of the section header.
```js
windows.controls[index].lastChildElement.innerHTML = 'New Section Title';
```

### Retreiving Input Values 
For most controls you can simply reference the input element for the control and read its value. As most input controls are made up multiple elements you can reference them like this:
```js
window.controls[indexOfControl][1]
```
To get it's value you simple read the property corresponding to the type of control:  

#### Value Properties of Controls

| Control  | Property for Input State                            | Result Type |
|----------|-----------------------------------------------------|-------------|
| Textbox  | window.controls[index][1].value                     | String      |
| Checkbox | window.controls[index][1].checked                   | Boolean     |
| Dropdown | window.controls.[index][1].textContent.slice(0, -1) | String      |

#### Dropdown Limitations

When you retreive value of a dropdown with `.innerHTML`, it will return with a down arrow character at the end of it inside of a `<span>` if `.innerHTML`. This is due to how the inside of the dropdown is formatted.  
To fix this we can use the `.textContent` to retreive just the text value of the button and then use the `.slice` function to remove the arrow from the end of the string.

For example:
```js
window.controls[index][1].textContent.slice(0, -1)
```

## Showing and Hiding Windows

The `window.show()` function can be used to show/hide the main window.
It can also be used to show/hide other windows too by passing them as a paramater.

#### Function
```js
window.show(targetWindow, visible)
```

#### Arguments

`window`(optional) - This can be set an UI Window Object. When left blank it targets the main UI window. For example, `window.eventLogWindow` and `window.watermark` can be passed as parameters here.  
`visible`(optional) - This can set to `true`, `false` or `'auto'`. Leaving it undefined will set it to `'auto'` which switches the visible state the opposite of what it is currently is. i.e `true` gets turned into `false`.

## Extra Library Functions

These are extra functions that library contains that may be useful to you.

### setAccentColor()

This functions lets you change the CSS variable `--accent-color` which is responsible for the accent color of the UI which is used on hovered or active controls as well as the border of windows.

#### Function
```js
window.setAccentColor(newColor)
```
#### Arguments
`newColor` - The new color you want to set as the accent color. This can be a HTML color or a hex color value.

### dragElement()

This function makes any HTML DIV Element passed to it draggable that has `fixed` positioning. Elements stay in the same place regardless of scroll position.  
It uses css properties `top` and `left` for positioning elements on screen.

#### Function

```js
window.dragElement(draggableElement, draggableHandle)
```

#### Arguments
`draggableElement` - This is the element that is made draggable. It must have `fixed` positioning to be able to be moved.  
`draggableHandle` - This is the element that is used to drag the `draggableElement` around. It is recommended that this be a static element within the `draggableElement`.

### startResize()

This function make a ui window resizable allowing the user to resize the window by moving a dedicated resize handle which was passed to the function along with it's parent window. It supports maximum and minumum sizing. 

#### Function

```js
window.startResize(parent, titlebar, minWidth, maxWidth, minHeight, maxHeight)
```

#### Arguments
`parent` - This is the UI Window element that will be resized.
`dragHandle` - This is the element that is used to drag resize the parent element. It is recommended that this be a static element within the `draggableElement`.  
`minWidth` - This defines the minmum width of the UI window. This can be set in the window UI constructor. By default it's the same as the inital ui window size. This can't be larger than the initial width.  
`maxWidth` - This defines the maxmimum width of the UI window. This can be set in the window UI constructor. By default it's unlocked. This can't be smaller than the initial width.  
`minHeight` - This defines the minmum height of the UI window. This can be set in the window UI constructor. By default it's the same as the inital ui window size. This can't be larger than the initial height. 
`maxHeight` - This defines the maxmimum width of the UI window. This can be set in the window UI constructor. By default it's unlocked.  This can't be smaller than the initial width.


### getCurrentTime()

This function returns the current time in the format HH:MM:SS as a string. This can be used inside of objects to include the time with them such as strings. This is used for returning log times in Event Log Messsages by the UI Library.

#### Function
```js
window.getCurrentTime()
```
## Watermark

### Referencing the watermark
Only one watermark is allowed per instance of the UI Class.
The HTML object containing the watermark is referenced as `window.watermark`  

### Creating a watermark
To create a watermark we use the `window.createWatermark()` function.

#### Function
```js
window.createWatermark(text, alignment, autoShow)
```  
#### Arguments  
`text`(optional) - The text that will be displayed when it is created.  
`autoShow`(optional) - Whether the watermark should be displayed when it's created. It is set to `True` by default.  
`alignment`(optional) - Controls text and control expansion alignemnt. Can be set to `left` or `right` but set to `right` by default
### Moving The Watermark
The watermark is positioned `fixed` using `top` and `left` styles to control it's position on screen.  
To change you can change you can change `window.watermark.style.top` to move it vertically and `window.watermark.style.left` to change it horizontally.

### Changing The Watermark Text
The text within the watermark can be changed with the `window.setWatermarkText()` function.

#### Function
```js
window.setWatermarkText(text)
```
#### Arguments
`text` - Sets the text to any string.

### Changing Watermark Alignment After Creation
The alignment of the watermark can be set on creation to `right` or `left`. This controls the alignment of the text in the control and also the horizontal direction the watermark expands. It can also be changed after it has been created from two methods:

#### Recommended
The recommended way of changing the alignment of the watermark is by using the `window.setWatermarkAlignment()` function. This will change the alignment as well as reposition the watermark to the left or right edges of the screen.

##### Function
```js
window.setWatermarkAlignment(alignment)
```
##### Arguments
`alignment`(optional) - This can be set to `'left'`, `'right'` or `'auto'`. It defaults to auto which switches to the opposite of it's current alignment. i.e if `window.watermarkAlignment` is `'left'` it will be changed to `'right'`.

#### Direct
To change the alignment of the watermark without repositioning it you can directly change the `window.watermarkAlignment` property. It can be set to `left` or `right`.
If an invalid value is entered it will default to being right aligned.
You can change it like this
```js
window.watermarkAlignment = 'left' // or 'right';
```

## Event Log

### Creating an Event Log Window
To create the event log window we can use use the `window.createEventLogWindow()` function. The window created is not shown by default and it is recommended that you bind the show function `window.show(this.eventLogWindow)` to a control in the mind window. For usage of the command, see [Showing and Hiding Windows](#showing-and-hiding-windows).


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

Log messages are displayed in the format of:

```
[Time in format HH:MM:SS] [Optional Log Type] : [Log Message]
```

To create a log you can use the `window.log()` function.

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

## Customizing the UI  
The UI Library can be modified from the `UILibraryStyles.css` file.  

### Changing the Colors
To make the UI Library easier to customize, most of the theme can be changed by just changing css vars in the `.Inori-UI-Library` class.  

### UI Library CSS Vars
| CSS Var                   | Property                                | Property Usage                                                     | Property Values                                      |
|---------------------------|-----------------------------------------|--------------------------------------------------------------------|------------------------------------------------------|
| --main-color              | Main Background Color                   | This is used as the background color for the titlebar.             | Anything the CSS property `background` can be set to |
| --secondary-color         | Secondary Background Color              | This is used as the background color for the content of a window.  | Anything the CSS property `background` can be set to |
| --outline-color           | Outline Color For Controls              | This is the outline color for controls as well the header divider. | Anything the CSS property `color` can be set to      |
| --main-control-color      | Main Background Color For Controls      | This is the background color of most controls                      | Anything the CSS property `background` can be set to |
| --button-pressed-color    | Secondary Background Color For Controls | This is the background color of checkboxes and pressed buttons.    | Anything the CSS property `background` can be set to |
| --secondary-control-color | Main Accent Color                       | Used for window outline and active or hovered over controls.       | Anything the CSS property `background` can be set to |
| --font-color              | Font Color                              | Color for all fonts                                                | Anything the CSS property `color` can be set to      |
| --font-stroke-color       | Font Stroke/Outline                     | Outline for all text                                               | Anything the CSS property `color` can be set to      |
| --control-box-shadow      | HTML Box Shadow Properties              | Use to add shadow/extra outline around controls.                   | Anything the CSS property `box-shadow` can be set to |

### Extra Notes
`--text-hint-color` is used to add stroking/outline to fonts. You can set this to transparent to remove it, but it's recommended to leave as is.  
`--box-shadow` allows for manipulation of the shadow around controls. It is structured like this `offsetX offsetY blur spread color`. Is recomended to leave this as is.

## Destroying the UI
If you want to completely remove the UI you can use:
```js
window.destroy()
```
This will remove every window including the main menu, event log and the watermark. However, the module script that was used to load the UI will remain and has to be removed by a seperate script.

### Issues
Due to the use of a shadow DOM to protect the UI, the function can be unreliable. The recommended way of using this function is with an arrow function.  

Here is an example of it being used with a button:

#### Function

```js
window.addButton("Unload UI", () => {
    window.destroy();
});
```
