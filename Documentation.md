# Inori JS UI Library Documentation

## Contents
- [Installation](#Variables)

## Variables

## Importing the UI Library
Firstly, to create a new UI Class instance you must import the UI library. It is recommended that you download a copy of [Library.js](https://github.com/notInori/JS-UI-Library/blob/main/Library.js) and that you host it alongside your website.

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

## Show Menu Key
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

### Adding Controls

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

### Moving the watermark
The watermark is positioned `fixed` using `top` and `left` styles to control it's position on screen.  
To change you can change you can change `window.watermark.style.top` to move it vertically and `window.watermark.style.left` to change it horizontally.

### Changing the watermark text
The text inside being referenced as `window.watermark.firstChild.innerHTML`.
Therefore to change the text you can change that property.

## Event Log

### Creating an Event Log Window
