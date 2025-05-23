/*▄───────────────────────────────────────▄
  █                                       █
  █  Text                                 █
  █  • Коллекция текстов                  █
  █                                       █
  █  (присвоение только через равенство)  █
  █                                       █
  ▀───────────────────────────────────────▀*/
(() => {
/*┌─────────────────────────────┐
  │ Список локальных переменных │
  └─────────────────────────────┘*/
    let _collection = {};  // Единая коллекция
    let _collections = {}; // Список коллекций
    
/*┌────────────────────────────────────────┐
  │ Очищает все коллекции (сборщик мусора) │
  └────────────────────────────────────────┘*/
    $.gc.text = () => {
        _collection = {};  // Единая коллекция
        _collections = {}; // Список коллекций
    };
    
/*┌──────────────────────────────────────────────┐
  │ Добавляет новую коллекцию в список коллекций │
  └──────────────────────────────────────────────┘*/
    let _proxy = new Proxy(f=>0, {set: (target, collection, item) => {
        _collections[collection] = new item;
    }});
    
/*┌──────────────────────────────────┐
  │ Добавляет новую единую коллекцию │
  └──────────────────────────────────┘*/
    Object.defineProperty($, 'Text', {get: f=>_proxy, set: (item) => {
        _collection = new item;
    }});
    
/*┌─────────────────────────────────────┐
  │ Возвращает элемент единой коллекции │
  └─────────────────────────────────────┘*/
    $.text = new Proxy((...args) => {
    // Получаем элемент единой коллекции
        let item = args.flat()[0];
        
    // Возвращаем элемент единой коллекции
        return _collection[item];
    },
    
/*┌──────────────────────────────────────────────────┐
  │ Возвращает элемент коллекции из списка коллекций │
  └──────────────────────────────────────────────────┘*/
    {get: (target, collection) => (...args) => {
    // Получаем элемент коллекции
        let item = args.flat()[0];
        
    // Возвращаем элемент коллекции
        return _collections[collection][item];
    }});
})();
