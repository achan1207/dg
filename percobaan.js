document.querySelector(".start").addEventListener("click", function () {
    if (isGameActive) return;

    isGameActive = true;
    document.querySelector("#stop-button").disabled = false;

    p1 = setInterval(function () {
        randomIndex_1 = Math.floor(Math.random() * player_1.length);
        document.querySelector("#img_player1").src = player_1[randomIndex_1];
    }, 100);

    p2 = setInterval(function () {
        randomIndex_2 = Math.floor(Math.random() * player_2.length);
        document.querySelector("#img_player2").src = player_2[randomIndex_2];
    }, 100);
});

document.querySelector("#stop-button").addEventListener("click", function () {
    clearInterval(p1);
    clearInterval(p2);
    hasil_p1 = player_1[randomIndex_1];
    hasil_p2 = player_2[randomIndex_2];
    tampilkan();
});
