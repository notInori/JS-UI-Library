// Create a link element
var link = document.createElement('link');

// Set the attributes for the link element
link.rel = 'stylesheet';
link.type = 'text/css'; 
link.href = 'UILibraryStyles.css'; // Replace with the path to your CSS file

// Append the link element to the head of the document
document.head.appendChild(link);

class InoriUILibrary {
    constructor(title, width, height, autoShow = true) {
        this.title = title;
        this.width = width;
        this.height = height;
        this.container = null;
        this.controlsContainer = null;
        this.logWindow = null;
        this.logControlsContainer = null;
        this.controls = [];
        this.watermark = null;
        this.autoShow = autoShow;
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
        document.body.appendChild(this.container);

        this.controlsContainer = document.createElement('div');
        this.controlsContainer.className = 'controls-container';

        this.container.appendChild(this.controlsContainer)

        // Make the DIV element draggable:
        this.dragElement(this.container, titleBar);

        const container = this.container
            container.style.top = window.innerHeight / 2- (container.offsetHeight / 2) + "px";
            container.style.left =  window.innerWidth / 2- (container.offsetWidth / 2) + "px";
        if (this.autoShow){
            container.classList.remove("hidden")
        }
        setTimeout(function() {container.style.opacity = '';}, 10);

        
        
        
    }

    createLogWindow(height = 300,width = 300) {
        // Create the container element for the floating window
        this.logWindow = document.createElement('div');
        this.logWindow.style.opacity = '0';

        this.logWindow.className = 'Inori-UI-Library';
        this.logWindow.style.width = height + 'px';
        this.logWindow.style.height = width + 'px';
        this.logWindow.style.zIndex = 99;

        // Create a title bar for the window
        const titleBar = document.createElement('div');
        titleBar.className = 'title-bar';
        titleBar.textContent = 'Event Log';

        // Append the title bar to the container
        this.logWindow.appendChild(titleBar);

        // Append the container to the body or any other parent element
        document.body.appendChild(this.logWindow);

        this.logControlsContainer = document.createElement('div');
        this.logControlsContainer.className = 'controls-container';

        this.logWindow.appendChild(this.logControlsContainer)

        // Make the DIV element draggable:
        this.dragElement(this.logWindow, titleBar);

        const logWindow = this.logWindow;

        setTimeout(function() {
            logWindow.style.top = window.innerHeight - (logWindow.offsetHeight + 10) + "px";
            logWindow.style.display = 'none';
            logWindow.style.opacity = '';
          }, 5);
        
    }
    

    createWatermark(text = this.title, autoShow = false) {
        // Create the container element for the floating window
        this.watermark = document.createElement('div');
        this.watermark.style.opacity = 0;
        this.watermark.className = 'Inori-UI-Library';
        this.watermark.style.zIndex = 1000000000;

        // Create a title bar for the window
        const titleBar = document.createElement('div');
        titleBar.className = 'title-bar';
        titleBar.textContent = text;
        titleBar.style.setProperty('text-wrap','nowrap')

        // Append the title bar to the container
        this.watermark.appendChild(titleBar);

        // Append the container to the body or any other parent element
        document.body.appendChild(this.watermark);
        const watermark = this.watermark
        setTimeout(function() {
            watermark.style.left = window.innerWidth - (watermark.offsetWidth + 10) + "px";
            
            if (autoShow){
                watermark.style.display = 'flex';
                watermark.style.opacity = '';
            }
            else{
            watermark.style.display = 'none';
            watermark.style.opacity = '';
            }
          }, 1000);
        
        

        // Make the DIV element draggable:
        this.dragElement(this.watermark,titleBar);
    }

    dragElement(elmnt,titleBar) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;

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
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    show(){
        if (this.container.classList.contains('hidden')){
            this.container.classList.remove('hidden')
        }
        else{
            this.container.classList.add('hidden');

        }
    }

    log(text, type="") {
        const logTypes = {Error:'red', Warning:'orange', Log:'white'}
        const typeText = type != "" ? " "+ type : ""
        // Create a label element with the specified text and class
        const label = document.createElement('label');
        label.innerHTML = this.getCurrentTime() + "<span style='color:"+ logTypes[type] +"'>" + typeText +"</span>: "+text;
        this.logControlsContainer.appendChild(label);
        this.logControlsContainer.scrollTop = this.logControlsContainer.scrollHeight;
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

    addTextBox(label="" , placeholder = "") {
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

    addCheckbox(labelText, checkboxName, isChecked, onClick = function(){}) {
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

        const onClick2 = function(){};

        checkbox.addEventListener('click', () => {
            onClick(checkbox.checked);
        });

        // Add the container to the controls array and append it to the window
        this.controls.push([checkboxContainer,checkbox,label]);
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
        });

        // Append the custom options container to the container
        dropdownContainer.appendChild(dropdownOptions);

        // Add the custom dropdown container to the controls array and the window
        this.controls.push([dropdownContainer,dropdownLabel,dropdownButton]);
        this.controlsContainer.appendChild(dropdownContainer);
    }

    getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      }

}

export default InoriUILibrary;
