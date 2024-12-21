#!/usr/bin/env bash


DELL_KEYBORD_MODEL=413c:2003
KEYBOARD_BUS_DEV=001:006

echo $DELL_KEYBORD
if [ $1 = "--list" ]; then
    sudo lsusb
fi

if [ $1 = "--info" ]; then
    # https://github.com/DIGImend/usbhid-dump
    # sudo usbhid-dump -d $DELL_KEYBORD_MODEL -e descriptor
    sudo usbhid-dump -d $DELL_KEYBORD_MODEL 
fi

if [ $1 = "--listen" ]; then
    # https://github.com/DIGImend/usbhid-dump
    sudo usbhid-dump --entity=all --address=1:6
fi