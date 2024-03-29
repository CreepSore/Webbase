"use strict";

/**
 * @typedef {import("./CustomerLogic").CustomerLogicDependencies} CustomerLogicDependencies
 * @typedef {import("./CustomerLogic")} CustomerLogic
 */

class CustomerLogicHandler {
    static #mainInstance;

    /**
     * @returns {CustomerLogicHandler}
     * @readonly
     * @static
     * @memberof CustomerLogicHandler
     */
    static get instance() {
        return this.#mainInstance;
    }

    constructor() {
        this.customerLogicImplementations = new Set();
        this.sharedObjects = new Map();
        // dummy object to detect non existing functions
        this.nullobj = {};
        if(!CustomerLogicHandler.#mainInstance) {
            CustomerLogicHandler.#mainInstance = this;
        }
    }

    /**
     * Returns all customer implementations sorted by highest
     * priority first
     * @readonly
     * @memberof CustomerLogicHandler
     */
    get sortedCustomerLogic() {
        return [...this.customerLogicImplementations].sort((a, b) => {
            if(a.getPriority() > b.getPriority()) return -1;
            if(a.getPriority() < b.getPriority()) return 1;
            return 0;
        });
    }

    /**
     * Returns all customer implementations sorted by lowest
     * priority first
     * @readonly
     * @memberof CustomerLogicHandler
     */
    get sortedCustomerLogicReversed() {
        return [...this.customerLogicImplementations].sort((a, b) => {
            if(a.getPriority() > b.getPriority()) return 1;
            if(a.getPriority() < b.getPriority()) return -1;
            return 0;
        });
    }

    /**
     * @return {Promise<CustomerLogicDependencies>}
     * @memberof CustomerLogicHandler
     */
    async constructDependencies() {
        return {
            sharedObjects: this.sharedObjects
        };
    }

    /**
     * Registers a customer logic instance
     * This does not check if the customerLogic instance was loaded in the first place.
     * @param {CustomerLogic} customerLogic
     * @param {boolean} [load=false] If true, the customer logic instance will be loaded
     * @memberof CustomerLogicHandler
     */
    async registerCustomerLogic(customerLogic, load = false) {
        if(!customerLogic) return;
        await customerLogic.injectDependencies(await this.constructDependencies());
        if(load) await this.loadCustomerLogic(customerLogic);
        this.customerLogicImplementations.add(customerLogic);
    }

    /**
     * Unregisters a customer logic instance.
     * This does not check if the customerLogic instance was loaded in the first place.
     * @param {CustomerLogic} customerLogic
     * @param {boolean} [unload=false] If true, the customer logic instance will be unloaded
     * @memberof CustomerLogicHandler
     */
    async unregisterCustomerLogic(customerLogic, unload = false) {
        if(!customerLogic) return;
        if(unload) await this.unloadCustomerLogic(customerLogic);
        this.customerLogicImplementations.delete(customerLogic);
    }

    /**
     * Loads all registered customer logic instances
     * Instances with higher priority get loaded first
     * @memberof CustomerLogicHandler
     */
    async loadAllCustomerImplementations() {
        await Promise.all(this.sortedCustomerLogic.map(customerLogic => {
            return this.loadCustomerLogic(customerLogic);
        }));
    }

    /**
     * Unloads all registered customer logic instances
     * Insances with lower priority get unloaded first
     * @param clearList If true, the list of registered customer logic instances will be cleared
     * @memberof CustomerLogicHandler
     */
    async unloadAllCustomerImplementations(clearList = false) {
        await Promise.all(this.sortedCustomerLogicReversed.map(customerLogic => {
            return this.unloadCustomerLogic(customerLogic);
        }));

        if(clearList) {
            this.customerLogicImplementations.clear();
        }
    }

    /**
     * Runs a function on all customer logic instances if the function does exist.
     * Instances with higher priority get executed first.
     * @param {string} functionName
     * @param {Array<any>} args
     * @return {Promise<Array<any>>}
     * @memberof CustomerLogicHandler
     */
    async runAllCustomerLogicFunction(functionName, ...args) {
        return (await Promise.all(this.sortedCustomerLogic.map(async customerLogic => {
            return await this.runCustomerLogicFunction(customerLogic, functionName, ...args);
        }))).filter(x => x !== this.nullobj);
    }

    /**
     * Runs a function on the specified customer logic instance if the function does exist.
     * @param {CustomerLogic} customerLogic
     * @param {string} functionName
     * @param {Array<any>} args
     * @return {Promise<any>}
     * @memberof CustomerLogicHandler
     */
    async runCustomerLogicFunction(customerLogic, functionName, ...args) {
        if(!customerLogic) return this.nullobj;
        if(!customerLogic[functionName]) return this.nullobj;
        return await customerLogic[functionName](...args);
    }

    /**
     * Loads a customer logic instance
     * @param {CustomerLogic} customerLogic
     * @memberof CustomerLogicHandler
     */
    async loadCustomerLogic(customerLogic) {
        customerLogic?.onLoad?.();
    }

    /**
     * Unloads a customer logic instance
     * @param {CustomerLogic} customerLogic
     * @memberof CustomerLogicHandler
     */
    async unloadCustomerLogic(customerLogic) {
        customerLogic?.onUnload?.();
    }
}

module.exports = CustomerLogicHandler;
