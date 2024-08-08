const chillIdeas = [
    "Watch a movie together using Teleparty.",
    "Cook and eat a meal together over video call.",
    "Read the same book and discuss it.",
    "Take a virtual museum tour together.",
    "Share and listen to playlists together."
];

const activeIdeas = [
    "Play an online game together like Among Us.",
    "Participate in a virtual escape room.",
    "Have a cooking challenge.",
    "Work out together over a video call.",
    "Do a DIY craft project together."
];

const conversationQuestions = [
    "What is a skill you've always wanted to learn and why?",
    "Where do you see yourself in five years?",
    "If you could have dinner with any fictional character, who would it be and why?",
    "What are some of the biggest challenges you've faced in life and how did you overcome them?",
    "What are some of your favorite memories of us together?"
];

document.getElementById('chill-idea-button').addEventListener('click', () => {
    const idea = chillIdeas[Math.floor(Math.random() * chillIdeas.length)];
    document.getElementById('idea-text').innerText = idea;
});

document.getElementById('active-idea-button').addEventListener('click', () => {
    const idea = activeIdeas[Math.floor(Math.random() * activeIdeas.length)];
    document.getElementById('idea-text').innerText = idea;
});

document.getElementById('conversation-questions-button').addEventListener('click', () => {
    const question = conversationQuestions[Math.floor(Math.random() * conversationQuestions.length)];
    document.getElementById('idea-text').innerText = question;
});
