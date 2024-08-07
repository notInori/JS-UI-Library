class InoriUILibrary{
    constructor(title, width, height, autoShow = true, minWidth=width, maxWidth=10000, minHeight=height, maxHeight=10000) {
        this.title = title;
        this.width = width;
        this.height = height;
        this.autoShow = autoShow;
        this.container = null;
        this.controlsContainer = null;
        this.eventLogWindow = null;
        this.eventLogContainer = null;
        this.eventLogDragHandle = null;
        this.controls = [];
        this.watermark = null;
        this.dragHandle = null;
        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth
        this.watermarkAlignment = 'right';
        this.shadowDOMContainer = document.createElement('div');
        this.shadowRoot = this.shadowDOMContainer.attachShadow({ mode: 'open' });
        // Create a link element
        var link = document.createElement('link');

        // Set the attributes for the link element
        link.rel = 'stylesheet';
        link.type = 'text/css'; 
        link.href = 'UILibraryStyles.css'; // Replace with the path to your CSS file

        // Append the link element to the head of the document
        this.shadowRoot.appendChild(link);
        
        document.body.appendChild(this.shadowDOMContainer);
        
    }

    createWindow() {
        // Create the container element for the floating window
        this.container = document.createElement('div');
        this.container.style.opacity = 0;

        this.container.className = 'hidden'
        this.container.classList.add('Inori-UI-Library');
        this.container.style.width = this.width + 'px';
        this.container.style.height = this.height + 'px';

        // Create a title bar for the window
        const titleBar = document.createElement('div');
        titleBar.className = 'title-bar';
        titleBar.textContent = this.title;

        // Append the title bar to the container
        this.container.appendChild(titleBar);

        // Append the container to the body or any other parent element
        this.shadowRoot.appendChild(this.container);

        this.controlsContainer = document.createElement('div');
        this.controlsContainer.className = 'controls-container';

        this.container.appendChild(this.controlsContainer)

        // Make the DIV element draggable:
        this.dragElement(this.container, titleBar);
        
        this.dragHandle = document.createElement('div');
        this.dragHandle.className = 'dragHandle';
        this.container.appendChild(this.dragHandle);
        const minWidth = Math.min(this.width, this.minWidth)
        const maxWidth = Math.max(this.width, this.maxWidth)
        const minHeight = Math.min(this.height, this.minHeight)
        const maxHeight = Math.max(this.height, this.maxHeight)
        this.startResize(this.container, this.dragHandle, minWidth, maxWidth, minHeight, maxHeight);

        const container = this.container
            container.style.top = window.innerHeight / 2- (container.offsetHeight / 2) + "px";
            container.style.left =  window.innerWidth / 2- (container.offsetWidth / 2) + "px";
        if (this.autoShow){
            container.classList.remove("hidden")
        }
        setTimeout(function() {container.style.opacity = '';}, 500);
    }

    bindMenuKey(key = ""){
        const container = this
        document.addEventListener('keydown', function(event) {  
            if (event.key == key) {  
                container.show()  
            }
        });
    }

    startResize(parent, dragHandle, minWidth, maxWidth, minHeight, maxHeight){
        const resizable = parent;
        const handle = dragHandle;

        handle.addEventListener('mousedown', function(e) {
            e.preventDefault();

            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        });


        function stopResize() {
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
          }
          
        function resize(e) { 
            const newWidth = e.clientX - resizable.offsetLeft;
            const newHeight = e.clientY - resizable.offsetTop;
    
            if (newWidth > minWidth && newWidth < maxWidth) {
                resizable.style.width = newWidth + 'px';
            }
            if (newHeight > minHeight && newHeight < maxHeight) {
                resizable.style.height = newHeight + 'px';
            }
        }
    }

    createEventLogWindow(title = "Event Log", width = 300,height = 300, autoShow=false) {
        // Create the container element for the floating window
        this.eventLogWindow = document.createElement('div');
        this.eventLogWindow.style.opacity = '0';

        this.eventLogWindow.className = 'hidden';
        this.eventLogWindow.classList.add('Inori-UI-Library');
        this.eventLogWindow.style.width = width + 'px';
        this.eventLogWindow.style.height = height + 'px';
        this.eventLogWindow.style.zIndex = 99;

        // Create a title bar for the window
        const titleBar = document.createElement('div');
        titleBar.className = 'title-bar';
        titleBar.textContent = title;

        // Append the title bar to the container
        this.eventLogWindow.appendChild(titleBar);

        // Append the container to the body or any other parent element
        this.shadowRoot.appendChild(this.eventLogWindow);

        this.eventLogContainer = document.createElement('div');
        this.eventLogContainer.className = 'controls-container';

        this.eventLogWindow.appendChild(this.eventLogContainer)

        this.eventLogDragHandle = document.createElement('div');
        this.eventLogDragHandle.className = 'dragHandle';
        this.eventLogWindow.appendChild(this.eventLogDragHandle);
        const minWidth = width
        const maxWidth = 10000
        const minHeight = height
        const maxHeight = 10000
        this.startResize(this.eventLogWindow, this.eventLogDragHandle, minWidth, maxWidth, minHeight, maxHeight);

        // Make the DIV element draggable:
        this.dragElement(this.eventLogWindow, titleBar);

        const eventLogWindow = this.eventLogWindow;

        setTimeout(function() {
            eventLogWindow.style.top = window.innerHeight - (eventLogWindow.offsetHeight + 10) + "px";
            if (autoShow){
                eventLogWindow.classList.remove("hidden")
            }
            eventLogWindow.style.opacity = '';
          }, 500);
        
    }

    clearEventLog(){
        this.eventLogContainer.innerHTML = '';
    }
    
    createWatermark(text = this.title, alignment="right", autoShow = false) {
        // Create the container element for the floating window
        this.watermark = document.createElement('div');
        this.watermark.style.opacity = 0;
        this.watermark.className = 'hidden';
        this.watermark.classList.add('Inori-UI-Library');
        this.watermark.style.zIndex = 1000000000;

        this.watermarkAlignment = alignment;

        // Create a title bar for the window
        const titleBar = document.createElement('div');
        titleBar.className = 'title-bar';
        titleBar.textContent = text;
        titleBar.style.setProperty('text-wrap','nowrap');
        titleBar.style.borderBottom = "none";
        titleBar.style.boxShadow = "none";

        if (alignment != 'right'){
            this.watermark.style.left = 'unset';
        }
        // Append the title bar to the container
        this.watermark.appendChild(titleBar);

        // Append the container to the body or any other parent element
        this.shadowRoot.appendChild(this.watermark);
        const watermark = this.watermark

        if (alignment != 'right'){
            watermark.style.left = '10px';
        }
        else{
            watermark.style.left = 'unset';
            watermark.style.right = '10px';
        }
        if (autoShow){
            watermark.classList.remove("hidden")
        }
        setTimeout(()=>{watermark.style.opacity = '';},500)

        // Make the DIV element draggable:
        this.dragElement(this.watermark,titleBar);
    }

    setWatermarkAlignment(alignment = 'auto'){
        this.watermark.style = 'left: unset; right: unset;';
        if (alignment == 'auto'){
        this.watermarkAlignment = this.watermarkAlignment == 'right'? 'left' : 'right';
        this.style.right = this.watermarkAlignment == 'right' ? '10px' : 'unset';
        this.style.left = this.watermarkAlignment == 'left' ? '10px' : 'unset';
        }
        else if (alignment == 'left'){
            this.watermarkAlignment = 'left';
            this.watermark.style.left = '10px';
        }
        else{
            this.watermarkAlignment = 'right'
            this.watermark.style.right = '10px'
        }
        const accentColor = this.container.style.getPropertyValue('--accent-color');
        this.setAccentColor(accentColor);
    }

    setWatermarkText(text = ""){
        this.watermark.firstChild.innerHTML = text;
    }

    dragElement(elmnt,titleBar) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0,
            watermark = this.watermark,
            watermarkAlignment = this.watermarkAlignment;

        // if present, the header is where you move the DIV from:
        titleBar.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            if (elmnt == watermark && watermarkAlignment == 'right'){
                elmnt.style.right = window.innerWidth - (elmnt.offsetLeft - pos1) - elmnt.offsetWidth + "px";
            }
            else{
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
            
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

   

    setAccentColor(newColor){
        const windowInstances = this.shadowRoot.querySelectorAll('.Inori-UI-Library'); // All window instances are isolated and therefore the accent color must be changed for each window individually
        windowInstances.forEach(function(UIWindow) {
            UIWindow.style.setProperty('--accent-color', newColor);
        });
    }

    show(targetWindow=this.container, visibile='auto'){
        if (visibile == 'auto'){
            targetWindow.classList.toggle('hidden');
        }
        else if (visibile == false){
            targetWindow.classList.add('hidden');
        }
        else{
            targetWindow.classList.remove('hidden')
        }
        
    }

    log(text, type="") {
        const logTypes = {Error:'red', Warning:'orange', Log:'white'}
        const typeText = type != "" ? " "+ type : ""
        // Create a label element with the specified text and class
        const label = document.createElement('label');
        label.innerHTML = this.getCurrentTime() + "<span style='color:"+ logTypes[type] +"'>" + typeText +"</span>: "+text;
        this.eventLogContainer.appendChild(label);
        this.eventLogContainer.scrollTop = this.eventLogContainer.scrollHeight;
    }

    addLabel(text) {
        // Create a label element with the specified text and class
        const label = document.createElement('label');
        label.textContent = text;
        this.controls.push(label);
        this.controlsContainer.appendChild(label);
    }

    addButton(label, onClick) {
        // Create a button control and add it to the window
        const button = document.createElement('button');
        button.textContent = label;
        button.addEventListener('click', onClick);
        this.controls.push(button);
        this.controlsContainer.appendChild(button);
    }

    addTextbox(label="" , placeholder = "") {
        // Create an input field control and add it to the window
        const textBoxContainer = document.createElement('div');
        textBoxContainer.className = "textbox-container";
        const textBoxLabel = document.createElement('label');
        textBoxLabel
        if (label != ""){
            textBoxLabel.textContent = label;
        }
        else{
            textBoxLabel.style.display = 'none';
        }

        const inputField = document.createElement('input');
        inputField.setAttribute('type', 'text');
        inputField.setAttribute('placeholder', placeholder);

        textBoxContainer.append(textBoxLabel)
        textBoxContainer.append(inputField)

        this.controls.push([textBoxContainer, textBoxLabel, inputField]);
        this.controlsContainer.appendChild(textBoxContainer);
    }

    addCheckbox(labelText, checkboxName, isChecked = false, onClick = function(){}) {
        // Create a container for the checkbox and label
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = 'checkbox-container';

        // Create the checkbox element
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = checkboxName;
        checkbox.checked = isChecked;

        // Create the label element
        const label = document.createElement('label');
        label.textContent = labelText;

        // Append the checkbox and label to the container
        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);

        checkbox.addEventListener('click', () => {
            onClick(checkbox.checked);
        });

        // Add the container to the controls array and append it to the window
        this.controls.push([checkboxContainer,label,checkbox]);
        this.controlsContainer.appendChild(checkboxContainer);

    }

    addSection(text) {
        // Create a container for the divider and text
        const dividerContainer = document.createElement('div');

        // Create a horizontal line element as a divider
        const divider = document.createElement('hr');

        // Create a label element for the text
        const label = document.createElement('label');
        label.textContent = text;

        // Set a class for the divider container (optional, for styling)
        dividerContainer.className = 'divider-container';

        // Set a class for the divider (optional, for styling)
        divider.className = 'window-divider';

        // Add the divider and label to the divider container
        dividerContainer.appendChild(divider);
        dividerContainer.appendChild(label);

        // Add the divider container to the controls array and append it to the window
        this.controls.push(dividerContainer);
        this.controlsContainer.appendChild(dividerContainer);
    }

    addDropdown(label="", options=[""], firstOption="Choose an option", onSelect = function(){}) {
        // Create a container for the custom dropdown
        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'dropdown';

        // Create a label for the dropdown
        const dropdownLabel = document.createElement('label');
        if (label !=""){
        dropdownLabel.textContent = label;
        }
        else{
            dropdownLabel.style.display = 'none';
        }

        dropdownContainer.appendChild(dropdownLabel);

        // Create a button to trigger the custom dropdown
        const dropdownButton = document.createElement('button');
        dropdownButton.innerHTML = (firstOption != ""? firstOption :'dropdown an option') + "<span style='display: block; float: right;'>▼</span>";
        dropdownContainer.appendChild(dropdownButton);

        // Create a container for the custom options
        const dropdownOptions = document.createElement('div');
        dropdownOptions.className = 'custom-options';

        // Create and add the custom options
        options.forEach((optionText) => {
            const option = document.createElement('div');
            option.textContent = optionText;
            option.addEventListener('click', () => {
                // Handle option dropdownion
                dropdownButton.innerHTML = optionText + "<span style='display: block; float: right;'>▼</span>";
                dropdownOptions.classList.remove('show');
                onSelect(optionText); // Call a provided onSelect callback
            });
            dropdownOptions.appendChild(option);
        });

        // Initially, hide the custom options
        dropdownOptions.classList.add('custom-options-hidden');

        // Add an event listener to the dropdown button to toggle options visibility
        dropdownButton.addEventListener('click', () => {
            dropdownOptions.classList.toggle('show');
            if (dropdownOptions.classList.contains("show")) {
                dropdownButton.innerHTML = dropdownButton.textContent.slice(0, -1) + "<span style='display: block; float: right;'>▲</span>";
            } else {
                dropdownButton.innerHTML = dropdownButton.textContent.slice(0, -1) + "<span style='display: block; float: right;'>▼</span>";
            }
            
        });

        // Append the custom options container to the container
        dropdownContainer.appendChild(dropdownOptions);

        // Add the custom dropdown container to the controls array and the window
        this.controls.push([dropdownContainer,dropdownLabel,dropdownButton]);
        this.controlsContainer.appendChild(dropdownContainer);
    }
    
    addImage(url="",width='fill',height='auto', imageCover='contain'){
        const image = document.createElement('img')
        image.src = url;
        
        image.style.width= width == 'fill'? "100%" : width + 'px';
        image.style.height = height == 'auto'? 'auto' : height + 'px';
        image.style.objectFit = imageCover == 'stretch'? 'unset' : imageCover
        this.controls.push(image);
        this.controlsContainer.appendChild(image);
    }

    getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }
    
    destroy(){
        this.shadowDOMContainer.remove()
    }

}

export default InoriUILibrary;
