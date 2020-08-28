import { Calculator } from './calculator.core';

describe('initialization', () => {

    it('should initialize result with zero', () => {
        const calculator = new Calculator();
        expect(calculator.result).toBe(0);
    }); 

    it('should have modal defined', () => {
        const calculator = new Calculator();
        expect(calculator.modal).toBeDefined();
    }); 

    it('should have modalTextContent defined', () => {
        const calculator = new Calculator();
        expect(calculator.modalTextContent).toBeDefined();
    }); 

});

describe('test event with no library', () => {

    it('should update the view after click a number', (done) => {
        document.body.innerHTML = `
        <div id="screenView" class="calculator-detail-content">
        <div class="calculator-keyboard-key number">8</div>
        `;

        const calculator = new Calculator();
        calculator.getKeyNumber$().subscribe(val => {
            expect(calculator.screenView).toBe("8");
            expect(calculator.firstOperande).toBe("8");
            done(); 
        });
       
        const eventClick = new Event('click');
        const numberEight = document.querySelectorAll('.number')[0];
        numberEight.dispatchEvent(eventClick);
    });

    it.todo('should compute the percentage');

    it.todo('should add only one "." in operande');

});

describe('test a setTimeout with fake Timer', () => {

    it('should toggle classes after 3 s', () => {
        document.body.innerHTML = `
        <div id="modal" class="modal-error--hidden">
        <div class="modal-text-content" id="modalTextContent"></div>
    </div>
        `;
        jest.useFakeTimers();
        const calculator = new Calculator();

        calculator.launchAlert('The beautiful message');

        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
    });

})

describe('test the compute method', () => {

    it('test if method compute for case +', () => {
        document.body.innerHTML = `
        <div id="result" class="calculator-screen-content">
        `;

        const calculator = new Calculator();
        
        calculator.firstOperande = "5";
        calculator.secondOperande = "20";
        calculator.operation = "+";

        calculator.compute();

        expect(calculator.result).toBe(25);
        expect(document.getElementById('result').textContent).toBe("25");
    });


    it.todo('test if method compute for case -');
    it.todo('test if method compute for case /');
    it.todo('test if method compute for case *');
    it.todo('test else method compute');

});
