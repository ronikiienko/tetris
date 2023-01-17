export class LimitedCounter {
    constructor(min, max, initialCount = 0) {
        this.count = initialCount;
        this.min = min;
        this.max = max;
    }

    increment() {
        if (this.count < this.max) {
            this.count = this.count + 1;
        } else {
            this.count = this.min;
        }
    }

    decrement() {
        if (this.count > this.min) {
            this.count = this.count - 1;
        } else {
            this.count = this.max;
        }
    }
}