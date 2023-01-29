import seedrandom from "seedrandom";

function idToColor(id) {

    const colors =[
        "#ff0000", // red
        "#00ff00", // green
        "#0000ff", // blue
        "#800080", // purple
        "#ffa500", // orange
        "#ffc0cb", // pink
        "#00ffff", // cyan
        "#ff00ff", // magenta
        "#800000", // maroon
        "#808000", // olive
        "#008080", // teal
        "#000000" // black
    ];

    seedrandom(id, {global: true});

    return colors[Math.floor(Math.random() * colors.length)];
}

export default idToColor;
