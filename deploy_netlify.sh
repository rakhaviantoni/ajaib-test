#!/bin/bash

if command -v yarn &> /dev/null; then
  yarn build;
elif command -v npm &> /dev/null; then
  npm run build;
else
  echo "Something wrong. Command not found."
fi

netlify deploy --dir=dist --prod