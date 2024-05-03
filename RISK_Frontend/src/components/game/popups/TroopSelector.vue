<script setup>
import { computed, ref, watch } from 'vue';


const props = defineProps({
    troopCount: Number,
    selectorOutput: Function,
    closeSelector: Function
});

const totalTroops = ref([]);
const selectedTroop = ref(null);
const currentIndex = ref(0);

watch(() => props.troopCount, (newCount) => {
    totalTroops.value = Array.from({ length: newCount }, (_, i) => i + 1);
    currentIndex.value = totalTroops.value.length - 1;
    selectedTroop.value = totalTroops.value[currentIndex.value];
}, { immediate: true });


const visibleTroops = computed(() => {
    const totalLength = totalTroops.value.length;
    const numberOfVisibleTroops = Math.min(5, totalLength);

    let startIndex = currentIndex.value - 2;
    let endIndex = startIndex + numberOfVisibleTroops;

    if (startIndex < 0) {
        startIndex = totalLength + startIndex;
    }
    if (endIndex > totalLength) {
        endIndex -= totalLength;
    }

    let tempArray = [];
    for (let i = 0; i < numberOfVisibleTroops; i++) {
        let index = (startIndex + i) % totalLength;
        tempArray.push(totalTroops.value[index]);
    }

    return tempArray;
});

const selectTroop = (number) => {
    selectedTroop.value = number;
    currentIndex.value = totalTroops.value.indexOf(number);

    if (currentIndex.value < 0) {
        currentIndex.value = totalTroops.value.length + currentIndex.value;
    }

    console.log('Current Selection: ', number);
};

const cancelSelection = () => {
    props.closeSelector();
}

const confirmSelection = () => {
    console.log('Troops Deployed: ', selectedTroop.value);
    props.selectorOutput(selectedTroop.value);
    props.closeSelector();
};

</script>

<template>
    <div class="selector">
        <div class="cancel button" @click="cancelSelection" >
            <svg xmlns="http://www.w3.org/2000/svg" height="1em"
                viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                    d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
            </svg>
        </div>
        <div class="highlight-circle">
            <div class="triangle-up"></div>
        </div>
        <div class="slider-container">
            <div class="number-container" v-for="number in visibleTroops" :key="number">
                <span class="troop-number" @click="() => selectTroop(number)">
                    {{ number }}
                </span>
            </div>
        </div>
        <div class="confirm button" @click="confirmSelection">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em"
                viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
            </svg>
        </div>
    </div>
</template>

<style scoped>
.selector {
    position: absolute;
    bottom: 150px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    width: 500px;
    height: 80px;
    align-items: center;
    border: 2px solid black;
    border-left: none;
    border-right: none;
    border-radius: 40px;
    user-select: none;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0 30px;
    z-index: 15;
}

.slider-container {
    flex-grow: 1;
    display: flex;
    height: inherit;
    overflow: hidden;
}

.slider-container::before,
.slider-container::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 150px;
    z-index: 2;
    pointer-events: none;
}

.slider-container::before {
    left: 0;
    background: linear-gradient(to right, black, transparent);
    border-radius: 50px 0px 0px 50px;
}

.slider-container::after {
    right: 0;
    background: linear-gradient(to left, black, transparent);
    border-radius: 0px 50px 50px 0px;
}


.number-container {
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
}

.troop-number {
    font-weight: 900;
    color: white;
    font-size: 3em;
    text-shadow:
        -1px -1px 0 black,
        1px -1px 0 black,
        -1px 1px 0 black,
        1px 1px 0 black;
    -webkit-text-stroke-width: 1.3px;
    -webkit-text-stroke-color: black;
    cursor: pointer;
}

.button {
    height: 75px;
    width: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
}

svg {
    height: 3em;
    fill: white;
}

.cancel {
    left: 0;
    background-color: #ff4d4d;
    border-left: 2px solid black;
    box-shadow: 4px 2px 2px rgba(178, 0, 0, 0.9);
}

.confirm {
    right: 0;
    background-color: #449444;
    border-right: 2px solid black;
    box-shadow: -4px 2px 2px #005700;
}

.highlight-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 10px solid #ff4d4d;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 5;
    box-shadow:
        2px -1px 2px rgba(178, 0, 0, 0.7),
        -2px 5px 2px rgba(178, 0, 0, 0.7),
        2px 5px 2px rgba(178, 0, 0, 0.7),
        3px 2px 2px rgba(178, 0, 0, 0.7) inset;
}

.triangle-up {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ff4d4d;
}
</style>