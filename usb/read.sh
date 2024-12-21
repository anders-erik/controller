#!/usr/bin/env bash

# # Matebook Pro
sudo hexdump /dev/input/event20


# device="/dev/input/event20"  # Replace with your event device
# sudo cat "$device" | while read -r -n 16 data; do
#     key_event=$(echo "$data" | xxd -p | tail -c 8)  # Extract keycode
#     echo "Key event data: $key_event"
# done