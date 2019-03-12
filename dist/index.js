"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_1 = require("./aws");
const fs_1 = __importDefault(require("fs"));
const config_1 = require("./config");
const validator_1 = require("./validator");
const ts_optchain_1 = require("ts-optchain");
class XyDomainScan {
    constructor() {
        this.aws = new aws_1.AWS();
    }
    async start() {
        this.config = await config_1.Config.load();
        const domains = new Map();
        const result = {
            domains: []
        };
        if (ts_optchain_1.oc(this.config).aws.enabled(true)) {
            await this.addAWSDomains(domains);
        }
        await this.addConfigDomains(domains);
        console.log(`Domains Found: ${domains.size}`);
        let completedDomains = 0;
        for (const domain of domains.values()) {
            completedDomains++;
            result.domains.push(domain);
            console.log(`Domain:[${completedDomains}/${domains.size}]: ${domain}`);
            await domain.validate(this.config);
        }
        console.log(`Saving to File: output.json`);
        console.log(JSON.stringify(result));
        this.saveToFile("output.json", result);
    }
    async addAWSDomains(domains) {
        const awsDomains = await this.aws.getDomains();
        for (const domain of awsDomains) {
            domains.set(domain, new validator_1.DomainValidator(domain));
        }
        return domains;
    }
    async addConfigDomains(domains) {
        if (this.config && this.config.domains) {
            for (const domain of this.config.domains) {
                domains.set(domain.name, new validator_1.DomainValidator(domain.name));
            }
        }
        return domains;
    }
    async saveToFile(filename, obj) {
        fs_1.default.open(filename, 'w', (err, fd) => {
            if (err) {
                console.log(`failed to open file: ${err}`);
            }
            else {
                fs_1.default.write(fd, JSON.stringify(obj), (errWrite) => {
                    if (errWrite) {
                        console.log(`failed to write file: ${errWrite}`);
                    }
                });
            }
        });
    }
}
exports.XyDomainScan = XyDomainScan;
//# sourceMappingURL=index.js.map