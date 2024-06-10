import {useState } from 'react';
import './App.css';
import Box from './component/Box';
import { FaHandPaper, FaRegHandRock,  FaHandScissors} from "react-icons/fa";


/* 가위바위보의 선택자와 이미지를 담은 객체*/ 
let choice = {
  rock:{
    name:"rock",img : process.env.PUBLIC_URL + './images/주먹.png'},
  scissors:{
    name:"scissors",img : process.env.PUBLIC_URL + './images/가위.png'},
  paper:{
    name:"paper",img : process.env.PUBLIC_URL + './images/보.png'}
}
//import {person} from 'react-bootstrap-icons';
/*
  1.박스 두개
    >(타이틀, 사진 , 결과)
  2.가위 바위 보 버튼이 있다.
  3.버튼을 클릭하면 클릭한 값이 박스에 보인다. 
    >( onclick, useState)
  4.컴퓨터는 랜덤하게 아이템을 선택한다. 
    > random()
  5.내 결과, 컴퓨터 결과를 비교하여 승패를 가린다.
    >비교, 삼항연산자
  6. 승패결과에 따라 테투리 색이 변경됨
    >(승-초록 ,패-레드, 비기면-블랙)
*/

function App() {
  //유저와 컴퓨터의 선택, 결과값을 상태관리해주는 함수
  const [userSelect, setUserSelect]=useState(null);
  const [computerSelect, setComputerSelect]=useState(null);
  const [result, setResult] = useState("");
  // 유저의 선택에 따라 게임 진행하는 함수
  const play = (userChoice) => {
    console.log("선택됨", userChoice);
    setUserSelect(choice[userChoice]);//사용자의 선택을 상태에 저장

    let computerChoice = randomChoice();//컴퓨터 선택을 랜덤으로 가져옴
    setComputerSelect(computerChoice);//컴퓨터의 선택을 상태에 저장
    setResult(judgement(choice[userChoice], computerChoice)); //결과를 판단해서 상태에 저장
  }
  //가위바위보중 랜덤으로 하나를 선택하는 함수
  const randomChoice =()=>{
    let itemArray = Object.keys(choice); //객체의 키값을 배열로 변환
    let randomItem = Math.floor(Math.random()*itemArray.length);//랜덤으로 배열의 인덱스를 선택
    let final = itemArray[randomItem];
    return choice[final]; //랜덤으로 선택된 항목 반환
  };
  // 승패를 판단하는 함수
  const judgement=(user, computer)=>{
    console.log("user", user, 'computer',computer)
    //가위바위보 로직
    //user 이겼을 때  win
    //user 졌을 때 lose
    //user 비겼을 때 tie
    //user == rock, computer ===scissors 이김
    //user == rock, computer === paper 짐
    //user == scissors, computer == paper 이김
    //user == scissors, computer == rock 짐
    //user == paper, computer == rock 이김
    //user ==paper, computer ==scissors 짐
    if(user.name ===computer.name){
      return "tie"//무승부
    }else if (user.name ==="rock"){
      return computer.name === "scissors" ? 'win': 'lose';
    }else if (user.name ==="scissors"){
      return computer.name === "paper" ? 'win': 'lose';
    }else if (user.name ==="paper"){
      return computer.name === "rock" ? 'win': 'lose';
    }
  };
  return (
    <div className="App">
      <h1
      style={{
        textAlign:'center'
      }}>Rock Scissor Paper Game</h1>
      <div className="Box-wrap">
        <Box title="Me" item={userSelect} result={result}/>
        <Box title="Computer" item={computerSelect} result={result}/> 
      </div>
      <div className='main'>
        <button onClick={()=>play('scissors')}>가위<FaHandScissors /></button>
        <button onClick={()=>play('rock')}>바위<FaRegHandRock  /></button>
        <button onClick={()=>play('paper')}>보<FaHandPaper /></button>
      </div>
    </div>
  );
}

export default App;
