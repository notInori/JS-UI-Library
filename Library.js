// Create a link element
var link = document.createElement('link');

// Set the attributes for the link element
link.rel = 'stylesheet';
link.type = 'text/css'; 
link.href = 'styles.css'; // Replace with the path to your CSS file

// Append the link element to the head of the document
document.head.appendChild(link);

class InoriUILib {
    constructor(title, width, height) {
        this.title = title;
        this.width = width;
        this.height = height;
        this.container = null;
        this.controlsContainer = null
        this.controls = [];
    }

    createWindow() {
        // Create the container element for the floating window
        this.container = document.createElement('div');
        this.container.className = 'floating-window';
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
        dragElement(this.container);

        function dragElement(elmnt) {
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
    }

    addLabel(text, className) {
        // Create a label element with the specified text and class
        const label = document.createElement('label');
        label.textContent = text;
        if (className) {
            label.className = className;
        }
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

    addTextBox(placeholder) {
        // Create an input field control and add it to the window
        const inputField = document.createElement('input');
        inputField.setAttribute('type', 'text');
        inputField.setAttribute('placeholder', placeholder);
        this.controls.push(inputField);
        this.controlsContainer.appendChild(inputField);
    }

    addCheckbox(labelText, checkboxName, isChecked, onClick) {
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

        checkbox.addEventListener('click', onClick);

        // Add the container to the controls array and append it to the window
        this.controls.push(checkboxContainer);
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

    addCustomSelect(label, options, onSelect) {
        // Create a container for the custom select
        const selectContainer = document.createElement('div');
        selectContainer.className = 'custom-select';

        // Create a label for the select
        const selectLabel = document.createElement('label');
        selectLabel.textContent = label;
        selectContainer.appendChild(selectLabel);

        // Create a button to trigger the custom select
        const selectButton = document.createElement('button');
        selectButton.textContent = 'Select an option';
        selectContainer.appendChild(selectButton);

        // Create a container for the custom options
        const selectOptions = document.createElement('div');
        selectOptions.className = 'custom-options';

        // Create and add the custom options
        options.forEach((optionText) => {
            const option = document.createElement('div');
            option.textContent = optionText;
            option.addEventListener('click', () => {
                // Handle option selection
                selectButton.textContent = optionText;
                selectOptions.classList.remove('show');
                onSelect(optionText); // Call a provided onSelect callback
            });
            selectOptions.appendChild(option);
        });

        // Initially, hide the custom options
        selectOptions.classList.add('custom-options-hidden');

        // Add an event listener to the select button to toggle options visibility
        selectButton.addEventListener('click', () => {
            selectOptions.classList.toggle('show');
        });

        // Append the custom options container to the container
        selectContainer.appendChild(selectOptions);

        // Add the custom select container to the controls array and the window
        this.controls.push(selectContainer);
        this.controlsContainer.appendChild(selectContainer);
    }


}

export default InoriUILib;