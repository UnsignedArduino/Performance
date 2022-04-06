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
    for (let image2 of [
    assets.image`left_overlap`,
    assets.image`up_overlap`,
    assets.image`down_overlap`,
    assets.image`right_overlap`
    ]) {
        create_overlap(image2)
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
function create_overlap (image2: Image) {
    sprites_overlappers.push(sprites.create(image2, SpriteKind.Overlapper))
    sprites_overlappers[sprites_overlappers.length - 1].left = scene.screenWidth() / 2 - 30 + 15 * (sprites_overlappers.length - 1)
    sprites_overlappers[sprites_overlappers.length - 1].bottom = scene.screenHeight() - 8
}
MusicalImages.set_handler(function (channels, notes, frequencys, durations) {
    for (let index = 0; index <= channels.length - 1; index++) {
        handle_note(channels[index], notes[index], frequencys[index], durations[index])
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
let sprites_overlappers: Sprite[] = []
let sprite_bar: Sprite = null
stats.turnStats(true)
play_song([assets.animation`never_gonna_give_you_up_main`, assets.animation`never_gonna_give_you_up_accompaniment`])
