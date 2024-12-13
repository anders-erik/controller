
const int analogA1 = A1;
const int analogA2 = A2;
const int analogA3 = A3;

const int threshold = 500;

char buttonPressString[3] = {'a', 'a', 'a'};

void setup() {
    // put your setup code here, to run once:
    Serial.begin(9600);

    pinMode(analogA1, INPUT);
    pinMode(analogA2, INPUT);
    pinMode(analogA3, INPUT);

    // Serial.begin(115200);

    Serial.print("\na: ");
}

int count = 0;
void loop() {
    // put your main code here, to run repeatedly:
    // delay(100);
    count++;
    // Serial.print("HELLO!");

    // Serial.print("Hello, there! # ");
    // Serial.print(count);
    // Serial.print("\n");


    int sensorValueA1 = analogRead(analogA1); 
    int sensorValueA2 = analogRead(analogA2); 
    int sensorValueA3 = analogRead(analogA3); 

    // Convert to voltage (if using 5V reference)
    float voltageA1 = sensorValueA1 * (5.0 / 1023.0);
    float voltageA2 = sensorValueA2 * (5.0 / 1023.0);
    float voltageA3 = sensorValueA3 * (5.0 / 1023.0);


    char buttonPressString[3];
    buttonPressString[0] = 'a';
    buttonPressString[1] = 'a';
    buttonPressString[2] = 'a';

    // Check if the voltage is above the threshold
    if (sensorValueA1 > threshold) {
        buttonPressString[0] = 'b';
        // Serial.println("Button Press Detected!");
        // delay(100); // Debounce delay
    }

    if (sensorValueA2 > threshold) {
        buttonPressString[1] = 'b';
    }

    if (sensorValueA3 > threshold) {
        buttonPressString[2] = 'b';
    }

    delay(10); // Short delay for stability
    Serial.print(buttonPressString[0]);
    Serial.print(buttonPressString[1]);
    Serial.print(buttonPressString[2]);
    Serial.print("\n");
}

