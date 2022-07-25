"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
class EventController {
    constructor(client, events) {
        this._client = client;
        this._events = events;
        this._client.logger.done(`Loaded ${this._events.length} Event(s)...`);
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._client == undefined || this._events == undefined)
                return;
            this._events.forEach((event) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                yield event.register();
                (_a = this._client) === null || _a === void 0 ? void 0 : _a.logger.done(`Event \"${event.name}\" registered.`);
            }));
        });
    }
}
exports.EventController = EventController;
