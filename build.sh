#!/bin/bash

# Navigate to frontend directory and run npm run build in the background
(cd frontend && npm run build) &

# Navigate to backend directory and run npm start in the background
(cd backend && npm start) &

# Wait for both processes to finish
wait