#!/bin/bash

# Move to the .git/hooks directory
cd .git/hooks

# Create the pre-push hook file
touch pre-push

# Add the npm command to the pre-push file
echo -e "#!/bin/sh\n\nmake deploy" > pre-push

# Make the pre-push file executable
chmod +x pre-push

# Confirm success
echo "pre-push hook created and made executable."