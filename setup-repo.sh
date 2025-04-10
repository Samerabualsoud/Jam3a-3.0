#!/bin/bash

# Make the test script executable
chmod +x test-local-dev.sh

# Set up Git configuration for the new repository
git init
git config user.name "Manus Agent"
git config user.email "agent@example.com"

# Add all files to Git
git add .

# Create initial commit
git commit -m "Initial commit of Jam3a-3.0 with modern tech stack"

# Add the remote repository
git remote add origin https://github.com/Samerabualsoud/Jam3a-3.0.git

# Push to the main branch using the provided PAT
git push -u origin main
