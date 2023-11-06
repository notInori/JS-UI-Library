# Inori JS UI Library

## Contents

## Variables

## Creating A UI Class Instance

## Creating a Window

## Window Controls

### Adding Controls

### Removing Controls

## Watermarks

### Referencing the watermark
Only one watermark is allowed per instance of the UI Class.
The HTML object containing the watermark is referenced as `window.watermark`  

### Creating a watermark
Watermarks can be created like this:  
`window.createWatermark(text,autoShow)`  
#### Arguments  
`text`(optional) - The text that will be displayed when it is created.  
`autoShow`(optional) - Whether the watermark should be displayed when it's created. Set `True` by default.

### Moving the watermark
The watermark is positioned `fixed` using `top` and `left` styles to control it's position on screen.  
To change you can change you can change `window.watermark.style.top` to move it vertically and `window.watermark.style.left` to change it horizontally.

### Changing the watermark text
The text inside being referenced as `window.watermark.firstChild.innerHTML`.
Therefore to change the text you can change that property.

## Event Log