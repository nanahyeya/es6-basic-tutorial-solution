//1) * 를 사용하여 모든 함수를 import
//import * as mortgage from './mortgage'; 

//2) calculateAmortization 함수만 import
//import { calculateAmortization } from "./mortgage";

//3) calculateAmortization 함수를 as 키워드로 변경하여 import
//import { calculateAmortization as calcAmortization } from "./mortgage";

//Default export 일 경우 as 키워드 없이 함수명을 변경하여 import 가능함
//import calcAmortization from "./mortgage";

//Mortgage 클래스 import 하기
import Mortgage from "./mortgageClass";

//css file을 import 하기
import '../css/styles.css';

document.getElementById('calcBtn').addEventListener('click', () => {
    let principal = document.getElementById("principal").value;
    let years = document.getElementById("years").value;
    let rate = document.getElementById("rate").value;

    // let monthlyPayment = calculateMonthlyPayment(principal, years, rate);
    //let { monthlyPayment, monthlyRate } = calculateMonthlyPayment(principal, years, rate);
    // 1)
    //let { monthlyPayment, monthlyRate, amortization } = mortgage.calculateAmortization(principal, years, rate);

    // 2)
    //let { monthlyPayment, monthlyRate, amortization } = calculateAmortization(principal, years, rate);

    // 3)
    //let { monthlyPayment, monthlyRate, amortization } = calcAmortization(principal, years, rate);

    //객체생성성
    const mortgage = new Mortgage(principal, years, rate);
    //클래스로 부터 Destructuring Assignment 하기
    const { monthlyPayment, amortization } = mortgage;

    document.getElementById("monthlyPayment").innerHTML = monthlyPayment.toFixed(2);
    document.getElementById("monthlyRate").innerHTML = (rate * 100).toFixed(2);

    let html = "";
    mortgage.amortization.forEach((year, index) => html += `
       <tr>
           <td>${index + 1}</td>
           <td class="currency">${Math.round(year.principalY)}</td>
           <td class="stretch">
               <div class="flex">
                   <div class="bar principal"
                        style="flex:${year.principalY};-webkit-flex:${year.principalY}">
                   </div>
                   <div class="bar interest"
                        style="flex:${year.interestY};-webkit-flex:${year.interestY}">
                   </div>
               </div>
           </td>
           <td class="currency left">${Math.round(year.interestY)}</td>
           <td class="currency">${Math.round(year.balance)}</td>
       </tr>
   `);
    document.getElementById("amortization").innerHTML = html;

}); //calcBtn click 핸들러 함수