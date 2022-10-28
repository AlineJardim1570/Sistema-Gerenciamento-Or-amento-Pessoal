// GRÁFICO COLUNAS 2021
var firebaseData = [];
var firebaseDataAux = [
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

async function getEntradas() {

  var firebaseData = [];
  var firebaseDataAux = [
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
          if (firebaseData[i].tipo == 'entrada') {
            if (firebaseData[i].mesRef == 0) {
              firebaseDataAux[0][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 1) {
              firebaseDataAux[1][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 2) {
              firebaseDataAux[2][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 3) {
              firebaseDataAux[3][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 4) {
              firebaseDataAux[4][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 5) {
              firebaseDataAux[5][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 6) {
              firebaseDataAux[6][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 7) {
              firebaseDataAux[7][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 8) {
              firebaseDataAux[8][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 9) {
              firebaseDataAux[9][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 10) {
              firebaseDataAux[10][1] += Number(firebaseData[i].valor);
            }

            if (firebaseData[i].mesRef == 11) {
              firebaseDataAux[11][1] += Number(firebaseData[i].valor);
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
  data.addColumn('number', 'Vendas');
  data.addRows(firebaseDataAux);
  var options = {
    'title': 'Vendas mensais de 2022',
    'width': 1000,
    'height': 400,
    colors: ['green', 'green']
  };
  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
  chart.draw(data, options);
}