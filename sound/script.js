var soundNames = {
    'action-btn': [
        'Snoring',
        'Sighing',
        'Yawning',
        'Whispering',
        'Screaming',
        'Applause',
        'Laughter',
        'Crying',
        'Sneezing',
        'Gasping',
        'Humming',
        'Muttering',
        'Groaning',
        'Giggling',
        'Shouting',
        'Grunting',
        'Mumbling',
        'Chewing',
        'Sucking Teeth',
        'Burping'
    ],
    'animal-btn': [
        'Dog Bark',
        'Cat Meow',
        'Bird Chirp',
        'Horse Neigh',
        'Cow Moo',
        'Pig Oink',
        'Sheep Baa',
        'Rooster Crow',
        'Duck Quack',
        'Turkey Gobble',
        'Frog Croak',
        'Cricket Chirp',
        'Monkey Chatter',
        'Elephant Trumpet',
        'Lion Roar',
        'Tiger Growl',
        'Wolf Howl',
        'Bear Growl',
        'Whale Song',
        'Dolphin Chatter'
    ],
    'nature-btn': [
        'Thunderstorm',
        'Rain Shower',
        'Wind Blowing',
        'Ocean Waves',
        'River Flowing',
        'Waterfall',
        'Birdsong in Forest',
        'Crackling Fire',
        'Crickets at Night',
        'Frogs Croaking',
        'Cicadas Buzzing',
        'Bee Buzzing',
        'Leaves Rustling',
        'Avalanche',
        'Earthquake Rumble',
        'Volcano Eruption',
        'Tornado Whirl',
        'Aurora Borealis',
        'Meteor Shower',
        'Eclipse'
    ],
    'misc-btn': [
        'Clock Ticking',
        'Doorbell Ringing',
        'Car Horn',
        'Siren Wailing',
        'Telephone Ringing',
        'Alarm Clock',
        'Fire Alarm',
        'Police Whistle',
        'Bicycle Bell',
        'Baby Crying',
        'Laughter',
        'Applause',
        'Screaming',
        'Sighing',
        'Yawning',
        'Whispering',
        'Snoring',
        'Footsteps',
        'Heartbeat',
        'Thunderclap'
    ]
};

var genreButtons = document.querySelectorAll('.genre-btn');
var soundNameDisplay = document.getElementById('sound-name');

genreButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var genre = this.id;
        var randomIndex = Math.floor(Math.random() * soundNames[genre].length);
        soundNameDisplay.textContent = soundNames[genre][randomIndex];
    });
});
