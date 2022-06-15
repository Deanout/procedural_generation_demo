let width = 500;
let height = 500;

let frequency = 0.02;
let scaleValue = 1;
let amplitude = 1;
let octaves = 1;
let persistence = 0.1;
let lacunarity = 6;

let frequencySlider;
let frequencyInput;

let scaleSlider;
let scaleInput;

let amplitudeSlider;
let amplitudeInput;

let greyScaleCheckbox;
let useGreyScale = false;

let scrollScaleCheckbox;
let scrollAffectsScale = true;

let seedSlider;
let seedInput;
let seed = 1337;

let cachedSeed = 0;
let cachedFrequency = 0;
let cachedScale = 0;
let cachedAmplitude = 0;
let cachedOctaves = 0;
let cachedPersistence = 0;
let cachedLaccunarity = 0


let cachedGreyScale = false;

let waterColor = [2, 75, 134, 255];
let sandColor = [194, 178, 128, 255];
let grassColor = [52, 140, 49, 255];
let mountainColor = [195, 191, 191, 255];

function setup() {
  frameRate(15);
  pixelDensity(1);
  noiseSeed(seed);
  
  createCanvas(width, height);
  createSeedModifiers();
  createFrequencyModifiers();
  createScaleModifiers();
  createAmplitudeModifiers();
  
  createOctavesModifiers();
  createPersistenceModifiers();
  createLacunarityModifiers();
  
  createGreyScaleCheckbox();
  createScrollScaleCheckbox();
  
  generateTerrain();
}

function draw() {
  // background(55,55,55);
  if (cachedFrequency != frequency || 
        cachedScale != scaleValue ||
        cachedAmplitude != amplitude ||
        cachedSeed != seed ||
        cachedOctaves != octaves ||
        cachedPersistence != persistence ||
        cachedLacunarity != lacunarity ||
        cachedGreyScale != useGreyScale) {
        generateTerrain();
    }
}

function mouseWheel(event) {
  if (!scrollAffectsScale) {
    return;
  }
  let scrollStep = event.delta / -100;
  setScaleValue(constrain(scaleValue + scrollStep, 1, 100));
}

function setScaleValue(newValue) {
  scaleValue = newValue;
  scaleInput.value(newValue);
  scaleSlider.value(newValue);
}


function createSeedModifiers() {
  seedLabel = createDiv("Seed")
  seedLabel.position(520, 0);
  seedSlider = createSlider(1, 1000000, seed, 1);
  seedSlider.parent(seedLabel);
  seedSlider.position(100, 0);
  
  seedSlider.input(seedInputEvent);
  seedInput = createInput(seed.toString());
  seedInput.input(seedInputEvent);
  seedInput.parent(seedLabel);
  seedInput.position(250, 0);
}

function createFrequencyModifiers() {
  frequencyLabel = createDiv("Frequency")
  frequencyLabel.position(520, 30);
  frequencySlider = createSlider(0.001, 1, frequency, 0.001);
  frequencySlider.parent(frequencyLabel);
  frequencySlider.position(100, 0);
  
  frequencySlider.input(frequencyInputEvent);
  frequencyInput = createInput(frequency.toString());
  frequencyInput.input(frequencyInputEvent);
  frequencyInput.parent(frequencyLabel);
  frequencyInput.position(250, 0);
}

function createScaleModifiers() {
  scaleLabel = createDiv("Scale")
  scaleLabel.position(520, 60);
  scaleSlider = createSlider(1, 100, scaleValue, 1);
  scaleSlider.parent(scaleLabel);
  scaleSlider.position(100, 0);
  
  
  scaleSlider.input(scaleInputEvent);
  scaleInput = createInput(scaleValue.toString());
  scaleInput.input(scaleInputEvent);
  scaleInput.parent(scaleLabel);
  scaleInput.position(250, 0);
}


function createAmplitudeModifiers() {
  amplitudeLabel = createDiv("Amplitude")
  amplitudeLabel.position(520, 90);
  amplitudeSlider = createSlider(1, 100, amplitude, 1);
  amplitudeSlider.parent(amplitudeLabel);
  amplitudeSlider.position(100, 0);
  
  amplitudeSlider.input(amplitudeInputEvent);
  amplitudeInput = createInput(amplitude.toString());
  amplitudeInput.input(amplitudeInputEvent);
  amplitudeInput.parent(amplitudeLabel);
  amplitudeInput.position(250, 0);
}



function createOctavesModifiers() {
  octavesLabel = createDiv("Octaves")
  octavesLabel.position(520, 120);
  octavesSlider = createSlider(1, 5, octaves, 1);
  octavesSlider.parent(octavesLabel);
  octavesSlider.position(100, 0);
  
  octavesSlider.input(octavesInputEvent);
  octavesInput = createInput(octaves.toString());
  octavesInput.input(octavesInputEvent);
  octavesInput.parent(octavesLabel);
  octavesInput.position(250, 0);
}

function createPersistenceModifiers() {
  persistenceLabel = createDiv("Persistence")
  persistenceLabel.position(520, 150);
  persistenceSlider = createSlider(0, 1, persistence, 0.01);
  persistenceSlider.parent(persistenceLabel);
  persistenceSlider.position(100, 0);
  
  persistenceSlider.input(persistenceInputEvent);
  persistenceInput = createInput(persistence.toString());
  persistenceInput.input(persistenceInputEvent);
  persistenceInput.parent(persistenceLabel);
  persistenceInput.position(250, 0);
}

function createLacunarityModifiers() {
  lacunarityLabel = createDiv("Lacunarity")
  lacunarityLabel.position(520, 180);
  lacunaritySlider = createSlider(0, 10, lacunarity, 1);
  lacunaritySlider.parent(lacunarityLabel);
  lacunaritySlider.position(100, 0);
  
  lacunaritySlider.input(lacunarityInputEvent);
  lacunarityInput = createInput(lacunarity.toString());
  lacunarityInput.input(lacunarityInputEvent);
  lacunarityInput.parent(lacunarityLabel);
  lacunarityInput.position(250, 0);
}

function frequencyInputEvent() {
  frequency = this.value();
  frequencySlider.value(this.value());
  frequencyInput.value(this.value());
}

function scaleInputEvent() {
  scaleValue = this.value();
  scaleSlider.value(this.value());
  scaleInput.value(this.value());
}


function amplitudeInputEvent() {
  amplitude = this.value();
  amplitudeSlider.value(this.value());
  amplitudeInput.value(this.value());
}

function seedInputEvent() {
  seed = this.value();
  seedSlider.value(this.value());
  seedInput.value(this.value());
}

function octavesInputEvent() {
  octaves = this.value();
  octavesSlider.value(this.value());
  octavesInput.value(this.value());
}
function persistenceInputEvent() {
  persistence = this.value();
  persistenceSlider.value(this.value());
  persistenceInput.value(this.value());
}

function lacunarityInputEvent() {
  lacunarity = this.value();
  lacunaritySlider.value(this.value());
  lacunarityInput.value(this.value());
}



function createGreyScaleCheckbox() {
  greyScaleCheckbox = createCheckbox("Use Greyscale?", useGreyScale);
  greyScaleCheckbox.changed(greyScaleCheckboxEvent);
}

function createScrollScaleCheckbox() {
  scrollScaleCheckbox = createCheckbox("Scroll To Zoom?", scrollAffectsScale);
  scrollScaleCheckbox.changed(scrollScaleCheckboxEvent);
}

function greyScaleCheckboxEvent() {
  useGreyScale = greyScaleCheckbox.checked();
}

function scrollScaleCheckboxEvent() {
  scrollAffectsScale = scrollScaleCheckbox.checked();
}


function generateTerrain() {
  cachedSeed = seed;
  cachedFrequency = frequency;
  cachedAmplitude = amplitude;
  cachedScale = scaleValue;
  cachedOctaves = octaves;
  cachedPersistence = persistence;
  cachedLacunarity = lacunarity;
  
  cachedGreyScale = useGreyScale;
  noiseSeed(seed);
  loadPixels();
  
  for (let y = 0; y < width; y++) {
    for (let x = 0; x < height; x++) {
      let total = 0;
      let octaveFrequency = frequency;
      let octaveAmplitude = amplitude;
      for (let octaveIterator = 0; octaveIterator < octaves; octaveIterator++) {
        
        let noiseValue = noise((x / scaleValue) * octaveFrequency, (y / scaleValue) * octaveFrequency) * octaveAmplitude;
        total += noiseValue;
        octaveFrequency *= lacunarity;
        octaveAmplitude *= persistence;
      }
      let index = (x + y * width) * 4;
      pixels = paintTerrain(total, index);
    }
  }
  updatePixels();
}

function paintTerrain(noiseValue, index) {
  let noiseColor, red, green, blue, alpha;
  if (useGreyScale) {
    noiseColor = 255 * noiseValue;
    red = noiseColor;
    green = noiseColor;
    blue = noiseColor;
    alpha = 255;
  } else {
    result = getTerrainTile(noiseValue);
    red = result[0];
    green = result[1];
    blue = result[2];
    alpha = result[3];
  }


  pixels[index + 0] = red;
  pixels[index + 1] = green;
  pixels[index + 2] = blue;
  pixels[index + 3] = alpha;
  return pixels;
}
function getTerrainTile(noiseValue) {
  if (noiseValue > 0 && noiseValue <= 0.5) {
    return waterColor;
  } else if (noiseValue > 0.5 && noiseValue <= 0.55) {
    return sandColor;
  } else if (noiseValue > 0.55 && noiseValue <= 0.75) {
    return grassColor;
  } else {
    return mountainColor;
  }
  
  return [255, 255, 255, 255];
}