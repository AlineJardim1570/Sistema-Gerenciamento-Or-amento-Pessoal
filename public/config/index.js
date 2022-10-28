// GRÁFICO COLUNAS 2021
var firebaseData = [];
var firebaseData2 = [];
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


var valor_meta = 0;
var total_metas = 0;
var tabela_parametro;
var numeroLinhas;
var linha;
var celula1;
var celula2;
var celula3;
var celula4;
var celula5;
var celula6;
var currentUser = null;


function createRow(data) {

  if (data == null) {
    data = {
      value: '',
      description: '',
      index: 0,
      prazo: '',
      userEmail: currentUser,
      id: 0
    }
  }

  document.getElementById('thead_metas').style.visibility = 'visible';

  tabela_parametro = document.getElementById("tabela_metas");

  numeroLinhas = tabela_parametro.getElementsByClassName('tr').length;
  linha = tabela_parametro.insertRow(numeroLinhas);
  linha.className = "tr";

  celula1 = linha.insertCell(0);
  celula2 = linha.insertCell(1);
  celula3 = linha.insertCell(2);
  celula4 = linha.insertCell(3);
  celula5 = linha.insertCell(4);
  celula6 = linha.insertCell(5);

  celula1.innerHTML = `<td>${numeroLinhas + 1}</td>`;
  celula1.className = "seq";
  celula1.id = `seq_meta${numeroLinhas}`;

  celula2.innerHTML = `<td> <input placeholder="Descrição" type="text" id="des_meta${numeroLinhas}" value="${data.description}"></td>`;
  celula2.className = "car";

  celula3.innerHTML = `<td> <input placeholder="Valor" class="val_meta" type="text" id="val_meta${numeroLinhas}" onkeyup="somenteNumeros(this)" onblur="valor_total()" value="${data.value}"> </td>`;
  celula3.className = "car val";

  celula4.innerHTML = `<td> <input placeholder="Prazo" class="prazo_meta" type="date" id="prazo_meta${numeroLinhas}" value="${data.prazo}"> </td>`;
  celula4.className = "car date";

  celula5.innerHTML = `<td> <button class="del no_print disabled-buttons${numeroLinhas+1}" data-value="${numeroLinhas+1}" onclick="deleteRow(this.parentNode.parentNode.rowIndex);" id="deletar_meta${numeroLinhas + 1}"><i class="fa-solid fa-close"></i></button> </td>`;

  celula6.innerHTML = `<td> <button class="check no_print disabled-buttons${numeroLinhas+1}" type="checkbox" value="${data.checked}" id="checked_meta${numeroLinhas + 1}"><i class="fa-solid fa-check"></i></button> </td>`;

  document.getElementById("des_meta" + numeroLinhas).focus();

  if (data.checked) { 
    let disabled_buttons = document.getElementsByClassName(`disabled-buttons${numeroLinhas+1}`);
    
    for (let i = 0; i < disabled_buttons.length; i++) {
      disabled_buttons[i].setAttribute('disabled', 'disabled');
    }
  }
}

function deleteRow(linha) {
  
  removeMetas(linha);
  document.getElementById('tabela_metas').deleteRow(linha - 1);
  total_metas = 0;
  
  for (let i = 0; i < document.getElementById('tabela_metas').getElementsByTagName('tr').length; i++) {
    if (!document.getElementById(`seq_meta${i}`)) {
      document.getElementById(`seq_meta${i+1}`).textContent = ((i + 1) + '.');
      document.getElementById(`seq_meta${i+1}`).setAttribute('id', `seq_meta${i}`);
      document.getElementById(`des_meta${i+1}`).setAttribute('id', `des_meta${i}`);
      document.getElementById(`val_meta${i+1}`).setAttribute('id', `val_meta${i}`);
    }
  }
  
  if (document.getElementById('tabela_metas').getElementsByTagName('tr').length == 0){
    document.getElementById('thead_metas').style.visibility = 'hidden';
  } 
  valor_total()
}

function somenteNumeros(num) {
  var er = /[^0-9. ,-,]/;
  er.lastIndex = 0;
  var campo = num;
  if (er.test(campo.value)) {
    campo.value = "";
  }
  total_metas = 0.00;
  for (let i = 0; i < document.getElementById('tabela_metas').getElementsByTagName('tr').length; i++) {
    if (document.getElementById(`val_meta${i}`) !== null) {
      var meta = document.getElementById(`val_meta${i}`).value;
      meta = meta.replace(",", ".");
      meta = parseFloat(meta).toFixed(2);

      if (meta !== "NaN") {
        total_metas += parseFloat(meta);
      }
    }
  }
  total_metas = parseFloat(total_metas).toFixed(2);
  document.getElementById('total_metas').value = (total_metas).replace(".", ",");
}

function valor_total() {
  total_metas = 0.00;

  if (document.getElementById('tabela_metas').childElementCount == 0) {
    return;
  }

  for (let i = 0; i < document.getElementById('tabela_metas').getElementsByTagName('tr').length; i++) {
    if (document.getElementById(`val_meta${i}`) !== null) {
      var meta = document.getElementById(`val_meta${i}`).value;
      meta = meta.replace(",", ".");
      meta = parseFloat(meta).toFixed(2);

      if (meta !== "NaN") {
        total_metas += parseFloat(meta);
      }
    }
  }

  total_metas = parseFloat(total_metas).toFixed(2);
  document.getElementById('total_metas').value = (total_metas).replace(".", ",");
}

async function getMetas() {
  currentUser = localStorage.getItem('currentUser');

  let data = [];
  try {
    firebase.firestore().collection("metas").where("userEmail", "==", currentUser)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          data.push(doc.data())
        });
        for (let i = 0; i < data.length; i++) {
          createRow(data[i]);
        }
        valor_total();
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);

      });
  } catch (error) {
    console.log('Erro ao obter metas')
  } 

};


function addMetas() {

  if (document.getElementById('tabela_metas').getElementsByTagName('tr').length == 0) {
    alert('Por favor, defina alguma meta antes de salvar')
    return;
  }

  let data = {};
  for (let i = 0; i < document.getElementById('tabela_metas').getElementsByTagName('tr').length; i++) {
    if (document.getElementById(`val_meta${i}`) !== null) {
      var description = document.getElementById(`des_meta${i}`).value;

      var meta = document.getElementById(`val_meta${i}`).value;
      meta = meta.replace(",", ".");
      meta = parseFloat(meta).toFixed(2);

     // debugger
      var prazo = document.getElementById(`prazo_meta${i}`).value;
      var checked = document.getElementById(`checked_meta${i}`).value;

      var id = currentUser + i;

      data = {
        value: meta,
        description: description,
        index: i,
        prazo: prazo,
        userEmail: currentUser,
        id: id,
        checked: checked
      }

      firebase.firestore().collection("metas").doc(id).set(data)
        .then(() => {
          console.log('Meta adicionada');
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }


};

function removeMetas(linha) {
  var id = currentUser + linha;

  firebase.firestore().collection("metas").doc(id).delete()
    .then(() => {
      console.log('Meta deletada');
    })
    .catch((error) => {
      console.error('Erro ao remover documento: ', error);
    })
};

async function getDespesas() {

  currentUser = localStorage.getItem('currentUser');

  try {
    firebase.firestore().collection("transacao").where("userEmail", "==", currentUser)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          firebaseData2.push(doc.data())
        });
        
       // debugger
        for (let i = 0; i < firebaseData2.length; i++) {
          if (firebaseData2[i].tipo == 'despesa') {
            if (firebaseData2[i].mesRef == 0) {
              firebaseDataAux2[0][1] += Number(firebaseData2[i].valor);
            }

            if (firebaseData2[i].mesRef == 1) {
              firebaseDataAux2[1][1] += Number(firebaseData2[i].valor);
            }

            if (firebaseData2[i].mesRef == 2) {
              firebaseDataAux2[2][1] += Number(firebaseData2[i].valor);
            }

            if (firebaseData2[i].mesRef == 3) {
              firebaseDataAux2[3][1] += Number(firebaseData2[i].valor);
            }

            if (firebaseData2[i].mesRef == 4) {
              firebaseDataAux2[4][1] += Number(firebaseData2[i].valor);
            }

            if (firebaseData2[i].mesRef == 5) {
              firebaseDataAux2[5][1] += Number(firebaseData2[i].valor);
            }

            if (firebaseData2[i].mesRef == 6) {
              firebaseDataAux2[6][1] += Number(firebaseData2[i].valor);
            }

            if (firebaseData2[i].mesRef == 7) {
              firebaseDataAux2[7][1] += Number(firebaseData2[i].valor);
            }

            if (firebaseData2[i].mesRef == 8) {
              firebaseDataAux2[8][1] += Number(firebaseData2[i].valor);
            }

            if (firebaseData2[i].mesRef == 9) {
              firebaseDataAux2[9][1] += Number(firebaseData2[i].valor);
            }

            if (firebaseData2[i].mesRef == 10) {
              firebaseDataAux2[10][1] += Number(firebaseData2[i].valor);
            }

            if (firebaseData2[i].mesRef == 11) {
              firebaseDataAux2[11][1] += Number(firebaseData2[i].valor);
            }
          }
        }
        
        google.charts.load('current', {
          'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(drawChart2);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);

      });
  } catch (error) {
    console.log('Erro ao obter Entradas')
  }

};


function drawChart2() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Mês');
  data.addColumn('number', 'Despesas');
  data.addRows(firebaseDataAux2);
  var options = {
    'title': 'Despesas mensais de 2022',
    'width': 1000,
    'height': 400,
    colors: ['#1e4a75', '#1e4a75']
  };
  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
  chart.draw(data, options);
}

async function getEntradas() {

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
        //debugger
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
    colors: ['#1e4a75', '#1e4a75']
  };
  var chart = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
  chart.draw(data, options);
}