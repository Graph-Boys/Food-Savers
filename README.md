# Food-Savers
Reducing Food Waste: A key to a more sustainable food system
![alt text](https://i.ibb.co/jkM5s7n/DALL-E-2024-01-12-11-25-02-This-image-depicts-a-scene-from-a-video-game-called-Food-Savers-aimed-at.png)

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
