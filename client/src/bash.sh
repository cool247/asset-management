#!/bin/bash

# Function to find JSX elements in a JavaScript file
find_jsx_elements() {
    local file="$1"
    local jsx_elements=$(grep -oP '<[A-Za-z0-9]+\s[^>]*\.jsx[^>]*>' "$file")
    if [[ -n "$jsx_elements" ]]; then
        echo "$file"
    fi
}

# Main script
find . -type f -name "*.js" | while read -r file; do
    if find_jsx_elements "$file"; then
        new_file="${file%.js}.jsx"
        mv "$file" "$new_file"
        echo "Renamed $file to $new_file"
    fi
done
