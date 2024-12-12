
TTY_DEV="$(ls -la /dev/ | grep ttyACM | awk '{print $10}')"

"/home/anders/.arduino15/packages/arduino/tools/avrdude/6.3.0-arduino17/bin/avrdude" \
"-C/home/anders/.arduino15/packages/arduino/tools/avrdude/6.3.0-arduino17/etc/avrdude.conf" \
-v -V -patmega328p -carduino "-P/dev/$TTY_DEV" -b115200 \
-D "-Uflash:w:/home/anders/.cache/arduino/sketches/A4FD1A9644C058E083CCFB14CBC61C01/sketch_dec11a.ino.hex:i"