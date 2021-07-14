scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite, location) {
    NextNevel()
    info.changeLifeBy(1)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    if (true) {
        tiles.setWallAt(location, true)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -200
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    info.changeLifeBy(1)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    game.over(false)
})
function NextNevel () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    currentNevel += 1
    if (1 == currentNevel) {
        tiles.setTilemap(tilemap`platformer1`)
        info.setLife(3)
    } else if (2 == currentNevel) {
        tiles.setTilemap(tilemap`level5`)
    } else if (3 == currentNevel) {
        tiles.setTilemap(tilemap`level7`)
    } else {
        game.over(true)
    }
    tiles.placeOnRandomTile(mySprite, assets.tile`tile3`)
    for (let value of tiles.getTilesByType(assets.tile`tile5`)) {
        MyEnemy = sprites.create(img`
            . . d d d . . . . d d d . . . . 
            . 2 1 1 1 2 . . f 1 1 1 d . . . 
            2 1 1 1 1 1 2 f 1 1 1 1 1 d . . 
            2 1 1 2 d 1 1 1 1 d d 1 1 2 . . 
            f 1 2 2 1 1 1 1 1 1 2 d 1 f . . 
            . f f 1 1 1 1 1 1 1 1 f f . . . 
            . . f 1 f 2 1 1 2 f 1 f . . . . 
            . . f 1 1 1 1 1 1 1 1 f . . f f 
            . . f 2 1 1 f f 1 1 1 f . f 2 f 
            . . . f 1 1 1 1 1 1 2 2 f 1 1 f 
            . . . f 2 1 1 1 1 1 1 2 2 1 f . 
            . . . f 1 1 1 1 1 2 1 1 f f . . 
            . . . f 1 f f f 1 f f 1 f . . . 
            . . . f f . . f f . . f f . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(MyEnemy, value)
        MyEnemy.follow(mySprite, 30)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (sprite.bottom < otherSprite.y) {
        sprite.vy = -100
    } else {
        info.changeLifeBy(-1)
    }
})
let MyEnemy: Sprite = null
let currentNevel = 0
let mySprite: Sprite = null
scene.setBackgroundColor(11)
mySprite = sprites.create(img`
    f f f . . . . f f f . . . . 
    f 4 4 f . . f 4 4 f . . . . 
    f b 4 4 f f 4 4 b f . . . . 
    f 3 b 4 4 e 4 b 3 f . 2 . . 
    f 2 2 2 2 2 2 2 2 2 2 . . . 
    f 4 4 4 4 4 4 4 4 f . 2 . . 
    f 4 f 4 4 4 4 f 4 f . e f e 
    f 4 4 f 4 4 f 4 4 f . f 4 f 
    f e 4 4 b b 4 4 4 f . f 4 f 
    . f 4 4 4 4 4 4 e e f f 4 f 
    . f e 4 4 4 4 4 4 e e 4 e f 
    . f 4 4 4 4 4 e 4 4 f f f . 
    . f 4 f f f 4 f f 4 f . . . 
    . f f . . f f . . f f . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(mySprite)
mySprite.ay = 500
mySprite.ay = 500
controller.moveSprite(mySprite, 100, 0)
NextNevel()
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (value.isHittingTile(CollisionDirection.Bottom)) {
            if (value.vx < 0 && value.tileKindAt(TileDirection.Left, assets.tile`tile1`)) {
                value.vy = -150
            } else if (value.vx < 0 && value.tileKindAt(TileDirection.Right, assets.tile`tile1`)) {
                value.vy = -150
            }
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = 30
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = -30
        }
    }
})
