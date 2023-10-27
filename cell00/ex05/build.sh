#!/bin/bash

if [ "$#" -lt 1 ]; then
    echo "No arguments supplied"
    exit 1
fi

for nom_dossier in "$@"; do
nouveau_nom="ex${nom_dossier}"
mkdir $nouveau_nom
done