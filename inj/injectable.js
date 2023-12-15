var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
// Глобальная переменная для хранения экземпляров классов
var instancesMap = new Map();
// Декоратор для создания экземпляра класса и добавления в список
function Injectable(config) {
    return function (target) {
        var key = config.key;
        // Создаем экземпляр класса
        var instance = new target();
        // Добавляем экземпляр в список по ключу
        instancesMap.set(key, instance);
    };
}
// Декоратор для внедрения зависимости в поле класса
function Inject(key) {
    return function (target, propertyKey) {
        // Ищем экземпляр по ключу в списке
        var instance = instancesMap.get(key);
        if (instance) {
            // Присваиваем найденный экземпляр полю класса
            target[propertyKey] = instance;
        }
        else {
            throw new Error("No instance found for key: ".concat(key));
        }
    };
}
// Использование декораторов
var TestInjectable = function () {
    var _classDecorators = [Injectable({ key: "TestInjectable" })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TestInjectable = _classThis = /** @class */ (function () {
        function TestInjectable_1() {
            this.message = 'Hello, world!';
        }
        return TestInjectable_1;
    }());
    __setFunctionName(_classThis, "TestInjectable");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TestInjectable = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TestInjectable = _classThis;
}();
var TestInject = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _testedField_decorators;
    var _testedField_initializers = [];
    return _a = /** @class */ (function () {
            function TestInject() {
                // Используем декоратор для внедрения экземпляра в поле
                this.testedField = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _testedField_initializers, void 0));
            }
            TestInject.prototype.print = function () {
                console.log(this.testedField.message);
            };
            return TestInject;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _testedField_decorators = [Inject("TestInjectable")];
            __esDecorate(null, null, _testedField_decorators, { kind: "field", name: "testedField", static: false, private: false, access: { has: function (obj) { return "testedField" in obj; }, get: function (obj) { return obj.testedField; }, set: function (obj, value) { obj.testedField = value; } }, metadata: _metadata }, _testedField_initializers, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var testInjectInstance = new TestInject();
testInjectInstance.print();
