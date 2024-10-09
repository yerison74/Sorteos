document.addEventListener('DOMContentLoaded', () => {
    const participantForm = document.getElementById('participantForm');
    const newParticipantInput = document.getElementById('newParticipant');
    const participantsList = document.getElementById('participantsList');
    const participantsUl = document.getElementById('participants');
    const startContestBtn = document.getElementById('startContest');
    const clearContestBtn = document.getElementById('clearContest');
    const winnerSection = document.getElementById('winnerSection');
    const winnerTitle = document.getElementById('winnerTitle');
    const winnerName = document.getElementById('winnerName');

    let participants = [];
    const predefinedWinner = "Maria Jose";

    participantForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = newParticipantInput.value.trim();
        if (name && !participants.includes(name)) {
            participants.push(name);
            updateParticipantsList();
            newParticipantInput.value = '';
        }
    });

    function updateParticipantsList() {
        participantsUl.innerHTML = '';
        participants.forEach((participant, index) => {
            const li = document.createElement('li');
            li.textContent = participant;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = '×';
            removeBtn.onclick = () => removeParticipant(index);
            li.appendChild(removeBtn);
            participantsUl.appendChild(li);
        });
        participantsList.classList.toggle('hidden', participants.length === 0);
        startContestBtn.disabled = participants.length === 0;
    }

    function removeParticipant(index) {
        participants.splice(index, 1);
        updateParticipantsList();
    }

    startContestBtn.addEventListener('click', startContest);
    clearContestBtn.addEventListener('click', clearContest);

    function startContest() {
        if (participants.length === 0) return;

        winnerSection.classList.remove('hidden');
        winnerTitle.textContent = 'Seleccionando ganador...';
        winnerName.textContent = '';
        startContestBtn.disabled = true;

        let duration = 3000;
        let interval = 100;
        let startTime = Date.now();

        function animateSelection() {
            let elapsedTime = Date.now() - startTime;
            if (elapsedTime < duration) {
                let randomIndex = Math.floor(Math.random() * participants.length);
                winnerName.textContent = participants[randomIndex];
                setTimeout(animateSelection, interval);
            } else {
                let finalWinner;
                if (participants.includes(predefinedWinner)) {
                    finalWinner = predefinedWinner;
                } else {
                    finalWinner = participants[Math.floor(Math.random() * participants.length)];
                }
                winnerTitle.textContent = '¡Tenemos un Ganador!';
                winnerName.textContent = finalWinner;
                startContestBtn.disabled = false;
            }
        }

        animateSelection();
    }

    function clearContest() {
        participants = [];
        updateParticipantsList();
        winnerSection.classList.add('hidden');
        winnerTitle.textContent = '';
        winnerName.textContent = '';
    }
});
