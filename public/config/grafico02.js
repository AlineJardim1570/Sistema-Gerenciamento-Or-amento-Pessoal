// GRÁFICO COLUNAS 2021
var firebaseData = [];
var firebaseDataAux2 = [
  ['Janeiro', 0],
  ['Fevereiro', 0],
  ['Março', 0],
  ['Abril', 0],
  ['Maio', 0],
  ['Junho', 0],
  ['Julho', 0],
  ['Agosto', 0],
  ['Setembro', 0],
  ['Outubro', 0],
  ['Novembro', 0],
  ['Dezembro', 0]
];

async function getDespesas() {

  currentUser = localStorage.getItem('currentUser');

  try {
    firebase.firestore().collection("transacao").where("userEmail", "==", currentUser)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          firebaseData.push(doc.data())
        });
        
        for (let i = 0; i < firebaseData.length; i++) {
          if (firebaseData[i].tipo == 'despesa') {
            if (firebaseData[i].mesRef == 0) {
              firebaseDataAux2[0][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 1) {
              firebaseDataAux2[1][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 2) {
              firebaseDataAux2[2][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 3) {
              firebaseDataAux2[3][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 4) {
              firebaseDataAux2[4][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 5) {
              firebaseDataAux2[5][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 6) {
              firebaseDataAux2[6][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 7) {
              firebaseDataAux2[7][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 8) {
              firebaseDataAux2[8][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 9) {
              firebaseDataAux2[9][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 10) {
              firebaseDataAux2[10][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 11) {
              firebaseDataAux2[11][1] += Number(firebaseData[i].valor);
            }
          }
        }
        google.charts.load('current', {
          'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(drawChart1);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);

      });
  } catch (error) {
    console.log('Erro ao obter Entradas')
  }

};


function drawChart1() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Mês');
  data.addColumn('number', 'Despesas');
  data.addRows(firebaseDataAux2);
  var options = {
    'title': 'Despesas mensais de 2022',
    'width': 1000,
    'height': 400,
  };
  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
  chart.draw(data, options);
}