let array = [];
const container = document.getElementById("container");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function disableButtons(disabled) {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = disabled);
}

function resetArray() {
    container.innerHTML = "";
    array = [];
    for (let i = 0; i < 20; i++) {
        let value = Math.floor(Math.random() * 200) + 20;
        array.push(value);
        const bar = document.createElement("div");
        bar.style.height = `${value}px`;
        bar.classList.add("bar");
        bar.style.backgroundColor = "#3498db";
        container.appendChild(bar);
    }
}

// --- INSERTION SORT ---
async function insertionSort() {
    let bars = document.getElementsByClassName("bar");
    disableButtons(true);

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = "red";

        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = "yellow";
            array[j + 1] = array[j];
            // FIXED: Using backticks below
            bars[j + 1].style.height = `${array[j + 1]}px`;
            j = j - 1;
            await sleep(50);
            for(let k = 0; k < i; k++) bars[k].style.backgroundColor = "#2ecc71";
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
    }
    for (let bar of bars) bar.style.backgroundColor = "#2ecc71";
    disableButtons(false);
}

// --- MERGE SORT ---
async function mergeSort() {
    disableButtons(true);
    await mergeSortRecursive(0, array.length - 1);
    // Ensure all are green at the end
    let bars = document.getElementsByClassName("bar");
    for (let bar of bars) bar.style.backgroundColor = "#2ecc71";
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
            array[k] = left[i++];
        } else {
            array[k] = right[j++];
        }
        bars[k].style.height = `${array[k]}px`;
        bars[k].style.backgroundColor = "#e74c3c"; // Red while merging
        k++;
    }
    while (i < left.length) {
        await sleep(50);
        array[k] = left[i++];
        bars[k].style.height = `${array[k]}px`;
        k++;
    }
    while (j < right.length) {
        await sleep(50);
        array[k] = right[j++];
        bars[k].style.height = `${array[k]}px`;
        k++;
    }
}

// --- BUBBLE SORT ---
async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");
    disableButtons(true);
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";
            await sleep(50);
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }
            bars[j].style.backgroundColor = "#3498db";
            bars[j + 1].style.backgroundColor = "#3498db";
        }
        bars[array.length - i - 1].style.backgroundColor = "#2ecc71";
    }
    bars[0].style.backgroundColor = "#2ecc71";
    disableButtons(false);
}

resetArray();
        await sleep(50);
        array[k] = right[j];
        bars[k].style.height = `${array[k]}px`;
        bars[k].style.backgroundColor = "#2ecc71";
        j++; k++;
    }
}

// --- BUBBLE SORT ---
async function bubbleSort() {
    let bars = document.getElementsByClassName("bar");
    disableButtons(true);
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";
            await sleep(50);
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }
            bars[j].style.backgroundColor = "#3498db";
            bars[j + 1].style.backgroundColor = "#3498db";
        }
        bars[array.length - i - 1].style.backgroundColor = "#2ecc71";
    }
    bars[0].style.backgroundColor = "#2ecc71";
    disableButtons(false);
}

// Initial call
resetArray();
