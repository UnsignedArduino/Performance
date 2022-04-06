function play_song (song: any[]) {
    music.setVolume(20)
    MusicalImages.init_musical_image()
    MusicalImages.set_queue(song)
    MusicalImages.play()
}
stats.turnStats(true)
play_song([assets.animation`never_gonna_give_you_up_main`, assets.animation`never_gonna_give_you_up_accompaniment`])
