class EventEmitter {
  private events: { [eventName: string]: Array<(...args: any[]) => void> } = {};

  on(eventName: string, listener: (...args: any[]) => void): this {
    if (!this.events[eventName]) {
    this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
    return this;
}

  emit(eventName: string, ...args: any[]): this {
    if (this.events[eventName]) {
      this.events[eventName].forEach(listener => {
        listener(...args);
      });
    }
    return this;
}

  off(eventName: string, listener: (...args: any[]) => void): this {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (existingListener) => existingListener !== listener
      );
    }
    return this;
}
}
  // Пример использования:
const emitter = new EventEmitter();

const logData = (data: any) => console.log("Data:", data); // Исправлено: добавили any

emitter.on('data', logData);
emitter.emit('data', { message: 'Hello, world!' }); // Data: { message: 'Hello, world!' }

emitter.off('data', logData);
emitter.emit('data', { message: 'Пробую вывестись' }); // Ничего не выведет

emitter.on('userLoggedIn', (user: string) => console.log(`User logged in: ${user}`));
emitter.emit('userLoggedIn', 'JohnDoe'); // User logged in: JohnDoe