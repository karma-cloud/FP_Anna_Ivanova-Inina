var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Глобальная переменная для хранения экземпляров классов
const instancesMap = new Map();
// Декоратор для создания экземпляра класса и добавления в список
function Injectable(config) {
    return function (target) {
        const { key } = config;
        // Создаем экземпляр класса
        const instance = new target();
        // Добавляем экземпляр в список по ключу
        instancesMap.set(key, instance);
    };
}
// Декоратор для внедрения зависимости в поле класса
function Inject(key) {
    return function (target, propertyKey) {
        // Ищем экземпляр по ключу в списке
        const instance = instancesMap.get(key);
        if (instance) {
            // Присваиваем найденный экземпляр полю класса
            target[propertyKey] = instance;
        }
        else {
            throw new Error(`No instance found for key: ${key}`);
        }
    };
}
let TestInjectable = class TestInjectable {
    constructor() {
        this.message = 'Hello, world!';
    }
};
TestInjectable = __decorate([
    Injectable({ key: "TestInjectable" })
], TestInjectable);
class TestInject {
    print() {
        console.log(this.testedField.message);
    }
}
__decorate([
    Inject("TestInjectable"),
    __metadata("design:type", TestInjectable)
], TestInject.prototype, "testedField", void 0);
const testInjectInstance = new TestInject();
testInjectInstance.print();
//# sourceMappingURL=injectable.js.map