Game.Tile = function(properties) {
    properties = properties || {};
    // Call the Glyph constructor with our properties
    Game.Glyph.call(this, properties);
    // Set up the properties. We use false by default.
    this._ttype = properties['ttype'] || "generic";
    this._walkable = properties['walkable'] || false;
    this._diggable = properties['diggable'] || false;
    this._blocksLight = (properties['blocksLight'] !== undefined) ?
        properties['blocksLight'] : true;
    this._description = properties['description'] || '';
};
// Make tiles inherit all the functionality from glyphs
Game.Tile.extend(Game.Glyph);

// Standard getters
Game.Tile.prototype.isWalkable = function() {
    return this._walkable;
};
Game.Tile.prototype.isDiggable = function() {
    return this._diggable;
};
Game.Tile.prototype.isBlockingLight = function() {
    return this._blocksLight;
};
Game.Tile.prototype.getDescription = function() {
    return this._description;
};

Game.Tile.nullTile = new Game.Tile({description: '(unknown)'});
Game.Tile.floorTile = new Game.Tile({
    character: '.',
    foreground: Game.Colours.getC('grey_4'),
    walkable: true,
    blocksLight: false,
    description: 'A cave floor'
});
Game.Tile.wallTile = new Game.Tile({
    character: '#',
    foreground: Game.Colours.getC('blue_4'),
    ttype: "wall",
    diggable: true,
    description: 'A cave wall'
});
Game.Tile.floorTile_cave = new Game.Tile({
    character: '.',
    foreground: Game.Colours.getC('blue_4'),
    walkable: true,
    blocksLight: false,
    description: 'A cave floor'
});
Game.Tile.wallTile_cave = new Game.Tile({
    character: '#',
    foreground: Game.Colours.getC('blue_4'),
    ttype: "wall",
    diggable: true,
    description: 'A cave wall'
});
Game.Tile.floorTile_dungeon = new Game.Tile({
    character: '.',
    foreground: Game.Colours.getC('grey_4'),
    walkable: true,
    blocksLight: false,
    description: 'A cave floor'
});
Game.Tile.wallTile_dungeon = new Game.Tile({
    character: '#',
    foreground: Game.Colours.getC('grey_4'),
    ttype: "wall",
    diggable: false,
    description: 'A cave wall'
});
Game.Tile.stairsUpTile = new Game.Tile({
    character: '<',
    foreground: Game.Colours.getC('cyber_pink'),
    walkable: true,
    blocksLight: false,
    description: 'A rock staircase leading upwards'
});
Game.Tile.stairsDownTile = new Game.Tile({
    character: '>',
    foreground: Game.Colours.getC('cyber_pink'),
    walkable: true,
    blocksLight: false,
    description: 'A rock staircase leading downwards'
});
Game.Tile.holeToCavernTile = new Game.Tile({
    character: 'O',
    foreground: Game.Colours.getC('cyber_pink'),
    walkable: true,
    blocksLight: false,
    description: 'A great dark hole in the ground'
});
Game.Tile.waterTile = new Game.Tile({
    character: '~',
    foreground: 'blue',
    walkable: false,
    blocksLight: false,
    description: 'Murky blue water'
});

// Helper function
Game.getNeighborPositions = function(x, y) {
    var tiles = [];
    // Generate all possible offsets
    for (var dX = -1; dX < 2; dX ++) {
        for (var dY = -1; dY < 2; dY++) {
            // Make sure it isn't the same tile
            if (dX == 0 && dY == 0) {
                continue;
            }
            tiles.push({x: x + dX, y: y + dY});
        }
    }
    return tiles.randomize();
};