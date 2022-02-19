/* Moralis init code */
const serverUrl = 'https://klywifkzenrq.usemoralis.com:2053/server';
const appId = 'nRzlWAxPrwa2GrQKeZxyEm66UIKkEZWzwilXWzEO';
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    try {
      user = await Moralis.authenticate({
        signingMessage: 'Log in using Moralis',
      });
      await Moralis.enableWeb3();
      console.log('logged in user:', user);
      console.log(user.get('ethAddress'));
      document.querySelector('#btn-login').textContent = user.get('ethAddress');
    } catch {
      console.log(error);
    }
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log('logged out');
  document.querySelector('#btn-login').textContent = 'Connect Wallet';
}

async function deposit() {
  let options = {
    contractAddress: "0xA29BC35Dca0755DCE6b370037E49Cf835037cfc1",
    functionName: "confirm_payment",
    abi: [{"inputs":[],"name":"confirm_payment","outputs":[],"stateMutability":"payable","type":"function"}],
    msgValue: Moralis.Units.ETH(0.0001)
  }
  await Moralis.executeFunction(options);
}

async function retreive() {
  let options = {
    contractAddress: "0x4f890bA557CabB868dd1Cd6a77472B0915c5597C",
    functionName: "ReturnPayment",
    abi: [
      {"inputs":[],"name":"ReturnPayment","outputs":[],"stateMutability":"nonpayable","type":"function"}
    ]
  };
  await Moralis.executeFunction(options);
}

async function confirm() {
  let options = {
    contractAddress: "0x4f890bA557CabB868dd1Cd6a77472B0915c5597C",
    functionName: "confirm_Delivery",
    abi: [
      {"inputs":[],"name":"confirm_Delivery","outputs":[],"stateMutability":"nonpayable","type":"function"}
    ]
  };
  await Moralis.executeFunction(options);
}

let inputValue = Number(document.querySelector('.inputBox').value);

const loginMain = function(e){
  e.preventDefault();
  console.log(e);
  login();
}

const logOutMain = function(e){
  e.preventDefault();
  console.log(e);
  logOut();
}

const depositMain = function(e){
  e.preventDefault();
  console.log(e);
  deposit();
}

const retreiveMain = function(e){
  e.preventDefault();
  console.log(e);
  retreive();
}

const confirmMain = function(e){
  e.preventDefault();
  console.log(e);
  confirm();
}

document.querySelector('#btn-login').addEventListener('click', loginMain);
document.getElementById('btn-logout').onclick = logOutMain;
document.querySelector('#deposit').addEventListener('click', depositMain);
document.querySelector('#retreive').addEventListener('click', retreiveMain);
document.querySelector('#confirm').addEventListener('click', confirmMain);
