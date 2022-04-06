namespace SpriteKind {
    export const Bar = SpriteKind.create()
    export const Overlapper = SpriteKind.create()
}
function setup_bars () {
    for (let index = 0; index <= 3; index++) {
        sprite_bar = sprites.create(assets.image`bar`, SpriteKind.Bar)
        sprite_bar.setFlag(SpriteFlag.Ghost, true)
        sprite_bar.top = 0
        sprite_bar.left = scene.screenWidth() / 2 - 30 + 15 * index
    }
    sprites_overlappers = []
    overlapper_images = [
    assets.image`left_overlap`,
    assets.image`up_overlap`,
    assets.image`down_overlap`,
    assets.image`right_overlap`
    ]
    overlapper_images_pressed = [
    assets.image`left_overlap_pressed`,
    assets.image`up_overlap_pressed`,
    assets.image`down_overlap_pressed`,
    assets.image`right_overlap_pressed`
    ]
    for (let image2 of overlapper_images) {
        create_overlap(image2)
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
}
function handle_note (channel: number, note: number, frequency: number, duration: number) {
    if (channel == 0) {
    	
    } else {
    	
    }
}
function prepare_background () {
    scene.setBackgroundColor(13)
}
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    if (MusicalImages.is_playing()) {
        press_overlap(2, false)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MusicalImages.is_playing()) {
        press_overlap(0, true)
    }
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    if (MusicalImages.is_playing()) {
        press_overlap(3, false)
    }
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    if (MusicalImages.is_playing()) {
        press_overlap(0, false)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (MusicalImages.is_playing()) {
        press_overlap(3, true)
    }
})
function create_overlap (image2: Image) {
    sprites_overlappers.push(sprites.create(image2, SpriteKind.Overlapper))
    sprites_overlappers[sprites_overlappers.length - 1].left = scene.screenWidth() / 2 - 30 + 15 * (sprites_overlappers.length - 1)
    sprites_overlappers[sprites_overlappers.length - 1].bottom = scene.screenHeight() - 8
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
        press_overlap(2, true)
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
let overlapper_images_pressed: Image[] = []
let overlapper_images: Image[] = []
let sprites_overlappers: Sprite[] = []
let sprite_bar: Sprite = null
stats.turnStats(true)
play_song([assets.animation`never_gonna_give_you_up_main`, assets.animation`never_gonna_give_you_up_accompaniment`])
