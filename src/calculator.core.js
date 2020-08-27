import { fromEvent, BehaviorSubject, interval } from "rxjs";
import { tap, timeoutWith } from 'rxjs/operators';

export class Calculator {

  firstOperande = '';
  secondOperande = '';
  screenView = '';
  result = 0;
  operation = null;
  modal = document.getElementById('modal');
  modalTextContent = document.getElementById('modalTextContent');


  getKeyNumber$ = () => {
    return fromEvent(document.querySelectorAll('.number'), 'click').pipe(
      tap((val) => {
        if (this.operation === null) {
          if (val.target.innerHTML === '.' && this.firstOperande.includes('.')) { return }
          this.firstOperande += val.target.innerHTML;
          this.screenView = this.firstOperande;
          document.getElementById('screenView').textContent = this.screenView;
        } else {
          if (val.target.innerHTML === '.' && this.secondOperande.includes('.')) { return }
          this.secondOperande += val.target.innerHTML;
          this.screenView += val.target.innerHTML;
          document.getElementById('screenView').textContent = this.screenView;
        }
      })
    )
  }

  getOperator$ = () => {
    return fromEvent(document.querySelectorAll('.operator'), 'click').pipe(
      tap((val) => {
        if (this.firstOperande === '') {
          this.launchAlert('Il faut saisir un chiffre');
          return
        } else if (this.operation !== null) {
          this.launchAlert('il faut taper égal après avoir saisie 2 valeurs et une opération')
        } else {
          this.operation = val.target.innerHTML;
          this.screenView = this.screenView + ' ' + this.operation + ' ';
          document.getElementById('screenView').textContent = this.screenView;
        }
      })
    )
  }

  getEqual$ = () => {
    return fromEvent(document.querySelectorAll('.equal'), 'click').pipe(
      tap((val) => {
        this.compute()
      })
    );
  }

  launchAlert = (message) => {
    this.modal.classList.remove('modal-error--hidden');
    this.modal.classList.add('modal-error--visible');
    this.modalTextContent.textContent = message;
    setTimeout(() => {
      this.modal.classList.add('modal-error--hidden');
      this.modal.classList.remove('modal-error--visible');
    }, 3000)
  }

  reset$ = () => {
    return fromEvent(document.querySelectorAll('.reset'), 'click').pipe(
      tap((val) => {
        this.screenView = '';
        this.result = 0;
        this.operation = null;
        this.firstOperande = '';
        this.secondOperande = '';
        document.getElementById('result').textContent = this.result;
        document.getElementById('screenView').textContent = this.screenView;
      })
    );
  }

  compute() {
    if (this.firstOperande !== '' && this.operation !== null && this.secondOperande !== '') {
      switch (this.operation) {
        case '+':
          this.result = Number(this.firstOperande) + Number(this.secondOperande);
          break;
        case '-':
          this.result = Number(this.firstOperande) - Number(this.secondOperande);
          break;
        case '*':
          this.result = Number(this.firstOperande) * Number(this.secondOperande);
          break;
        case '/':
          this.result = Number(this.firstOperande) / Number(this.secondOperande);
          break;
      }
      this.firstOperande = this.result;
      this.secondOperande = '';
      this.operation = null;
    } else {
      this.launchAlert('Il y a un problème calcul impossible')
    }
    document.getElementById('result').textContent = this.result;

  }

  start() {
    this.getKeyNumber$().subscribe()
    this.getOperator$().subscribe()
    this.getEqual$().subscribe()
    this.reset$().subscribe()

  }

}