var budgetController = (function () {
    
    
})();

var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }
        return {
                getInput: function () {
                    return {
                        type: document.querySelector(DOMStrings.inputType).value, //in for income and exp for expense
                        description: document.querySelector(DOMStrings.inputDescription).value,
                        value: document.querySelector(DOMStrings.inputValue).value
                        
                    };
            
                },
                getDOMstrings: function () {
                return DOMStrings;
                }
        };
    
})();

var controller = (function (budgetCtrl,UICtrl) {
    var ctrlAddItem = function () {
        var input = UICtrl.getInput();
        console.log(input);
    }
    var DOM = UICtrl.getDOMstrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });
    
})(budgetController,UIController);