var tbody = '';

async function getEntradas() {
  currentUser = localStorage.getItem('currentUser');

  let data = [];
  try {
    firebase.firestore().collection("transacao").where("userEmail", "==", currentUser)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          data.push(doc.data())
        });
        
        let entradas = 0;
        let despesas = 0;
        for (let i = 0; i < data.length; i++) {

          if (data[i].tipo == 'entrada') {
            entradas += Number(data[i].valor);
          }
          if (data[i].tipo == 'despesa') {
            despesas += Number(data[i].valor);
          }

          let data_formatada = data[i].data.split('-');
          data_formatada = data_formatada[2] + '/' + data_formatada[1] + '/' + data_formatada[0];
          tbody +=
            `<tr>
                  <td>${data[i].tipo}</td>
                  <td>${data[i].transacao}</td>
                  <td>${data[i].descricao}</td>
                  <td>${data[i].valor}</td>
                  <td>${data_formatada}</td>
              </tr>`
          
        }

       // debugger
        let saldo = entradas - despesas;

        document.getElementById('saldo').value = saldo;
        document.getElementById('table-entradas').removeAttribute('hidden');
        document.getElementById('tbody-entradas').innerHTML = tbody;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);

      });
  } catch (error) {
    console.log('Erro ao obter entradas')
  }

};

function newTransaction() {
  window.location.href = "../views/transaction.html";
}