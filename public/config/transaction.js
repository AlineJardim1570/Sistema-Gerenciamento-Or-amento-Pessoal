var currentUser = localStorage.getItem('currentUser'); 

function saveTransation(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    var id = currentUser + Math.floor(Math.random() * 65536);
    const transaction = Object.fromEntries(formData);
    transaction.mesRef = new Date(transaction.data).getMonth();
    transaction.userEmail = currentUser;
    transaction.id = id;

    firebase.firestore().collection("transacao").doc(id).set(transaction)
    .then(() => {
        console.log('Meta adicionada');
    })
    .catch((error) => {
        console.log(error);
    })
}

