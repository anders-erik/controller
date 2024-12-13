import os

# Path to the serial device
device_path = "/dev/ttyACM0"

# Open the serial device
with os.open(device_path, os.O_RDONLY) as device:
    print(f"Listening to {device_path}... (Ctrl+C to stop)")
    try:
        while True:
            # Read data from the device
            data = os.read(device, 1)  # Adjust the byte size as needed
            if data:
                print(data.decode("utf-8").strip())  # Decode and strip whitespace
    except KeyboardInterrupt:
        print("\nStopped listening.")