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
resetArray();
