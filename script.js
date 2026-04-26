let array = [];
const container = document.getElementById("container");

// Generate a random array when page loads
function resetArray() {
    container.innerHTML = "";
    array = [];
    for (let i = 0; i < 20; i++) {
        let value = Math.floor(Math.random() * 200) + 20;
        array.push(value);
        
        // Create a div for each bar
        const bar = document.createElement("div");
        bar.style.height = `${value}px`;
        bar.classList.add("bar");
        container.appendChild(bar);
    }
}

// Utility to create a delay so we can see the animation
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");
    document.getElementById("sortBtn").disabled = true;

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            // Color the bars we are comparing
            bars[j].style.backgroundColor = "#e74c3c"; // Red
            bars[j + 1].style.backgroundColor = "#e74c3c"; // Red

            await sleep(100); // Wait 100ms

            if (array[j] > array[j + 1]) {
                // Swap the logic
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Swap the visual heights
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            // Return color to blue
            bars[j].style.backgroundColor = "#3498db";
            bars[j + 1].style.backgroundColor = "#3498db";
        }
        // Mark the sorted bar as green
        bars[array.length - i - 1].style.backgroundColor = "#2ecc71";
    }
    bars[0].style.backgroundColor = "#2ecc71";
    document.getElementById("sortBtn").disabled = false;
}

// Initialize
async function insertionSort() {
    let bars = document.getElementsByClassName("bar");
    disableButtons(true);

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        // Highlight the current bar being moved
        bars[i].style.backgroundColor = "#e74c3c"; // Red

        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = "#f1c40f"; // Yellow (comparing)
            
            array[j + 1] = array[j];
            // Update visual height
            bars[j + 1].style.height = `${array[j + 1]}px`;
            
            j = j - 1;
            await sleep(50); // Small delay for animation

            // Reset color after move
            for(let k = 0; k < i; k++) {
                bars[k].style.backgroundColor = "#2ecc71"; // Green (sorted part)
            }
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
        bars[i].style.backgroundColor = "#2ecc71";
    }
    
    // Final color sweep to ensure all are green
    for (let bar of bars) bar.style.backgroundColor = "#2ecc71";
    disableButtons(false);
}

async function mergeSort() {
    disableButtons(true);
    await mergeSortRecursive(0, array.length - 1);
    disableButtons(false);
}

async function mergeSortRecursive(start, end) {
    if (start >= end) return;

    let mid = Math.floor((start + end) / 2);
    await mergeSortRecursive(start, mid);
    await mergeSortRecursive(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    let bars = document.getElementsByClassName("bar");
    let left = array.slice(start, mid + 1);
    let right = array.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
        await sleep(50);
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        // Update visual
        bars[k].style.height = `${array[k]}px`;
        bars[k].style.backgroundColor = "#2ecc71";
        k++;
    }

    while (i < left.length) {
        await sleep(50);
        array[k] = left[i];
        bars[k].style.height = `${array[k]}px`;
        bars[k].style.backgroundColor = "#2ecc71";
        i++;
        k++;
    }

    while (j < right.length) {
        await sleep(50);
        array[k] = right[j];
        bars[k].style.height = `${array[k]}px`;
        bars[k].style.backgroundColor = "#2ecc71";
        j++;
        k++;
    }
}


resetArray();
