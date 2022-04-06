namespace SpriteKind {
    export const Bar = SpriteKind.create()
    export const Overlapper = SpriteKind.create()
    export const Tile = SpriteKind.create()
}
function setup_bars () {
    for (let index = 0; index <= 3; index++) {
        sprite_bar = sprites.create(assets.image`bar`, SpriteKind.Bar)
        sprite_bar.setFlag(SpriteFlag.Ghost, true)
        sprite_bar.top = 0
        sprite_bar.z = 1
        sprite_bar.left = scene.screenWidth() / 2 - 30 + 15 * index
    }
    sprites_overlappers = []
    overlapper_images = [
    assets.image`left_overlap`,
    assets.image`up_overlap`,
    assets.image`right_overlap`,
    assets.image`down_overlap`
    ]
    overlapper_images_pressed = [
    assets.image`left_overlap_pressed`,
    assets.image`up_overlap_pressed`,
    assets.image`right_overlap_pressed`,
    assets.image`down_overlap_pressed`
    ]
    for (let image3 of overlapper_images) {
        create_overlap(image3)
    }
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MusicalImages.is_playing()) {
        press_overlap(1, true)
    }
})
function press_overlap (index: number, pressed: boolean) {
    if (pressed) {
        sprites_overlappers[index].setImage(overlapper_images_pressed[index])
    } else {
        sprites_overlappers[index].setImage(overlapper_images[index])
    }
    overlapping = get_overlapping_tile(sprites_overlappers[index])
    if (!(overlapping)) {
        scene.cameraShake(2, 100)
        return
    }
    sprites.setDataBoolean(overlapping, "played", true)
    overlapping.destroy()
    timer.background(function () {
        music.playTone(sprites.readDataNumber(overlapping, "frequency"), sprites.readDataNumber(overlapping, "duration"))
    })
}
function handle_note (channel: number, note: number, frequency: number, duration: number) {
    if (channel == 0) {
        image2 = image.create(16, Math.max(Math.round(duration / 20 * 0.75), 1))
        image2.fill(1)
        sprite_tile = sprites.create(image2, SpriteKind.Tile)
        sprite_tile.bottom = 1
        sprite_tile.x = sprites_overlappers[(note + 9) % 12 % 4].x
        sprite_tile.vy = 50
        sprite_tile.setFlag(SpriteFlag.AutoDestroy, true)
        sprites.setDataNumber(sprite_tile, "frequency", frequency)
        sprites.setDataNumber(sprite_tile, "duration", duration)
        sprites.setDataBoolean(sprite_tile, "played", false)
    } else {
        timer.after((scene.screenHeight() - 16) / 50 * 1000, function () {
            timer.background(function () {
                music.playTone(frequency, duration)
            })
        })
    }
}
function prepare_background () {
    scene.setBackgroundColor(13)
}
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    if (MusicalImages.is_playing()) {
        press_overlap(3, false)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MusicalImages.is_playing()) {
        press_overlap(0, true)
    }
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (MusicalImages.is_playing()) {
        press_overlap(2, false)
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (MusicalImages.is_playing()) {
        press_overlap(0, false)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MusicalImages.is_playing()) {
        press_overlap(2, true)
    }
})
function create_overlap (image2: Image) {
    sprites_overlappers.push(sprites.create(image2, SpriteKind.Overlapper))
    sprites_overlappers[sprites_overlappers.length - 1].left = scene.screenWidth() / 2 - 30 + 15 * (sprites_overlappers.length - 1)
    sprites_overlappers[sprites_overlappers.length - 1].bottom = scene.screenHeight() - 8
    sprites_overlappers[sprites_overlappers.length - 1].z = 1
}
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    if (MusicalImages.is_playing()) {
        press_overlap(1, false)
    }
})
MusicalImages.set_handler(function (channels, notes, frequencys, durations) {
    for (let index = 0; index <= channels.length - 1; index++) {
        handle_note(channels[index], notes[index], frequencys[index], durations[index])
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MusicalImages.is_playing()) {
        press_overlap(3, true)
    }
})
function play_song (song: any[]) {
    prepare_background()
    setup_bars()
    music.setVolume(20)
    MusicalImages.init_musical_image()
    MusicalImages.set_queue(song)
    MusicalImages.play()
}
function get_overlapping_tile (overlapper: Sprite) {
    for (let sprite_tile of sprites.allOfKind(SpriteKind.Tile)) {
        if (overlapper.overlapsWith(sprite_tile)) {
            return sprite_tile
        }
    }
    return [][0]
}
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    if (MusicalImages.is_playing()) {
        if (!(sprites.readDataBoolean(sprite, "played"))) {
            scene.cameraShake(2, 100)
        }
    }
})
let sprite_tile: Sprite = null
let image2: Image = null
let overlapping: Sprite = null
let overlapper_images_pressed: Image[] = []
let overlapper_images: Image[] = []
let sprites_overlappers: Sprite[] = []
let sprite_bar: Sprite = null
stats.turnStats(true)
play_song([assets.animation`never_gonna_give_you_up_main`, assets.animation`never_gonna_give_you_up_accompaniment`])
