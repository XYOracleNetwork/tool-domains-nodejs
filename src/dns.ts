import dns, { MxRecord, AnyTxtRecord } from 'dns'

export class DNS {

  public static async lookup(name: string): Promise < string > {
    return new Promise((resolve, reject) => {
      dns.lookup(name, 4, (err, address) => {
        if (err) {
          reject(err)
        } else {
          resolve(address)
        }
      })
    })
  }

  public static async resolve4(name: string): Promise < string[] > {
    return new Promise((resolve, reject) => {
      dns.resolve4(name, (err, records: string[]) => {
        if (err) {
          if (err.code !== 'ENODATA' && err.code !== 'ENOTFOUND') {
            reject(err)
          } else {
            resolve([])
          }
        } else {
          resolve(records)
        }
      })
    })
  }

  public static async resolveCname(name: string): Promise < string[] > {
    return new Promise((resolve, reject) => {
      dns.resolveCname(name, (err, records: string[]) => {
        if (err) {
          if (err.code !== 'ENODATA' && err.code !== 'ENOTFOUND') {
            reject(err)
          } else {
            resolve([])
          }
        } else {
          resolve(records)
        }
      })
    })
  }

  public static async resolveMx(name: string): Promise < MxRecord[] > {
    return new Promise((resolve, reject) => {
      dns.resolveMx(name, (err, records: MxRecord[]) => {
        if (err) {
          if (err.code !== 'ENODATA' && err.code !== 'ENOTFOUND') {
            reject(err)
          } else {
            resolve([])
          }
        } else {
          resolve(records)
        }
      })
    })
  }

  public static async resolveTxt(name: string): Promise < string[][] > {
    return new Promise((resolve, reject) => {
      dns.resolveTxt(name, (err, records: string[][]) => {
        if (err) {
          if (err.code !== 'ENODATA' && err.code !== 'ENOTFOUND') {
            reject(err)
          } else {
            resolve([])
          }
        } else {
          resolve(records)
        }
      })
    })
  }

  public static async reverse(address: string): Promise < string[] > {
    return new Promise((resolve, reject) => {
      dns.reverse(address, (err, hostNames) => {
        if (err) {
          reject(err)
        } else {
          resolve(hostNames)
        }
      })
    })
  }
}