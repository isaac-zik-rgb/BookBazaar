#!/bin/bash

if [ ! -f requirements.txt ]; then
    echo "Error: requirements.txt file not found!"
    exit 1
fi

for package in $(cat requirements.txt); do
    pip install $package
done

