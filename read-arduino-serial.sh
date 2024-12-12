#!/bin/bash


TTY_DEV="$(ls -la /dev/ | grep ttyACM | awk '{print $10}')"
echo $TTY_DEV

SERIAL_DEV="$(ls -la /dev/ | grep serial | awk '{print $9}')"
echo $SERIAL_DEV

cat /dev/$TTY_DEV

