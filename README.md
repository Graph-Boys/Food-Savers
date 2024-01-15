# Food-Savers
Reducing Food Waste: A key to a more sustainable food system
![alt text](https://private-user-images.githubusercontent.com/86460961/296175505-021578da-a695-41b1-a5be-016d7512f88c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDUyNzk3MzAsIm5iZiI6MTcwNTI3OTQzMCwicGF0aCI6Ii84NjQ2MDk2MS8yOTYxNzU1MDUtMDIxNTc4ZGEtYTY5NS00MWIxLWE1YmUtMDE2ZDc1MTJmODhjLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAxMTUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMTE1VDAwNDM1MFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTZlZGVlZjE5ZjA1NjI1MjBjNDc1MzY0OGVjNDZiYjJjMDk0ZGY2Y2YzYzJkNDdlMDc3Y2U4MGY5OWZlNjVmNTcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.GW5lsjFw8Q6xQcydfGm5J_ahkCRF0uaVGTjD1INZjg8)

## Description
In “Food Savers” players will control a robot or a vehicle navigating in procedurally generated terrain, collecting not contaminated food waste. The player's goal is to collect a certain number of these waste from different locations in a limited time. Once the player collects these wastes, they need to take them to a waste collection center that produces pet food out of these delivered food waste. The ultimate goal is to deliver this pet food to animals, serving a sustainable food system.

## Algorithms
Our game area will feature a terrain created with the "Perlin Noise" algorithm. With the Perlin Noise algorithm, we will generate natural-looking patterns, provide consistent randomness and produce smooth transitions in procedural generation. It will contribute to creating a different game area in each game session, as well as contribute to creating visually appealing and realistic virtual environments.

Additionally, after collecting the food waste, the A* pathfinding algorithm will be used to draw the optimal path from the player to the target location where the players will carry the collected food waste. This path will be represented by a glowing yellow line in front of the player, and they will need to follow this path to transport the food waste items to the waste collection center.

## How to code
- Run 'npm install' to install dependencies
(if your terminal warns you about vulnerabilities, ignore it)
- Run 'npm run dev' to launch the local server
(project should open on your default browser automatically)
