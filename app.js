var budgetController = (function () {
    var Expenses = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value
    };

    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    }

    return {
        addItem:  function(type,desc,val) {
            var ID, newItem;
            
                     
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            if (type === 'inc') {
                newItem = new Income(ID,desc,val);
            } else if (type === 'exp') {
                newItem = new Expenses(ID,desc,val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },
        testing : function () {
            console.log(data);
        }
                
        
    };
    
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

var controller = (function (budgetCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {
                if (event.keyCode === 13 || event.which === 13) {
                    ctrlAddItem();
        }
    });
    }
    var ctrlAddItem = function () {
        var input = UICtrl.getInput();
        budgetController.addItem(input.type,input.description,input.value);
    }
    return {
        init: function () {
            return setupEventListeners();
            
        }
    }
    
})(budgetController, UIController);
controller.init();