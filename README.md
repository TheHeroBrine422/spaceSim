# spaceSim

2D Physics Simulator geared for simulations of planets and outer space.

https://theherobrine422.github.io/spaceSim/

# v1

Simple 2 body Simulator.

https://theherobrine422.github.io/spaceSim/v1/

### Features:

1. Modifiable framerate and seconds simulated per frame/physics tick
1. Modifiable mass, starting x/y position, starting velocity, gravity, and color.

# v2

Simulator that can simulate as many bodies as you want. Many added features from v1.

https://theherobrine422.github.io/spaceSim/v2/

Currently it is not possible to change the bodies in the simulation from the UI, and several of the simulation settings. It is possible to overwrite the reset() function or sim variable implemented in main.js to create a new simulation.

If you overwrite reset() all you should have to do is hit the reset Simulation button assuming you wrote your function correctly.

If you overwrite sim directly the animation should instantly start.

Both options require you to overwrite the variable sim with a new instance of the Simulation class and then add bodies to sim through sim.addBody. If you read over the function reset() in main.js, and the constructors of simulation.js, body.js, and vector.js you should be able to figure out how to create your own simulation.

### Features:

1. All features from v1
1. More then just 2 bodies
1. Real Simulated Time Per Second based on how much time has actually passed (useful in the case that you set the framerate to a number that your computer can not handle.)
1. modifiable radius, displayed radius scaler, and starting time attributes for bodies
1. different collision modes.
1. walls on the simulation.
1. Better/worse UI

### Planned Features:

1. bounce collision mode
1. actual UI for creating bodies.
1. zoomable camera to allow real world distances
1. simualtion presets?
1. better seconds simulated per real second display.
