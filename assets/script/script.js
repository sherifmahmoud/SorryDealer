let sorry = {
    cards: [
        { value: '1', image: 'Card_1.jpg', number: 5 },
        { value: '2', image: 'Card_2.jpg', number: 4 },
        { value: '3', image: 'Card_3.jpg', number: 4 },
        { value: '4', image: 'Card_4.jpg', number: 4 },
        { value: '5', image: 'Card_5.jpg', number: 4 },
        { value: '7', image: 'Card_7.jpg', number: 4 },
        { value: '8', image: 'Card_8.jpg', number: 4 },
        { value: '10', image: 'Card_10.jpg', number: 4 },
        { value: '11', image: 'Card_11.jpg', number: 4 },
        { value: '12', image: 'Card_12.jpg', number: 4 },
        { value: 'Sorry', image: 'Card_Sorry.jpg', number: 4 }
    ],

    shuffled: [],
    currentCard: 0,
    init: function () {
        //start with unshuffled indexes
        this.cards.forEach((card, index) => {
            for (let i = 0; i < card.number; i++)this.shuffled.push(index);
        });
        console.log(this.shuffled);
        this.shuffleCards();
        console.log(this.shuffled);
    },

    shuffleCards: function () {
        //start with the shuffled cards
        let unshuffled = this.shuffled.slice();
        //randomly choose an index to be added to the shuffled list
        console.log(unshuffled);
        this.shuffled = [];
        while (unshuffled.length > 0) {
            let randomIndex = Math.floor(Math.random() * unshuffled.length);
            this.shuffled.push(unshuffled.splice(randomIndex, 1)[0]);
        }
        console.log(this.shuffled);
        this.currentCard = 0;
    },
    drawCard: function () {
        let result;
        if (this.currentCard < this.shuffled.length) {
            result = this.currentCard++;
        } else {
            this.shuffleCards();
            result = 0;
        }
        return this.shuffled[result];
    }
}

$(function () {
    sorry.init();

});

$('#shuffle').click(function () {
    sorry.shuffleCards();
    updateProgressBar();

});
$('#drawCard').click(function () {
    let cardIndex = sorry.drawCard();
    //change card image
    $('#image').attr('src', `assets/images/${sorry.cards[cardIndex].image}`);
    //update progress bar
    updateProgressBar();
});

function updateProgressBar() {
    let percent = ((sorry.currentCard + 1) / sorry.shuffled.length) * 100;
    $('#progress').attr('style', `width: ${percent}%`);
    $('#progress').html(`${sorry.currentCard + 1}/${sorry.shuffled.length}`);
}