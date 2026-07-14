const form = document.getElementById('kartForm');
const characterSelect = document.getElementById('character');
const characterImage = document.getElementById('characterImage');
const totalPowerDisplay = document.getElementById('totalPower');
const powerBar = document.getElementById('powerBar');

const characterImages = {
    mario: "imagenes/mario.jpg",
    bowser: "imagenes/bowser.jpg",
    toad: "imagenes/toad.jpg",
    peach: "imagenes/peach.jpg",
    yoshi: "imagenes/yoshi.jpg",
    luigi: "imagenes/luigi.jpg"
};

function updateInterface() {

    const selectedId = characterSelect.value;
    const newImgSrc = characterImages[selectedId];

    characterImage.style.opacity = 0;

    setTimeout(() => {
        characterImage.src = newImgSrc;
        characterImage.alt = "Imagen de " + selectedId;
        characterImage.style.opacity = 1;
    }, 150);

    const selectedOption =
        characterSelect.options[characterSelect.selectedIndex];

    let characterBase = Number(selectedOption.dataset.base);

    let tireValue = 0;

    const selectedRadio =
        document.querySelector('input[name="tires"]:checked');

    if (selectedRadio) {
        tireValue = Number(selectedRadio.value);
    }

    let upgradesValue = 0;

    const checkboxes =
        document.querySelectorAll('input[name="upgrades"]:checked');

    checkboxes.forEach(cb => {
        upgradesValue += Number(cb.value);
    });

    let driverLevel =
        Number(document.getElementById("driverLevel").value);

    if (isNaN(driverLevel) || driverLevel < 1) {
        driverLevel = 1;
    }

    if (driverLevel > 9) {
        driverLevel = 9;
    }

    let total =
        (characterBase + tireValue + upgradesValue) * driverLevel;

    if (total < 0) {
        total = 0;
    }

    totalPowerDisplay.textContent = total;

    let percentage = (total / 1000) * 100;

    if (percentage > 100) {
        percentage = 100;
    }

    powerBar.style.width = percentage + "%";
}

// Eventos
form.addEventListener("input", updateInterface);

// Inicializar
updateInterface();
